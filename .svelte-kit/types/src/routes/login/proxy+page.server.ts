// @ts-nocheck
import { fail, redirect } from '@sveltejs/kit'
import type { Actions } from './$types'

export const actions = {
    login: async ({ request, locals: { supabase } }: import('./$types').RequestEvent) => {
        const formData = await request.formData()
        const email = formData.get('email') as string
        const password = formData.get('password') as string

        if (!email || !password) {
            return fail(400, { error: 'Email and password are required.' })
        }

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            return fail(500, { error: error.message })
        }

        throw redirect(303, '/dashboard')
    },
    google: async ({ locals: { supabase }, url }: import('./$types').RequestEvent) => {
        // Determine the redirect URL dynamically based on the current origin
        const redirectUrl = `${url.origin}/auth/callback`

        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: redirectUrl
            }
        })

        if (error) {
            return fail(500, { error: error.message })
        }

        if (data.url) {
            throw redirect(303, data.url)
        }

        throw redirect(303, '/dashboard')
    }
}
;null as any as Actions;