// @ts-nocheck
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
    default: async ({ request, locals: { supabase }, url }: import('./$types').RequestEvent) => {
        const formData = await request.formData();
        const email = formData.get('email') as string;

        if (!email) {
            return fail(400, { error: 'Email is required.' });
        }

        const redirectTo = `${url.origin}/auth/callback?next=/reset-password`;

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo,
        });

        if (error) {
            return fail(500, { error: error.message });
        }

        return { success: true };
    },
};
;null as any as Actions;