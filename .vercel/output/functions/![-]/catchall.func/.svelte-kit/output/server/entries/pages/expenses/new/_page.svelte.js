import { s as store_get, d as unsubscribe_stores, i as head, b as attr, e as ensure_array_like, c as escape_html, g as derived } from "../../../../chunks/index.js";
import { g as goto } from "../../../../chunks/client.js";
import { E as EXPENSE_CATEGORIES } from "../../../../chunks/categories.js";
import { s as settings } from "../../../../chunks/settings.js";
import { C as CURRENCIES, g as getCurrencySymbol } from "../../../../chunks/currencies.js";
import { A as AppButton } from "../../../../chunks/AppButton.js";
import { F as FileUpload } from "../../../../chunks/FileUpload.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let date = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    let category = "";
    let amount = 0;
    let currency = store_get($$store_subs ??= {}, "$settings", settings).defaultCurrency;
    let payee = "";
    let description = "";
    let attachmentUrl = "";
    let currencySymbol = derived(() => getCurrencySymbol(currency));
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      head("14g2wgd", $$renderer3, ($$renderer4) => {
        $$renderer4.title(($$renderer5) => {
          $$renderer5.push(`<title>New Expense - Invoicer App</title>`);
        });
      });
      $$renderer3.push(`<div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4 sm:px-6 lg:px-8"><div class="max-w-3xl mx-auto"><div class="flex items-center gap-4 mb-8"><a href="/expenses" class="p-2 hover:bg-white rounded-lg transition-colors" aria-label="Back to Expenses"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5 text-slate-500 hover:text-slate-800"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"></path></svg></a> <div><h1 class="text-3xl font-bold text-slate-900">Record Expense</h1> <p class="text-slate-500 text-sm mt-0.5">Track your business spending</p></div></div> <form class="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden"><div class="p-6 sm:p-8 border-b border-slate-100"><h2 class="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2"><span class="w-1 h-1 bg-emerald-500 rounded-full"></span> Expense Details</h2> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div><label for="date" class="block text-sm font-medium text-slate-700 mb-2">Date <span class="text-red-500">*</span></label> <input id="date" type="date"${attr("value", date)} required="" class="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-colors"/></div> <div><label for="category" class="block text-sm font-medium text-slate-700 mb-2">Category <span class="text-red-500">*</span></label> `);
      $$renderer3.select(
        {
          id: "category",
          value: category,
          required: true,
          class: "w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-colors bg-white"
        },
        ($$renderer4) => {
          $$renderer4.option({ value: "" }, ($$renderer5) => {
            $$renderer5.push(`Select a category...`);
          });
          $$renderer4.push(`<!--[-->`);
          const each_array = ensure_array_like(EXPENSE_CATEGORIES);
          for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
            let cat = each_array[$$index];
            $$renderer4.option({ value: cat.value }, ($$renderer5) => {
              $$renderer5.push(`${escape_html(cat.label)}`);
            });
          }
          $$renderer4.push(`<!--]-->`);
        }
      );
      $$renderer3.push(`</div> <div><label for="amount" class="block text-sm font-medium text-slate-700 mb-2">Amount <span class="text-red-500">*</span></label> <div class="relative"><span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">${escape_html(currencySymbol())}</span> <input id="amount" type="number" step="0.01" min="0" required=""${attr("value", amount)} placeholder="0.00" class="w-full pl-8 pr-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-colors"/></div></div> <div><label for="currency" class="block text-sm font-medium text-slate-700 mb-2">Currency</label> `);
      $$renderer3.select(
        {
          id: "currency",
          value: currency,
          class: "w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-colors bg-white"
        },
        ($$renderer4) => {
          $$renderer4.push(`<!--[-->`);
          const each_array_1 = ensure_array_like(CURRENCIES);
          for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
            let c = each_array_1[$$index_1];
            $$renderer4.option({ value: c.code }, ($$renderer5) => {
              $$renderer5.push(`${escape_html(c.code)} - ${escape_html(c.name)}`);
            });
          }
          $$renderer4.push(`<!--]-->`);
        }
      );
      $$renderer3.push(`</div></div></div> <div class="p-6 sm:p-8 border-b border-slate-100"><h2 class="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2"><span class="w-1 h-1 bg-emerald-500 rounded-full"></span> Additional Info</h2> <div class="space-y-4"><div><label for="payee" class="block text-sm font-medium text-slate-700 mb-2">Payee / Vendor</label> <input id="payee" type="text"${attr("value", payee)} placeholder="e.g., Apple, Amazon, Local Cafe" class="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-colors"/></div> <div><label for="description" class="block text-sm font-medium text-slate-700 mb-2">Description</label> <textarea id="description" rows="3" placeholder="What was this expense for?" class="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-colors resize-none">`);
      const $$body = escape_html(description);
      if ($$body) {
        $$renderer3.push(`${$$body}`);
      }
      $$renderer3.push(`</textarea></div></div></div> <div class="p-6 sm:p-8"><h2 class="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2"><span class="w-1 h-1 bg-emerald-500 rounded-full"></span> Receipt / Attachment</h2> `);
      FileUpload($$renderer3, {
        onupload: (url) => attachmentUrl = url,
        onremove: () => attachmentUrl = "",
        label: "Upload Receipt",
        sublabel: "PDF, PNG, or JPG",
        get value() {
          return attachmentUrl;
        },
        set value($$value) {
          attachmentUrl = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----></div> <div class="px-6 sm:px-8 py-6 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">`);
      AppButton($$renderer3, {
        type: "button",
        variant: "secondary",
        onclick: () => goto(),
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->Cancel`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      AppButton($$renderer3, {
        type: "submit",
        variant: "primary",
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->Save Expense`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----></div></form></div></div>`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _page as default
};
