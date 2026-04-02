import { i as head, c as escape_html, g as derived, s as store_get, d as unsubscribe_stores } from "../../../chunks/index.js";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils2.js";
import "@sveltejs/kit/internal/server";
import "../../../chunks/root.js";
import "../../../chunks/state.svelte.js";
import { w as writable } from "../../../chunks/index2.js";
import { s as settings } from "../../../chunks/settings.js";
import { f as formatCurrency } from "../../../chunks/formatters.js";
import { D as DataTable } from "../../../chunks/DataTable.js";
import { A as AppButton } from "../../../chunks/AppButton.js";
import { P as PageHeader } from "../../../chunks/PageHeader.js";
import { C as ConfirmDialog } from "../../../chunks/ConfirmDialog.js";
const expenses = writable([]);
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let dialogOpen = false;
    const columns = [
      { key: "date", label: "Date" },
      { key: "category", label: "Category" },
      { key: "payee", label: "Payee" },
      { key: "amount", label: "Amount", align: "right" },
      { key: "actions", label: "", align: "right" }
    ];
    function handleDelete() {
    }
    let tableData = derived(() => store_get($$store_subs ??= {}, "$expenses", expenses).map((expense) => ({
      raw: expense,
      date: expense.date.toLocaleDateString(),
      category: expense.category,
      payee: expense.payee || "N/A",
      amount: formatCurrency(expense.amount, expense.currency || store_get($$store_subs ??= {}, "$settings", settings).defaultCurrency)
    })));
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      head("xzypbu", $$renderer3, ($$renderer4) => {
        $$renderer4.title(($$renderer5) => {
          $$renderer5.push(`<title>Purchases - Invoicer App</title>`);
        });
      });
      PageHeader($$renderer3, {
        title: "Purchases",
        subtitle: "Track your business purchases",
        children: ($$renderer4) => {
          AppButton($$renderer4, {
            href: "/expenses/new",
            variant: "primary",
            size: "sm",
            children: ($$renderer5) => {
              $$renderer5.push(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 mr-1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"></path></svg> Record Purchase`);
            },
            $$slots: { default: true }
          });
        }
      });
      $$renderer3.push(`<!----> `);
      {
        let emptyStateAction = function($$renderer4) {
          AppButton($$renderer4, {
            href: "/expenses/new",
            variant: "primary",
            size: "sm",
            class: "mt-4",
            children: ($$renderer5) => {
              $$renderer5.push(`<!---->Record your first purchase`);
            },
            $$slots: { default: true }
          });
        }, row = function($$renderer4, row2) {
          $$renderer4.push(`<td class="px-5 py-4 whitespace-nowrap text-sm text-slate-600">${escape_html(row2.date)}</td> <td class="px-5 py-4 whitespace-nowrap"><span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">${escape_html(row2.category)}</span></td> <td class="px-5 py-4 text-sm font-medium text-slate-900">${escape_html(row2.payee)}</td> <td class="px-5 py-4 whitespace-nowrap text-sm font-bold text-slate-900 text-right">${escape_html(row2.amount)}</td> <td class="px-5 py-4 whitespace-nowrap text-right text-sm"><div class="flex justify-end gap-1.5 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity"><button class="p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors" title="Delete purchase"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"></path></svg></button></div></td>`);
        };
        DataTable($$renderer3, {
          columns,
          data: tableData(),
          emptyMessage: "You haven't recorded any purchases yet.",
          emptyStateAction,
          row
        });
      }
      $$renderer3.push(`<!----> `);
      ConfirmDialog($$renderer3, {
        title: "Delete Purchase",
        description: "Are you sure you want to delete this purchase?",
        confirmText: "Delete",
        destructive: true,
        onconfirm: handleDelete,
        get open() {
          return dialogOpen;
        },
        set open($$value) {
          dialogOpen = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!---->`);
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
