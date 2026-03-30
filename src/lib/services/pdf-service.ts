import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { Invoice } from '../models/invoice';
import type { Estimate } from '../models/estimate';
import { formatCurrency, formatDate } from '../utils/formatters';

export const generateInvoicePdf = (invoice: Invoice): jsPDF => {
    const doc = new jsPDF();

    const primaryColor: [number, number, number] = [16, 185, 129]; // Emerald 500
    const textColor: [number, number, number] = [30, 41, 59]; // Slate 800
    const lightTextColor: [number, number, number] = [100, 116, 139]; // Slate 500

    // --- Header ---
    // --- Header ---
    // Background bar for header
    doc.setFillColor(248, 250, 252); // Slate 50
    doc.rect(0, 0, 210, 60, 'F');
    doc.setDrawColor(226, 232, 240); // Slate 200
    doc.line(0, 60, 210, 60);

    // Sender Company
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    const setDocTextColor = (color: [number, number, number]) => {
        doc.setTextColor(color[0], color[1], color[2]);
    };

    setDocTextColor(textColor);
    let startY = 25;
    if (invoice.sender.logo) {
        try {
            doc.addImage(invoice.sender.logo, 'PNG', 14, 10, 20, 20);
            startY = 38;
        } catch (e) {
            console.warn('Could not add logo', e);
        }
    }
    doc.text(invoice.sender.name, 14, startY);

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    setDocTextColor(lightTextColor);
    let senderY = startY + 7;
    const addSenderLine = (text: string) => {
        if (text) {
            doc.text(text, 14, senderY);
            senderY += 4.5;
        }
    };
    addSenderLine(invoice.sender.address);
    addSenderLine(invoice.sender.email);
    addSenderLine(invoice.sender.phone);

    // Invoice Details (Right Aligned)
    doc.setFontSize(32);
    doc.setFont('helvetica', 'bold');
    setDocTextColor(primaryColor);
    doc.text('INVOICE', 196, 25, { align: 'right' });

    doc.setFontSize(9);
    setDocTextColor(lightTextColor);
    doc.setFont('helvetica', 'bold');
    doc.text(`Invoice #`, 150, 32);
    doc.text(`Date Issued`, 150, 37);
    doc.text(`Due Date`, 150, 42);
    if (invoice.poNumber) doc.text(`PO Number`, 150, 47);

    doc.setTextColor(...textColor);
    doc.setFont('helvetica', 'normal');
    doc.text(invoice.invoiceNumber, 196, 32, { align: 'right' });
    doc.text(formatDate(invoice.dateIssued), 196, 37, { align: 'right' });
    doc.text(formatDate(invoice.dateDue), 196, 42, { align: 'right' });
    if (invoice.poNumber) doc.text(invoice.poNumber, 196, 47, { align: 'right' });

    // --- Bill To ---
    const billToY = 75;
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...lightTextColor);
    doc.text('BILL TO', 14, billToY);

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...textColor);
    doc.text(invoice.client.companyName, 14, billToY + 7);

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...lightTextColor);
    let clientY = billToY + 12;
    const addClientLine = (text: string) => {
        if (text) {
            doc.text(text, 14, clientY);
            clientY += 4.5;
        }
    };
    if (invoice.client.contactName) addClientLine(invoice.client.contactName);
    addClientLine(invoice.client.address);
    addClientLine(invoice.client.email);

    // --- Line Items Table ---
    const tableStartY = Math.max(clientY, 100);

    const tableData = invoice.items.map(item => [
        item.name,
        item.description || '',
        formatCurrency(item.rate, invoice.currency),
        item.quantity.toString(),
        formatCurrency(item.rate * item.quantity, invoice.currency)
    ]);

    autoTable(doc, {
        startY: tableStartY,
        head: [['ITEM', 'DESCRIPTION', 'RATE', 'QTY', 'AMOUNT']],
        body: tableData,
        theme: 'plain',
        headStyles: {
            fillColor: [248, 250, 252], // Slate 50
            textColor: lightTextColor,
            fontSize: 8,
            fontStyle: 'bold',
            lineColor: [226, 232, 240], // Slate 200
            lineWidth: { bottom: 0.5 },
            halign: 'left'
        },
        bodyStyles: {
            textColor: textColor,
            fontSize: 9,
            lineColor: [241, 245, 249], // Slate 100
            lineWidth: { bottom: 0.1 }
        },
        columnStyles: {
            0: { cellWidth: 40, fontStyle: 'bold' },
            1: { cellWidth: 'auto' },
            2: { cellWidth: 25, halign: 'right' },
            3: { cellWidth: 15, halign: 'center' },
            4: { cellWidth: 30, halign: 'right', fontStyle: 'bold' }
        },
        margin: { top: 10, right: 14, bottom: 20, left: 14 }
    });

    // --- Totals ---
    const finalY = (doc as any).lastAutoTable.finalY + 10;

    const subtotal = invoice.items.reduce((sum, item) => sum + (item.rate * item.quantity), 0);
    const taxAmount = subtotal * (invoice.taxRate / 100);
    const total = subtotal + taxAmount + invoice.shipping - invoice.discount;

    const totalsX = 140;
    const valuesX = 196;
    let currentY = finalY;

    const addTotalRow = (label: string, value: string, isTotal = false) => {
        doc.setFontSize(isTotal ? 12 : 9);
        doc.setFont('helvetica', isTotal ? 'bold' : 'normal');
        const color = isTotal ? textColor : lightTextColor;
        setDocTextColor(color);
        doc.text(label, totalsX, currentY);
        setDocTextColor(textColor);
        doc.text(value, valuesX, currentY, { align: 'right' });
        currentY += isTotal ? 8 : 6;
    };

    addTotalRow('Subtotal', formatCurrency(subtotal, invoice.currency));
    if (invoice.taxRate > 0) addTotalRow(`Tax (${invoice.taxRate}%)`, formatCurrency(taxAmount, invoice.currency));
    if (invoice.discount > 0) addTotalRow('Discount', `-${formatCurrency(invoice.discount, invoice.currency)}`);
    if (invoice.shipping > 0) addTotalRow('Shipping', formatCurrency(invoice.shipping, invoice.currency));

    // Draw line above Total
    currentY += 2;
    doc.setDrawColor(226, 232, 240); // Slate 200
    doc.setLineWidth(0.5);
    doc.line(totalsX, currentY, valuesX, currentY);
    currentY += 8;

    addTotalRow('Total', formatCurrency(total, invoice.currency), true);

    // --- Footer (Notes and Terms) ---
    let footerY = Math.max(finalY, currentY) + 20;

    if (invoice.notes) {
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        setDocTextColor(textColor);
        doc.text('Notes', 14, footerY);

        doc.setFont('helvetica', 'normal');
        setDocTextColor(lightTextColor);
        const splitNotes = doc.splitTextToSize(invoice.notes, 120);
        doc.text(splitNotes, 14, footerY + 5);
        footerY += 5 + (splitNotes.length * 4) + 5;
    }

    if (invoice.terms) {
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        setDocTextColor(textColor);
        doc.text('Terms & Conditions', 14, footerY);

        doc.setFont('helvetica', 'normal');
        setDocTextColor(lightTextColor);
        const splitTerms = doc.splitTextToSize(invoice.terms, 120);
        doc.text(splitTerms, 14, footerY + 5);
    }

    return doc;
};

