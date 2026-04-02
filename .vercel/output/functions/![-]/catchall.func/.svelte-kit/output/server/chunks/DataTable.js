import { c as escape_html, e as ensure_array_like, a as attr_class, f as stringify, g as derived } from "./index.js";
function DataTable($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      data = [],
      columns = [],
      emptyMessage = "No records found.",
      emptyStateAction,
      title = void 0,
      titleAction = void 0,
      row: rowSnippet,
      onRowClick
    } = $$props;
    let visibleColumns = derived(() => columns.filter((col) => !col.hideOnMobile));
    $$renderer2.push(`<div class="section-card">`);
    if (title || titleAction) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="flex items-center justify-between px-5 py-4 border-b border-slate-200 bg-white">`);
      if (title) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<h2 class="section-title">${escape_html(title)}</h2>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (titleAction) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<div class="flex-shrink-0">`);
        titleAction($$renderer2);
        $$renderer2.push(`<!----></div>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (data.length === 0) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="flex flex-col items-center justify-center p-8 sm:p-12 text-slate-500"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12 mb-4 text-slate-300"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"></path></svg> <p class="text-sm font-medium text-slate-500">${escape_html(emptyMessage)}</p> `);
      emptyStateAction?.($$renderer2);
      $$renderer2.push(`<!----></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<div class="hidden sm:block overflow-x-auto"><table class="min-w-full divide-y divide-slate-200"><thead class="bg-slate-50"><tr><!--[-->`);
      const each_array = ensure_array_like(columns);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let col = each_array[$$index];
        $$renderer2.push(`<th scope="col"${attr_class(`px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider text-${stringify(col.align || "left")}`)}>${escape_html(col.label)}</th>`);
      }
      $$renderer2.push(`<!--]--></tr></thead><tbody class="bg-white divide-y divide-slate-100"><!--[-->`);
      const each_array_1 = ensure_array_like(data);
      for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
        let row = each_array_1[i];
        $$renderer2.push(`<tr class="hover:bg-slate-50 focus-within:bg-slate-50 cursor-pointer transition-colors group">`);
        if (rowSnippet) {
          $$renderer2.push("<!--[0-->");
          rowSnippet($$renderer2, row, i);
          $$renderer2.push(`<!---->`);
        } else {
          $$renderer2.push("<!--[-1-->");
          $$renderer2.push(`<!--[-->`);
          const each_array_2 = ensure_array_like(columns);
          for (let $$index_1 = 0, $$length2 = each_array_2.length; $$index_1 < $$length2; $$index_1++) {
            let col = each_array_2[$$index_1];
            $$renderer2.push(`<td class="px-5 py-4 whitespace-nowrap text-sm text-slate-600">${escape_html(row[col.key])}</td>`);
          }
          $$renderer2.push(`<!--]-->`);
        }
        $$renderer2.push(`<!--]--></tr>`);
      }
      $$renderer2.push(`<!--]--></tbody></table></div> <div class="sm:hidden divide-y divide-slate-200"><!--[-->`);
      const each_array_3 = ensure_array_like(data);
      for (let i = 0, $$length = each_array_3.length; i < $$length; i++) {
        let row = each_array_3[i];
        $$renderer2.push(`<div role="button" tabindex="0" class="p-4 hover:bg-slate-50 active:bg-slate-100 transition-colors cursor-pointer outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500">`);
        if (rowSnippet) {
          $$renderer2.push("<!--[0-->");
          $$renderer2.push(`<div class="space-y-2">`);
          rowSnippet($$renderer2, row, i);
          $$renderer2.push(`<!----></div>`);
        } else {
          $$renderer2.push("<!--[-1-->");
          $$renderer2.push(`<div class="space-y-3"><!--[-->`);
          const each_array_4 = ensure_array_like(visibleColumns());
          for (let $$index_3 = 0, $$length2 = each_array_4.length; $$index_3 < $$length2; $$index_3++) {
            let col = each_array_4[$$index_3];
            $$renderer2.push(`<div class="flex justify-between items-start"><span class="text-xs font-semibold text-slate-500 uppercase tracking-wider">${escape_html(col.label)}</span> <span class="text-sm text-slate-900 font-medium text-right flex-1 ml-2">${escape_html(row[col.key])}</span></div>`);
          }
          $$renderer2.push(`<!--]--></div>`);
        }
        $$renderer2.push(`<!--]--></div>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
export {
  DataTable as D
};
