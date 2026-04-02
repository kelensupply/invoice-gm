// @ts-nocheck
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
    default: async ({ request, locals: { supabase } }: import('./$types').RequestEvent) => {
        const formData = await request.formData();
        const password = formData.get('password') as string;
        const confirm = formData.get('confirm') as string;

        if (!password || !confirm) {
            return fail(400, { error: 'Both fields are required.' });
        }

        if (password !== confirm) {
            return fail(400, { error: 'Passwords do not match.' });
        }

        if (password.length < 8) {
            return fail(400, { error: 'Password must be at least 8 characters.' });
        }

        const { error } = await supabase.auth.updateUser({ password });

        if (error) {
            return fail(500, { error: error.message });
        }

        // Sign out after password reset so user logs in fresh
        await supabase.auth.signOut();

        return { success: true };
    },
};
;null as any as Actions;