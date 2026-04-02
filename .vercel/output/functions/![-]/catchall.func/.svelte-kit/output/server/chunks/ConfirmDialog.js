import { c as escape_html, j as bind_props } from "./index.js";
import { A as AppButton } from "./AppButton.js";
function ConfirmDialog($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      open = false,
      title,
      description,
      confirmText = "Confirm",
      cancelText = "Cancel",
      destructive = false,
      onconfirm,
      oncancel
    } = $$props;
    function handleConfirm() {
      if (onconfirm) onconfirm();
      open = false;
    }
    function handleCancel() {
      if (oncancel) oncancel();
      open = false;
    }
    if (open) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="relative z-50"><div class="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity" aria-hidden="true"></div> <div class="fixed inset-0 z-10 w-screen overflow-y-auto"><div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"><div class="relative transform overflow-hidden rounded-xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"><div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4"><div class="sm:flex sm:items-start">`);
      if (destructive) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"><svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg></div>`);
      } else {
        $$renderer2.push("<!--[-1-->");
        $$renderer2.push(`<div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10"><svg class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"></path></svg></div>`);
      }
      $$renderer2.push(`<!--]--> <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left"><h3 class="text-base font-semibold leading-6 text-slate-900">${escape_html(title)}</h3> <div class="mt-2"><p class="text-sm text-slate-500">${escape_html(description)}</p></div></div></div></div> <div class="bg-slate-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6"><div class="sm:ml-3">`);
      AppButton($$renderer2, {
        variant: destructive ? "danger" : "primary",
        onclick: handleConfirm,
        children: ($$renderer3) => {
          $$renderer3.push(`<!---->${escape_html(confirmText)}`);
        },
        $$slots: { default: true }
      });
      $$renderer2.push(`<!----></div> <div class="mt-3 sm:mt-0">`);
      AppButton($$renderer2, {
        variant: "secondary",
        onclick: handleCancel,
        children: ($$renderer3) => {
          $$renderer3.push(`<!---->${escape_html(cancelText)}`);
        },
        $$slots: { default: true }
      });
      $$renderer2.push(`<!----></div></div></div></div></div></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { open });
  });
}
export {
  ConfirmDialog as C
};
