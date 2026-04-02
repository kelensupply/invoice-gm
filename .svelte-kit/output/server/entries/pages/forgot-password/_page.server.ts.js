import { fail } from "@sveltejs/kit";
const actions = {
  default: async ({ request, locals: { supabase }, url }) => {
    const formData = await request.formData();
    const email = formData.get("email");
    if (!email) {
      return fail(400, { error: "Email is required." });
    }
    const redirectTo = `${url.origin}/auth/callback?next=/reset-password`;
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo
    });
    if (error) {
      return fail(500, { error: error.message });
    }
    return { success: true };
  }
};
export {
  actions
};
