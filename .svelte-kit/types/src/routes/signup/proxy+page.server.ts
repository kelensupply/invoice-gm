// @ts-nocheck
import { fail, redirect } from '@sveltejs/kit'
import type { Actions } from './$types'

export const actions = {
    default: async ({ request, locals: { supabase } }: import('./$types').RequestEvent) => {
        const formData = await request.formData()
        const email = formData.get('email') as string
        const password = formData.get('password') as string

        if (!email || !password) {
            return fail(400, { error: 'Email and password are required.' })
        }

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: 'http://localhost:5173/auth/callback'
            }
        })

        if (error) {
            return fail(500, { error: error.message })
        }

        // Check if the user already exists. If email enumeration protection is ON,
        // Supabase returns a user with an empty identities array.
        if (data.user && data.user.identities && data.user.identities.length === 0) {
            return fail(400, { error: 'An account with this email already exists. Please log in.' })
        }

        if (data.session) {
            throw redirect(303, '/dashboard')
        }

        // Success response
        return { success: true }
    },
}
;null as any as Actions;