import { i as head, c as escape_html, e as ensure_array_like, g as derived, s as store_get, d as unsubscribe_stores } from "../../../../../chunks/index.js";
import { p as page } from "../../../../../chunks/stores.js";
import { e as estimates } from "../../../../../chunks/estimates.js";
import { i as invoices, a as addInvoice } from "../../../../../chunks/invoices.js";
import { d as documentHistory } from "../../../../../chunks/history.js";
import { g as goto } from "../../../../../chunks/client.js";
import { S as ShareModal, g as generateEstimatePdf } from "../../../../../chunks/ShareModal.js";
import { A as AppButton } from "../../../../../chunks/AppButton.js";
import { a as formatDate } from "../../../../../chunks/formatters.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let id = derived(() => store_get($$store_subs ??= {}, "$page", page).params.id);
    let estimate = derived(() => store_get($$store_subs ??= {}, "$estimates", estimates).find((e) => e.id === id()));
    let history = derived(() => store_get($$store_subs ??= {}, "$documentHistory", documentHistory).filter((h) => h.documentId === id()));
    let isShareModalOpen = false;
    let shareUrl = derived(() => typeof window !== "undefined" ? `${window.location.origin}/view/${id()}` : "");
    function handleDownload() {
      if (!estimate()) return;
      const doc = generateEstimatePdf(estimate());
      doc.save(`${estimate().estimateNumber}.pdf`);
    }
    function handleConvertToInvoice() {
      if (!estimate()) return;
      const nextIdx = store_get($$store_subs ??= {}, "$invoices", invoices).length + 1;
      const newInvoiceNumber = `INV-${nextIdx.toString().padStart(3, "0")}`;
      const newInvoiceData = {
        invoiceNumber: newInvoiceNumber,
        poNumber: estimate().referenceNumber,
        dateIssued: /* @__PURE__ */ new Date(),
        dateDue: new Date(Date.now() + 14 * 24 * 60 * 60 * 1e3),
        status: "draft",
        sender: estimate().sender,
        client: estimate().client,
        items: estimate().items,
        taxRate: estimate().taxRate,
        discount: estimate().discount,
        shipping: estimate().shipping,
        currency: estimate().currency,
        notes: estimate().notes,
        terms: estimate().terms
      };
      addInvoice(newInvoiceData);
      goto();
    }
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      head("agq3p5", $$renderer3, ($$renderer4) => {
        $$renderer4.title(($$renderer5) => {
          $$renderer5.push(`<title>Preview ${escape_html(estimate()?.estimateNumber || "Estimate")} - Invoicer App</title>`);
        });
      });
      $$renderer3.push(`<div class="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-4 flex items-center justify-between"><div class="flex items-center gap-4"><a href="/estimates" class="group text-slate-500 hover:text-slate-800 flex items-center gap-2 font-medium text-sm transition-all"><div class="p-1 rounded-full group-hover:bg-slate-100 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"></path></svg></div> Back</a> <div class="h-6 w-px bg-slate-300 mx-2"></div> <div class="flex flex-col"><h1 class="text-xl font-bold text-slate-800 tracking-tight flex items-center gap-2">Estimate Preview `);
      if (estimate()) {
        $$renderer3.push("<!--[0-->");
        $$renderer3.push(`<span class="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-widest">${escape_html(estimate().estimateNumber)}</span>`);
      } else {
        $$renderer3.push("<!--[-1-->");
      }
      $$renderer3.push(`<!--]--></h1></div></div> <div class="flex items-center gap-2 overflow-x-auto pb-1 -mb-1 no-scrollbar flex-nowrap min-w-0">`);
      AppButton($$renderer3, {
        variant: "outline",
        size: "sm",
        onclick: () => isShareModalOpen = true,
        disabled: !estimate(),
        class: "whitespace-nowrap flex-shrink-0",
        children: ($$renderer4) => {
          $$renderer4.push(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 mr-1 sm:mr-2"><path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"></path></svg> Share`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      AppButton($$renderer3, {
        variant: "outline",
        size: "sm",
        onclick: handleConvertToInvoice,
        disabled: !estimate(),
        class: "whitespace-nowrap flex-shrink-0 text-emerald-600 border-emerald-200 hover:bg-emerald-50",
        children: ($$renderer4) => {
          $$renderer4.push(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 mr-1 sm:mr-2"><path stroke-linecap="round" stroke-linejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"></path></svg> Convert to Invoice`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      AppButton($$renderer3, {
        variant: "secondary",
        size: "sm",
        href: `/estimates/${id()}`,
        disabled: !estimate(),
        class: "whitespace-nowrap flex-shrink-0",
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->Edit`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      AppButton($$renderer3, {
        variant: "secondary",
        size: "sm",
        onclick: () => window.print(),
        disabled: !estimate(),
        class: "whitespace-nowrap flex-shrink-0",
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->Print`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      AppButton($$renderer3, {
        variant: "primary",
        size: "sm",
        onclick: handleDownload,
        disabled: !estimate(),
        class: "whitespace-nowrap flex-shrink-0",
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->Download`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----></div></div> <div class="h-[calc(100vh-73px)] bg-slate-100 flex p-6 overflow-hidden gap-6 flex-col lg:flex-row"><div class="flex-grow flex items-center justify-center bg-slate-100 rounded-xl relative h-full">`);
      {
        $$renderer3.push("<!--[0-->");
        $$renderer3.push(`<div class="flex flex-col items-center"><div class="w-12 h-12 border-4 border-slate-200 border-t-emerald-500 rounded-full animate-spin mb-4"></div> <p class="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Preparing Document...</p></div>`);
      }
      $$renderer3.push(`<!--]--></div> `);
      if (estimate()) {
        $$renderer3.push("<!--[0-->");
        $$renderer3.push(`<div class="w-full lg:w-96 flex-shrink-0 flex flex-col gap-6 h-full"><div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col flex-grow overflow-hidden"><h3 class="text-lg font-bold text-slate-900 mb-6">Activity Log</h3> <div class="flex-grow overflow-y-auto pr-2"><div class="relative pl-6 border-l-2 border-slate-100 space-y-8"><!--[-->`);
        const each_array = ensure_array_like(history());
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let item = each_array[$$index];
          $$renderer3.push(`<div class="relative"><div class="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-2 border-white bg-slate-300 ring-2 ring-slate-100"></div> <div class="flex flex-col"><span class="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">${escape_html(formatDate(item.createdAt))}</span> <span class="text-sm font-bold text-slate-700 leading-tight">${escape_html(item.action.replace("_", " ").toUpperCase())}</span> `);
          if (item.description) {
            $$renderer3.push("<!--[0-->");
            $$renderer3.push(`<p class="text-xs text-slate-500 mt-1 leading-relaxed">${escape_html(item.description)}</p>`);
          } else {
            $$renderer3.push("<!--[-1-->");
          }
          $$renderer3.push(`<!--]--></div></div>`);
        }
        $$renderer3.push(`<!--]--></div></div></div></div> `);
        ShareModal($$renderer3, {
          shareUrl: shareUrl(),
          documentNumber: estimate().estimateNumber,
          get isOpen() {
            return isShareModalOpen;
          },
          set isOpen($$value) {
            isShareModalOpen = $$value;
            $$settled = false;
          }
        });
        $$renderer3.push(`<!---->`);
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
  _page as default
};
