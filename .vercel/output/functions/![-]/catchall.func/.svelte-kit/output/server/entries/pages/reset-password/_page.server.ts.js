import { fail } from "@sveltejs/kit";
const actions = {
  default: async ({ request, locals: { supabase } }) => {
    const formData = await request.formData();
    const password = formData.get("password");
    const confirm = formData.get("confirm");
    if (!password || !confirm) {
      return fail(400, { error: "Both fields are required." });
    }
    if (password !== confirm) {
      return fail(400, { error: "Passwords do not match." });
    }
    if (password.length < 8) {
      return fail(400, { error: "Password must be at least 8 characters." });
    }
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      return fail(500, { error: error.message });
    }
    await supabase.auth.signOut();
    return { success: true };
  }
};
export {
  actions
};
