// @ts-nocheck
import type { LayoutServerLoad } from './$types'
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public'

export const load = async ({ locals: { safeGetSession }, cookies }: Parameters<LayoutServerLoad>[0]) => {
    const { session, user } = await safeGetSession()

    return {
        session,
        user,
        cookies: cookies.getAll(),
        url: PUBLIC_SUPABASE_URL,
        anonKey: PUBLIC_SUPABASE_ANON_KEY,
    }
}
