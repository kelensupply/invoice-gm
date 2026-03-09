<script lang="ts">
    import { invoices } from "$lib/stores/invoices";
    import { settings } from "$lib/stores/settings";
    import { estimates } from "$lib/stores/estimates";
    import StatusBadge from "$lib/components/StatusBadge.svelte";
    import AppButton from "$lib/components/AppButton.svelte";
    import { formatCurrency, formatDate } from "$lib/utils/formatters";
    import { fade, slide, fly } from "svelte/transition";
    import { goto } from "$app/navigation";

    let { data } = $props();
    let { session } = $derived(data);

    // Derived statistics
    let totalInvoiced = $derived(
        $invoices.reduce((sum, inv) => sum + calculateTotal(inv), 0),
    );
    let totalPaid = $derived(
        $invoices
            .filter((inv) => inv.status === "paid")
            .reduce((sum, inv) => sum + calculateTotal(inv), 0),
    );
    let totalPending = $derived(
        $invoices
            .filter((inv) => inv.status === "sent" || inv.status === "viewed")
            .reduce((sum, inv) => sum + calculateTotal(inv), 0),
    );
    let totalOverdue = $derived(
        $invoices
            .filter((inv) => inv.status === "overdue")
            .reduce((sum, inv) => sum + calculateTotal(inv), 0),
    );

    function calculateTotal(invoice: any) {
        const subtotal = (invoice.items || []).reduce(
            (sum: number, item: any) =>
                sum + (item.rate || 0) * (item.quantity || 0),
            0,
        );
        const taxAmount = subtotal * ((invoice.taxRate || 0) / 100);
        return (
            subtotal +
            taxAmount +
            (invoice.shipping || 0) -
            (invoice.discount || 0)
        );
    }

    // Chart data simulation
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    const revenueData = [4500, 5200, 4800, 6100, 5900, 7200];
    const maxRevenue = Math.max(...revenueData);

    let hoveringBar = $state<number | null>(null);

    function handleInvoiceClick(id: string) {
        goto(`/invoices/${id}/preview`);
    }
</script>

<svelte:head>
    <title>Dashboard | Invoicer App</title>
</svelte:head>

<div
    class="p-6 md:p-10 max-w-7xl mx-auto space-y-10"
    in:fade={{ duration: 400 }}
