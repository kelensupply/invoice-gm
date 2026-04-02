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
    head("gimkg8", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Reset Password - Invoicer App</title>`);
      });
    });
    $$renderer2.push(`<div class="min-h-screen bg-slate-50 flex flex-col justify-center relative overflow-hidden"><div class="absolute top-0 left-0 -ml-20 -mt-20 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div> <div class="absolute bottom-0 right-0 -mr-20 -mb-20 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div> <div class="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4 sm:px-0"><div class="bg-white/80 backdrop-blur-xl py-10 px-6 sm:px-12 shadow-2xl rounded-3xl border border-white"><div class="mb-8 text-center"><div class="mx-auto w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center text-white mb-6 shadow-lg shadow-emerald-500/30"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"></path></svg></div> <h2 class="text-3xl font-extrabold text-slate-900 tracking-tight">Set New Password</h2> <p class="mt-2 text-sm text-slate-600">Enter and confirm your new password below.</p></div> `);
    if (form?.success) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="rounded-xl bg-emerald-50 p-5 border border-emerald-100 text-center"><svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-emerald-500 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> <p class="text-sm font-semibold text-emerald-800">Password updated!</p> <p class="text-xs text-emerald-700 mt-1">Your password has been changed successfully.</p> <a href="/login" class="mt-4 inline-block text-sm font-bold text-emerald-700 underline">Go to login</a></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
      if (form?.error) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<div class="mb-5 rounded-xl bg-red-50 p-4 border border-red-100 text-sm text-red-700 font-medium">${escape_html(form.error)}</div>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--> <form method="POST" class="space-y-5"><div><label for="password" class="block text-sm font-semibold text-slate-900 mb-1.5">New Password</label> <div class="relative"><input${attr("type", "password")} name="password" id="password" required="" minlength="8" placeholder="Min 8 characters" class="block w-full rounded-xl border border-slate-200 bg-white/50 px-4 py-3 pr-12 text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 transition-all duration-200 outline-none sm:text-sm"/> <button type="button" class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">`);
      {
        $$renderer2.push("<!--[-1-->");
        $$renderer2.push(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"></path><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>`);
      }
      $$renderer2.push(`<!--]--></button></div></div> <div><label for="confirm" class="block text-sm font-semibold text-slate-900 mb-1.5">Confirm Password</label> <div class="relative"><input${attr("type", "password")} name="confirm" id="confirm" required="" minlength="8" placeholder="Repeat your password" class="block w-full rounded-xl border border-slate-200 bg-white/50 px-4 py-3 pr-12 text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 transition-all duration-200 outline-none sm:text-sm"/> <button type="button" class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">`);
      {
        $$renderer2.push("<!--[-1-->");
        $$renderer2.push(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"></path><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>`);
      }
      $$renderer2.push(`<!--]--></button></div></div> <div class="pt-2"><button type="submit"${attr("disabled", loading, true)} class="flex w-full justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200">`);
      {
        $$renderer2.push("<!--[-1-->");
        $$renderer2.push(`Update Password`);
      }
      $$renderer2.push(`<!--]--></button></div></form>`);
    }
    $$renderer2.push(`<!--]--></div></div></div>`);
  });
}
export {
  _page as default
};
