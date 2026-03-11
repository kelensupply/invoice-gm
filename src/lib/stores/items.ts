import { writable } from 'svelte/store';
import { v4 as uuidv4 } from 'uuid';

export interface Item {
    id: string;
    name: string;
    description: string;
    rate: number;
    sku: string;
    category: string;
    unit: string;
}

export const items = writable<Item[]>([]);

let supabaseClient: any;
let userId: string;

export const initItems = async (supabase: any, uid: string) => {
    supabaseClient = supabase;
    userId = uid;

    const { data, error } = await supabaseClient
        .from('items')
        .select('*')
        .eq('user_id', userId);

    if (!error && data) {
        const mapped = data.map((item: any) => ({
            id: item.id,
            name: item.name,
            description: item.description || '',
            rate: item.rate,
            sku: item.sku || '',
            category: item.category || '',
            unit: item.unit || 'pcs'
        }));
        items.set(mapped);
    }
};

export const addItem = (item: Omit<Item, 'id'>) => {
    const id = uuidv4();
    const newItem = { ...item, id };

    // Optimistic UI update
    items.update(i => [...i, newItem]);

    // Background DB update
    if (supabaseClient && userId) {
        supabaseClient.from('items').insert([{
            id,
            user_id: userId,
            name: item.name,
            description: item.description,
            rate: item.rate,
            sku: item.sku,
            category: item.category,
            unit: item.unit
        }]).then(({ error }: any) => {
            if (error) {
                console.error('Failed to save item to Supabase:', error);
                // We could revert the optimistic update here if needed
            }
        });
    }
};

export const updateItem = (id: string, updates: Partial<Item>) => {
    items.update(i => i.map(item => item.id === id ? { ...item, ...updates } : item));

    if (supabaseClient) {
        const dbUpdates: any = {};
        if (updates.name !== undefined) dbUpdates.name = updates.name;
        if (updates.description !== undefined) dbUpdates.description = updates.description;
        if (updates.rate !== undefined) dbUpdates.rate = updates.rate;
        if (updates.sku !== undefined) dbUpdates.sku = updates.sku;
        if (updates.category !== undefined) dbUpdates.category = updates.category;
        if (updates.unit !== undefined) dbUpdates.unit = updates.unit;

        supabaseClient.from('items').update(dbUpdates).eq('id', id).then(({ error }: any) => {
            if (error) {
                console.error('Failed to update item in Supabase:', error);
            }
        });
    }
};

export const deleteItem = (id: string) => {
    items.update(i => i.filter(item => item.id !== id));

    if (supabaseClient) {
        supabaseClient.from('items').delete().eq('id', id).then(({ error }: any) => {
            if (error) {
                console.error('Failed to delete item in Supabase:', error);
            }
        });
    }
};
