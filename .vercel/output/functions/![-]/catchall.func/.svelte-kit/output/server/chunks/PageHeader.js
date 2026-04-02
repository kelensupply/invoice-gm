import { c as escape_html } from "./index.js";
function PageHeader($$renderer, $$props) {
  let { title, subtitle = void 0, children } = $$props;
  $$renderer.push(`<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-6 sm:mb-8"><div class="min-w-0"><h1 class="page-title">${escape_html(title)}</h1> `);
  if (subtitle) {
    $$renderer.push("<!--[0-->");
    $$renderer.push(`<p class="text-muted mt-1">${escape_html(subtitle)}</p>`);
  } else {
    $$renderer.push("<!--[-1-->");
  }
  $$renderer.push(`<!--]--></div> `);
  if (children) {
    $$renderer.push("<!--[0-->");
    $$renderer.push(`<div class="flex items-center gap-2 flex-shrink-0 flex-wrap">`);
    children($$renderer);
    $$renderer.push(`<!----></div>`);
  } else {
    $$renderer.push("<!--[-1-->");
  }
  $$renderer.push(`<!--]--></div>`);
}
export {
  PageHeader as P
};
