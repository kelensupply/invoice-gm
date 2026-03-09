import { createBrowserClient, isBrowser, parse } from '@supabase/ssr'
import type { LayoutLoad } from './$types'

export const load: LayoutLoad = async ({ data, depends, fetch }) => {
    depends('supabase:auth')

    const supabase = isBrowser()
        ? createBrowserClient(data.url, data.anonKey, {
            global: {
                fetch,
            },
        })
        : createServerClient(data.url, data.anonKey, {
            global: {
                fetch,
            },
            cookies: {
                getAll() {
                    return data.cookies
                },
            },
        })

    return { ...data, supabase }
}

function createServerClient(url: string, key: string, options: any) {
    return {
        auth: {
            getSession: async () => ({ data: { session: null } }),
            getUser: async () => ({ data: { user: null } }),
            onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => { } } } })
        }
    } as any
}
