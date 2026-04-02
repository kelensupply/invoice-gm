import { i as head, c as escape_html, b as attr } from "../../../chunks/index.js";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils2.js";
import "@sveltejs/kit/internal/server";
import "../../../chunks/root.js";
import "../../../chunks/state.svelte.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { form } = $$props;
    let loading = false;
    head("kmqcod", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Sign up - Invoicer App</title>`);
      });
    });
    $$renderer2.push(`<div class="min-h-screen bg-slate-50 flex flex-col justify-center relative overflow-hidden"><div class="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 sm:w-96 sm:h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div> <div class="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 sm:w-96 sm:h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div> <div class="mx-auto w-full px-4 sm:max-w-md relative z-10 sm:px-0"><div class="bg-white/80 backdrop-blur-xl py-8 sm:py-10 px-4 sm:px-12 shadow-2xl rounded-2xl sm:rounded-3xl border border-white"><div class="mb-8 sm:mb-10 text-center"><div class="mx-auto w-10 h-10 sm:w-12 sm:h-12 bg-emerald-500 rounded-xl flex items-center justify-center text-white mb-4 sm:mb-6 shadow-lg shadow-emerald-500/30"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 sm:w-7 sm:h-7"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"></path></svg></div> <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Create your account</h2> <p class="mt-2 text-xs sm:text-sm text-slate-600">Join thousands of modern businesses</p></div> <form class="space-y-4 sm:space-y-5" method="POST">`);
    if (form?.error) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="rounded-xl bg-red-50 p-4 border border-red-100 flex items-start gap-3"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd"></path></svg> <div class="text-sm font-medium text-red-700">${escape_html(form.error)}</div></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (form?.success) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="rounded-xl bg-emerald-50 p-4 border border-emerald-100 flex items-start gap-3"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd"></path></svg> <div class="text-sm font-medium text-emerald-700">Check your email for the confirmation link to
                            complete your signup!</div></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <div><label for="email" class="block text-sm font-semibold text-slate-900 mb-1.5">Email address</label> <div class="relative"><input type="email" name="email" id="email" autocomplete="email" required="" placeholder="you@domain.com" class="block w-full rounded-xl border border-slate-200 bg-white/50 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 transition-all duration-200 outline-none sm:text-sm"/></div></div> <div><label for="password" class="block text-sm font-semibold text-slate-900 mb-1.5">Password</label> <div class="relative"><input type="password" name="password" id="password" autocomplete="new-password" required="" placeholder="••••••••" class="block w-full rounded-xl border border-slate-200 bg-white/50 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 transition-all duration-200 outline-none sm:text-sm"/></div></div> <div class="pt-2"><button type="submit"${attr("disabled", loading, true)} class="flex w-full justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200">`);
    {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`Sign up freely`);
    }
    $$renderer2.push(`<!--]--></button></div></form> <div class="mt-8 text-center sm:text-sm text-slate-600">Already have an account? <a href="/login" class="font-bold text-emerald-600 hover:text-emerald-500 transition-colors">Sign in</a></div></div></div></div>`);
  });
}
export {
  _page as default
};
