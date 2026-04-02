import { i as head, c as escape_html, g as derived, s as store_get, d as unsubscribe_stores } from "../../../chunks/index.js";
import { g as goto } from "../../../chunks/client.js";
import { i as items } from "../../../chunks/items.js";
import { g as getCategoryLabel } from "../../../chunks/categories.js";
import { s as settings } from "../../../chunks/settings.js";
import { f as formatCurrency } from "../../../chunks/formatters.js";
import { D as DataTable } from "../../../chunks/DataTable.js";
import { A as AppButton } from "../../../chunks/AppButton.js";
import { P as PageHeader } from "../../../chunks/PageHeader.js";
import { C as ConfirmDialog } from "../../../chunks/ConfirmDialog.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let dialogOpen = false;
    let itemToDelete = null;
    const columns = [
      { key: "name", label: "Product Name" },
      { key: "category", label: "Category" },
      { key: "description", label: "Description", hideOnMobile: true },
      { key: "rate", label: "Default Rate", align: "right" }
    ];
    function handleDelete() {
    }
    function handleItemClick(itemId) {
      goto();
    }
    let tableData = derived(() => store_get($$store_subs ??= {}, "$items", items).map((item) => ({
      raw: item,
      name: item.name,
      category: getCategoryLabel(item.category),
      description: item.description,
      rate: formatCurrency(item.rate, store_get($$store_subs ??= {}, "$settings", settings).defaultCurrency)
    })));
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      head("rk8na7", $$renderer3, ($$renderer4) => {
        $$renderer4.title(($$renderer5) => {
          $$renderer5.push(`<title>Products - Invoicer App</title>`);
        });
      });
      PageHeader($$renderer3, {
        title: "Products Library",
        subtitle: "Manage your products and services",
        children: ($$renderer4) => {
          AppButton($$renderer4, {
            href: "/items/new",
            variant: "primary",
            size: "sm",
            children: ($$renderer5) => {
              $$renderer5.push(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 mr-1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"></path></svg> Add Product`);
            },
            $$slots: { default: true }
          });
        }
      });
      $$renderer3.push(`<!----> `);
      {
        let emptyStateAction = function($$renderer4) {
          AppButton($$renderer4, {
            href: "/items/new",
            variant: "primary",
            size: "sm",
            class: "mt-4",
            children: ($$renderer5) => {
              $$renderer5.push(`<!---->Add your first product`);
            },
            $$slots: { default: true }
          });
        }, row = function($$renderer4, row2) {
          $$renderer4.push(`<td class="px-5 py-4 whitespace-nowrap text-sm font-bold text-slate-900 cursor-pointer hover:text-emerald-600 transition-colors">${escape_html(row2.name)}</td> <td class="px-5 py-4 whitespace-nowrap cursor-pointer"><span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">${escape_html(row2.category)}</span></td> <td class="px-5 py-4 text-sm text-slate-500 max-w-xs truncate cursor-pointer hidden sm:table-cell">${escape_html(row2.description)}</td> <td class="px-5 py-4 whitespace-nowrap text-sm font-semibold text-slate-900 text-right cursor-pointer">${escape_html(row2.rate)}</td> <td class="px-5 py-4 whitespace-nowrap text-right text-sm"><div class="flex justify-end gap-1.5 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">`);
          AppButton($$renderer4, {
            variant: "outline",
            size: "sm",
            onclick: (e) => {
              e.stopPropagation();
              handleItemClick(row2.raw.id);
            },
            children: ($$renderer5) => {
              $$renderer5.push(`<!---->Edit`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!----> <button class="p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors" title="Delete product"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"></path></svg></button></div></td>`);
        };
        DataTable($$renderer3, {
          columns,
          data: tableData(),
          emptyMessage: "You haven't added any products yet.",
          emptyStateAction,
          row
        });
      }
      $$renderer3.push(`<!----> `);
      ConfirmDialog($$renderer3, {
        title: "Delete Product",
        description: `Are you sure you want to delete ${itemToDelete?.name}?`,
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
