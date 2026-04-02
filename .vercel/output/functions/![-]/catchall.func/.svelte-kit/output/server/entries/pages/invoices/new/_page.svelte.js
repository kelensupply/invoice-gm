import { i as head, c as escape_html } from "../../../../chunks/index.js";
import { g as goto } from "../../../../chunks/client.js";
import { a as addInvoice } from "../../../../chunks/invoices.js";
import { I as InvoiceForm } from "../../../../chunks/InvoiceForm.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    function handleSave(invoiceData) {
      addInvoice(invoiceData);
      goto();
    }
    function failed($$renderer3, error, reset) {
      $$renderer3.push(`<div class="p-4 bg-red-100 border border-red-300 rounded text-red-800"><h3 class="font-bold">Error rendering New Sale Form</h3> <p>${escape_html(error.message || String(error))}</p> <button class="mt-2 text-red-600 underline">Try again</button></div>`);
    }
    head("1p45ll6", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>New Invoice - Invoicer App</title>`);
      });
    });
    $$renderer2.push(`<div class="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-4 flex items-center justify-between shadow-sm"><div class="flex items-center gap-4"><a href="/invoices" class="group text-slate-500 hover:text-slate-800 flex items-center gap-2 font-medium text-sm transition-all"><div class="p-1 rounded-full group-hover:bg-slate-100 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"></path></svg></div> Back to Invoices</a> <div class="h-6 w-px bg-slate-300 mx-2"></div> <h1 class="text-xl font-bold text-slate-800 tracking-tight flex items-center gap-2">New Invoice</h1></div></div> <div class="px-8 py-10 max-w-5xl mx-auto">`);
    $$renderer2.boundary({ failed }, ($$renderer3) => {
      $$renderer3.push(`<!--[-->`);
      {
        InvoiceForm($$renderer3, { type: "invoice", onsave: handleSave });
      }
      $$renderer3.push(`<!--]-->`);
    });
    $$renderer2.push(`</div>`);
  });
}
export {
  _page as default
};
