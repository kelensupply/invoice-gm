<script lang="ts">
    import { invoices } from "$lib/stores/invoices";
    import { clients } from "$lib/stores/clients";
    import { settings } from "$lib/stores/settings";
    import { estimates } from "$lib/stores/estimates";
    import StatusBadge from "$lib/components/StatusBadge.svelte";
    import AppButton from "$lib/components/AppButton.svelte";
    import PageHeader from "$lib/components/PageHeader.svelte";
    import StatCard from "$lib/components/StatCard.svelte";
    import { formatCurrency, formatDate } from "$lib/utils/formatters";
    import { fade } from "svelte/transition";
    import { goto } from "$app/navigation";

    let { data } = $props();
    let { session } = $derived(data);

    // Derived statistics
    let totalInvoiced = $derived(
        $invoices.reduce((sum, inv) => sum + calculateTotal(inv), 0),
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

    let recentInvoices = $derived(
        [...$invoices].sort(
            (a, b) =>
                new Date(b.dateIssued).getTime() -
                new Date(a.dateIssued).getTime(),
        ),
    );

    let debtors = $derived(
        Object.values(
            $invoices
                .filter(
                    (inv) =>
                        inv.status === "sent" ||
                        inv.status === "viewed" ||
                        inv.status === "overdue",
                )
                .reduce((acc: Record<string, any>, inv) => {
                    const clientName = inv.client?.companyName || "Unknown";
                    if (!acc[clientName]) {
                        acc[clientName] = {
                            clientName,
                            totalOwed: 0,
                            oldestDate: inv.dateDue || inv.dateIssued,
                        };
                    }
                    acc[clientName].totalOwed += calculateTotal(inv);
                    if (
                        new Date(inv.dateDue || inv.dateIssued) <
                        new Date(acc[clientName].oldestDate)
                    ) {
                        acc[clientName].oldestDate =
                            inv.dateDue || inv.dateIssued;
                    }
                    return acc;
                }, {}),
        ).sort((a: any, b: any) => b.totalOwed - a.totalOwed),
    );

    function getDaysOverdue(date: string) {
        const diff = new Date().getTime() - new Date(date).getTime();
        const days = Math.floor(diff / (1000 * 3600 * 24));
        return days > 0 ? days : 0;
    }

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
</script>

<svelte:head>
    <title>Dashboard | Invoicer App</title>
</svelte:head>

<div in:fade={{ duration: 300 }}>
    <!-- Page Header -->
    <PageHeader
        title="Dashboard"
        subtitle="Sales flow: Create → Send → Track → Follow-up → Paid ✅"
    >
        <AppButton
            data-sveltekit-reload
            href="/invoices/new"
            variant="primary"
            size="sm"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4 mr-1.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4v16m8-8H4"
                />
            </svg>
            New Sale
        </AppButton>
        <AppButton
            data-sveltekit-reload
            href="/estimates/new"
            variant="outline"
            size="sm"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4 mr-1.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
            </svg>
            New Quote
        </AppButton>
    </PageHeader>

    <!-- Metric Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-6 sm:mb-8">
        <StatCard
            title="Total Revenue"
            value={formatCurrency(totalInvoiced, $settings.defaultCurrency)}
            linkText="View expected income"
            linkHref="/invoices"
            icon="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
        />
        <StatCard
            title="Awaiting Payment"
            value={formatCurrency(totalPending, $settings.defaultCurrency)}
            linkText="View pending collections"
            linkHref="/invoices?status=pending"
            accent="blue"
            icon="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
        <StatCard
            title="Overdue (Action Required)"
            value={formatCurrency(totalOverdue, $settings.defaultCurrency)}
            linkText="View critical accounts"
            linkHref="/invoices?status=overdue"
            accent="red"
            icon="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
    </div>

    <!-- Who Owes You (Debt Tracker) -->
    <div class="section-card mb-6 sm:mb-8">
        <div
            class="flex items-center justify-between px-5 py-4 border-b border-slate-200"
        >
            <h2 class="section-title text-red-600 flex items-center gap-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                </svg>
                Outstanding Balances
            </h2>
        </div>
        {#if debtors.length > 0}
            <div class="overflow-x-auto">
                <table class="w-full">
                    <thead>
                        <tr
                            class="border-b border-slate-100 bg-red-50 text-red-900"
                        >
                            <th
                                class="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider"
                                >Client</th
                            >
                            <th
                                class="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider"
                                >Status</th
                            >
                            <th
                                class="text-right px-5 py-3 text-xs font-semibold uppercase tracking-wider"
                                >Total Owed</th
                            >
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                        {#each debtors.slice(0, 5) as debtor}
                            <tr class="hover:bg-slate-50 transition-colors">
                                <td
                                    class="px-5 py-3 text-sm font-semibold text-slate-800"
                                >
                                    {debtor.clientName}
                                </td>
                                <td class="px-5 py-3 text-sm">
                                    {#if getDaysOverdue(debtor.oldestDate) > 0}
                                        <span
                                            class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800"
                                        >
                                            {getDaysOverdue(debtor.oldestDate)} days
                                            overdue
                                        </span>
                                    {:else}
                                        <span
                                            class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800"
                                        >
                                            Pending
                                        </span>
                                    {/if}
                                </td>
                                <td
                                    class="px-5 py-3 text-sm font-bold text-red-600 text-right"
                                >
                                    {formatCurrency(
                                        debtor.totalOwed,
                                        $settings.defaultCurrency,
                                    )}
                                </td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        {:else}
            <div class="px-5 py-8 text-center bg-slate-50/50">
                <div
                    class="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2.5"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                </div>
                <p class="text-sm font-bold text-slate-800">All Caught Up!</p>
                <p class="text-xs text-slate-500 mt-1 max-w-[250px] mx-auto">
                    None of your clients currently owe you any money. Great job!
                </p>
            </div>
        {/if}
    </div>

    <!-- Recent Invoices & Estimates -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
        <!-- Recent Invoices -->
        <div class="section-card">
            <div
                class="flex items-center justify-between px-5 py-4 border-b border-slate-200"
            >
                <h2 class="section-title">Recent Sales</h2>
                <a
                    href="/invoices"
                    class="text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
                    >View all →</a
                >
            </div>
            <div class="overflow-x-auto">
                <table class="w-full">
                    <thead>
                        <tr class="border-b border-slate-100 bg-slate-50">
                            <th
                                class="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider"
                                >Number</th
                            >
                            <th
                                class="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider"
                                >Client</th
                            >
                            <th
                                class="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider"
                                >Status</th
                            >
                            <th
                                class="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider"
                                >Amount</th
                            >
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                        {#each recentInvoices.slice(0, 5) as invoice (invoice.id)}
                            <tr
                                class="hover:bg-slate-50 transition-colors cursor-pointer"
                                onclick={() =>
                                    goto(`/invoices/${invoice.id}/preview`)}
                            >
                                <td
                                    class="px-5 py-3 text-sm font-semibold text-emerald-600"
                                >
                                    {invoice.invoiceNumber ||
                                        `INV-${invoice.id.slice(0, 6)}`}
                                </td>
                                <td class="px-5 py-3 text-sm text-slate-600">
                                    {invoice.client?.companyName || "Unknown"}
                                </td>
                                <td class="px-5 py-3 text-sm">
                                    <StatusBadge status={invoice.status} />
                                </td>
                                <td
                                    class="px-5 py-3 text-sm font-bold text-slate-900 text-right"
                                >
                                    {formatCurrency(
                                        calculateTotal(invoice),
                                        invoice.currency,
                                    )}
                                </td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
                {#if recentInvoices.length === 0}
                    <div class="px-5 py-10 text-center">
                        <p class="text-sm text-slate-500">
                            No invoices yet. <a
                                href="/invoices/new"
                                class="text-emerald-600 hover:text-emerald-700 font-medium"
                                >Create one now</a
                            >
                        </p>
                    </div>
                {/if}
            </div>
        </div>

        <!-- Recent Estimates -->
        <div class="section-card">
            <div
                class="flex items-center justify-between px-5 py-4 border-b border-slate-200"
            >
                <h2 class="section-title">Recent Estimates</h2>
                <a
                    href="/estimates"
                    class="text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
                    >View all →</a
                >
            </div>
            <div class="overflow-x-auto">
                <table class="w-full">
                    <thead>
                        <tr class="border-b border-slate-100 bg-slate-50">
                            <th
                                class="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider"
                                >Number</th
                            >
                            <th
                                class="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider"
                                >Client</th
                            >
                            <th
                                class="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider"
                                >Status</th
                            >
                            <th
                                class="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider"
                                >Amount</th
                            >
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                        {#each $estimates.slice(0, 5) as estimate (estimate.id)}
                            <tr
                                class="hover:bg-slate-50 transition-colors cursor-pointer"
                                onclick={() =>
                                    goto(`/estimates/${estimate.id}/preview`)}
                            >
                                <td
                                    class="px-5 py-3 text-sm font-semibold text-emerald-600"
                                >
                                    {estimate.estimateNumber ||
                                        `EST-${estimate.id.slice(0, 6)}`}
                                </td>
                                <td class="px-5 py-3 text-sm text-slate-600">
                                    {estimate.client?.companyName || "Unknown"}
                                </td>
                                <td class="px-5 py-3 text-sm">
                                    <StatusBadge status={estimate.status} />
                                </td>
                                <td
                                    class="px-5 py-3 text-sm font-bold text-slate-900 text-right"
                                >
                                    {formatCurrency(
                                        calculateTotal(estimate),
                                        estimate.currency,
                                    )}
                                </td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
                {#if $estimates.length === 0}
                    <div class="px-5 py-10 text-center">
                        <p class="text-sm text-slate-500">
                            No estimates yet. <a
                                href="/estimates/new"
                                class="text-emerald-600 hover:text-emerald-700 font-medium"
                                >Create one now</a
                            >
                        </p>
                    </div>
                {/if}
            </div>
        </div>
    </div>

    <!-- Recent Activity -->
    <div class="section-card">
        <div class="px-5 py-4 border-b border-slate-200">
            <h2 class="section-title">Recent Activity</h2>
        </div>
        <div class="overflow-x-auto">
            <table class="w-full">
                <thead>
                    <tr class="border-b border-slate-100 bg-slate-50">
                        <th
                            class="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider"
                            >Event</th
                        >
                        <th
                            class="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:table-cell"
                            >Description</th
                        >
                        <th
                            class="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider"
                            >Document</th
                        >
                        <th
                            class="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:table-cell"
                            >Date</th
                        >
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                    {#each recentInvoices.slice(0, 5) as invoice (invoice.id)}
                        <tr class="hover:bg-slate-50 transition-colors">
                            <td
                                class="px-5 py-3 text-sm font-medium text-slate-900"
                            >
                                {#if invoice.status === "viewed"}Invoice viewed
                                {:else if invoice.status === "paid"}Invoice paid
                                {:else if invoice.status === "sent"}Invoice sent
                                {:else}Invoice {invoice.status}{/if}
                            </td>
                            <td
                                class="px-5 py-3 text-sm text-slate-500 hidden sm:table-cell"
                            >
                                {invoice.invoiceNumber ||
                                    `INV-${invoice.id.slice(0, 6)}`} by {invoice
                                    .client?.contactName || "client"}
                            </td>
                            <td class="px-5 py-3 text-sm">
                                <a
                                    href="/invoices/{invoice.id}"
                                    class="text-emerald-600 hover:text-emerald-700 font-medium"
                                >
                                    {invoice.invoiceNumber ||
                                        `INV-${invoice.id.slice(0, 6)}`}
                                </a>
                            </td>
                            <td
                                class="px-5 py-3 text-sm text-slate-500 hidden sm:table-cell"
                            >
                                {formatDate(new Date(invoice.dateIssued))}
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
            {#if recentInvoices.length === 0}
                <div class="px-5 py-12 text-center">
                    <p class="text-sm text-slate-500">
                        No activity yet. Create your first invoice to get
                        started.
                    </p>
                </div>
            {/if}
        </div>
    </div>
</div>
