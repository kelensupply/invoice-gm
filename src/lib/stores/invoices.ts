import { writable, get } from 'svelte/store';
import type { Invoice } from '../models/invoice';
import { v4 as uuidv4 } from 'uuid';
import { logDocumentAction } from './history';

export const invoices = writable<Invoice[]>([]);

let supabaseClient: any;
let userId: string;

export const initInvoices = async (supabase: any, uid: string) => {
    supabaseClient = supabase;
    userId = uid;

    const { data, error } = await supabaseClient
        .from('invoices')
        .select('*')
        .eq('user_id', userId);

    if (!error && data) {
        const mapped = data.map((inv: any) => ({
            id: inv.id,
            invoiceNumber: inv.invoice_number,
            poNumber: inv.po_number,
            dateIssued: new Date(inv.date_issued),
            dateDue: new Date(inv.date_due),
            status: inv.status,
            sender: inv.sender,
            client: inv.client,
            items: inv.items,
            taxRate: inv.tax_rate,
            discount: inv.discount,
            shipping: inv.shipping,
            currency: inv.currency,
            notes: inv.notes,
            terms: inv.terms,
            sentAt: inv.sent_at ? new Date(inv.sent_at) : undefined,
            viewedAt: inv.viewed_at ? new Date(inv.viewed_at) : undefined,
            paidAt: inv.paid_at ? new Date(inv.paid_at) : undefined
        }));

        // Dynamically compute overdue status
        const now = new Date();
        now.setHours(0, 0, 0, 0); // only compare dates

        const updatedMapped = mapped.map((inv: any) => {
            if (inv.status !== 'paid' && inv.dateDue < now && inv.status !== 'overdue') {
                // If it's not paid and past due, mark as overdue
                if (supabaseClient && userId) {
                    supabaseClient.from('invoices').update({ status: 'overdue' }).eq('id', inv.id).then();
                }
                return { ...inv, status: 'overdue' };
            }
            return inv;
        });

        invoices.set(updatedMapped);
    }
};

export const addInvoice = (invoice: Omit<Invoice, 'id'>) => {
    const id = uuidv4();
    // Default correctly to draft on creation
    const newInvoice = { ...invoice, id, status: 'draft' as const };

    // Optimistic UI update
    invoices.update(i => [...i, newInvoice]);

    logDocumentAction({
        documentType: 'invoice',
        documentId: id,
        action: 'created',
        description: `Invoice ${invoice.invoiceNumber} created.`
    });

    // Background DB update
    if (supabaseClient && userId) {
        supabaseClient.from('invoices').insert([{
            id,
            user_id: userId,
            invoice_number: invoice.invoiceNumber,
            po_number: invoice.poNumber,
            date_issued: newInvoice.dateIssued.toISOString(),
            date_due: newInvoice.dateDue.toISOString(),
            status: newInvoice.status,
            sender: newInvoice.sender,
            client: invoice.client,
            items: invoice.items,
            tax_rate: invoice.taxRate,
            discount: invoice.discount,
            shipping: newInvoice.shipping,
            currency: newInvoice.currency,
            notes: newInvoice.notes,
            terms: newInvoice.terms,
            sent_at: newInvoice.sentAt?.toISOString(),
            viewed_at: newInvoice.viewedAt?.toISOString(),
            paid_at: newInvoice.paidAt?.toISOString()
        }]).then(({ error }: any) => {
            if (error) {
                console.error('Failed to save invoice to Supabase:', error);
            }
        });
    }

    return id;
};

export const updateInvoice = (id: string, updates: Partial<Invoice>) => {
    invoices.update(i => i.map(inv => inv.id === id ? { ...inv, ...updates } : inv));

    if (updates.status) {
        logDocumentAction({
            documentType: 'invoice',
            documentId: id,
            action: 'status_updated',
            description: `Status changed to ${updates.status}.`
        });
    }

    if (supabaseClient) {
        const dbUpdates: any = {};
        if (updates.invoiceNumber !== undefined) dbUpdates.invoice_number = updates.invoiceNumber;
        if (updates.poNumber !== undefined) dbUpdates.po_number = updates.poNumber;
        if (updates.dateIssued !== undefined) dbUpdates.date_issued = updates.dateIssued.toISOString();
        if (updates.dateDue !== undefined) dbUpdates.date_due = updates.dateDue.toISOString();
        if (updates.status !== undefined) dbUpdates.status = updates.status;
        if (updates.sender !== undefined) dbUpdates.sender = updates.sender;
        if (updates.client !== undefined) dbUpdates.client = updates.client;
        if (updates.items !== undefined) dbUpdates.items = updates.items;
        if (updates.taxRate !== undefined) dbUpdates.tax_rate = updates.taxRate;
        if (updates.discount !== undefined) dbUpdates.discount = updates.discount;
        if (updates.shipping !== undefined) dbUpdates.shipping = updates.shipping;
        if (updates.currency !== undefined) dbUpdates.currency = updates.currency;
        if (updates.notes !== undefined) dbUpdates.notes = updates.notes;
        if (updates.terms !== undefined) dbUpdates.terms = updates.terms;
        if (updates.sentAt !== undefined) dbUpdates.sent_at = updates.sentAt.toISOString();
        if (updates.viewedAt !== undefined) dbUpdates.viewed_at = updates.viewedAt.toISOString();
        if (updates.paidAt !== undefined) dbUpdates.paid_at = updates.paidAt.toISOString();

        supabaseClient.from('invoices').update(dbUpdates).eq('id', id).then(({ error }: any) => {
            if (error) {
                console.error('Failed to update invoice in Supabase:', error);
            }
        });
    }
};

export const deleteInvoice = (id: string) => {
    invoices.update(i => i.filter(inv => inv.id !== id));

    if (supabaseClient) {
        supabaseClient.from('invoices').delete().eq('id', id).then(({ error }: any) => {
            if (error) {
                console.error('Failed to delete invoice in Supabase:', error);
            }
        });
    }
};
