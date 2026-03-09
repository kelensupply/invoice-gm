import { writable } from 'svelte/store';
import type { CompanyInfo } from '../models/company';

export interface AppSettings {
    company: CompanyInfo;
    defaultTaxRate: number;
    defaultCurrency: string;
    defaultNotes: string;
    defaultTerms: string;
}

const defaultSettings: AppSettings = {
    company: {
        name: 'My Company',
        email: 'hello@mycompany.com',
        phone: '',
        address: '',
        website: '',
        taxId: '',
        domain: ''
    },
    defaultTaxRate: 0,
    defaultCurrency: 'USD',
    defaultNotes: 'Thank you for your business.',
    defaultTerms: 'Payment due upon receipt.'
};

export const settings = writable<AppSettings>(defaultSettings);

let supabaseClient: any;
let userId: string;

export const initSettings = async (supabase: any, uid: string) => {
    supabaseClient = supabase;
    userId = uid;

    const { data, error } = await supabaseClient
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

    if (!error && data) {
        settings.update(s => ({
            ...s,
            company: {
                name: data.name || '',
                email: data.email || '',
                phone: data.phone || '',
                address: data.address || '',
                website: data.website || '',
                taxId: data.tax_id || '',
                domain: data.domain || '',
                logo: data.logo || undefined
            }
        }));
    } else if (error && error.code === 'PGRST116') {
        // Not found is handled by maybeSingle returning null, but just in case
        console.log("No profile found.");
    }
};

export const updateSettings = (updates: Partial<AppSettings>) => {
    settings.update(s => {
        const newSettings = { ...s, ...updates };

        // Update DB if company info changed
        if (updates.company && supabaseClient && userId) {
            const dbProfile = {
                id: userId,
                name: updates.company.name,
                email: updates.company.email,
                phone: updates.company.phone,
                address: updates.company.address,
                website: updates.company.website,
                tax_id: updates.company.taxId,
                domain: updates.company.domain,
                logo: updates.company.logo
            };

            // Upsert profile
            supabaseClient.from('profiles').upsert(dbProfile).then();
        }

        return newSettings;
    });
};
