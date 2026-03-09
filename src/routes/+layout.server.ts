import type { LayoutServerLoad } from './$types'
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public'

export const load: LayoutServerLoad = async ({ locals: { safeGetSession }, cookies }) => {
    const { session, user } = await safeGetSession()

    return {
        session,
        user,
        cookies: cookies.getAll(),
        url: PUBLIC_SUPABASE_URL,
        anonKey: PUBLIC_SUPABASE_ANON_KEY,
    }
}
