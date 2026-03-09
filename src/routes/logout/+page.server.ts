import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    // If someone visits /logout directly via GET, just redirect them home
    throw redirect(303, '/');
};

export const actions: Actions = {
    default: async ({ locals: { supabase, session } }) => {
        if (session) {
            await supabase.auth.signOut();
        }
        throw redirect(303, '/');
    }
};
