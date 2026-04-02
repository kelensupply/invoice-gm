import { redirect } from "@sveltejs/kit";
const GET = async ({ url, locals: { supabase } }) => {
  const code = url.searchParams.get("code");
  const next = url.searchParams.get("next") ?? "";
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      if (next === "/reset-password") {
        throw redirect(303, "/reset-password");
      }
      throw redirect(303, "/dashboard");
    } else {
      throw redirect(303, `/login?error=${encodeURIComponent(error.message)}`);
    }
  }
  throw redirect(303, "/login?error=auth_callback_missing_code");
};
export {
  GET
};
