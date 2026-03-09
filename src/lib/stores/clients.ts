import { writable } from 'svelte/store';
import type { Client } from '../models/client';
import { v4 as uuidv4 } from 'uuid';

export const clients = writable<Client[]>([]);

let supabaseClient: any;
let userId: string;

export const initClients = async (supabase: any, uid: string) => {
    supabaseClient = supabase;
    userId = uid;

    const { data, error } = await supabaseClient
        .from('clients')
        .select('*')
        .eq('user_id', userId);

    if (!error && data) {
        const mapped = data.map((c: any) => ({
            id: c.id,
            companyName: c.company_name,
            contactName: c.contact_name,
            email: c.email,
            phone: c.phone || '',
            address: c.address || '',
            website: c.website || '',
            taxId: c.tax_id || '',
            notes: c.notes || ''
        }));
        clients.set(mapped);
    }
};

export const addClient = (client: Omit<Client, 'id'>) => {
    const id = uuidv4();
    const newClient = { ...client, id };

    // Optimistic UI update
    clients.update(c => [...c, newClient]);

    // Background DB update
    if (supabaseClient && userId) {
        supabaseClient.from('clients').insert([{
            id,
            user_id: userId,
            company_name: client.companyName,
            contact_name: client.contactName,
            email: client.email,
            phone: client.phone,
            address: client.address,
            website: client.website,
            tax_id: client.taxId,
            notes: client.notes
        }]).then();
    }
};

export const updateClient = (id: string, updates: Partial<Client>) => {
    clients.update(c => c.map(client => client.id === id ? { ...client, ...updates } : client));

    if (supabaseClient) {
        const dbUpdates: any = {};
        if (updates.companyName !== undefined) dbUpdates.company_name = updates.companyName;
        if (updates.contactName !== undefined) dbUpdates.contact_name = updates.contactName;
        if (updates.email !== undefined) dbUpdates.email = updates.email;
        if (updates.phone !== undefined) dbUpdates.phone = updates.phone;
        if (updates.address !== undefined) dbUpdates.address = updates.address;
        if (updates.website !== undefined) dbUpdates.website = updates.website;
        if (updates.taxId !== undefined) dbUpdates.tax_id = updates.taxId;
        if (updates.notes !== undefined) dbUpdates.notes = updates.notes;

        supabaseClient.from('clients').update(dbUpdates).eq('id', id).then();
    }
};

export const deleteClient = (id: string) => {
    clients.update(c => c.filter(client => client.id !== id));

    if (supabaseClient) {
        supabaseClient.from('clients').delete().eq('id', id).then();
    }
};
