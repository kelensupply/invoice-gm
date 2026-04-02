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
    head("1wx4tso", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Forgot Password - Invoicer App</title>`);
      });
    });
    $$renderer2.push(`<div class="min-h-screen bg-slate-50 flex flex-col justify-center relative overflow-hidden"><div class="absolute top-0 left-0 -ml-20 -mt-20 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div> <div class="absolute bottom-0 right-0 -mr-20 -mb-20 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div> <div class="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4 sm:px-0"><div class="bg-white/80 backdrop-blur-xl py-10 px-6 sm:px-12 shadow-2xl rounded-3xl border border-white"><div class="mb-8 text-center"><div class="mx-auto w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white mb-6 shadow-lg shadow-blue-500/30"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"></path></svg></div> <h2 class="text-3xl font-extrabold text-slate-900 tracking-tight">Forgot Password?</h2> <p class="mt-2 text-sm text-slate-600">No worries. We'll send you a reset link.</p></div> `);
    if (form?.success) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="rounded-xl bg-emerald-50 p-5 border border-emerald-100 text-center"><svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-emerald-500 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51-4.66-2.51m0 0-1.023-.55a2.25 2.25 0 00-2.134 0l-1.022.55m0 0-4.661 2.51m16.5 1.615a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V8.844a2.25 2.25 0 011.183-1.98l7.5-4.04a2.25 2.25 0 012.134 0l7.5 4.04a2.25 2.25 0 011.183 1.98V19.5z"></path></svg> <p class="text-sm font-semibold text-emerald-800">Check your email!</p> <p class="text-xs text-emerald-700 mt-1">A password reset link has been sent to your inbox.</p></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
      if (form?.error) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<div class="mb-5 rounded-xl bg-red-50 p-4 border border-red-100 text-sm text-red-700 font-medium">${escape_html(form.error)}</div>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--> <form method="POST"><div class="mb-6"><label for="email" class="block text-sm font-semibold text-slate-900 mb-1.5">Email address</label> <input type="email" name="email" id="email" required="" placeholder="you@domain.com" class="block w-full rounded-xl border border-slate-200 bg-white/50 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 outline-none sm:text-sm"/></div> <button type="submit"${attr("disabled", loading, true)} class="flex w-full justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200">`);
      {
        $$renderer2.push("<!--[-1-->");
        $$renderer2.push(`Send Reset Link`);
      }
      $$renderer2.push(`<!--]--></button></form>`);
    }
    $$renderer2.push(`<!--]--> <div class="mt-8 text-center text-sm text-slate-600">Remember your password? <a href="/login" class="font-bold text-blue-600 hover:text-blue-500 transition-colors">Sign in</a></div></div></div></div>`);
  });
}
export {
  _page as default
};
