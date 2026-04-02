import { createServerClient } from "@supabase/ssr";
import "@sveltejs/kit";
import { a as PUBLIC_SUPABASE_URL, P as PUBLIC_SUPABASE_ANON_KEY } from "../chunks/public.js";
const handle = async ({ event, resolve }) => {
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
          event.cookies.set(name, value, { ...options, path: "/" });
        });
      }
    }
  });
  let sessionCache = null;
  event.locals.safeGetSession = async () => {
    if (sessionCache) return sessionCache;
    const {
      data: { session: session2 }
    } = await event.locals.supabase.auth.getSession();
    if (!session2) {
      sessionCache = { session: null, user: null };
      return sessionCache;
    }
    const {
      data: { user: user2 },
      error
    } = await event.locals.supabase.auth.getUser();
    if (error) {
      sessionCache = { session: null, user: null };
      return sessionCache;
    }
    sessionCache = { session: { ...session2, user: user2 }, user: user2 };
    return sessionCache;
  };
  const { session, user } = await event.locals.safeGetSession();
  event.locals.session = session;
  event.locals.user = user;
  const isAuthRoute = event.url.pathname.startsWith("/login") || event.url.pathname.startsWith("/signup") || event.url.pathname.startsWith("/auth") || event.url.pathname.startsWith("/forgot-password") || event.url.pathname.startsWith("/reset-password");
  if (!session && !isAuthRoute && event.url.pathname !== "/") {
    return new Response(null, {
      status: 303,
      headers: { location: "/login" }
    });
  }
  if (session && (isAuthRoute || event.url.pathname === "/") && !event.url.pathname.startsWith("/auth/callback")) {
    return new Response(null, {
      status: 303,
      headers: { location: "/dashboard" }
    });
  }
  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      return name === "content-range" || name === "x-supabase-api-version";
    }
  });
};
export {
  handle
};
