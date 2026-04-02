import { i as head, e as ensure_array_like, a as attr_class, f as stringify, c as escape_html, s as store_get, d as unsubscribe_stores, g as derived } from "../../../chunks/index.js";
import { e as estimates } from "../../../chunks/estimates.js";
import { D as DataTable } from "../../../chunks/DataTable.js";
import { S as StatusBadge } from "../../../chunks/StatusBadge.js";
import { A as AppButton } from "../../../chunks/AppButton.js";
import { P as PageHeader } from "../../../chunks/PageHeader.js";
import { a as formatDate, f as formatCurrency } from "../../../chunks/formatters.js";
import { g as goto } from "../../../chunks/client.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let currentFilter = "all";
    const filterTabs = [
      { value: "all", label: "All" },
      { value: "paid", label: "Paid" },
      { value: "unpaid", label: "Unpaid" },
      { value: "overdue", label: "Overdue" }
    ];
    function calculateTotal(estimate) {
      const subtotal = estimate.items.reduce((sum, item) => sum + item.rate * item.quantity, 0);
      const taxAmount = subtotal * (estimate.taxRate / 100);
      return subtotal + taxAmount + estimate.shipping - estimate.discount;
    }
    const columns = [
      { key: "estimateNumber", label: "Number" },
      { key: "client", label: "Client" },
      { key: "status", label: "Status" },
      { key: "amount", label: "Amount", align: "right" },
      {
        key: "dateIssued",
        label: "Date",
        align: "right",
        hideOnMobile: true
      },
      { key: "actions", label: "", align: "right" }
    ];
    let filteredEstimates = derived(() => store_get($$store_subs ??= {}, "$estimates", estimates).filter((est) => {
      return true;
    }));
    let tableData = derived(() => filteredEstimates().map((est) => ({
      raw: est,
      estimateNumber: est.estimateNumber,
      client: est.client.companyName,
      status: est.status,
      amount: formatCurrency(calculateTotal(est), est.currency),
      dateIssued: formatDate(est.dateIssued)
    })));
    function handleRowClick(item) {
      goto(`/estimates/${item.raw.id}/preview`);
    }
    head("1qutpmo", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Estimates - Invoicer App</title>`);
      });
    });
    PageHeader($$renderer2, {
      title: "Estimates",
      children: ($$renderer3) => {
        AppButton($$renderer3, {
          "data-sveltekit-reload": true,
          href: "/estimates/new",
          variant: "primary",
          size: "sm",
          children: ($$renderer4) => {
            $$renderer4.push(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 mr-1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"></path></svg> New Estimate`);
          },
          $$slots: { default: true }
        });
      }
    });
    $$renderer2.push(`<!----> <div class="mb-5 overflow-x-auto"><div class="border-b border-slate-200"><nav class="-mb-px flex space-x-1 sm:space-x-2 min-w-max" aria-label="Estimate filter tabs"><!--[-->`);
    const each_array = ensure_array_like(filterTabs);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let tab = each_array[$$index];
      $$renderer2.push(`<button${attr_class(`whitespace-nowrap py-3 px-3 border-b-2 font-medium text-sm transition-colors focus:outline-none ${stringify(currentFilter === tab.value ? "border-emerald-500 text-emerald-600" : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300")}`)}>${escape_html(tab.label)} `);
      if (tab.value === "all") {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<span class="ml-1.5 bg-slate-100 text-slate-600 py-0.5 px-2 rounded-full text-xs font-medium">${escape_html(store_get($$store_subs ??= {}, "$estimates", estimates).length)}</span>`);
      } else {
        $$renderer2.push("<!--[-1-->");
        const count = store_get($$store_subs ??= {}, "$estimates", estimates).filter((e) => tab.value === "unpaid" ? e.status !== "accepted" && e.status !== "declined" && e.status !== "expired" : e.status === tab.value).length;
        if (count > 0) {
          $$renderer2.push("<!--[0-->");
          $$renderer2.push(`<span${attr_class(`ml-1.5 ${stringify(currentFilter === tab.value ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600")} py-0.5 px-2 rounded-full text-xs font-medium`)}>${escape_html(count)}</span>`);
        } else {
          $$renderer2.push("<!--[-1-->");
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]--></button>`);
    }
    $$renderer2.push(`<!--]--></nav></div></div> `);
    {
      let emptyStateAction = function($$renderer3) {
        AppButton($$renderer3, {
          "data-sveltekit-reload": true,
          href: "/estimates/new",
          variant: "primary",
          size: "sm",
          class: "mt-4",
          children: ($$renderer4) => {
            $$renderer4.push(`<!---->Create your first estimate`);
          },
          $$slots: { default: true }
        });
      }, row = function($$renderer3, rowData) {
        $$renderer3.push(`<td class="px-5 py-4 whitespace-nowrap text-sm font-bold text-slate-900">${escape_html(rowData.estimateNumber)}</td> <td class="px-5 py-4 whitespace-nowrap text-sm font-medium text-slate-700">${escape_html(rowData.client)}</td> <td class="px-5 py-4 whitespace-nowrap">`);
        StatusBadge($$renderer3, { status: rowData.status });
        $$renderer3.push(`<!----></td> <td class="px-5 py-4 whitespace-nowrap text-sm font-bold text-slate-900 text-right">${escape_html(rowData.amount)}</td> <td class="px-5 py-4 whitespace-nowrap text-sm text-slate-500 text-right hidden sm:table-cell">${escape_html(rowData.dateIssued)}</td> <td class="px-5 py-4 whitespace-nowrap text-right text-sm"><div class="flex justify-end gap-1.5">`);
        AppButton($$renderer3, {
          variant: "ghost",
          size: "sm",
          href: `/estimates/${rowData.raw.id}/preview`,
          onclick: (e) => e.stopPropagation(),
          children: ($$renderer4) => {
            $$renderer4.push(`<!---->View`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----> `);
        AppButton($$renderer3, {
          variant: "outline",
          size: "sm",
          href: `/estimates/${rowData.raw.id}`,
          onclick: (e) => e.stopPropagation(),
          children: ($$renderer4) => {
            $$renderer4.push(`<!---->Edit`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----></div></td>`);
      };
      DataTable($$renderer2, {
        columns,
        data: tableData(),
        onRowClick: handleRowClick,
        emptyMessage: `No ${""}estimates found.`,
        emptyStateAction,
        row
      });
    }
    $$renderer2.push(`<!---->`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _page as default
};
