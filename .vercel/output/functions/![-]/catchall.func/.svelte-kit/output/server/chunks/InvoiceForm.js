import { c as escape_html, b as attr, j as bind_props, g as derived, f as stringify, s as store_get, a as attr_class, e as ensure_array_like, d as unsubscribe_stores } from "./index.js";
import { v4 } from "uuid";
import { A as AppButton } from "./AppButton.js";
import { C as CURRENCIES } from "./currencies.js";
import { s as settings } from "./settings.js";
import { c as clients } from "./clients.js";
import { i as items, a as addItem } from "./items.js";
import { i as invoices } from "./invoices.js";
import { e as estimates } from "./estimates.js";
import { w as writable } from "./index2.js";
import { f as formatCurrency } from "./formatters.js";
import { F as FileUpload } from "./FileUpload.js";
const taxRates = writable([]);
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
var FEATURE_FLAG_NAMES = Object.freeze({
  // This flag exists as a workaround for issue 454 (basically a browser bug) - seems like these rect values take time to update when in grid layout. Setting it to true can cause strange behaviour in the REPL for non-grid zones, see issue 470
  USE_COMPUTED_STYLE_INSTEAD_OF_BOUNDING_RECT: "USE_COMPUTED_STYLE_INSTEAD_OF_BOUNDING_RECT"
});
_defineProperty({}, FEATURE_FLAG_NAMES.USE_COMPUTED_STYLE_INSTEAD_OF_BOUNDING_RECT, false);
var _ID_TO_INSTRUCTION;
var INSTRUCTION_IDs$1 = {
  DND_ZONE_ACTIVE: "dnd-zone-active",
  DND_ZONE_DRAG_DISABLED: "dnd-zone-drag-disabled"
};
_ID_TO_INSTRUCTION = {}, _defineProperty(_ID_TO_INSTRUCTION, INSTRUCTION_IDs$1.DND_ZONE_ACTIVE, "Tab to one the items and press space-bar or enter to start dragging it"), _defineProperty(_ID_TO_INSTRUCTION, INSTRUCTION_IDs$1.DND_ZONE_DRAG_DISABLED, "This is a disabled drag and drop list"), _ID_TO_INSTRUCTION;
function SendModal($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      open = false,
      title = "",
      type = "invoice",
      initialClientName = "",
      initialClientEmail = "",
      onsend,
      onclose
    } = $$props;
    let modalTitle = derived(() => title || `Send ${type.charAt(0).toUpperCase() + type.slice(1)}`);
    let fromName = "User Account";
    let fromEmail = "msgambia82@gmail.com";
    let clientName = "";
    let clientEmail = "";
    function handleSend() {
      if (onsend) {
        onsend({
          fromName,
          fromEmail,
          clientName,
          clientEmail,
          method: "email"
        });
      }
      open = false;
    }
    if (open) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm" role="presentation"><div class="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"><div class="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-emerald-50 to-white"><div><h3 class="text-lg font-bold text-slate-900">${escape_html(modalTitle())}</h3> <p class="text-sm text-slate-500 mt-0.5">Choose how to send this ${escape_html(type === "invoice" ? "invoice" : "estimate")}</p></div> <button class="text-slate-400 hover:text-slate-600 p-2 rounded-lg hover:bg-slate-100 transition-colors" aria-label="Close"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg></button></div> <div class="p-6 space-y-6"><div><h4 class="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2"><span class="w-2 h-2 bg-emerald-500 rounded-full"></span> From</h4> <div class="grid grid-cols-2 gap-3"><div><label for="fromName" class="block text-xs font-medium text-slate-600 mb-1.5">Your Name</label> <input id="fromName" type="text"${attr("value", fromName)} class="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-colors"/></div> <div><label for="fromEmail" class="block text-xs font-medium text-slate-600 mb-1.5">Your Email</label> <input id="fromEmail" type="email"${attr("value", fromEmail)} class="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-colors bg-slate-50 cursor-not-allowed" disabled=""/></div></div></div> <div class="h-px bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100"></div> <div><h4 class="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2"><span class="w-2 h-2 bg-emerald-500 rounded-full"></span> Recipient</h4> <div class="space-y-3"><div><label for="clientName" class="block text-xs font-medium text-slate-600 mb-1.5">Client Name</label> <input id="clientName" type="text"${attr("value", clientName)} class="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-colors"/></div> <div><label for="clientEmail" class="block text-xs font-medium text-slate-600 mb-1.5">Client Email</label> <input id="clientEmail" type="email"${attr("value", clientEmail)} class="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-colors"/></div></div></div></div> <div class="px-6 py-5 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row gap-3 sm:gap-2"><button class="px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">Cancel</button> <div class="flex flex-col sm:flex-row gap-2 sm:ml-auto"><button class="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#25D366] text-white rounded-lg font-semibold text-sm hover:bg-[#20ba5a] transition-colors shadow-sm"><svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"></path></svg> WhatsApp</button> `);
      AppButton($$renderer2, {
        variant: "primary",
        onclick: handleSend,
        children: ($$renderer3) => {
          $$renderer3.push(`<!---->Send Email`);
        },
        $$slots: { default: true }
      });
      $$renderer2.push(`<!----></div></div></div></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { open });
  });
}
function LineItemRow($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { item = void 0, currency = "USD", onupdate, onremove } = $$props;
    let total = derived(() => item.rate * item.quantity);
    $$renderer2.push(`<div class="border-b border-slate-100 hover:bg-slate-50 transition-colors group"><div class="py-3 sm:py-4 px-3 sm:px-4 grid grid-cols-12 gap-2 sm:gap-4 items-start"><div class="col-span-1 flex items-center justify-center pt-0.5 sm:pt-1"><div class="flex-shrink-0 flex items-center justify-center text-slate-300 group-hover:text-slate-400 cursor-move hidden sm:flex"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4"><path d="M7 2a2 2 0 100 4 2 2 0 000-4zM7 8a2 2 0 100 4 2 2 0 000-4zM7 14a2 2 0 100 4 2 2 0 000-4zM13 2a2 2 0 100 4 2 2 0 000-4zM13 8a2 2 0 100 4 2 2 0 000-4zM13 14a2 2 0 100 4 2 2 0 000-4z"></path></svg></div></div> <div class="col-span-4 sm:col-span-4 relative"><input${attr("id", `item-name-${stringify(item.id)}`)} type="text"${attr("value", item.name)} placeholder="Item name (start typing to search)" class="block w-full bg-white border border-slate-200 rounded px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 text-sm font-medium transition-colors"/> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div> <div class="col-span-2"><div class="flex items-center gap-1 h-full"><input${attr("id", `item-rate-${stringify(item.id)}`)} type="number"${attr("value", item.rate)} min="0" step="0.01" placeholder="0.00" class="block w-full bg-white border border-slate-200 rounded px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 text-sm text-right transition-colors"/></div></div> <div class="col-span-1"><input${attr("id", `item-qty-${stringify(item.id)}`)} type="number"${attr("value", item.quantity)} min="1" step="1" placeholder="1" class="block w-full bg-white border border-slate-200 rounded px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 text-sm text-center transition-colors"/></div> <div class="col-span-1 text-right pt-2"><div class="font-semibold text-slate-900 text-sm">${escape_html(formatCurrency(total(), currency))}</div></div> <div class="col-span-1 flex items-center justify-end"><button type="button" class="text-slate-300 hover:text-red-500 transition-all p-1" title="Remove item"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg></button></div></div> <div class="px-4 pb-4 grid grid-cols-12 gap-4"><div class="col-span-1"></div> <div class="col-span-6"><textarea${attr("id", `item-desc-${stringify(item.id)}`)} placeholder="Item description" rows="1" class="block w-full bg-white border border-slate-200 rounded px-3 py-2 text-slate-600 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 text-sm resize-none transition-colors">`);
    const $$body = escape_html(item.description);
    if ($$body) {
      $$renderer2.push(`${$$body}`);
    }
    $$renderer2.push(`</textarea></div> <div class="col-span-5"></div></div></div>`);
    bind_props($$props, { item });
  });
}
function InvoiceForm($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let { type = "invoice", initialData = {}, onsave } = $$props;
    function generateDefaultNumber() {
      if (type === "invoice") {
        const nextIdx = store_get($$store_subs ??= {}, "$invoices", invoices).length + 1;
        return `INV-${nextIdx.toString().padStart(3, "0")}`;
      } else {
        const nextIdx = store_get($$store_subs ??= {}, "$estimates", estimates).length + 1;
        return `EST-${nextIdx.toString().padStart(3, "0")}`;
      }
    }
    function getInitialValues() {
      const d = initialData;
      return {
        docNumber: d?.invoiceNumber || d?.estimateNumber || generateDefaultNumber(),
        referenceNumber: d?.poNumber || d?.referenceNumber || "",
        dateIssued: (d?.dateIssued ? new Date(d.dateIssued) : /* @__PURE__ */ new Date()).toISOString().split("T")[0],
        dateDue: (d?.dateDue ? new Date(d.dateDue) : d?.dateValidUntil ? new Date(d.dateValidUntil) : new Date(Date.now() + 14 * 24 * 60 * 60 * 1e3)).toISOString().split("T")[0],
        sender: d?.sender ? { ...d.sender, logo: d.sender.logo || null } : {
          ...store_get($$store_subs ??= {}, "$settings", settings).company,
          logo: store_get($$store_subs ??= {}, "$settings", settings).company.logo || null
        },
        selectedClientId: d?.client?.id || (store_get($$store_subs ??= {}, "$clients", clients).length > 0 ? store_get($$store_subs ??= {}, "$clients", clients)[0].id : ""),
        items: d?.items ? d.items.map((i) => ({ ...i })) : [
          {
            id: v4(),
            name: "",
            description: "",
            rate: 0,
            quantity: 1
          }
        ],
        taxRate: d?.taxRate ?? store_get($$store_subs ??= {}, "$settings", settings).defaultTaxRate,
        discount: d?.discount ?? 0,
        shipping: d?.shipping ?? 0,
        currency: d?.currency ?? store_get($$store_subs ??= {}, "$settings", settings).defaultCurrency,
        notes: d?.notes ?? store_get($$store_subs ??= {}, "$settings", settings).defaultNotes,
        terms: d?.terms ?? store_get($$store_subs ??= {}, "$settings", settings).defaultTerms
      };
    }
    const init = getInitialValues();
    let docNumber = init.docNumber;
    let referenceNumber = init.referenceNumber;
    let dateIssued = init.dateIssued;
    let dateDue = init.dateDue;
    let sender = init.sender;
    let selectedClientId = init.selectedClientId;
    let items$1 = init.items;
    let taxRate = init.taxRate;
    let selectedTaxRate = init.taxRate;
    let discount = init.discount;
    let shipping = init.shipping;
    let currency = init.currency;
    let notes = init.notes;
    let terms = init.terms;
    let showShipping = derived(() => shipping > 0);
    let showDiscount = derived(() => discount > 0);
    let showTax = derived(() => taxRate > 0 || store_get($$store_subs ??= {}, "$taxRates", taxRates).length > 0);
    let subtotal = derived(() => items$1.reduce((sum, item) => sum + item.rate * item.quantity, 0));
    let taxAmount = derived(() => subtotal() * (taxRate / 100));
    let total = derived(() => subtotal() + taxAmount() + shipping - discount);
    function handleItemUpdate(updatedItem) {
      items$1 = items$1.map((item) => item.id === updatedItem.id ? updatedItem : item);
    }
    function handleItemRemove(idToRemove) {
      if (items$1.length > 1) {
        items$1 = items$1.filter((item) => item.id !== idToRemove);
      }
    }
    function onSave(status = "draft") {
      let client = store_get($$store_subs ??= {}, "$clients", clients).find((c) => c.id === selectedClientId);
      if (!client) return;
      const finalItems = items$1.filter((i) => i.name.trim() !== "");
      const sItems = store_get($$store_subs ??= {}, "$itemsStore", items);
      finalItems.forEach((item) => {
        const exists = sItems.some((si) => si.name.toLowerCase() === item.name.toLowerCase());
        if (!exists && item.name) {
          addItem({
            name: item.name,
            description: item.description || "",
            rate: item.rate || 0,
            sku: "",
            category: "",
            unit: item.unit || "pcs"
          });
        }
      });
      const data = {
        dateIssued: new Date(dateIssued),
        sender: { ...sender },
        client: { ...client },
        items: finalItems,
        taxRate,
        discount,
        shipping,
        currency,
        notes,
        terms,
        status
      };
      if (type === "invoice") {
        data.invoiceNumber = docNumber;
        data.poNumber = referenceNumber;
        data.dateDue = new Date(dateDue);
      } else {
        data.estimateNumber = docNumber;
        data.referenceNumber = referenceNumber;
        data.dateValidUntil = new Date(dateDue);
      }
      if (onsave) onsave(data);
    }
    let showSendModal = false;
    function handleSaveAndSend() {
      showSendModal = true;
    }
    function onSend(details) {
      console.log(`Sending ${type} via ${details.method}`, details);
      onSave("sent");
    }
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<div class="bg-white shadow-2xl rounded-2xl overflow-hidden border border-slate-200 ring-1 ring-slate-900/5"><div class="p-6 md:p-12 border-b border-slate-100 flex flex-col md:flex-row justify-between gap-10 bg-gradient-to-br from-slate-50 to-white"><div class="w-full md:w-1/3">`);
      FileUpload($$renderer3, {
        label: "Add your logo",
        get value() {
          return sender.logo;
        },
        set value($$value) {
          sender.logo = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----></div> <div class="flex-1 space-y-3"><div class="text-left md:text-right"><span class="inline-block text-xs font-black uppercase tracking-widest text-slate-300 border border-slate-200 rounded-md px-2 py-0.5 mb-2">${escape_html(type === "invoice" ? "INVOICE" : "ESTIMATE")}</span></div> <div><input${attr("value", sender.name)} placeholder="Your Company Name" class="block w-full text-left md:text-right border-b-2 border-slate-200 focus:border-emerald-500 pb-1 text-slate-900 focus:outline-none font-bold text-2xl placeholder:text-slate-300 bg-transparent transition-colors"/></div> <div><textarea placeholder="Address, City, State, ZIP Phone | Email | Website" rows="4" class="block w-full text-left md:text-right border-none p-0 text-slate-500 focus:ring-0 text-sm resize-none placeholder:text-slate-300 bg-transparent leading-relaxed">`);
      const $$body = escape_html(sender.address);
      if ($$body) {
        $$renderer3.push(`${$$body}`);
      }
      $$renderer3.push(`</textarea></div></div></div> <div class="flex flex-col lg:flex-row border-b border-slate-100"><div class="lg:w-1/2 p-6 md:p-12 border-b lg:border-b-0 lg:border-r border-slate-100"><div class="flex gap-4 mb-6 border-b border-slate-100 pb-3"><button${attr_class(`text-[10px] font-black uppercase tracking-widest pb-2 transition-all ${stringify(
        "text-emerald-600 border-b-2 border-emerald-500 -mb-px"
      )}`)}>Billed To</button> <button${attr_class(`text-[10px] font-black uppercase tracking-widest pb-2 transition-all ${stringify("text-slate-400 hover:text-slate-600")}`)}>Ship To</button> <div class="flex-1 text-right"><button type="button" class="text-[11px] font-bold text-emerald-600 hover:text-emerald-700 transition-colors uppercase tracking-widest">${escape_html("+ New client")}</button></div></div> `);
      {
        $$renderer3.push("<!--[0-->");
        if (store_get($$store_subs ??= {}, "$clients", clients).length === 0) {
          $$renderer3.push("<!--[0-->");
          $$renderer3.push(`<div class="rounded-xl border-2 border-dashed border-slate-200 p-8 text-center"><p class="text-sm text-slate-400 font-medium">No clients yet.</p> <a href="/clients/new" class="mt-2 inline-block text-sm font-bold text-emerald-600 hover:underline">Add your first client →</a></div>`);
        } else {
          $$renderer3.push("<!--[-1-->");
          $$renderer3.push(`<div class="relative mb-4">`);
          $$renderer3.select(
            {
              value: selectedClientId,
              class: "block w-full rounded-xl border-2 border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 bg-white py-3 pl-4 pr-10 text-slate-900 font-bold text-lg appearance-none cursor-pointer outline-none transition-all"
            },
            ($$renderer4) => {
              $$renderer4.push(`<!--[-->`);
              const each_array = ensure_array_like(store_get($$store_subs ??= {}, "$clients", clients));
              for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
                let client = each_array[$$index];
                $$renderer4.option({ value: client.id }, ($$renderer5) => {
                  $$renderer5.push(`${escape_html(client.companyName)}`);
                });
              }
              $$renderer4.push(`<!--]-->`);
            }
          );
          $$renderer3.push(` <div class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"></path></svg></div></div> `);
          if (selectedClientId) {
            $$renderer3.push("<!--[0-->");
            const activeClient = store_get($$store_subs ??= {}, "$clients", clients).find((c) => c.id === selectedClientId);
            if (activeClient) {
              $$renderer3.push("<!--[0-->");
              $$renderer3.push(`<div class="bg-gradient-to-br from-emerald-50 to-slate-50 rounded-xl p-4 text-sm text-slate-600 space-y-2 border border-slate-100"><div class="font-semibold text-slate-900">${escape_html(activeClient.companyName)}</div> `);
              if (activeClient.email) {
                $$renderer3.push("<!--[0-->");
                $$renderer3.push(`<div class="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-slate-400"><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"></path></svg> <span>${escape_html(activeClient.email)}</span></div>`);
              } else {
                $$renderer3.push("<!--[-1-->");
              }
              $$renderer3.push(`<!--]--> `);
              if (activeClient.phone) {
                $$renderer3.push("<!--[0-->");
                $$renderer3.push(`<div class="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-slate-400"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"></path></svg> <span>${escape_html(activeClient.phone)}</span></div>`);
              } else {
                $$renderer3.push("<!--[-1-->");
              }
              $$renderer3.push(`<!--]--> `);
              if (activeClient.address) {
                $$renderer3.push("<!--[0-->");
                $$renderer3.push(`<div class="flex items-start gap-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"></path></svg> <span class="whitespace-pre-wrap">${escape_html(activeClient.address)}</span></div>`);
              } else {
                $$renderer3.push("<!--[-1-->");
              }
              $$renderer3.push(`<!--]--></div>`);
            } else {
              $$renderer3.push("<!--[-1-->");
            }
            $$renderer3.push(`<!--]-->`);
          } else {
            $$renderer3.push("<!--[-1-->");
          }
          $$renderer3.push(`<!--]-->`);
        }
        $$renderer3.push(`<!--]-->`);
      }
      $$renderer3.push(`<!--]--></div> <div class="lg:w-1/2 p-6 md:p-12"><h3 class="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2 border-b border-slate-100 pb-3"><span class="w-2 h-2 bg-emerald-500 rounded-full"></span> Document Details</h3> <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5"><div class="space-y-1.5"><label for="date-issued" class="block text-[10px] font-bold uppercase tracking-widest text-slate-500">Date Issued</label> <input id="date-issued" type="date"${attr("value", dateIssued)} class="block w-full rounded-lg border-2 border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 px-3 py-2.5 text-slate-900 font-semibold text-sm outline-none transition-all"/></div> <div class="space-y-1.5"><label for="date-due" class="block text-[10px] font-bold uppercase tracking-widest text-slate-500">${escape_html(type === "invoice" ? "Date Due" : "Valid Until")}</label> <input id="date-due" type="date"${attr("value", dateDue)} class="block w-full rounded-lg border-2 border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 px-3 py-2.5 text-slate-900 font-semibold text-sm outline-none transition-all"/></div> <div class="space-y-1.5"><label for="doc-number" class="block text-[10px] font-bold uppercase tracking-widest text-slate-500">${escape_html(type === "invoice" ? "Invoice #" : "Estimate #")}</label> <input id="doc-number" type="text"${attr("value", docNumber)} placeholder="e.g. INV-001" class="block w-full rounded-lg border-2 border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 px-3 py-2.5 text-slate-900 font-semibold text-sm outline-none transition-all placeholder:text-slate-300"/></div> <div class="space-y-1.5"><label for="currency-select" class="block text-[10px] font-bold uppercase tracking-widest text-slate-500">Currency</label> <div class="relative">`);
      $$renderer3.select(
        {
          id: "currency-select",
          value: currency,
          class: "block w-full rounded-lg border-2 border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 px-3 py-2.5 text-slate-900 font-semibold text-sm outline-none transition-all appearance-none bg-white cursor-pointer"
        },
        ($$renderer4) => {
          $$renderer4.push(`<!--[-->`);
          const each_array_1 = ensure_array_like(CURRENCIES);
          for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
            let c = each_array_1[$$index_1];
            $$renderer4.option({ value: c.code }, ($$renderer5) => {
              $$renderer5.push(`${escape_html(c.code)} (${escape_html(c.symbol)}) - ${escape_html(c.name)}`);
            });
          }
          $$renderer4.push(`<!--]-->`);
        }
      );
      $$renderer3.push(` <div class="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-3.5 h-3.5"><path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"></path></svg></div></div></div> <div class="space-y-1.5 col-span-2"><label for="ref-number" class="block text-[10px] font-bold uppercase tracking-widest text-slate-500">${escape_html(type === "invoice" ? "PO Number" : "Reference #")}</label> <input id="ref-number" type="text"${attr("value", referenceNumber)} placeholder="Optional reference number" class="block w-full rounded-lg border-2 border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 px-3 py-2.5 text-slate-900 font-semibold text-sm outline-none transition-all placeholder:text-slate-300"/></div></div></div></div> <div class="p-6 md:p-12 pb-4"><h3 class="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2 border-b border-slate-100 pb-3"><span class="w-2 h-2 bg-emerald-500 rounded-full"></span> Line Items</h3> <div class="hidden md:grid grid-cols-12 gap-4 pb-4 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b-2 border-slate-200"><div class="col-span-1"></div> <div class="col-span-6">Item</div> <div class="col-span-2 text-right">Rate</div> <div class="col-span-1 text-center">Qty</div> <div class="col-span-1 text-right">Line Total</div> <div class="col-span-1"></div></div> <div class="divide-y divide-slate-100"><!--[-->`);
      const each_array_2 = ensure_array_like(items$1);
      for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
        let item = each_array_2[$$index_2];
        $$renderer3.push(`<div>`);
        LineItemRow($$renderer3, {
          currency,
          onupdate: handleItemUpdate,
          onremove: handleItemRemove,
          get item() {
            return items$1[items$1.indexOf(item)];
          },
          set item($$value) {
            items$1[items$1.indexOf(item)] = $$value;
            $$settled = false;
          }
        });
        $$renderer3.push(`<!----></div>`);
      }
      $$renderer3.push(`<!--]--></div> <div class="pt-6 pb-2"><button type="button" class="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-bold text-sm transition-all border-2 border-dashed border-emerald-200 hover:border-emerald-400 rounded-xl px-5 py-3 hover:bg-emerald-50"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"></path></svg> Add line item</button></div></div> <div class="p-6 md:p-12 pt-0 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16"><div class="space-y-6 pt-8"><div><h4 class="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2"><span class="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> Notes</h4> <textarea rows="3" placeholder="Notes or payment details (optional)..." class="block w-full rounded-lg border-2 border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 px-3 py-2.5 text-slate-600 text-sm placeholder:text-slate-300 resize-none outline-none transition-all leading-relaxed">`);
      const $$body_2 = escape_html(notes);
      if ($$body_2) {
        $$renderer3.push(`${$$body_2}`);
      }
      $$renderer3.push(`</textarea></div> <div><h4 class="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2"><span class="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> Terms &amp; Conditions</h4> <textarea rows="2" placeholder="Payment terms and conditions." class="block w-full rounded-lg border-2 border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 px-3 py-2.5 text-slate-600 text-sm placeholder:text-slate-300 resize-none outline-none transition-all leading-relaxed">`);
      const $$body_3 = escape_html(terms);
      if ($$body_3) {
        $$renderer3.push(`${$$body_3}`);
      }
      $$renderer3.push(`</textarea></div></div> <div class="pt-8"><div class="bg-slate-50 rounded-2xl p-6 border border-slate-100 space-y-3"><div class="flex justify-between items-center py-1.5"><span class="font-semibold text-slate-500 text-sm">Subtotal</span> <span class="font-bold text-slate-900">${escape_html(formatCurrency(subtotal(), currency))}</span></div> `);
      if (showShipping()) {
        $$renderer3.push("<!--[0-->");
        $$renderer3.push(`<div class="flex justify-between items-center py-1.5 border-t border-slate-200"><span class="font-semibold text-slate-500 text-sm">Shipping</span> <div class="flex items-center gap-1"><span class="text-slate-400 text-sm">${escape_html(currency)}</span> <input type="number"${attr("value", shipping)} class="w-24 text-right rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-0 px-2 py-1 font-bold text-slate-900 text-sm bg-white outline-none"/></div></div>`);
      } else {
        $$renderer3.push("<!--[-1-->");
      }
      $$renderer3.push(`<!--]--> `);
      if (showDiscount()) {
        $$renderer3.push("<!--[0-->");
        $$renderer3.push(`<div class="flex justify-between items-center py-1.5 border-t border-slate-200"><span class="font-semibold text-slate-500 text-sm">Discount</span> <div class="flex items-center gap-1"><span class="text-slate-400 text-sm">${escape_html(currency)}</span> <input type="number"${attr("value", discount)} class="w-24 text-right rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-0 px-2 py-1 font-bold text-slate-900 text-sm bg-white outline-none"/></div></div>`);
      } else {
        $$renderer3.push("<!--[-1-->");
      }
      $$renderer3.push(`<!--]--> `);
      if (showTax()) {
        $$renderer3.push("<!--[0-->");
        $$renderer3.push(`<div class="flex justify-between items-center py-1.5 border-t border-slate-200"><div class="flex items-center gap-2"><span class="font-semibold text-slate-500 text-sm">Tax</span> <div class="flex items-center gap-1">`);
        if (store_get($$store_subs ??= {}, "$taxRates", taxRates).length > 0) {
          $$renderer3.push("<!--[0-->");
          $$renderer3.select(
            {
              value: selectedTaxRate,
              class: "w-32 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-0 px-2 py-1 font-bold text-slate-900 text-sm bg-white outline-none"
            },
            ($$renderer4) => {
              $$renderer4.option({ value: 0 }, ($$renderer5) => {
                $$renderer5.push(`No Tax (0%)`);
              });
              $$renderer4.push(`<!--[-->`);
              const each_array_3 = ensure_array_like(store_get($$store_subs ??= {}, "$taxRates", taxRates));
              for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
                let rate = each_array_3[$$index_3];
                $$renderer4.option({ value: rate.rate }, ($$renderer5) => {
                  $$renderer5.push(`${escape_html(rate.name)} (${escape_html(rate.rate)}%)`);
                });
              }
              $$renderer4.push(`<!--]-->`);
              $$renderer4.option({ value: -1 }, ($$renderer5) => {
                $$renderer5.push(`Custom...`);
              });
            }
          );
          $$renderer3.push(` `);
          if (selectedTaxRate === -1) {
            $$renderer3.push("<!--[0-->");
            $$renderer3.push(`<input type="number"${attr("value", taxRate)} class="w-14 text-center rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-0 px-2 py-1 font-bold text-slate-900 text-sm bg-white outline-none ml-1"/>`);
          } else {
            $$renderer3.push("<!--[-1-->");
          }
          $$renderer3.push(`<!--]-->`);
        } else {
          $$renderer3.push("<!--[-1-->");
          $$renderer3.push(`<input type="number"${attr("value", taxRate)} class="w-14 text-center rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-0 px-2 py-1 font-bold text-slate-900 text-sm bg-white outline-none"/>`);
        }
        $$renderer3.push(`<!--]--> <span class="text-slate-400 text-sm">%</span></div></div> <span class="font-bold text-slate-900">${escape_html(formatCurrency(taxAmount(), currency))}</span></div>`);
      } else {
        $$renderer3.push("<!--[-1-->");
      }
      $$renderer3.push(`<!--]--> <div class="flex flex-wrap gap-2 pt-2 border-t border-slate-200">`);
      if (!showShipping()) {
        $$renderer3.push("<!--[0-->");
        $$renderer3.push(`<button class="text-xs font-semibold text-slate-500 hover:text-emerald-600 bg-white border border-slate-200 hover:border-emerald-300 rounded-lg px-2.5 py-1 transition-all">+ Shipping</button>`);
      } else {
        $$renderer3.push("<!--[-1-->");
      }
      $$renderer3.push(`<!--]--> `);
      if (!showDiscount()) {
        $$renderer3.push("<!--[0-->");
        $$renderer3.push(`<button class="text-xs font-semibold text-slate-500 hover:text-emerald-600 bg-white border border-slate-200 hover:border-emerald-300 rounded-lg px-2.5 py-1 transition-all">+ Discount</button>`);
      } else {
        $$renderer3.push("<!--[-1-->");
      }
      $$renderer3.push(`<!--]--> `);
      if (!showTax()) {
        $$renderer3.push("<!--[0-->");
        $$renderer3.push(`<button class="text-xs font-semibold text-slate-500 hover:text-emerald-600 bg-white border border-slate-200 hover:border-emerald-300 rounded-lg px-2.5 py-1 transition-all">+ Tax</button>`);
      } else {
        $$renderer3.push("<!--[-1-->");
      }
      $$renderer3.push(`<!--]--></div> <div class="pt-4 mt-2 border-t-4 border-slate-900 flex justify-between items-center"><span class="font-black text-lg uppercase tracking-widest text-slate-900">Total</span> <span class="font-black text-4xl tracking-tighter text-slate-900">${escape_html(formatCurrency(total(), currency))}</span></div></div> <div class="pt-6 flex flex-col sm:flex-row justify-end gap-3 no-print">`);
      AppButton($$renderer3, {
        variant: "secondary",
        size: "md",
        onclick: () => onSave("draft"),
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->Save as Draft`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      AppButton($$renderer3, {
        variant: "primary",
        size: "md",
        onclick: handleSaveAndSend,
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->Save &amp; Send`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----></div></div></div> `);
      if (selectedClientId) {
        $$renderer3.push("<!--[0-->");
        const activeClient = store_get($$store_subs ??= {}, "$clients", clients).find((c) => c.id === selectedClientId);
        SendModal($$renderer3, {
          title: `Send ${type === "invoice" ? "Invoice" : "Estimate"}`,
          type,
          initialClientName: activeClient?.companyName || "",
          initialClientEmail: activeClient?.email || "",
          onsend: onSend,
          get open() {
            return showSendModal;
          },
          set open($$value) {
            showSendModal = $$value;
            $$settled = false;
          }
        });
      } else {
        $$renderer3.push("<!--[-1-->");
      }
      $$renderer3.push(`<!--]--></div>`);
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
  InvoiceForm as I
};
