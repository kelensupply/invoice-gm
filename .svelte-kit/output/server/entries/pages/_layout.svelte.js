import { a as attr_class, e as ensure_array_like, s as store_get, b as attr, c as escape_html, d as unsubscribe_stores, f as stringify, g as derived } from "../../chunks/index.js";
import { p as page } from "../../chunks/stores.js";
import "@sveltejs/kit/internal";
import "../../chunks/exports.js";
import "../../chunks/utils2.js";
import "@sveltejs/kit/internal/server";
import "../../chunks/root.js";
import "../../chunks/state.svelte.js";
function Sidebar($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let { session, isMobile = false, onclose } = $$props;
    const menuItems = [
      {
        name: "Dashboard",
        path: "/dashboard",
        icon: "m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
      },
      {
        name: "Sales",
        icon: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z",
        subItems: [
          {
            name: "Invoices",
            path: "/invoices",
            icon: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125"
          },
          {
            name: "Estimates",
            path: "/estimates",
            icon: "M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          }
        ]
      },
      {
        name: "Purchases",
        path: "/expenses",
        icon: "M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75m0 5.25v.75m0 5.25v.75m1.5-8.25h15m-15 5.25h15m-15 5.25h15M3.75 4.5a1.5 1.5 0 0 1 1.5-1.5h15a1.5 1.5 0 0 1 1.5 1.5v15a1.5 1.5 0 0 1-1.5 1.5h-15a1.5 1.5 0 0 1-1.5-1.5V4.5Z"
      },
      {
        name: "Customers",
        path: "/clients",
        icon: "M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
      },
      {
        name: "Products",
        icon: "M20.25 7.5l-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z",
        subItems: [
          {
            name: "List Products",
            path: "/items",
            icon: "M20.25 7.5l-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
          },
          {
            name: "Add Product",
            path: "/items/new",
            icon: "M12 4.5v15m7.5-7.5h-15"
          }
        ]
      },
      {
        name: "Settings",
        path: "/settings",
        icon: "M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.992l1.005.828c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      }
    ];
    let expandedMenus = /* @__PURE__ */ new Set();
    $$renderer2.push(`<aside${attr_class(`${stringify(isMobile ? "w-full" : "w-64")} bg-slate-800 text-slate-300 min-h-screen flex flex-col ${stringify(!isMobile ? "fixed left-0 top-0 bottom-0 z-20" : "")}`)}>`);
    if (isMobile) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="absolute right-4 top-4 z-50"><button type="button" class="p-2 text-slate-400 hover:text-white" title="Close menu" aria-label="Close menu"><svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg></button></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <div class="h-20 flex items-center px-6 border-b border-slate-700/50"><div class="flex items-center gap-3"><div class="w-9 h-9 rounded-lg bg-emerald-500 flex items-center justify-center text-white font-bold shadow-lg shadow-emerald-500/30"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"></path></svg></div> <div><span class="text-white text-sm font-bold tracking-tight block leading-tight">Invoicer</span> <span class="text-slate-400 text-[10px] font-medium">Business</span></div></div></div> <nav class="flex-1 py-6 px-3 flex flex-col gap-0.5 overflow-y-auto"><!--[-->`);
    const each_array = ensure_array_like(menuItems);
    for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
      let item = each_array[$$index_1];
      const isItemActive = item.path ? store_get($$store_subs ??= {}, "$page", page).url.pathname === item.path || store_get($$store_subs ??= {}, "$page", page).url.pathname.startsWith(item.path + "/") && item.path !== "/dashboard" : false;
      const isSubActive = item.subItems?.some((sub) => store_get($$store_subs ??= {}, "$page", page).url.pathname === sub.path) || false;
      const isActive = isItemActive || isSubActive;
      if (item.subItems) {
        $$renderer2.push("<!--[0-->");
        const isExpanded = expandedMenus.has(item.name);
        $$renderer2.push(`<div><button${attr_class(`w-full flex items-center justify-between px-4 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium ${stringify(isActive ? "text-emerald-300 bg-slate-700/40" : "text-slate-300 hover:text-white hover:bg-slate-700/30")}`)}><div class="flex items-center gap-3"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"${attr_class(`w-5 h-5 flex-shrink-0 ${stringify(isActive ? "text-emerald-400" : "text-slate-400")}`)}><path stroke-linecap="round" stroke-linejoin="round"${attr("d", item.icon)}></path></svg> <span class="text-sm font-medium tracking-tight">${escape_html(item.name)}</span></div> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor"${attr_class(`w-3.5 h-3.5 opacity-60 transition-transform duration-200 flex-shrink-0 ${stringify(isExpanded ? "rotate-180" : "")}`)}><path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"></path></svg></button> `);
        if (isExpanded) {
          $$renderer2.push("<!--[0-->");
          $$renderer2.push(`<div class="mt-1 space-y-1 ml-2"><!--[-->`);
          const each_array_1 = ensure_array_like(item.subItems);
          for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
            let sub = each_array_1[$$index];
            const isSubActive2 = store_get($$store_subs ??= {}, "$page", page).url.pathname === sub.path;
            $$renderer2.push(`<a data-sveltekit-reload=""${attr("href", sub.path)}${attr_class(`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 text-sm ${stringify(isSubActive2 ? "text-white bg-emerald-500/20 font-medium" : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/30 font-normal")}`)}><div${attr_class(`w-1.5 h-1.5 rounded-full flex-shrink-0 ${stringify(isSubActive2 ? "bg-emerald-400" : "bg-slate-500")}`)}></div> <span>${escape_html(sub.name)}</span></a>`);
          }
          $$renderer2.push(`<!--]--></div>`);
        } else {
          $$renderer2.push("<!--[-1-->");
        }
        $$renderer2.push(`<!--]--></div>`);
      } else {
        $$renderer2.push("<!--[-1-->");
        $$renderer2.push(`<a data-sveltekit-reload=""${attr("href", item.path)}${attr_class(`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium ${stringify(isActive ? "text-emerald-300 bg-slate-700/40" : "text-slate-300 hover:text-white hover:bg-slate-700/30")}`)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"${attr_class(`w-5 h-5 flex-shrink-0 ${stringify(isActive ? "text-emerald-400" : "text-slate-400")}`)}><path stroke-linecap="round" stroke-linejoin="round"${attr("d", item.icon)}></path></svg> <span class="tracking-tight">${escape_html(item.name)}</span></a>`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></nav> <div class="p-4 border-t border-slate-700/50 bg-slate-800/50"><div class="flex items-center gap-3 px-3"><div class="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 text-xs font-bold flex-shrink-0">${escape_html(session?.user?.email?.charAt(0).toUpperCase() || "U")}</div> <div class="flex-1 overflow-hidden min-w-0"><p class="text-xs font-semibold text-white truncate">Account</p> <p class="text-[10px] text-slate-400 truncate">${escape_html(session?.user?.email || "Guest")}</p></div> `);
    if (session) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<form method="POST" action="/logout"><button type="submit" class="text-slate-400 hover:text-white p-1.5 rounded-md hover:bg-slate-700 transition-colors flex-shrink-0" title="Logout"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0110.5 3h6a2.25 2.25 0 012.25 2.25v13.5A2.25 2.25 0 0116.5 21h-6a2.25 2.25 0 01-2.25-2.25V15m-3 0l3-3m0 0l-3-3m3 3H3"></path></svg></button></form>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div></div></aside>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function AppShell($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let { children, session } = $$props;
    let isSidebarOpen = false;
    $$renderer2.push(`<div class="flex min-h-screen bg-slate-50 font-sans text-slate-800"><div${attr_class(`fixed inset-0 z-40 lg:hidden ${stringify(isSidebarOpen ? "block" : "hidden")}`)}><div class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"></div> <div class="relative flex w-full max-w-xs flex-1 flex-col bg-slate-800 focus:outline-none h-full overflow-y-auto">`);
    Sidebar($$renderer2, {
      session,
      isMobile: true,
      onclose: () => isSidebarOpen = false
    });
    $$renderer2.push(`<!----></div></div> <div class="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 z-30 lg:overflow-y-auto">`);
    Sidebar($$renderer2, { session });
    $$renderer2.push(`<!----></div> <div class="flex flex-1 flex-col lg:pl-64 min-w-0"><div class="sticky top-0 z-20 flex h-14 sm:h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6 shadow-sm lg:hidden"><div class="flex items-center"><h1 class="font-black text-lg text-slate-900 truncate flex items-center gap-2"><div class="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"></path></svg></div> Invoicer</h1></div> <div class="flex items-center gap-x-2 sm:gap-x-4 flex-shrink-0"><div class="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-emerald-100 flex items-center justify-center text-xs font-bold text-emerald-700 uppercase flex-shrink-0 border border-emerald-200 ring-2 ring-white shadow-sm">${escape_html(session?.user?.email?.charAt(0) || "U")}</div></div></div> <main class="flex-1 min-w-0 overflow-y-auto pb-20 lg:pb-0"><div class="container-responsive py-4 sm:py-6 md:py-8">`);
    children($$renderer2);
    $$renderer2.push(`<!----></div></main></div> <nav class="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 lg:hidden flex justify-around items-center h-[68px] px-2 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]"><a href="/dashboard"${attr_class(`flex flex-col items-center justify-center w-full h-full space-y-1 text-slate-500 hover:text-emerald-600 ${stringify(store_get($$store_subs ??= {}, "$page", page).url.pathname === "/dashboard" ? "text-emerald-600" : "")} relative`)}>`);
    if (store_get($$store_subs ??= {}, "$page", page).url.pathname === "/dashboard") {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="absolute top-0 w-8 h-1 bg-emerald-500 rounded-b-full"></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"></path></svg> <span class="text-[10px] font-bold tracking-wide">Home</span></a> <a href="/invoices"${attr_class(`flex flex-col items-center justify-center w-full h-full space-y-1 text-slate-500 hover:text-emerald-600 ${stringify(store_get($$store_subs ??= {}, "$page", page).url.pathname.startsWith("/invoices") ? "text-emerald-600" : "")} relative`)}>`);
    if (store_get($$store_subs ??= {}, "$page", page).url.pathname.startsWith("/invoices")) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="absolute top-0 w-8 h-1 bg-emerald-500 rounded-b-full"></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"></path></svg> <span class="text-[10px] font-bold tracking-wide">Sales</span></a> <a href="/estimates"${attr_class(`flex flex-col items-center justify-center w-full h-full space-y-1 text-slate-500 hover:text-emerald-600 ${stringify(store_get($$store_subs ??= {}, "$page", page).url.pathname.startsWith("/estimates") ? "text-emerald-600" : "")} relative`)}>`);
    if (store_get($$store_subs ??= {}, "$page", page).url.pathname.startsWith("/estimates")) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="absolute top-0 w-8 h-1 bg-emerald-500 rounded-b-full"></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"></path></svg> <span class="text-[10px] font-bold tracking-wide">Estimates</span></a> <a href="/clients"${attr_class(`flex flex-col items-center justify-center w-full h-full space-y-1 text-slate-500 hover:text-emerald-600 ${stringify(store_get($$store_subs ??= {}, "$page", page).url.pathname.startsWith("/clients") ? "text-emerald-600" : "")} relative`)}>`);
    if (store_get($$store_subs ??= {}, "$page", page).url.pathname.startsWith("/clients")) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="absolute top-0 w-8 h-1 bg-emerald-500 rounded-b-full"></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"></path></svg> <span class="text-[10px] font-bold tracking-wide">Customers</span></a> <button class="flex flex-col items-center justify-center w-full h-full space-y-1 text-slate-500 hover:text-emerald-600 relative"><svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path></svg> <span class="text-[10px] font-bold tracking-wide">More</span></button></nav></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function _layout($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let { children, data } = $$props;
    let session = derived(() => data.session);
    let isAuthRoute = derived(() => store_get($$store_subs ??= {}, "$page", page).url.pathname.startsWith("/login") || store_get($$store_subs ??= {}, "$page", page).url.pathname.startsWith("/signup") || store_get($$store_subs ??= {}, "$page", page).url.pathname.startsWith("/view") || store_get($$store_subs ??= {}, "$page", page).url.pathname === "/");
    if (isAuthRoute()) {
      $$renderer2.push("<!--[0-->");
      children($$renderer2);
      $$renderer2.push(`<!---->`);
    } else {
      $$renderer2.push("<!--[-1-->");
      AppShell($$renderer2, {
        session: session(),
        children: ($$renderer3) => {
          if (session()) {
            $$renderer3.push("<!--[0-->");
            $$renderer3.push(`<div class="flex items-center justify-center min-h-[60vh]"><div class="flex flex-col items-center gap-4"><svg class="animate-spin h-10 w-10 text-emerald-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> <p class="text-slate-500 font-medium animate-pulse">Loading your workspace...</p></div></div>`);
          } else {
            $$renderer3.push("<!--[-1-->");
            children($$renderer3);
            $$renderer3.push(`<!---->`);
          }
          $$renderer3.push(`<!--]-->`);
        }
      });
    }
    $$renderer2.push(`<!--]-->`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _layout as default
};
