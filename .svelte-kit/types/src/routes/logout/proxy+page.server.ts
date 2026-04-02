// @ts-nocheck
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = async () => {
    // If someone visits /logout directly via GET, just redirect them home
    throw redirect(303, '/');
};

export const actions = {
    default: async ({ locals: { supabase, session } }: import('./$types').RequestEvent) => {
        if (session) {
            await supabase.auth.signOut();
        }
        throw redirect(303, '/');
    }
};
;null as any as PageServerLoad;;null as any as Actions;