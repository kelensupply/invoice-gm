import { i as head, b as attr, c as escape_html, a as attr_class, g as derived, f as stringify } from "../../../../chunks/index.js";
import { g as goto } from "../../../../chunks/client.js";
import { A as AppButton } from "../../../../chunks/AppButton.js";
import { C as COUNTRY_CODES } from "../../../../chunks/countries.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let companyName = "";
    let contactName = "";
    let email = "";
    let countryCode = "+1";
    let phone = "";
    let website = "";
    let taxId = "";
    let address = "";
    let notes = "";
    let selectedCountry = derived(() => COUNTRY_CODES.find((c) => c.code === countryCode));
    head("daoxhy", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>New Client - Invoicer App</title>`);
      });
    });
    $$renderer2.push(`<div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4 sm:px-6 lg:px-8"><div class="max-w-3xl mx-auto"><div class="flex items-center gap-4 mb-8"><a href="/clients" class="p-2 hover:bg-white rounded-lg transition-colors" aria-label="Back to Clients"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5 text-slate-500 hover:text-slate-800"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"></path></svg></a> <div><h1 class="text-3xl font-bold text-slate-900">New Client</h1> <p class="text-slate-500 text-sm mt-0.5">Add a new client to your system</p></div></div> <form class="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden"><div class="p-6 sm:p-8 border-b border-slate-100"><h2 class="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2"><span class="w-1 h-1 bg-emerald-500 rounded-full"></span> Company Information</h2> <div class="space-y-4"><div><label for="companyName" class="block text-sm font-medium text-slate-700 mb-2">Company Name <span class="text-red-500">*</span></label> <input id="companyName" type="text"${attr("value", companyName)} required="" placeholder="e.g., Acme Corporation" class="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-colors"/></div> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label for="contactName" class="block text-sm font-medium text-slate-700 mb-2">Contact Name</label> <input id="contactName" type="text"${attr("value", contactName)} placeholder="e.g., John Doe" class="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-colors"/></div> <div><label for="taxId" class="block text-sm font-medium text-slate-700 mb-2">Tax ID / Business No.</label> <input id="taxId" type="text"${attr("value", taxId)} placeholder="Optional" class="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-colors"/></div></div></div></div> <div class="p-6 sm:p-8 border-b border-slate-100"><h2 class="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2"><span class="w-1 h-1 bg-emerald-500 rounded-full"></span> Contact Information</h2> <div class="space-y-4"><div><label for="email" class="block text-sm font-medium text-slate-700 mb-2">Email Address</label> <input id="email" type="email"${attr("value", email)} placeholder="e.g., john@company.com" class="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-colors"/></div> <div><label for="phone" class="block text-sm font-medium text-slate-700 mb-2">Phone Number</label> <div class="flex gap-3"><div class="relative w-[160px]"><button type="button" class="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-colors bg-white text-left flex items-center justify-between hover:border-slate-400"><span class="text-sm font-medium">`);
    if (selectedCountry()) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`${escape_html(selectedCountry().flag)}
                                            ${escape_html(selectedCountry().code)}`);
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`+1`);
    }
    $$renderer2.push(`<!--]--></span> <svg${attr_class(`w-4 h-4 text-slate-500 transition-transform ${stringify("")}`)} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg></button> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div> <input id="phone" type="tel"${attr("value", phone)} placeholder="555-0199 or 5550199" class="flex-1 px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-colors"/></div></div> <div><label for="website" class="block text-sm font-medium text-slate-700 mb-2">Website</label> <input id="website" type="url"${attr("value", website)} placeholder="https://example.com" class="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-colors"/></div></div></div> <div class="p-6 sm:p-8 border-b border-slate-100"><h2 class="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2"><span class="w-1 h-1 bg-emerald-500 rounded-full"></span> Address</h2> <div><label for="address" class="block text-sm font-medium text-slate-700 mb-2">Street Address</label> <textarea id="address" rows="3" placeholder="123 Street Name, City, State, ZIP, Country" class="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-colors resize-none">`);
    const $$body = escape_html(address);
    if ($$body) {
      $$renderer2.push(`${$$body}`);
    }
    $$renderer2.push(`</textarea></div></div> <div class="p-6 sm:p-8 border-b border-slate-100"><h2 class="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2"><span class="w-1 h-1 bg-emerald-500 rounded-full"></span> Additional Notes</h2> <div><label for="notes" class="block text-sm font-medium text-slate-700 mb-2">Internal Notes</label> <textarea id="notes" rows="3" placeholder="Key accounts, special requirements, payment terms, etc." class="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-colors resize-none">`);
    const $$body_1 = escape_html(notes);
    if ($$body_1) {
      $$renderer2.push(`${$$body_1}`);
    }
    $$renderer2.push(`</textarea></div></div> <div class="px-6 sm:px-8 py-6 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">`);
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
        $$renderer3.push(`<!---->Create Client`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----></div></form></div></div>`);
  });
}
export {
  _page as default
};
