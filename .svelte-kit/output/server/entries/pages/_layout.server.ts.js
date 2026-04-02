import { P as PUBLIC_SUPABASE_ANON_KEY, a as PUBLIC_SUPABASE_URL } from "../../chunks/public.js";
const load = async ({ locals: { safeGetSession }, cookies }) => {
  const { session, user } = await safeGetSession();
  return {
    session,
    user,
    cookies: cookies.getAll(),
    url: PUBLIC_SUPABASE_URL,
    anonKey: PUBLIC_SUPABASE_ANON_KEY
  };
};
export {
  load
};
