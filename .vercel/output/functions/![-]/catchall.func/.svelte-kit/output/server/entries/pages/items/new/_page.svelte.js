import { i as head, b as attr, e as ensure_array_like, c as escape_html, g as derived, s as store_get, d as unsubscribe_stores } from "../../../../chunks/index.js";
import { g as goto } from "../../../../chunks/client.js";
import { I as ITEM_CATEGORIES } from "../../../../chunks/categories.js";
import { s as settings } from "../../../../chunks/settings.js";
import { g as getCurrencySymbol } from "../../../../chunks/currencies.js";
import { A as AppButton } from "../../../../chunks/AppButton.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let name = "";
    let sku = "";
    let category = "";
    let description = "";
    let rate = 0;
    let unit = "pcs";
    let currencySymbol = derived(() => getCurrencySymbol(store_get($$store_subs ??= {}, "$settings", settings).defaultCurrency));
    head("72gkm", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>New Item - InvoiceMa App</title>`);
      });
    });
    $$renderer2.push(`<div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4 sm:px-6 lg:px-8"><div class="max-w-3xl mx-auto"><div class="flex items-center gap-4 mb-8"><a href="/items" class="p-2 hover:bg-white rounded-lg transition-colors" aria-label="Back to Items"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5 text-slate-500 hover:text-slate-800"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"></path></svg></a> <div><h1 class="text-3xl font-bold text-slate-900">New Item</h1> <p class="text-slate-500 text-sm mt-0.5">Add a new item to your library</p></div></div> <form class="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden"><div class="p-6 sm:p-8 border-b border-slate-100"><h2 class="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2"><span class="w-1 h-1 bg-emerald-500 rounded-full"></span> Basic Information</h2> <div class="space-y-4"><div><label for="name" class="block text-sm font-medium text-slate-700 mb-2">Item Name <span class="text-red-500">*</span></label> <input id="name" type="text"${attr("value", name)} required="" placeholder="e.g., Graphic Design Service" class="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-colors"/></div> <div class="grid grid-cols-1 md:grid-cols-3 gap-4"><div><label for="sku" class="block text-sm font-medium text-slate-700 mb-2">SKU / Item Code <span class="text-slate-400 text-xs font-normal">(Optional)</span></label> <div class="relative"><input id="sku" type="text"${attr("value", sku)} placeholder="e.g., GD-001" class="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-colors pr-10"/> <button type="button" class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-600 transition-colors p-1" title="Scan barcode"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M3 4.5h3m3 0h3m3 0h3M3 9h3m3 0h3m3 0h3M3 13.5h3m3 0h3m3 0h3M3 18h3m3 0h3m3 0h3M9 4.5v13.5M15 4.5v13.5"></path></svg></button></div> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div> <div><label for="category" class="block text-sm font-medium text-slate-700 mb-2">Category <span class="text-red-500">*</span></label> `);
    $$renderer2.select(
      {
        id: "category",
        value: category,
        required: true,
        class: "w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-colors bg-white cursor-pointer"
      },
      ($$renderer3) => {
        $$renderer3.option({ value: "", class: "bg-slate-100 text-slate-500" }, ($$renderer4) => {
          $$renderer4.push(`Select a category...`);
        });
        $$renderer3.push(`<!--[-->`);
        const each_array = ensure_array_like(ITEM_CATEGORIES);
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let cat = each_array[$$index];
          $$renderer3.option({ value: cat.value, class: "bg-white text-slate-900" }, ($$renderer4) => {
            $$renderer4.push(`${escape_html(cat.label)}`);
          });
        }
        $$renderer3.push(`<!--]-->`);
      }
    );
    $$renderer2.push(`</div> <div><label for="unit" class="block text-sm font-medium text-slate-700 mb-2">Unit <span class="text-slate-400 text-xs font-normal">(Optional)</span></label> `);
    $$renderer2.select(
      {
        id: "unit",
        value: unit,
        class: "w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-colors bg-white cursor-pointer"
      },
      ($$renderer3) => {
        $$renderer3.option({ value: "", class: "bg-slate-100 text-slate-900" }, ($$renderer4) => {
          $$renderer4.push(`Select unit...`);
        });
        $$renderer3.option({ value: "pcs", class: "bg-white text-slate-600" }, ($$renderer4) => {
          $$renderer4.push(`pcs (Pieces)`);
        });
        $$renderer3.option({ value: "hrs", class: "bg-white text-slate-600" }, ($$renderer4) => {
          $$renderer4.push(`hrs (Hours)`);
        });
        $$renderer3.option({ value: "days", class: "bg-white text-slate-600" }, ($$renderer4) => {
          $$renderer4.push(`days (Days)`);
        });
        $$renderer3.option({ value: "kg", class: "bg-white text-slate-600" }, ($$renderer4) => {
          $$renderer4.push(`kg (Kilograms)`);
        });
        $$renderer3.option({ value: "unit", class: "bg-white text-slate-600" }, ($$renderer4) => {
          $$renderer4.push(`unit`);
        });
        $$renderer3.option({ value: "m", class: "bg-white text-slate-600" }, ($$renderer4) => {
          $$renderer4.push(`m (Meters)`);
        });
        $$renderer3.option({ value: "job", class: "bg-white text-slate-600" }, ($$renderer4) => {
          $$renderer4.push(`job`);
        });
      }
    );
    $$renderer2.push(`</div></div></div></div> <div class="p-6 sm:p-8 border-b border-slate-100"><h2 class="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2"><span class="w-1 h-1 bg-emerald-500 rounded-full"></span> Description &amp; Pricing</h2> <div class="space-y-4"><div><label for="description" class="block text-sm font-medium text-slate-700 mb-2">Description <span class="text-slate-400 text-xs font-normal">(Optional)</span></label> <textarea id="description" rows="3" placeholder="Briefly describe the product or service" class="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-colors resize-none">`);
    const $$body = escape_html(description);
    if ($$body) {
      $$renderer2.push(`${$$body}`);
    }
    $$renderer2.push(`</textarea></div> <div><label for="rate" class="block text-sm font-medium text-slate-700 mb-2">Unit Price <span class="text-red-500">*</span></label> <div class="relative"><span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">${escape_html(currencySymbol())}</span> <input id="rate" type="number" step="0.01" min="0" required=""${attr("value", rate)} placeholder="0.00" class="w-full pl-8 pr-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-colors"/></div></div></div></div> <div class="px-6 sm:px-8 py-6 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">`);
    AppButton($$renderer2, {
      type: "button",
      variant: "secondary",
      onclick: () => goto(),
      children: ($$renderer3) => {
        $$renderer3.push(`<!---->Cancel`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> `);
    AppButton($$renderer2, {
      type: "submit",
      variant: "primary",
      children: ($$renderer3) => {
        $$renderer3.push(`<!---->Add Item`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----></div></form></div></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _page as default
};
