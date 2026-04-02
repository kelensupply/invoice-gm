import { i as head, c as escape_html, b as attr, g as derived, s as store_get, d as unsubscribe_stores } from "../../../chunks/index.js";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils2.js";
import "@sveltejs/kit/internal/server";
import "../../../chunks/root.js";
import "../../../chunks/state.svelte.js";
import { p as page } from "../../../chunks/stores.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let { form } = $$props;
    let loading = false;
    let urlMessage = derived(() => store_get($$store_subs ??= {}, "$page", page).url.searchParams.get("message"));
    let urlError = derived(() => store_get($$store_subs ??= {}, "$page", page).url.searchParams.get("error"));
    head("1x05zx6", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Sign in - Invoicer App</title>`);
      });
    });
    $$renderer2.push(`<div class="min-h-screen bg-slate-50 flex flex-col justify-center relative overflow-hidden"><div class="absolute top-0 left-0 -ml-20 -mt-20 w-64 h-64 sm:w-96 sm:h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div> <div class="absolute bottom-0 right-0 -mr-20 -mb-20 w-64 h-64 sm:w-96 sm:h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div> <div class="mx-auto w-full px-4 sm:max-w-md relative z-10 sm:px-0"><div class="bg-white/80 backdrop-blur-xl py-8 sm:py-10 px-4 sm:px-12 shadow-2xl rounded-2xl sm:rounded-3xl border border-white"><div class="mb-8 sm:mb-10 text-center"><div class="mx-auto w-10 h-10 sm:w-12 sm:h-12 bg-emerald-500 rounded-xl flex items-center justify-center text-white mb-4 sm:mb-6 shadow-lg shadow-emerald-500/30"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 sm:w-7 sm:h-7"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"></path></svg></div> <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Welcome back</h2> <p class="mt-2 text-xs sm:text-sm text-slate-600">Sign in to manage your invoices</p></div> `);
    if (urlMessage()) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="mb-6 rounded-xl bg-emerald-50 p-4 border border-emerald-100 flex items-start gap-3"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd"></path></svg> <div class="text-sm font-medium text-emerald-800">${escape_html(urlMessage())}</div></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (urlError()) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="mb-6 rounded-xl bg-red-50 p-4 border border-red-100 flex items-start gap-3"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd"></path></svg> <div class="text-sm font-medium text-red-700">Authentication failed or email verification link
                        expired.</div></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <form method="POST" action="?/google"><button type="submit"${attr("disabled", loading, true)} class="flex w-full justify-center items-center gap-3 rounded-xl bg-white px-4 py-3 text-sm font-bold text-slate-700 shadow-sm border border-slate-200 hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-200 disabled:opacity-50"><svg class="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24"><path d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z" fill="#EA4335"></path><path d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z" fill="#4285F4"></path><path d="M5.26498 14.2949C5.02498 13.5698 4.88501 12.7998 4.88501 11.9998C4.88501 11.1998 5.01998 10.4298 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0598 0 11.9998C0 13.9398 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z" fill="#FBBC05"></path><path d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.26537 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z" fill="#34A853"></path></svg> Continue with Google</button></form> <div class="my-6 flex items-center justify-center"><div class="border-t border-slate-200 flex-grow"></div> <div class="px-4 text-sm font-medium text-slate-400">or continue with email</div> <div class="border-t border-slate-200 flex-grow"></div></div> <form class="space-y-5" method="POST" action="?/login">`);
    if (form?.error) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="rounded-xl bg-red-50 p-4 border border-red-100 flex items-start gap-3"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd"></path></svg> <div class="text-sm font-medium text-red-700">${escape_html(form.error)}</div></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <div><label for="email" class="block text-sm font-semibold text-slate-900 mb-1.5">Email address</label> <div class="relative"><input type="email" name="email" id="email" autocomplete="email" required="" placeholder="you@domain.com" class="block w-full rounded-xl border border-slate-200 bg-white/50 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 transition-all duration-200 outline-none sm:text-sm"/></div></div> <div><div class="flex items-center justify-between mb-1.5"><label for="password" class="block text-sm font-semibold text-slate-900">Password</label> <a href="/forgot-password" class="text-sm font-bold text-emerald-600 hover:text-emerald-500 transition-colors">Forgot password?</a></div> <div class="relative"><input type="password" name="password" id="password" autocomplete="current-password" required="" placeholder="••••••••" class="block w-full rounded-xl border border-slate-200 bg-white/50 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 transition-all duration-200 outline-none sm:text-sm"/></div></div> <div class="pt-2"><button type="submit"${attr("disabled", loading, true)} class="flex w-full justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200">`);
    {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`Sign in`);
    }
    $$renderer2.push(`<!--]--></button></div></form> <div class="mt-8 text-center sm:text-sm text-slate-600">Not a member? <a href="/signup" class="font-bold text-emerald-600 hover:text-emerald-500 transition-colors">Sign up now</a></div></div></div></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _page as default
};
