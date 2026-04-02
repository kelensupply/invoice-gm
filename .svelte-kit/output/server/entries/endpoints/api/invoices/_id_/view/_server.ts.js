import { error } from "@sveltejs/kit";
const POST = async ({ params, locals: { supabase } }) => {
  const { id } = params;
  if (!id) {
    throw error(400, "Document ID is required");
  }
  const { data: doc } = await supabase.from("invoices").select("id, status").eq("id", id).single();
  if (doc && doc.status === "sent") {
    const { error: updateError } = await supabase.from("invoices").update({
      status: "viewed",
      viewed_at: (/* @__PURE__ */ new Date()).toISOString()
    }).eq("id", id);
    if (updateError) {
      console.error("Failed to update viewed status", updateError);
      throw error(500, "Internal Server Error");
    }
  }
  return new Response(JSON.stringify({ success: true }));
};
export {
  POST
};
