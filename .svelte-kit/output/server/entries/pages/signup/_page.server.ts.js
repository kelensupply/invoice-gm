import { fail, redirect } from "@sveltejs/kit";
const actions = {
  default: async ({ request, locals: { supabase } }) => {
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");
    if (!email || !password) {
      return fail(400, { error: "Email and password are required." });
    }
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: "http://localhost:5173/auth/callback"
      }
    });
    if (error) {
      return fail(500, { error: error.message });
    }
    if (data.user && data.user.identities && data.user.identities.length === 0) {
      return fail(400, { error: "An account with this email already exists. Please log in." });
    }
    if (data.session) {
      throw redirect(303, "/dashboard");
    }
    return { success: true };
  }
};
export {
  actions
};
