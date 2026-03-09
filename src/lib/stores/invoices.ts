import { writable, get } from 'svelte/store';
import type { Invoice } from '../models/invoice';
import { v4 as uuidv4 } from 'uuid';

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
            terms: inv.terms
        }));
        invoices.set(mapped);
    }
};

export const addInvoice = (invoice: Omit<Invoice, 'id'>) => {
    const id = uuidv4();
    const newInvoice = { ...invoice, id };

    // Optimistic UI update
    invoices.update(i => [...i, newInvoice]);

    // Background DB update
    if (supabaseClient && userId) {
        supabaseClient.from('invoices').insert([{
            id,
            user_id: userId,
            invoice_number: invoice.invoiceNumber,
            po_number: invoice.poNumber,
            date_issued: invoice.dateIssued.toISOString(),
            date_due: invoice.dateDue.toISOString(),
            status: invoice.status,
            sender: invoice.sender,
            client: invoice.client,
            items: invoice.items,
            tax_rate: invoice.taxRate,
            discount: invoice.discount,
            shipping: invoice.shipping,
            currency: invoice.currency,
            notes: invoice.notes,
            terms: invoice.terms
        }]).then();
    }

    return id;
};

export const updateInvoice = (id: string, updates: Partial<Invoice>) => {
    invoices.update(i => i.map(inv => inv.id === id ? { ...inv, ...updates } : inv));

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

        supabaseClient.from('invoices').update(dbUpdates).eq('id', id).then();
    }
};

export const deleteInvoice = (id: string) => {
    invoices.update(i => i.filter(inv => inv.id !== id));

    if (supabaseClient) {
        supabaseClient.from('invoices').delete().eq('id', id).then();
    }
};
