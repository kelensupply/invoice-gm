import { createServerClient } from '@supabase/ssr'
import { type Handle } from '@sveltejs/kit'
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public'

export const handle: Handle = async ({ event, resolve }) => {
    event.locals.supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
        cookies: {
            getAll: () => event.cookies.getAll(),
            /**
             * SvelteKit's cookies API requires `path` to be explicitly set in
             * the cookie options. Setting `path` to `/` replicates previous/
             * standard behavior.
             */
            setAll: (cookiesToSet) => {
                cookiesToSet.forEach(({ name, value, options }) => {
                    event.cookies.set(name, value, { ...options, path: '/' })
                })
            },
        },
    })

    /**
     * Unlike `supabase.auth.getSession()`, which returns the session _without_
     * validating the JWT, this function also calls `getUser()` to validate the
     * JWT before returning the session. This is strictly necessary for any
     * server-side authorization flows.
     */
    let sessionCache: { session: any, user: any } | null = null;
    event.locals.safeGetSession = async () => {
        if (sessionCache) return sessionCache;

        const {
            data: { session },
        } = await event.locals.supabase.auth.getSession()
        if (!session) {
            sessionCache = { session: null, user: null };
            return sessionCache;
        }

        const {
            data: { user },
            error,
        } = await event.locals.supabase.auth.getUser()
        if (error) {
            sessionCache = { session: null, user: null };
            return sessionCache;
        }

        sessionCache = { session: { ...session, user }, user };
        return sessionCache;
    }

    const { session, user } = await event.locals.safeGetSession()
    event.locals.session = session
    event.locals.user = user

    // Protect all routes except auth routes
    const isAuthRoute = event.url.pathname.startsWith('/login') ||
        event.url.pathname.startsWith('/signup') ||
        event.url.pathname.startsWith('/auth') ||
        event.url.pathname.startsWith('/forgot-password') ||
        event.url.pathname.startsWith('/reset-password');

    if (!session && !isAuthRoute && event.url.pathname !== '/') {
        // Redirect unauthenticated users to login page
        return new Response(null, {
            status: 303,
            headers: { location: '/login' }
        });
    }

    // If user is already logged in and tries to access login, signup, or root, redirect to dashboard
    if (session && (isAuthRoute || event.url.pathname === '/') && !event.url.pathname.startsWith('/auth/callback')) {
        return new Response(null, {
            status: 303,
            headers: { location: '/dashboard' }
        });
    }

    return resolve(event, {
        filterSerializedResponseHeaders(name) {
            return name === 'content-range' || name === 'x-supabase-api-version'
        },
    })
}
