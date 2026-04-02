import { i as head, c as escape_html } from "../../../../chunks/index.js";
import "@sveltejs/kit/internal";
import "../../../../chunks/exports.js";
import "../../../../chunks/utils2.js";
import "@sveltejs/kit/internal/server";
import "../../../../chunks/root.js";
import "../../../../chunks/state.svelte.js";
import { C as ConfirmDialog } from "../../../../chunks/ConfirmDialog.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let name = "";
    let showDeleteDialog = false;
    function handleDelete() {
    }
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      head("1r2vy7b", $$renderer3, ($$renderer4) => {
        $$renderer4.title(($$renderer5) => {
          $$renderer5.push(`<title>${escape_html("Item")} - Invoicer App</title>`);
        });
      });
      $$renderer3.push(`<div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4 sm:px-6 lg:px-8">`);
      {
        $$renderer3.push("<!--[-1-->");
        $$renderer3.push(`<div class="max-w-3xl mx-auto text-center"><a href="/items" class="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"></path></svg> Back to Items</a> <p class="text-slate-500 mt-4">Item not found</p></div>`);
      }
      $$renderer3.push(`<!--]--></div> `);
      ConfirmDialog($$renderer3, {
        title: "Delete Item",
        description: `Are you sure you want to delete ${name}? This action cannot be undone.`,
        confirmText: "Delete",
        destructive: true,
        onconfirm: handleDelete,
        get open() {
          return showDeleteDialog;
        },
        set open($$value) {
          showDeleteDialog = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!---->`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
  });
}
export {
  _page as default
};
