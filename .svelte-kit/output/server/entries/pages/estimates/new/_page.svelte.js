import { i as head } from "../../../../chunks/index.js";
import { g as goto } from "../../../../chunks/client.js";
import { a as addEstimate } from "../../../../chunks/estimates.js";
import { I as InvoiceForm } from "../../../../chunks/InvoiceForm.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    function handleSave(estimateData) {
      addEstimate(estimateData);
      goto();
    }
    head("1scarhd", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>New Estimate - Invoicer App</title>`);
      });
    });
    $$renderer2.push(`<div class="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-4 flex items-center justify-between shadow-sm"><div class="flex items-center gap-4"><a href="/estimates" class="group text-slate-500 hover:text-slate-800 flex items-center gap-2 font-medium text-sm transition-all"><div class="p-1 rounded-full group-hover:bg-slate-100 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"></path></svg></div> Back to Estimates</a> <div class="h-6 w-px bg-slate-300 mx-2"></div> <h1 class="text-xl font-bold text-slate-800 tracking-tight flex items-center gap-2">New Estimate</h1></div></div> <div class="px-8 py-10 max-w-5xl mx-auto">`);
    InvoiceForm($$renderer2, { type: "estimate", onsave: handleSave });
    $$renderer2.push(`<!----></div>`);
  });
}
export {
  _page as default
};
