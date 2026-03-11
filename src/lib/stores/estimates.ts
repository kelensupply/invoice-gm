import { writable } from 'svelte/store';
import type { Estimate } from '../models/estimate';
import { v4 as uuidv4 } from 'uuid';

export const estimates = writable<Estimate[]>([]);

let supabaseClient: any;
let userId: string;

export const initEstimates = async (supabase: any, uid: string) => {
    supabaseClient = supabase;
    userId = uid;

    const { data, error } = await supabaseClient
        .from('estimates')
        .select('*')
        .eq('user_id', userId);

    if (!error && data) {
        const mapped = data.map((e: any) => ({
            id: e.id,
            estimateNumber: e.estimate_number,
            referenceNumber: e.reference_number,
            dateIssued: new Date(e.date_issued),
            dateValidUntil: new Date(e.date_valid_until),
            status: e.status,
            sender: e.sender,
            client: e.client,
            items: e.items,
            taxRate: e.tax_rate,
            discount: e.discount,
            shipping: e.shipping,
            currency: e.currency,
            notes: e.notes,
            terms: e.terms
        }));
        estimates.set(mapped);
    }
};

export const addEstimate = (estimate: Omit<Estimate, 'id'>) => {
    const id = uuidv4();
    const newEstimate = { ...estimate, id };

    // Optimistic UI update
    estimates.update(e => [...e, newEstimate]);

    // Background DB update
    if (supabaseClient && userId) {
        supabaseClient.from('estimates').insert([{
            id,
            user_id: userId,
            estimate_number: estimate.estimateNumber,
            reference_number: estimate.referenceNumber,
            date_issued: estimate.dateIssued.toISOString(),
            date_valid_until: estimate.dateValidUntil.toISOString(),
            status: estimate.status,
            sender: estimate.sender,
            client: estimate.client,
            items: estimate.items,
            tax_rate: estimate.taxRate,
            discount: estimate.discount,
            shipping: estimate.shipping,
            currency: estimate.currency,
            notes: estimate.notes,
            terms: estimate.terms
        }]).then(({ error }: any) => {
            if (error) {
                console.error('Failed to save estimate to Supabase:', error);
            }
        });
    }

    return id;
};

export const updateEstimate = (id: string, updates: Partial<Estimate>) => {
    estimates.update(e => e.map(est => est.id === id ? { ...est, ...updates } : est));

    if (supabaseClient) {
        const dbUpdates: any = {};
        if (updates.estimateNumber !== undefined) dbUpdates.estimate_number = updates.estimateNumber;
        if (updates.referenceNumber !== undefined) dbUpdates.reference_number = updates.referenceNumber;
        if (updates.dateIssued !== undefined) dbUpdates.date_issued = updates.dateIssued.toISOString();
        if (updates.dateValidUntil !== undefined) dbUpdates.date_valid_until = updates.dateValidUntil.toISOString();
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

        supabaseClient.from('estimates').update(dbUpdates).eq('id', id).then(({ error }: any) => {
            if (error) {
                console.error('Failed to update estimate in Supabase:', error);
            }
        });
    }
};

export const deleteEstimate = (id: string) => {
    estimates.update(e => e.filter(est => est.id !== id));

    if (supabaseClient) {
        supabaseClient.from('estimates').delete().eq('id', id).then(({ error }: any) => {
            if (error) {
                console.error('Failed to delete estimate in Supabase:', error);
            }
        });
    }
};
