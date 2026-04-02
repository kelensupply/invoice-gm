import { c as escape_html, a as attr_class, f as stringify, b as attr, g as derived, i as head, s as store_get, e as ensure_array_like, d as unsubscribe_stores } from "../../../chunks/index.js";
import { i as invoices } from "../../../chunks/invoices.js";
import { s as settings } from "../../../chunks/settings.js";
import { e as estimates } from "../../../chunks/estimates.js";
import { S as StatusBadge } from "../../../chunks/StatusBadge.js";
import { A as AppButton } from "../../../chunks/AppButton.js";
import { P as PageHeader } from "../../../chunks/PageHeader.js";
import { f as formatCurrency, a as formatDate } from "../../../chunks/formatters.js";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils2.js";
import "@sveltejs/kit/internal/server";
import "../../../chunks/root.js";
import "../../../chunks/state.svelte.js";
function StatCard($$renderer, $$props) {
  let {
    title,
    value,
    linkText,
    linkHref,
    icon = void 0,
    accent = "slate"
  } = $$props;
  const defaultIcon = "M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75";
  const accentColors = {
    slate: { icon: "text-slate-400", dot: "bg-slate-300" },
    emerald: { icon: "text-emerald-500", dot: "bg-emerald-400" },
    red: { icon: "text-red-400", dot: "bg-red-400" },
    blue: { icon: "text-blue-400", dot: "bg-blue-400" }
  };
  let colors = derived(() => accentColors[accent] || accentColors.slate);
  $$renderer.push(`<div class="card p-5 sm:p-6 flex flex-col gap-3"><div class="flex items-center justify-between"><p class="text-sm font-medium text-slate-500">${escape_html(title)}</p> <div${attr_class(`w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center ${stringify(colors().icon)}`)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4.5 h-4.5"><path stroke-linecap="round" stroke-linejoin="round"${attr("d", icon || defaultIcon)}></path></svg></div></div> <p class="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">${escape_html(value)}</p> <a${attr("href", linkHref)} class="text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors inline-flex items-center gap-1">${escape_html(linkText)} <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4"><path fill-rule="evenodd" d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z" clip-rule="evenodd"></path></svg></a></div>`);
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let { data } = $$props;
    let totalInvoiced = derived(() => store_get($$store_subs ??= {}, "$invoices", invoices).reduce((sum, inv) => sum + calculateTotal(inv), 0));
    let totalPending = derived(() => store_get($$store_subs ??= {}, "$invoices", invoices).filter((inv) => inv.status === "sent" || inv.status === "viewed").reduce((sum, inv) => sum + calculateTotal(inv), 0));
    let totalOverdue = derived(() => store_get($$store_subs ??= {}, "$invoices", invoices).filter((inv) => inv.status === "overdue").reduce((sum, inv) => sum + calculateTotal(inv), 0));
    let recentInvoices = derived(() => [...store_get($$store_subs ??= {}, "$invoices", invoices)].sort((a, b) => new Date(b.dateIssued).getTime() - new Date(a.dateIssued).getTime()));
    let debtors = derived(() => Object.values(store_get($$store_subs ??= {}, "$invoices", invoices).filter((inv) => inv.status === "sent" || inv.status === "viewed" || inv.status === "overdue").reduce(
      (acc, inv) => {
        const clientName = inv.client?.companyName || "Unknown";
        if (!acc[clientName]) {
          acc[clientName] = {
            clientName,
            totalOwed: 0,
            oldestDate: inv.dateDue || inv.dateIssued
          };
        }
        acc[clientName].totalOwed += calculateTotal(inv);
        if (new Date(inv.dateDue || inv.dateIssued) < new Date(acc[clientName].oldestDate)) {
          acc[clientName].oldestDate = inv.dateDue || inv.dateIssued;
        }
        return acc;
      },
      {}
    )).sort((a, b) => b.totalOwed - a.totalOwed));
    function getDaysOverdue(date) {
      const diff = (/* @__PURE__ */ new Date()).getTime() - new Date(date).getTime();
      const days = Math.floor(diff / (1e3 * 3600 * 24));
      return days > 0 ? days : 0;
    }
    function calculateTotal(invoice) {
      const subtotal = (invoice.items || []).reduce((sum, item) => sum + (item.rate || 0) * (item.quantity || 0), 0);
      const taxAmount = subtotal * ((invoice.taxRate || 0) / 100);
      return subtotal + taxAmount + (invoice.shipping || 0) - (invoice.discount || 0);
    }
    head("x1i5gj", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Dashboard | Invoicer App</title>`);
      });
    });
    $$renderer2.push(`<div>`);
    PageHeader($$renderer2, {
      title: "Dashboard",
      subtitle: "Sales flow: Create → Send → Track → Follow-up → Paid ✅",
      children: ($$renderer3) => {
        AppButton($$renderer3, {
          "data-sveltekit-reload": true,
          href: "/invoices/new",
          variant: "primary",
          size: "sm",
          children: ($$renderer4) => {
            $$renderer4.push(`<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg> New Sale`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----> `);
        AppButton($$renderer3, {
          "data-sveltekit-reload": true,
          href: "/estimates/new",
          variant: "outline",
          size: "sm",
          children: ($$renderer4) => {
            $$renderer4.push(`<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg> New Quote`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!---->`);
      }
    });
    $$renderer2.push(`<!----> <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-6 sm:mb-8">`);
    StatCard($$renderer2, {
      title: "Total Revenue",
      value: formatCurrency(totalInvoiced(), store_get($$store_subs ??= {}, "$settings", settings).defaultCurrency),
      linkText: "View expected income",
      linkHref: "/invoices",
      icon: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
    });
    $$renderer2.push(`<!----> `);
    StatCard($$renderer2, {
      title: "Awaiting Payment",
      value: formatCurrency(totalPending(), store_get($$store_subs ??= {}, "$settings", settings).defaultCurrency),
      linkText: "View pending collections",
      linkHref: "/invoices?status=pending",
      accent: "blue",
      icon: "M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    });
    $$renderer2.push(`<!----> `);
    StatCard($$renderer2, {
      title: "Overdue (Action Required)",
      value: formatCurrency(totalOverdue(), store_get($$store_subs ??= {}, "$settings", settings).defaultCurrency),
      linkText: "View critical accounts",
      linkHref: "/invoices?status=overdue",
      accent: "red",
      icon: "M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    });
    $$renderer2.push(`<!----></div> <div class="section-card mb-6 sm:mb-8"><div class="flex items-center justify-between px-5 py-4 border-b border-slate-200"><h2 class="section-title text-red-600 flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg> Outstanding Balances</h2></div> `);
    if (debtors().length > 0) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="overflow-x-auto"><table class="w-full"><thead><tr class="border-b border-slate-100 bg-red-50 text-red-900"><th class="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider">Client</th><th class="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider">Status</th><th class="text-right px-5 py-3 text-xs font-semibold uppercase tracking-wider">Total Owed</th></tr></thead><tbody class="divide-y divide-slate-100"><!--[-->`);
      const each_array = ensure_array_like(debtors().slice(0, 5));
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let debtor = each_array[$$index];
        $$renderer2.push(`<tr class="hover:bg-slate-50 transition-colors"><td class="px-5 py-3 text-sm font-semibold text-slate-800">${escape_html(debtor.clientName)}</td><td class="px-5 py-3 text-sm">`);
        if (getDaysOverdue(debtor.oldestDate) > 0) {
          $$renderer2.push("<!--[0-->");
          $$renderer2.push(`<span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">${escape_html(getDaysOverdue(debtor.oldestDate))} days
                                            overdue</span>`);
        } else {
          $$renderer2.push("<!--[-1-->");
          $$renderer2.push(`<span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800">Pending</span>`);
        }
        $$renderer2.push(`<!--]--></td><td class="px-5 py-3 text-sm font-bold text-red-600 text-right">${escape_html(formatCurrency(debtor.totalOwed, store_get($$store_subs ??= {}, "$settings", settings).defaultCurrency))}</td></tr>`);
      }
      $$renderer2.push(`<!--]--></tbody></table></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<div class="px-5 py-8 text-center bg-slate-50/50"><div class="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg></div> <p class="text-sm font-bold text-slate-800">All Caught Up!</p> <p class="text-xs text-slate-500 mt-1 max-w-[250px] mx-auto">None of your clients currently owe you any money. Great job!</p></div>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5"><div class="section-card"><div class="flex items-center justify-between px-5 py-4 border-b border-slate-200"><h2 class="section-title">Recent Sales</h2> <a href="/invoices" class="text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors">View all →</a></div> <div class="overflow-x-auto"><table class="w-full"><thead><tr class="border-b border-slate-100 bg-slate-50"><th class="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Number</th><th class="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Client</th><th class="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th><th class="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Amount</th></tr></thead><tbody class="divide-y divide-slate-100"><!--[-->`);
    const each_array_1 = ensure_array_like(recentInvoices().slice(0, 5));
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let invoice = each_array_1[$$index_1];
      $$renderer2.push(`<tr class="hover:bg-slate-50 transition-colors cursor-pointer"><td class="px-5 py-3 text-sm font-semibold text-emerald-600">${escape_html(invoice.invoiceNumber || `INV-${invoice.id.slice(0, 6)}`)}</td><td class="px-5 py-3 text-sm text-slate-600">${escape_html(invoice.client?.companyName || "Unknown")}</td><td class="px-5 py-3 text-sm">`);
      StatusBadge($$renderer2, { status: invoice.status });
      $$renderer2.push(`<!----></td><td class="px-5 py-3 text-sm font-bold text-slate-900 text-right">${escape_html(formatCurrency(calculateTotal(invoice), invoice.currency))}</td></tr>`);
    }
    $$renderer2.push(`<!--]--></tbody></table> `);
    if (recentInvoices().length === 0) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="px-5 py-10 text-center"><p class="text-sm text-slate-500">No invoices yet. <a href="/invoices/new" class="text-emerald-600 hover:text-emerald-700 font-medium">Create one now</a></p></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div></div> <div class="section-card"><div class="flex items-center justify-between px-5 py-4 border-b border-slate-200"><h2 class="section-title">Recent Estimates</h2> <a href="/estimates" class="text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors">View all →</a></div> <div class="overflow-x-auto"><table class="w-full"><thead><tr class="border-b border-slate-100 bg-slate-50"><th class="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Number</th><th class="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Client</th><th class="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th><th class="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Amount</th></tr></thead><tbody class="divide-y divide-slate-100"><!--[-->`);
    const each_array_2 = ensure_array_like(store_get($$store_subs ??= {}, "$estimates", estimates).slice(0, 5));
    for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
      let estimate = each_array_2[$$index_2];
      $$renderer2.push(`<tr class="hover:bg-slate-50 transition-colors cursor-pointer"><td class="px-5 py-3 text-sm font-semibold text-emerald-600">${escape_html(estimate.estimateNumber || `EST-${estimate.id.slice(0, 6)}`)}</td><td class="px-5 py-3 text-sm text-slate-600">${escape_html(estimate.client?.companyName || "Unknown")}</td><td class="px-5 py-3 text-sm">`);
      StatusBadge($$renderer2, { status: estimate.status });
      $$renderer2.push(`<!----></td><td class="px-5 py-3 text-sm font-bold text-slate-900 text-right">${escape_html(formatCurrency(calculateTotal(estimate), estimate.currency))}</td></tr>`);
    }
    $$renderer2.push(`<!--]--></tbody></table> `);
    if (store_get($$store_subs ??= {}, "$estimates", estimates).length === 0) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="px-5 py-10 text-center"><p class="text-sm text-slate-500">No estimates yet. <a href="/estimates/new" class="text-emerald-600 hover:text-emerald-700 font-medium">Create one now</a></p></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div></div></div> <div class="section-card"><div class="px-5 py-4 border-b border-slate-200"><h2 class="section-title">Recent Activity</h2></div> <div class="overflow-x-auto"><table class="w-full"><thead><tr class="border-b border-slate-100 bg-slate-50"><th class="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Event</th><th class="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:table-cell">Description</th><th class="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Document</th><th class="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:table-cell">Date</th></tr></thead><tbody class="divide-y divide-slate-100"><!--[-->`);
    const each_array_3 = ensure_array_like(recentInvoices().slice(0, 5));
    for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
      let invoice = each_array_3[$$index_3];
      $$renderer2.push(`<tr class="hover:bg-slate-50 transition-colors"><td class="px-5 py-3 text-sm font-medium text-slate-900">`);
      if (invoice.status === "viewed") {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`Invoice viewed`);
      } else if (invoice.status === "paid") {
        $$renderer2.push("<!--[1-->");
        $$renderer2.push(`Invoice paid`);
      } else if (invoice.status === "sent") {
        $$renderer2.push("<!--[2-->");
        $$renderer2.push(`Invoice sent`);
      } else {
        $$renderer2.push("<!--[-1-->");
        $$renderer2.push(`Invoice ${escape_html(invoice.status)}`);
      }
      $$renderer2.push(`<!--]--></td><td class="px-5 py-3 text-sm text-slate-500 hidden sm:table-cell">${escape_html(invoice.invoiceNumber || `INV-${invoice.id.slice(0, 6)}`)} by ${escape_html(invoice.client?.contactName || "client")}</td><td class="px-5 py-3 text-sm"><a${attr("href", `/invoices/${stringify(invoice.id)}`)} class="text-emerald-600 hover:text-emerald-700 font-medium">${escape_html(invoice.invoiceNumber || `INV-${invoice.id.slice(0, 6)}`)}</a></td><td class="px-5 py-3 text-sm text-slate-500 hidden sm:table-cell">${escape_html(formatDate(new Date(invoice.dateIssued)))}</td></tr>`);
    }
    $$renderer2.push(`<!--]--></tbody></table> `);
    if (recentInvoices().length === 0) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="px-5 py-12 text-center"><p class="text-sm text-slate-500">No activity yet. Create your first invoice to get
                        started.</p></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div></div></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _page as default
};
