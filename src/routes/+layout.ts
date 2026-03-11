import { createBrowserClient, createServerClient, isBrowser } from '@supabase/ssr'
import type { LayoutLoad } from './$types'

export const load: LayoutLoad = async ({ data, depends, fetch }) => {
    depends('supabase:auth')

    const supabase = isBrowser()
        ? createBrowserClient(data.url, data.anonKey, {
            global: { fetch },
        })
        : createServerClient(data.url, data.anonKey, {
            global: { fetch },
            cookies: {
                getAll() {
                    return data.cookies
                },
            },
        })

    return { ...data, supabase }
}
