import { redirect } from "@sveltejs/kit";
const load = async () => {
  throw redirect(303, "/");
};
const actions = {
  default: async ({ locals: { supabase, session } }) => {
    if (session) {
      await supabase.auth.signOut();
    }
    throw redirect(303, "/");
  }
};
export {
  actions,
  load
};
