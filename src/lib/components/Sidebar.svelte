<script lang="ts">
    import { page } from "$app/stores";
    import { enhance } from "$app/forms";
    import { slide } from "svelte/transition";

    let {
        session,
        isMobile = false,
        onclose,
    } = $props<{
        session?: any;
        isMobile?: boolean;
        onclose?: () => void;
    }>();

    const menuItems = [
        {
            name: "Dashboard",
            path: "/dashboard",
            icon: "m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25",
        },
        {
            name: "Sales",
            icon: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z",
            subItems: [
                {
                    name: "Invoices",
                    path: "/invoices",
                    icon: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125",
                },
                {
                    name: "Estimates",
                    path: "/estimates",
                    icon: "M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z",
                },
            ],
        },
        {
            name: "Purchases",
            path: "/expenses",
            icon: "M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75m0 5.25v.75m0 5.25v.75m1.5-8.25h15m-15 5.25h15m-15 5.25h15M3.75 4.5a1.5 1.5 0 0 1 1.5-1.5h15a1.5 1.5 0 0 1 1.5 1.5v15a1.5 1.5 0 0 1-1.5 1.5h-15a1.5 1.5 0 0 1-1.5-1.5V4.5Z",
        },
        {
            name: "Customers",
            path: "/clients",
            icon: "M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z",
        },
        {
            name: "Products",
            icon: "M20.25 7.5l-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z",
            subItems: [
                {
                    name: "List Products",
                    path: "/items",
                    icon: "M20.25 7.5l-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z",
                },
                {
                    name: "Add Product",
                    path: "/items/new",
                    icon: "M12 4.5v15m7.5-7.5h-15",
                },
            ],
        },
        {
            name: "Settings",
            path: "/settings",
            icon: "M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.992l1.005.828c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z",
        },
    ];

    let expandedMenus = $state(new Set<string>());
    let initialized = $state(false);

    // Auto-expand active sub-menus only on first render
    $effect(() => {
        if (initialized) return;

        const newExpanded = new Set<string>();
        menuItems.forEach((item) => {
            if (item.subItems) {
                const isActive = item.subItems.some(
                    (sub) =>
                        $page.url.pathname === sub.path ||
                        $page.url.pathname.startsWith(sub.path + "/"),
                );
                if (isActive) {
                    newExpanded.add(item.name);
                }
            }
        });

        expandedMenus = newExpanded;
        initialized = true;
    });

    function toggleMenu(name: string) {
        const newExpanded = new Set(expandedMenus);
        if (newExpanded.has(name)) {
            newExpanded.delete(name);
        } else {
            newExpanded.add(name);
        }
        expandedMenus = newExpanded;
    }
</script>

<aside
    class="{isMobile
        ? 'w-full'
        : 'w-64'} bg-slate-800 text-slate-300 min-h-screen flex flex-col {!isMobile
        ? 'fixed left-0 top-0 bottom-0 z-20'
        : ''}"
