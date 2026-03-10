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
            },
            defaultTaxRate: data.default_tax_rate ?? s.defaultTaxRate,
            defaultCurrency: data.default_currency ?? s.defaultCurrency,
            defaultNotes: data.default_notes ?? s.defaultNotes,
            defaultTerms: data.default_terms ?? s.defaultTerms
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
        if (supabaseClient && userId) {
            const dbProfile: any = {
                id: userId,
            };

            if (newSettings.company) {
                dbProfile.name = newSettings.company.name;
                dbProfile.email = newSettings.company.email;
                dbProfile.phone = newSettings.company.phone;
                dbProfile.address = newSettings.company.address;
                dbProfile.website = newSettings.company.website;
                dbProfile.tax_id = newSettings.company.taxId;
                dbProfile.domain = newSettings.company.domain;
                dbProfile.logo = newSettings.company.logo;
            }

            if (newSettings.defaultTaxRate !== undefined) dbProfile.default_tax_rate = newSettings.defaultTaxRate;
            if (newSettings.defaultCurrency !== undefined) dbProfile.default_currency = newSettings.defaultCurrency;
            if (newSettings.defaultNotes !== undefined) dbProfile.default_notes = newSettings.defaultNotes;
            if (newSettings.defaultTerms !== undefined) dbProfile.default_terms = newSettings.defaultTerms;


            // Upsert profile
            supabaseClient.from('profiles').upsert(dbProfile).then();
        }

        return newSettings;
    });
};
