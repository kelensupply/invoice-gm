import { i as head, b as attr, c as escape_html, e as ensure_array_like, g as derived } from "../../../../chunks/index.js";
import { a as formatDate, f as formatCurrency } from "../../../../chunks/formatters.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    const doc = derived(() => data.document);
    const type = derived(() => data.type);
    const subtotal = derived(() => doc().items.reduce((sum, item) => sum + item.rate * item.quantity, 0));
    const taxAmount = derived(() => subtotal() * ((doc().tax_rate || 0) / 100));
    const total = derived(() => subtotal() + taxAmount() + (doc().shipping || 0) - (doc().discount || 0));
    head("4ooe0q", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>${escape_html(type() === "invoice" ? "Invoice" : "Estimate")}
        ${escape_html(doc().invoice_number || doc().estimate_number)} - ${escape_html(doc().sender.name)}</title>`);
      });
    });
    $$renderer2.push(`<div class="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 print:p-0 print:bg-white"><div class="max-w-4xl mx-auto"><div class="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden svelte-4ooe0q"><div class="flex items-center gap-2 text-slate-500"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg> <span class="text-sm font-medium">Public View Mode</span></div> <button class="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-700 font-bold text-sm shadow-sm hover:bg-slate-50 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg> Print or Save as PDF</button></div> <div class="bg-white shadow-2xl rounded-3xl overflow-hidden border border-slate-200 print:shadow-none print:border-none print:rounded-none"><div class="h-2 bg-emerald-500 print:hidden svelte-4ooe0q"></div> <div class="p-8 sm:p-12"><div class="flex flex-col sm:flex-row justify-between items-start gap-8 mb-12"><div>`);
    if (doc().sender.logo) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<img${attr("src", doc().sender.logo)}${attr("alt", doc().sender.name)} class="h-16 w-auto mb-4 object-contain"/>`);
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<div class="text-2xl font-black text-emerald-600 mb-2">${escape_html(doc().sender.name)}</div>`);
    }
    $$renderer2.push(`<!--]--> <div class="text-slate-500 text-sm max-w-xs whitespace-pre-line">${escape_html(doc().sender.address)}</div></div> <div class="text-right sm:text-right w-full sm:w-auto"><h1 class="text-4xl font-black text-slate-900 uppercase tracking-tight mb-2">${escape_html(type() === "invoice" ? "Invoice" : "Estimate")}</h1> <div class="text-slate-500 font-bold uppercase tracking-widest text-xs">#${escape_html(doc().invoice_number || doc().estimate_number)}</div></div></div> <div class="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12 py-8 border-y border-slate-100"><div><div class="text-[10px] font-black uppercase text-emerald-600 tracking-widest mb-4">Bill To</div> <div class="text-lg font-bold text-slate-900 mb-1">${escape_html(doc().client.company_name)}</div> <div class="text-slate-700 font-medium mb-1">${escape_html(doc().client.contact_name)}</div> <div class="text-slate-500 text-sm whitespace-pre-line leading-relaxed">${escape_html(doc().client.address)}</div></div> <div class="grid grid-cols-2 gap-4"><div><div class="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Date Issued</div> <div class="text-sm font-bold text-slate-900">${escape_html(formatDate(new Date(doc().date_issued)))}</div></div> <div><div class="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">${escape_html(type() === "invoice" ? "Due Date" : "Valid Until")}</div> <div class="text-sm font-bold text-slate-900">${escape_html(formatDate(new Date(doc().date_due || doc().date_valid_until)))}</div></div> `);
    if (doc().po_number || doc().reference_number) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="col-span-2"><div class="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">${escape_html(doc().po_number ? "PO Number" : "Reference")}</div> <div class="text-sm font-bold text-slate-900">${escape_html(doc().po_number || doc().reference_number)}</div></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div></div> <div class="mb-12"><div class="hidden sm:block overflow-x-auto"><table class="w-full text-left border-collapse"><thead><tr class="border-b-2 border-slate-900"><th class="py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Description</th><th class="py-4 px-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right">Qty</th><th class="py-4 px-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right">Price</th><th class="py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right">Total</th></tr></thead><tbody class="divide-y divide-slate-100"><!--[-->`);
    const each_array = ensure_array_like(doc().items);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let item = each_array[$$index];
      $$renderer2.push(`<tr><td class="py-5"><div class="font-bold text-slate-900">${escape_html(item.name)}</div> `);
      if (item.description) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<div class="text-xs text-slate-500 mt-1">${escape_html(item.description)}</div>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--></td><td class="py-5 px-4 text-right text-sm font-medium text-slate-700">${escape_html(item.quantity)}</td><td class="py-5 px-4 text-right text-sm font-medium text-slate-700">${escape_html(formatCurrency(item.rate, doc().currency))}</td><td class="py-5 text-right text-sm font-bold text-slate-900">${escape_html(formatCurrency(item.rate * item.quantity, doc().currency))}</td></tr>`);
    }
    $$renderer2.push(`<!--]--></tbody></table></div> <div class="sm:hidden space-y-4"><div class="text-[10px] font-black uppercase text-slate-400 tracking-widest border-b border-slate-100 pb-2">Items</div> <!--[-->`);
    const each_array_1 = ensure_array_like(doc().items);
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let item = each_array_1[$$index_1];
      $$renderer2.push(`<div class="py-4 border-b border-slate-50 last:border-0 text-left"><div class="font-bold text-slate-900 mb-1">${escape_html(item.name)}</div> `);
      if (item.description) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<div class="text-xs text-slate-500 mb-3">${escape_html(item.description)}</div>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--> <div class="flex justify-between items-end"><div class="text-xs text-slate-500"><span class="font-bold text-slate-700">${escape_html(item.quantity)}</span> × ${escape_html(formatCurrency(item.rate, doc().currency))}</div> <div class="font-bold text-slate-900">${escape_html(formatCurrency(item.rate * item.quantity, doc().currency))}</div></div></div>`);
    }
    $$renderer2.push(`<!--]--></div></div> <div class="flex justify-end mb-12"><div class="w-full sm:w-64 space-y-3"><div class="flex justify-between text-sm text-slate-500 font-medium"><span>Subtotal</span> <span>${escape_html(formatCurrency(subtotal(), doc().currency))}</span></div> `);
    if (doc().tax_rate > 0) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="flex justify-between text-sm text-slate-500 font-medium"><span>Tax (${escape_html(doc().tax_rate)}%)</span> <span>${escape_html(formatCurrency(taxAmount(), doc().currency))}</span></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (doc().shipping > 0) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="flex justify-between text-sm text-slate-500 font-medium"><span>Shipping</span> <span>${escape_html(formatCurrency(doc().shipping, doc().currency))}</span></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (doc().discount > 0) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="flex justify-between text-sm text-red-500 font-medium"><span>Discount</span> <span>-${escape_html(formatCurrency(doc().discount, doc().currency))}</span></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <div class="pt-3 border-t border-slate-200 flex justify-between items-center"><span class="text-lg font-black text-slate-900 uppercase tracking-tight">Total</span> <span class="text-2xl font-black text-emerald-600">${escape_html(formatCurrency(total(), doc().currency))}</span></div></div></div> <div class="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12 border-t border-slate-100">`);
    if (doc().notes) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div><div class="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Notes</div> <p class="text-xs text-slate-600 leading-relaxed whitespace-pre-line">${escape_html(doc().notes)}</p></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (doc().terms) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div><div class="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Terms &amp; Conditions</div> <p class="text-xs text-slate-600 leading-relaxed whitespace-pre-line">${escape_html(doc().terms)}</p></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div></div> <div class="bg-slate-50 p-6 flex items-center justify-center gap-2 print:hidden svelte-4ooe0q"><span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Powered by</span> <div class="flex items-center gap-1"><div class="w-4 h-4 bg-emerald-500 rounded flex items-center justify-center"><div class="w-2 h-2 bg-white rounded-full"></div></div> <span class="text-[10px] font-black text-slate-900 uppercase tracking-tight">Invoicer GM</span></div></div></div></div></div>`);
  });
}
export {
  _page as default
};