>
    <!-- Close button for mobile -->
    {#if isMobile}
        <div class="absolute right-4 top-4 z-50">
            <button
                type="button"
                class="p-2 text-slate-400 hover:text-white"
                onclick={onclose}
                title="Close menu"
                aria-label="Close menu"
            >
                <svg
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </button>
        </div>
    {/if}

    <div class="h-20 flex items-center px-6 border-b border-slate-700/50">
        <div class="flex items-center gap-3">
            <div
                class="w-9 h-9 rounded-lg bg-emerald-500 flex items-center justify-center text-white font-bold shadow-lg shadow-emerald-500/30"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    class="w-5 h-5"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                    />
                </svg>
            </div>
            <div>
                <span
                    class="text-white text-sm font-bold tracking-tight block leading-tight"
                    >Invoicer</span
                >
                <span class="text-slate-400 text-[10px] font-medium"
                    >Business</span
                >
            </div>
        </div>
    </div>

    <nav class="flex-1 py-6 px-3 flex flex-col gap-0.5 overflow-y-auto">
        {#each menuItems as item}
            {@const isItemActive = item.path
                ? $page.url.pathname === item.path ||
                  ($page.url.pathname.startsWith(item.path + "/") &&
                      item.path !== "/dashboard")
                : false}
            {@const isSubActive =
                item.subItems?.some((sub) => $page.url.pathname === sub.path) ||
                false}
            {@const isActive = isItemActive || isSubActive}

            {#if item.subItems}
                {@const isExpanded = expandedMenus.has(item.name)}
                <div>
                    <button
                        onclick={() => toggleMenu(item.name)}
                        class="w-full flex items-center justify-between px-4 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium {isActive
                            ? 'text-emerald-300 bg-slate-700/40'
                            : 'text-slate-300 hover:text-white hover:bg-slate-700/30'}"
                    >
                        <div class="flex items-center gap-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="w-5 h-5 flex-shrink-0 {isActive
                                    ? 'text-emerald-400'
                                    : 'text-slate-400'}"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d={item.icon}
                                />
                            </svg>
                            <span class="text-sm font-medium tracking-tight"
                                >{item.name}</span
                            >
                        </div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="2.5"
                            stroke="currentColor"
                            class="w-3.5 h-3.5 opacity-60 transition-transform duration-200 flex-shrink-0 {isExpanded
                                ? 'rotate-180'
                                : ''}"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="m19.5 8.25-7.5 7.5-7.5-7.5"
                            />
                        </svg>
                    </button>
                    {#if isExpanded}
                        <div
                            class="mt-1 space-y-1 ml-2"
                            transition:slide={{ duration: 200 }}
                        >
                            {#each item.subItems as sub}
                                {@const isSubActive =
                                    $page.url.pathname === sub.path}
                                <a
                                    data-sveltekit-reload
                                    href={sub.path}
                                    class="flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 text-sm {isSubActive
                                        ? 'text-white bg-emerald-500/20 font-medium'
                                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/30 font-normal'}"
                                >
                                    <div
                                        class="w-1.5 h-1.5 rounded-full flex-shrink-0 {isSubActive
                                            ? 'bg-emerald-400'
                                            : 'bg-slate-500'}"
                                    ></div>
                                    <span>{sub.name}</span>
                                </a>
                            {/each}
                        </div>
                    {/if}
                </div>
            {:else}
                <a
                    data-sveltekit-reload
                    href={item.path}
                    class="flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium {isActive
                        ? 'text-emerald-300 bg-slate-700/40'
                        : 'text-slate-300 hover:text-white hover:bg-slate-700/30'}"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-5 h-5 flex-shrink-0 {isActive
                            ? 'text-emerald-400'
                            : 'text-slate-400'}"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d={item.icon}
                        />
                    </svg>
                    <span class="tracking-tight">{item.name}</span>
                </a>
            {/if}
        {/each}
    </nav>

    <div class="p-4 border-t border-slate-700/50 bg-slate-800/50">
        <div class="flex items-center gap-3 px-3">
            <div
                class="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 text-xs font-bold flex-shrink-0"
            >
                {session?.user?.email?.charAt(0).toUpperCase() || "U"}
            </div>
            <div class="flex-1 overflow-hidden min-w-0">
                <p class="text-xs font-semibold text-white truncate">Account</p>
                <p class="text-[10px] text-slate-400 truncate">
                    {session?.user?.email || "Guest"}
                </p>
            </div>
            {#if session}
                <form method="POST" action="/logout">
                    <button
                        type="submit"
                        class="text-slate-400 hover:text-white p-1.5 rounded-md hover:bg-slate-700 transition-colors flex-shrink-0"
                        title="Logout"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-4 h-4"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M8.25 9V5.25A2.25 2.25 0 0110.5 3h6a2.25 2.25 0 012.25 2.25v13.5A2.25 2.25 0 0116.5 21h-6a2.25 2.25 0 01-2.25-2.25V15m-3 0l3-3m0 0l-3-3m3 3H3"
                            />
                        </svg>
                    </button>
                </form>
            {/if}
        </div>
    </div>
</aside>