>
    <!-- Top Header & Quick Actions -->
    <header
        class="flex flex-col md:flex-row md:items-end justify-between gap-6"
    >
        <div>
            <div class="flex items-center gap-3 mb-2">
                <span
                    class="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase tracking-wider"
                    >Business Overview</span
                >
                <span class="text-slate-300">/</span>
                <span class="text-slate-400 text-xs font-medium"
                    >{formatDate(new Date())}</span
                >
            </div>
            <h1
                class="text-3xl md:text-4xl font-black text-slate-900 tracking-tight"
            >
                Welcome back, <span
                    class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600"
                    >{$settings?.company?.name || "Partner"}</span
                >
            </h1>
            <p class="text-slate-500 mt-2 font-medium">
                Here's what's happening with your business today.
            </p>
        </div>

        <div class="flex items-center gap-3">
            <AppButton
                href="/estimates/new"
                variant="outline"
                class="!rounded-xl !py-2.5 !px-5 border-slate-200 hover:border-slate-300"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-4 h-4 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    ><path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    /></svg
                >
                New Estimate
            </AppButton>
            <AppButton
                href="/invoices/new"
                variant="primary"
                class="!rounded-xl !py-2.5 !px-5 shadow-lg shadow-emerald-500/20"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-4 h-4 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    ><path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 4v16m8-8H4"
                    /></svg
                >
                Create Invoice
            </AppButton>
        </div>
    </header>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Total Revenue Card -->
        <div
            class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden group hover:border-emerald-200 transition-all duration-300"
        >
            <div
                class="absolute -right-4 -top-4 w-24 h-24 bg-emerald-50 rounded-full opacity-50 group-hover:scale-110 transition-transform duration-500"
            ></div>
            <div class="relative z-10">
                <div
                    class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        ><path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        /></svg
                    >
                </div>
                <p
                    class="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1"
                >
                    Total Revenue
                </p>
                <h3 class="text-2xl font-black text-slate-900">
                    {formatCurrency(totalInvoiced, "USD")}
                </h3>
                <div
                    class="mt-4 flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 bg-emerald-50 w-fit px-2 py-0.5 rounded-full"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-3 h-3"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        ><path
                            fill-rule="evenodd"
                            d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                            clip-rule="evenodd"
                        /></svg
                    >
                    +12.5% vs last month
                </div>
            </div>
        </div>

        <!-- Paid Card -->
        <div
            class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden group hover:border-blue-200 transition-all duration-300"
        >
            <div
                class="absolute -right-4 -top-4 w-24 h-24 bg-blue-50 rounded-full opacity-50 group-hover:scale-110 transition-transform duration-500"
            ></div>
            <div class="relative z-10">
                <div
                    class="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        ><path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        /></svg
                    >
                </div>
                <p
                    class="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1"
                >
                    Total Paid
                </p>
                <h3 class="text-2xl font-black text-slate-900">
                    {formatCurrency(totalPaid, "USD")}
                </h3>
                <p class="mt-4 text-[10px] font-medium text-slate-400">
                    Everything looks great!
                </p>
            </div>
        </div>

        <!-- Pending Card -->
        <div
            class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden group hover:border-amber-200 transition-all duration-300"
        >
            <div
                class="absolute -right-4 -top-4 w-24 h-24 bg-amber-50 rounded-full opacity-50 group-hover:scale-110 transition-transform duration-500"
            ></div>
            <div class="relative z-10">
                <div
                    class="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mb-4"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        ><path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        /></svg
                    >
                </div>
                <p
                    class="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1"
                >
                    Pending
                </p>
                <h3 class="text-2xl font-black text-slate-900">
                    {formatCurrency(totalPending, "USD")}
                </h3>
                <p class="mt-4 text-[10px] font-medium text-slate-400">
                    {$invoices.filter((i) => i.status === "sent").length} invoices
                    waiting
                </p>
            </div>
        </div>

        <!-- Overdue Card -->
        <div
            class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden group hover:border-red-200 transition-all duration-300"
        >
            <div
                class="absolute -right-4 -top-4 w-24 h-24 bg-red-50 rounded-full opacity-50 group-hover:scale-110 transition-transform duration-500"
            ></div>
            <div class="relative z-10">
                <div
                    class="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center mb-4"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        ><path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        /></svg
                    >
                </div>
                <p
                    class="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1"
                >
                    Overdue
                </p>
                <h3 class="text-2xl font-black text-slate-900">
                    {formatCurrency(totalOverdue, "USD")}
                </h3>
                <a
                    href="/invoices?status=overdue"
                    class="mt-4 text-[10px] font-bold text-red-600 hover:underline inline-block"
                    >Take action now &rarr;</a
                >
            </div>
        </div>
    </div>

    <!-- Main Content: Charts & Recent Invoices -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Revenue Chart Section -->
        <div
            class="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-sm p-8"
        >
            <div class="flex items-center justify-between mb-10">
                <div>
                    <h2
                        class="text-xl font-black text-slate-900 tracking-tight"
                    >
                        Revenue Over Time
                    </h2>
                    <p class="text-slate-400 text-xs mt-1">
                        Snapshot of your business performance
                    </p>
                </div>
                <div class="flex bg-slate-100 p-1 rounded-xl">
                    <button
                        class="px-4 py-1.5 text-[10px] font-bold bg-white text-slate-900 rounded-lg shadow-sm"
                        >Monthly</button
                    >
                    <button
                        class="px-4 py-1.5 text-[10px] font-bold text-slate-500 hover:text-slate-700"
                        >Quarterly</button
                    >
                </div>
            </div>

            <!-- Custom CSS Bar Chart -->
            <div class="h-64 flex items-end justify-between gap-4 px-2">
                {#each months as month, i}
                    <div class="flex-1 flex flex-col items-center gap-4 group">
                        <div
                            class="relative w-full flex flex-col items-center justify-end h-48"
                        >
                            <!-- Tooltip -->
                            {#if hoveringBar === i}
                                <div
                                    class="absolute -top-10 bg-slate-900 text-white text-[10px] px-2 py-1 rounded-md shadow-xl whitespace-nowrap z-20"
                                    in:fly={{ y: 5 }}
                                >
                                    {formatCurrency(revenueData[i], "USD")}
                                </div>
                            {/if}

                            <!-- Bar -->
                            <div
                                role="presentation"
                                onmouseenter={() => (hoveringBar = i)}
                                onmouseleave={() => (hoveringBar = null)}
                                class="w-full max-w-[40px] bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-t-xl transition-all duration-500 ease-out group-hover:from-emerald-600 group-hover:to-emerald-500 group-hover:scale-x-110 cursor-pointer shadow-lg shadow-emerald-500/10"
                                style="height: {(revenueData[i] / maxRevenue) *
                                    100}%"
                            ></div>
                        </div>
                        <span
                            class="text-[10px] font-black text-slate-400 group-hover:text-slate-900 transition-colors uppercase tracking-widest"
                            >{month}</span
                        >
                    </div>
                {/each}
            </div>
        </div>

        <!-- Recent Activity Sidebar -->
        <div
            class="bg-slate-900 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden"
        >
            <!-- Background pattern -->
            <div class="absolute inset-0 opacity-10 pointer-events-none">
                <svg width="100%" height="100%"
                    ><pattern
                        id="grid"
                        width="40"
                        height="40"
                        patternUnits="userSpaceOnUse"
                        ><path
                            d="M 40 0 L 0 0 0 40"
                            fill="none"
                            stroke="white"
                            stroke-width="0.5"
                        /></pattern
                    ><rect width="100%" height="100%" fill="url(#grid)" /></svg
                >
            </div>

            <div class="relative z-10">
                <h2 class="text-xl font-bold mb-8 flex items-center gap-3">
                    <span
                        class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"
                    ></span>
                    Recent Activity
                </h2>

                <div class="space-y-8">
                    {#each $invoices.slice(0, 4) as inv}
                        <button
                            class="w-full text-left flex gap-4 group cursor-pointer"
                            onclick={() => handleInvoiceClick(inv.id)}
                        >
                            <div class="mt-1">
                                <div
                                    class="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 group-hover:border-emerald-500/50 transition-colors"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="w-4 h-4 text-emerald-500"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        ><path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        /></svg
                                    >
                                </div>
                            </div>
                            <div>
                                <p
                                    class="text-sm font-bold text-white line-clamp-1 group-hover:text-emerald-400 transition-colors"
                                >
                                    {inv.client.companyName}
                                </p>
                                <p
                                    class="text-[11px] text-slate-400 font-medium"
                                >
                                    Invoice {inv.invoiceNumber} • {inv.status}
                                </p>
                                <p
                                    class="text-[10px] text-slate-500 mt-1 uppercase tracking-tighter"
                                >
                                    {formatDate(inv.dateIssued)}
                                </p>
                            </div>
                        </button>
                    {/each}

                    {#if $invoices.length === 0}
                        <div
                            class="py-12 text-center text-slate-500 italic text-sm"
                        >
                            No activity recorded yet.
                        </div>
                    {/if}
                </div>

                <a
                    href="/invoices"
                    class="mt-10 block text-center py-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-bold tracking-widest uppercase transition-colors"
                    >View All Activity</a
                >
            </div>
        </div>
    </div>

    <!-- Detailed Invoices Table -->
    <section
        class="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden mb-12"
    >
        <div
            class="p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
            <div>
                <h2 class="text-xl font-black text-slate-900 tracking-tight">
                    Recent Invoices
                </h2>
                <p class="text-slate-400 text-xs mt-1">
                    Management and status tracking
                </p>
            </div>
            <a
                href="/invoices"
                class="text-blue-500 hover:text-blue-600 text-sm font-bold flex items-center gap-1"
            >
                View All
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    ><path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 5l7 7-7 7"
                    /></svg
                >
            </a>
        </div>

        <div class="overflow-x-auto">
            <table class="w-full text-left">
                <thead class="bg-slate-50/50">
                    <tr>
                        <th
                            class="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest"
                            >Invoice</th
                        >
                        <th
                            class="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest"
                            >Client</th
                        >
                        <th
                            class="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest"
                            >Date</th
                        >
                        <th
                            class="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest"
                            >Amount</th
                        >
                        <th
                            class="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest"
                            >Status</th
                        >
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-50">
                    {#each $invoices.slice(0, 5) as inv}
                        <tr
                            class="hover:bg-slate-50/50 transition-colors group cursor-pointer"
                            onclick={() => handleInvoiceClick(inv.id)}
                        >
                            <td class="px-8 py-5">
                                <span
                                    class="text-slate-900 font-black text-sm group-hover:text-emerald-600 transition-colors"
                                    >{inv.invoiceNumber}</span
                                >
                            </td>
                            <td class="px-8 py-5">
                                <div class="flex flex-col">
                                    <span
                                        class="text-sm font-bold text-slate-700"
                                        >{inv.client.companyName}</span
                                    >
                                    <span class="text-[10px] text-slate-400"
                                        >{inv.client.email}</span
                                    >
                                </div>
                            </td>
                            <td
                                class="px-8 py-5 text-sm text-slate-500 font-medium"
                            >
                                {formatDate(inv.dateIssued)}
                            </td>
                            <td
                                class="px-8 py-5 text-sm font-black text-slate-900"
                            >
                                {formatCurrency(
                                    calculateTotal(inv),
                                    inv.currency,
                                )}
                            </td>
                            <td class="px-8 py-5">
                                <StatusBadge status={inv.status} />
                            </td>
                        </tr>
                    {/each}

                    {#if $invoices.length === 0}
                        <tr>
                            <td colspan="5" class="px-8 py-20 text-center">
                                <div class="max-w-xs mx-auto">
                                    <div
                                        class="w-16 h-16 bg-slate-100 text-slate-300 rounded-2xl flex items-center justify-center mx-auto mb-4"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            class="w-8 h-8"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            ><path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                            /></svg
                                        >
                                    </div>
                                    <h3 class="text-slate-900 font-bold">
                                        No invoices found
                                    </h3>
                                    <p class="text-slate-400 text-sm mt-1 mb-6">
                                        Start by creating your first
                                        professional invoice today.
                                    </p>
                                    <AppButton
                                        href="/invoices/new"
                                        variant="primary"
                                        >Create Invoice</AppButton
                                    >
                                </div>
                            </td>
                        </tr>
                    {/if}
                </tbody>
            </table>
        </div>
    </section>
</div>

<style>
    /* Adding a subtle animation for the bars */
    @keyframes barGrow {
        from {
            transform: scaleY(0);
        }
        to {
            transform: scaleY(1);
        }
    }

    .bg-gradient-to-t {
        transform-origin: bottom;
        animation: barGrow 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
</style>