export const generateEstimatePdf = (estimate: Estimate): jsPDF => {
    const doc = new jsPDF();
    const primaryColor: [number, number, number] = [99, 102, 241]; // Indigo 500 (Estimates have a different theme)
    const textColor: [number, number, number] = [30, 41, 59];
    const lightTextColor: [number, number, number] = [100, 116, 139];

    // Header Background
    doc.setFillColor(248, 250, 252);
    doc.rect(0, 0, 210, 60, 'F');
    doc.setDrawColor(226, 232, 240);
    doc.line(0, 60, 210, 60);

    const setDocTextColor = (color: [number, number, number]) => {
        doc.setTextColor(color[0], color[1], color[2]);
    };

    // Sender
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    setDocTextColor(textColor);
    let startY = 25;
    if (estimate.sender.logo) {
        try {
            doc.addImage(estimate.sender.logo, 'PNG', 14, 10, 20, 20);
            startY = 38;
        } catch (e) {
            console.warn('Could not add logo', e);
        }
    }
    doc.text(estimate.sender.name, 14, startY);

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    setDocTextColor(lightTextColor);
    let senderY = startY + 7;
    if (estimate.sender.address) { doc.text(estimate.sender.address, 14, senderY); senderY += 4.5; }
    if (estimate.sender.email) { doc.text(estimate.sender.email, 14, senderY); senderY += 4.5; }
    if (estimate.sender.phone) { doc.text(estimate.sender.phone, 14, senderY); senderY += 4.5; }

    // Estimate Details
    doc.setFontSize(32);
    doc.setFont('helvetica', 'bold');
    setDocTextColor(primaryColor);
    doc.text('ESTIMATE', 196, 25, { align: 'right' });

    doc.setFontSize(9);
    setDocTextColor(lightTextColor);
    doc.setFont('helvetica', 'bold');
    doc.text(`Estimate #`, 150, 32);
    doc.text(`Date Issued`, 150, 37);
    doc.text(`Valid Until`, 150, 42);
    if (estimate.referenceNumber) doc.text(`Reference`, 150, 47);

    doc.setTextColor(...textColor);
    doc.setFont('helvetica', 'normal');
    doc.text(estimate.estimateNumber, 196, 32, { align: 'right' });
    doc.text(formatDate(estimate.dateIssued), 196, 37, { align: 'right' });
    doc.text(formatDate(estimate.dateValidUntil), 196, 42, { align: 'right' });
    if (estimate.referenceNumber) doc.text(estimate.referenceNumber, 196, 47, { align: 'right' });

    // Bill To
    const billToY = 75;
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...lightTextColor);
    doc.text('ESTIMATE FOR', 14, billToY);

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...textColor);
    doc.text(estimate.client.companyName, 14, billToY + 7);

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...lightTextColor);
    let clientY = billToY + 12;
    if (estimate.client.contactName) { doc.text(estimate.client.contactName, 14, clientY); clientY += 4.5; }
    doc.text(estimate.client.address, 14, clientY); clientY += 4.5;
    doc.text(estimate.client.email, 14, clientY);

    // Table
    const tableStartY = Math.max(clientY, 100);
    const tableData = estimate.items.map(item => [
        item.name,
        item.description || '',
        formatCurrency(item.rate, estimate.currency),
        item.quantity.toString(),
        formatCurrency(item.rate * item.quantity, estimate.currency)
    ]);

    autoTable(doc, {
        startY: tableStartY,
        head: [['ITEM', 'DESCRIPTION', 'RATE', 'QTY', 'AMOUNT']],
        body: tableData,
        theme: 'plain',
        headStyles: { fillColor: [248, 250, 252], textColor: lightTextColor, fontSize: 8, fontStyle: 'bold', lineWidth: { bottom: 0.5 }, lineColor: [226, 232, 240] },
        bodyStyles: { textColor: textColor, fontSize: 9, lineWidth: { bottom: 0.1 }, lineColor: [241, 245, 249] },
        columnStyles: { 0: { cellWidth: 40, fontStyle: 'bold' }, 1: { cellWidth: 'auto' }, 2: { cellWidth: 25, halign: 'right' }, 3: { cellWidth: 15, halign: 'center' }, 4: { cellWidth: 30, halign: 'right', fontStyle: 'bold' } }
    });

    const finalY = (doc as any).lastAutoTable.finalY + 10;
    const subtotal = estimate.items.reduce((sum, item) => sum + (item.rate * item.quantity), 0);
    const taxAmount = subtotal * (estimate.taxRate / 100);
    const total = subtotal + taxAmount + estimate.shipping - estimate.discount;

    let currentY = finalY;
    const addTotalRow = (label: string, value: string, isTotal = false) => {
        doc.setFontSize(isTotal ? 12 : 9);
        doc.setFont('helvetica', isTotal ? 'bold' : 'normal');
        setDocTextColor(isTotal ? textColor : lightTextColor);
        doc.text(label, 140, currentY);
        setDocTextColor(textColor);
        doc.text(value, 196, currentY, { align: 'right' });
        currentY += isTotal ? 8 : 6;
    };

    addTotalRow('Subtotal', formatCurrency(subtotal, estimate.currency));
    if (estimate.taxRate > 0) addTotalRow(`Tax (${estimate.taxRate}%)`, formatCurrency(taxAmount, estimate.currency));
    if (estimate.discount > 0) addTotalRow('Discount', `-${formatCurrency(estimate.discount, estimate.currency)}`);
    if (estimate.shipping > 0) addTotalRow('Shipping', formatCurrency(estimate.shipping, estimate.currency));

    currentY += 2;
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.5);
    doc.line(140, currentY, 196, currentY);
    currentY += 8;
    addTotalRow('Total Estimate', formatCurrency(total, estimate.currency), true);

    let footerY = Math.max(finalY, currentY) + 20;
    if (estimate.notes) {
        doc.setFontSize(10); doc.setFont('helvetica', 'bold'); setDocTextColor(textColor);
        doc.text('Notes', 14, footerY);
        doc.setFont('helvetica', 'normal'); setDocTextColor(lightTextColor);
        const splitNotes = doc.splitTextToSize(estimate.notes, 120);
        doc.text(splitNotes, 14, footerY + 5);
        footerY += 5 + (splitNotes.length * 4) + 10;
    }
    if (estimate.terms) {
        doc.setFontSize(10); doc.setFont('helvetica', 'bold'); setDocTextColor(textColor);
        doc.text('Terms & Conditions', 14, footerY);
        doc.setFont('helvetica', 'normal'); setDocTextColor(lightTextColor);
        const splitTerms = doc.splitTextToSize(estimate.terms, 120);
        doc.text(splitTerms, 14, footerY + 5);
    }

    return doc;
};
