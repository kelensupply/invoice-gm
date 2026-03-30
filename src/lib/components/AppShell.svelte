<script lang="ts">
    import Sidebar from "./Sidebar.svelte";
    import { page } from "$app/stores";
    import { onMount } from "svelte";

    let { children, session } = $props<{ children: any; session: any }>();
    let isSidebarOpen = $state(false);

    // Close sidebar when navigating on mobile
    $effect(() => {
        $page.url.pathname;
        isSidebarOpen = false;
    });

    function toggleSidebar() {
        isSidebarOpen = !isSidebarOpen;
    }

    // Close sidebar on escape key
    function handleKeydown(e: KeyboardEvent) {
        if (e.key === "Escape" && isSidebarOpen) {
            isSidebarOpen = false;
        }
    }
</script>

<svelte:document onkeydown={handleKeydown} />

<div class="flex min-h-screen bg-slate-50 font-sans text-slate-800">
    <!-- Mobile Sidebar Overlay -->
    <div
        class="fixed inset-0 z-40 lg:hidden {isSidebarOpen
            ? 'block'
            : 'hidden'}"
    >
        <!-- Overlay -->
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div
            class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
            onclick={() => (isSidebarOpen = false)}
        ></div>

        <div
            class="relative flex w-full max-w-xs flex-1 flex-col bg-slate-800 focus:outline-none h-full overflow-y-auto"
        >
            <Sidebar
                {session}
                isMobile={true}
                onclose={() => (isSidebarOpen = false)}
            />
        </div>
    </div>

    <!-- Desktop Sidebar -->
    <div
        class="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 z-30 lg:overflow-y-auto"
    >
        <Sidebar {session} />
    </div>

    <!-- Main Content -->
    <div class="flex flex-1 flex-col lg:pl-64 min-w-0">
        <!-- Mobile Top Header -->
        <div
            class="sticky top-0 z-20 flex h-14 sm:h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6 shadow-sm lg:hidden"
        >
            <div class="flex items-center">
                <h1
                    class="font-black text-lg text-slate-900 truncate flex items-center gap-2"
                >
                    <div
                        class="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="2.5"
                            stroke="currentColor"
                            class="w-4 h-4"
                            ><path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                            ></path></svg
                        >
                    </div>
                    Invoicer
                </h1>
            </div>

            <div class="flex items-center gap-x-2 sm:gap-x-4 flex-shrink-0">
                <div
                    class="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-emerald-100 flex items-center justify-center text-xs font-bold text-emerald-700 uppercase flex-shrink-0 border border-emerald-200 ring-2 ring-white shadow-sm"
                >
                    {session?.user?.email?.charAt(0) || "U"}
                </div>
            </div>
        </div>

        <main class="flex-1 min-w-0 overflow-y-auto pb-20 lg:pb-0">
            <div class="container-responsive py-4 sm:py-6 md:py-8">
                {@render children()}
            </div>
        </main>
    </div>

    <!-- Mobile Bottom Navigation -->
    <nav
        class="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 lg:hidden flex justify-around items-center h-[68px] px-2 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]"
    >
        <a
            href="/dashboard"
            class="flex flex-col items-center justify-center w-full h-full space-y-1 text-slate-500 hover:text-emerald-600 {$page
                .url.pathname === '/dashboard'
                ? 'text-emerald-600'
                : ''} relative"
        >
            {#if $page.url.pathname === "/dashboard"}
                <div
                    class="absolute top-0 w-8 h-1 bg-emerald-500 rounded-b-full"
                ></div>
            {/if}
            <svg
                class="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                ><path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                /></svg
            >
            <span class="text-[10px] font-bold tracking-wide">Home</span>
        </a>
        <a
            href="/invoices"
            class="flex flex-col items-center justify-center w-full h-full space-y-1 text-slate-500 hover:text-emerald-600 {$page.url.pathname.startsWith(
                '/invoices',
            )
                ? 'text-emerald-600'
                : ''} relative"
        >
            {#if $page.url.pathname.startsWith("/invoices")}
                <div
                    class="absolute top-0 w-8 h-1 bg-emerald-500 rounded-b-full"
                ></div>
            {/if}
            <svg
                class="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                ><path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                /></svg
            >
            <span class="text-[10px] font-bold tracking-wide">Sales</span>
        </a>
        <a
            href="/estimates"
            class="flex flex-col items-center justify-center w-full h-full space-y-1 text-slate-500 hover:text-emerald-600 {$page.url.pathname.startsWith(
                '/estimates',
            )
                ? 'text-emerald-600'
                : ''} relative"
        >
            {#if $page.url.pathname.startsWith("/estimates")}
                <div
                    class="absolute top-0 w-8 h-1 bg-emerald-500 rounded-b-full"
                ></div>
            {/if}
            <svg
                class="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                ><path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                /></svg
            >
            <span class="text-[10px] font-bold tracking-wide">Estimates</span>
        </a>
        <a
            href="/clients"
            class="flex flex-col items-center justify-center w-full h-full space-y-1 text-slate-500 hover:text-emerald-600 {$page.url.pathname.startsWith(
                '/clients',
            )
                ? 'text-emerald-600'
                : ''} relative"
        >
            {#if $page.url.pathname.startsWith("/clients")}
                <div
                    class="absolute top-0 w-8 h-1 bg-emerald-500 rounded-b-full"
                ></div>
            {/if}
            <svg
                class="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                ><path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                /></svg
            >
            <span class="text-[10px] font-bold tracking-wide">Customers</span>
        </a>
        <button
            onclick={toggleSidebar}
            class="flex flex-col items-center justify-center w-full h-full space-y-1 text-slate-500 hover:text-emerald-600 relative"
        >
            <svg
                class="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                ><path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                /></svg
            >
            <span class="text-[10px] font-bold tracking-wide">More</span>
        </button>
    </nav>
</div>
