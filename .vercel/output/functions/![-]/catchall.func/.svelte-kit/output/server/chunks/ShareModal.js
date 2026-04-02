import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { a as formatDate, f as formatCurrency } from "./formatters.js";
import { b as attr, c as escape_html, j as bind_props } from "./index.js";
import { A as AppButton } from "./AppButton.js";
const generateInvoicePdf = (invoice) => {
  const doc = new jsPDF();
  const primaryColor = [16, 185, 129];
  const textColor = [30, 41, 59];
  const lightTextColor = [100, 116, 139];
  doc.setFillColor(248, 250, 252);
  doc.rect(0, 0, 210, 60, "F");
  doc.setDrawColor(226, 232, 240);
  doc.line(0, 60, 210, 60);
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  const setDocTextColor = (color) => {
    doc.setTextColor(color[0], color[1], color[2]);
  };
  setDocTextColor(textColor);
  let startY = 25;
  if (invoice.sender.logo) {
    try {
      doc.addImage(invoice.sender.logo, "PNG", 14, 10, 20, 20);
      startY = 38;
    } catch (e) {
      console.warn("Could not add logo", e);
    }
  }
  doc.text(invoice.sender.name, 14, startY);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  setDocTextColor(lightTextColor);
  let senderY = startY + 7;
  const addSenderLine = (text) => {
    if (text) {
      doc.text(text, 14, senderY);
      senderY += 4.5;
    }
  };
  addSenderLine(invoice.sender.address);
  addSenderLine(invoice.sender.email);
  addSenderLine(invoice.sender.phone);
  doc.setFontSize(32);
  doc.setFont("helvetica", "bold");
  setDocTextColor(primaryColor);
  doc.text("INVOICE", 196, 25, { align: "right" });
  doc.setFontSize(9);
  setDocTextColor(lightTextColor);
  doc.setFont("helvetica", "bold");
  doc.text(`Invoice #`, 150, 32);
  doc.text(`Date Issued`, 150, 37);
  doc.text(`Due Date`, 150, 42);
  if (invoice.poNumber) doc.text(`PO Number`, 150, 47);
  doc.setTextColor(...textColor);
  doc.setFont("helvetica", "normal");
  doc.text(invoice.invoiceNumber, 196, 32, { align: "right" });
  doc.text(formatDate(invoice.dateIssued), 196, 37, { align: "right" });
  doc.text(formatDate(invoice.dateDue), 196, 42, { align: "right" });
  if (invoice.poNumber) doc.text(invoice.poNumber, 196, 47, { align: "right" });
  const billToY = 75;
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...lightTextColor);
  doc.text("BILL TO", 14, billToY);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...textColor);
  doc.text(invoice.client.companyName, 14, billToY + 7);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...lightTextColor);
  let clientY = billToY + 12;
  const addClientLine = (text) => {
    if (text) {
      doc.text(text, 14, clientY);
      clientY += 4.5;
    }
  };
  if (invoice.client.contactName) addClientLine(invoice.client.contactName);
  addClientLine(invoice.client.address);
  addClientLine(invoice.client.email);
  const tableStartY = Math.max(clientY, 100);
  const tableData = invoice.items.map((item) => [
    item.name,
    item.description || "",
    formatCurrency(item.rate, invoice.currency),
    item.quantity.toString(),
    formatCurrency(item.rate * item.quantity, invoice.currency)
  ]);
  autoTable(doc, {
    startY: tableStartY,
    head: [["ITEM", "DESCRIPTION", "RATE", "QTY", "AMOUNT"]],
    body: tableData,
    theme: "plain",
    headStyles: {
      fillColor: [248, 250, 252],
      // Slate 50
      textColor: lightTextColor,
      fontSize: 8,
      fontStyle: "bold",
      lineColor: [226, 232, 240],
      // Slate 200
      lineWidth: { bottom: 0.5 },
      halign: "left"
    },
    bodyStyles: {
      textColor,
      fontSize: 9,
      lineColor: [241, 245, 249],
      // Slate 100
      lineWidth: { bottom: 0.1 }
    },
    columnStyles: {
      0: { cellWidth: 40, fontStyle: "bold" },
      1: { cellWidth: "auto" },
      2: { cellWidth: 25, halign: "right" },
      3: { cellWidth: 15, halign: "center" },
      4: { cellWidth: 30, halign: "right", fontStyle: "bold" }
    },
    margin: { top: 10, right: 14, bottom: 20, left: 14 }
  });
  const finalY = doc.lastAutoTable.finalY + 10;
  const subtotal = invoice.items.reduce((sum, item) => sum + item.rate * item.quantity, 0);
  const taxAmount = subtotal * (invoice.taxRate / 100);
  const total = subtotal + taxAmount + invoice.shipping - invoice.discount;
  const totalsX = 140;
  const valuesX = 196;
  let currentY = finalY;
  const addTotalRow = (label, value, isTotal = false) => {
    doc.setFontSize(isTotal ? 12 : 9);
    doc.setFont("helvetica", isTotal ? "bold" : "normal");
    const color = isTotal ? textColor : lightTextColor;
    setDocTextColor(color);
    doc.text(label, totalsX, currentY);
    setDocTextColor(textColor);
    doc.text(value, valuesX, currentY, { align: "right" });
    currentY += isTotal ? 8 : 6;
  };
  addTotalRow("Subtotal", formatCurrency(subtotal, invoice.currency));
  if (invoice.taxRate > 0) addTotalRow(`Tax (${invoice.taxRate}%)`, formatCurrency(taxAmount, invoice.currency));
  if (invoice.discount > 0) addTotalRow("Discount", `-${formatCurrency(invoice.discount, invoice.currency)}`);
  if (invoice.shipping > 0) addTotalRow("Shipping", formatCurrency(invoice.shipping, invoice.currency));
  currentY += 2;
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.5);
  doc.line(totalsX, currentY, valuesX, currentY);
  currentY += 8;
  addTotalRow("Total", formatCurrency(total, invoice.currency), true);
  let footerY = Math.max(finalY, currentY) + 20;
  if (invoice.notes) {
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    setDocTextColor(textColor);
    doc.text("Notes", 14, footerY);
    doc.setFont("helvetica", "normal");
    setDocTextColor(lightTextColor);
    const splitNotes = doc.splitTextToSize(invoice.notes, 120);
    doc.text(splitNotes, 14, footerY + 5);
    footerY += 5 + splitNotes.length * 4 + 5;
  }
  if (invoice.terms) {
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    setDocTextColor(textColor);
    doc.text("Terms & Conditions", 14, footerY);
    doc.setFont("helvetica", "normal");
    setDocTextColor(lightTextColor);
    const splitTerms = doc.splitTextToSize(invoice.terms, 120);
    doc.text(splitTerms, 14, footerY + 5);
  }
  return doc;
};
const generateEstimatePdf = (estimate) => {
  const doc = new jsPDF();
  const primaryColor = [99, 102, 241];
  const textColor = [30, 41, 59];
  const lightTextColor = [100, 116, 139];
  doc.setFillColor(248, 250, 252);
  doc.rect(0, 0, 210, 60, "F");
  doc.setDrawColor(226, 232, 240);
  doc.line(0, 60, 210, 60);
  const setDocTextColor = (color) => {
    doc.setTextColor(color[0], color[1], color[2]);
  };
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  setDocTextColor(textColor);
  let startY = 25;
  if (estimate.sender.logo) {
    try {
      doc.addImage(estimate.sender.logo, "PNG", 14, 10, 20, 20);
      startY = 38;
    } catch (e) {
      console.warn("Could not add logo", e);
    }
  }
  doc.text(estimate.sender.name, 14, startY);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  setDocTextColor(lightTextColor);
  let senderY = startY + 7;
  if (estimate.sender.address) {
    doc.text(estimate.sender.address, 14, senderY);
    senderY += 4.5;
  }
  if (estimate.sender.email) {
    doc.text(estimate.sender.email, 14, senderY);
    senderY += 4.5;
  }
  if (estimate.sender.phone) {
    doc.text(estimate.sender.phone, 14, senderY);
    senderY += 4.5;
  }
  doc.setFontSize(32);
  doc.setFont("helvetica", "bold");
  setDocTextColor(primaryColor);
  doc.text("ESTIMATE", 196, 25, { align: "right" });
  doc.setFontSize(9);
  setDocTextColor(lightTextColor);
  doc.setFont("helvetica", "bold");
  doc.text(`Estimate #`, 150, 32);
  doc.text(`Date Issued`, 150, 37);
  doc.text(`Valid Until`, 150, 42);
  if (estimate.referenceNumber) doc.text(`Reference`, 150, 47);
  doc.setTextColor(...textColor);
  doc.setFont("helvetica", "normal");
  doc.text(estimate.estimateNumber, 196, 32, { align: "right" });
  doc.text(formatDate(estimate.dateIssued), 196, 37, { align: "right" });
  doc.text(formatDate(estimate.dateValidUntil), 196, 42, { align: "right" });
  if (estimate.referenceNumber) doc.text(estimate.referenceNumber, 196, 47, { align: "right" });
  const billToY = 75;
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...lightTextColor);
  doc.text("ESTIMATE FOR", 14, billToY);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...textColor);
  doc.text(estimate.client.companyName, 14, billToY + 7);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...lightTextColor);
  let clientY = billToY + 12;
  if (estimate.client.contactName) {
    doc.text(estimate.client.contactName, 14, clientY);
    clientY += 4.5;
  }
  doc.text(estimate.client.address, 14, clientY);
  clientY += 4.5;
  doc.text(estimate.client.email, 14, clientY);
  const tableStartY = Math.max(clientY, 100);
  const tableData = estimate.items.map((item) => [
    item.name,
    item.description || "",
    formatCurrency(item.rate, estimate.currency),
    item.quantity.toString(),
    formatCurrency(item.rate * item.quantity, estimate.currency)
  ]);
  autoTable(doc, {
    startY: tableStartY,
    head: [["ITEM", "DESCRIPTION", "RATE", "QTY", "AMOUNT"]],
    body: tableData,
    theme: "plain",
    headStyles: { fillColor: [248, 250, 252], textColor: lightTextColor, fontSize: 8, fontStyle: "bold", lineWidth: { bottom: 0.5 }, lineColor: [226, 232, 240] },
    bodyStyles: { textColor, fontSize: 9, lineWidth: { bottom: 0.1 }, lineColor: [241, 245, 249] },
    columnStyles: { 0: { cellWidth: 40, fontStyle: "bold" }, 1: { cellWidth: "auto" }, 2: { cellWidth: 25, halign: "right" }, 3: { cellWidth: 15, halign: "center" }, 4: { cellWidth: 30, halign: "right", fontStyle: "bold" } }
  });
  const finalY = doc.lastAutoTable.finalY + 10;
  const subtotal = estimate.items.reduce((sum, item) => sum + item.rate * item.quantity, 0);
  const taxAmount = subtotal * (estimate.taxRate / 100);
  const total = subtotal + taxAmount + estimate.shipping - estimate.discount;
  let currentY = finalY;
  const addTotalRow = (label, value, isTotal = false) => {
    doc.setFontSize(isTotal ? 12 : 9);
    doc.setFont("helvetica", isTotal ? "bold" : "normal");
    setDocTextColor(isTotal ? textColor : lightTextColor);
    doc.text(label, 140, currentY);
    setDocTextColor(textColor);
    doc.text(value, 196, currentY, { align: "right" });
    currentY += isTotal ? 8 : 6;
  };
  addTotalRow("Subtotal", formatCurrency(subtotal, estimate.currency));
  if (estimate.taxRate > 0) addTotalRow(`Tax (${estimate.taxRate}%)`, formatCurrency(taxAmount, estimate.currency));
  if (estimate.discount > 0) addTotalRow("Discount", `-${formatCurrency(estimate.discount, estimate.currency)}`);
  if (estimate.shipping > 0) addTotalRow("Shipping", formatCurrency(estimate.shipping, estimate.currency));
  currentY += 2;
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.5);
  doc.line(140, currentY, 196, currentY);
  currentY += 8;
  addTotalRow("Total Estimate", formatCurrency(total, estimate.currency), true);
  let footerY = Math.max(finalY, currentY) + 20;
  if (estimate.notes) {
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    setDocTextColor(textColor);
    doc.text("Notes", 14, footerY);
    doc.setFont("helvetica", "normal");
    setDocTextColor(lightTextColor);
    const splitNotes = doc.splitTextToSize(estimate.notes, 120);
    doc.text(splitNotes, 14, footerY + 5);
    footerY += 5 + splitNotes.length * 4 + 10;
  }
  if (estimate.terms) {
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    setDocTextColor(textColor);
    doc.text("Terms & Conditions", 14, footerY);
    doc.setFont("helvetica", "normal");
    setDocTextColor(lightTextColor);
    const splitTerms = doc.splitTextToSize(estimate.terms, 120);
    doc.text(splitTerms, 14, footerY + 5);
  }
  return doc;
};
function ShareModal($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { isOpen = false, shareUrl, documentNumber, onshare } = $$props;
    let copyLabel = "Copy Link";
    if (isOpen) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"><div class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"></div> <div class="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in duration-300"><div class="p-8"><div class="flex items-center justify-between mb-6"><h3 class="text-xl font-black text-slate-900 tracking-tight">Share Document</h3> <button aria-label="Close dialog" class="p-2 hover:bg-slate-100 rounded-full transition-colors"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div> <div class="space-y-6"><div class="bg-slate-50 p-4 rounded-2xl border border-slate-100"><div class="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Public Link</div> <div class="flex gap-2"><input type="text" readonly=""${attr("value", shareUrl)} class="flex-1 bg-transparent border-none text-xs font-medium text-slate-600 focus:ring-0 truncate"/> <button class="text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors whitespace-nowrap">${escape_html(copyLabel)}</button></div></div> <div class="grid grid-cols-2 gap-3"><button class="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-[#25D366]/10 hover:bg-[#25D366]/20 transition-all group"><div class="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg shadow-[#25D366]/30 group-hover:scale-110 transition-transform"><svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.634 1.437h.005c6.551 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"></path></svg></div> <span class="text-xs font-bold text-slate-700">WhatsApp</span></button> <button class="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 transition-all group"><div class="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition-transform"><svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg></div> <span class="text-xs font-bold text-slate-700">Email</span></button></div> `);
      AppButton($$renderer2, {
        variant: "secondary",
        class: "w-full rounded-2xl",
        onclick: () => isOpen = false,
        children: ($$renderer3) => {
          $$renderer3.push(`<!---->Close`);
        },
        $$slots: { default: true }
      });
      $$renderer2.push(`<!----></div></div></div></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { isOpen });
  });
}
export {
  ShareModal as S,
  generateInvoicePdf as a,
  generateEstimatePdf as g
};
