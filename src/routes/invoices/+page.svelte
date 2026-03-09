<script lang="ts">
    import { invoices } from "$lib/stores/invoices";
    import DataTable from "$lib/components/DataTable.svelte";
    import StatusBadge from "$lib/components/StatusBadge.svelte";
    import AppButton from "$lib/components/AppButton.svelte";
    import { formatCurrency, formatDate } from "$lib/utils/formatters";
    import type { InvoiceStatus } from "$lib/models/invoice";
    import { goto } from "$app/navigation";

    let currentFilter: InvoiceStatus | "all" = $state("all");

    const filterTabs = [
        { value: "all", label: "All Invoices" },
        { value: "draft", label: "Draft" },
        { value: "sent", label: "Sent" },
        { value: "viewed", label: "Viewed" },
        { value: "paid", label: "Paid" },
        { value: "overdue", label: "Overdue" },
    ];

    function calculateTotal(invoice: any) {
        const subtotal = invoice.items.reduce(
            (sum: number, item: any) => sum + item.rate * item.quantity,
            0,
        );
        const taxAmount = subtotal * (invoice.taxRate / 100);
        return subtotal + taxAmount + invoice.shipping - invoice.discount;
    }

    const columns = [
        { key: "invoiceNumber", label: "Number" },
        { key: "client", label: "Client" },
        { key: "status", label: "Status" },
        { key: "amount", label: "Amount", align: "right" as const },
        { key: "dateIssued", label: "Date", align: "right" as const },
        { key: "actions", label: "", align: "right" as const },
    ];

    let filteredInvoices = $derived(
        $invoices.filter(
            (inv) => currentFilter === "all" || inv.status === currentFilter,
        ),
    );

    let tableData = $derived(
        filteredInvoices.map((inv) => ({
            raw: inv,
            invoiceNumber: inv.invoiceNumber,
            client: inv.client.companyName,
            status: inv.status,
            amount: formatCurrency(calculateTotal(inv), inv.currency),
            dateIssued: formatDate(inv.dateIssued),
        })),
    );

    function handleRowClick(item: any) {
        goto(`/invoices/${item.raw.id}/preview`);
    }
</script>

<svelte:head>
    <title>Invoices - Invoicer App</title>
</svelte:head>

<div class="p-8 max-w-7xl mx-auto">
    <div
        class="flex items-center justify-between mb-8 flex-col sm:flex-row gap-4"
    >
        <h1 class="text-2xl font-bold text-slate-900 tracking-tight">
            Invoices
        </h1>
        <AppButton href="/invoices/new" variant="primary">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                class="w-4 h-4 mr-2"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                />
            </svg>
            New Invoice
        </AppButton>
    </div>

    <div class="mb-6 overflow-x-auto">
        <div class="border-b border-slate-200">
            <nav class="-mb-px flex space-x-8 min-w-max" aria-label="Tabs">
                {#each filterTabs as tab}
                    <button
                        onclick={() =>
                            (currentFilter = tab.value as
                                | InvoiceStatus
                                | "all")}
                        class="whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors focus:outline-none
                        {currentFilter === tab.value
                            ? 'border-emerald-500 text-emerald-600'
                            : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}"
                    >
                        {tab.label}
                        {#if tab.value === "all"}
                            <span
                                class="ml-2 bg-slate-100 text-slate-600 py-0.5 px-2.5 rounded-full text-xs"
                            >
                                {$invoices.length}
                            </span>
                        {:else}
                            {@const count = $invoices.filter(
                                (i) => i.status === tab.value,
                            ).length}
                            {#if count > 0}
                                <span
                                    class="ml-2 {currentFilter === tab.value
                                        ? 'bg-emerald-100 text-emerald-700'
                                        : 'bg-slate-100 text-slate-600'} py-0.5 px-2.5 rounded-full text-xs"
                                >
                                    {count}
                                </span>
                            {/if}
                        {/if}
                    </button>
                {/each}
            </nav>
        </div>
    </div>

    <DataTable
        {columns}
        data={tableData}
        onRowClick={handleRowClick}
        emptyMessage={`No ${currentFilter === "all" ? "" : currentFilter + " "}invoices found.`}
    >
        {#snippet emptyStateAction()}
            <AppButton
                href="/invoices/new"
                variant="primary"
                size="sm"
                class="mt-4"
            >
                Create your first invoice
            </AppButton>
        {/snippet}

        {#snippet row(rowData)}
            <td
                class="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-900"
            >
                {rowData.invoiceNumber}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                <div class="font-medium text-slate-900">{rowData.client}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <StatusBadge status={rowData.status} />
            </td>
            <td
                class="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-900 text-right"
            >
                {rowData.amount}
            </td>
            <td
                class="px-6 py-4 whitespace-nowrap text-sm text-slate-500 text-right"
            >
                {rowData.dateIssued}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm">
                <div class="flex justify-end gap-2">
                    <AppButton
                        variant="ghost"
                        size="sm"
                        href={`/invoices/${rowData.raw.id}/preview`}
                        onclick={(e: MouseEvent) => e.stopPropagation()}
                    >
                        View
                    </AppButton>
                    <AppButton
                        variant="outline"
                        size="sm"
                        href={`/invoices/${rowData.raw.id}`}
                        onclick={(e: MouseEvent) => e.stopPropagation()}
                    >
                        Edit
                    </AppButton>
                </div>
            </td>
        {/snippet}
    </DataTable>
</div>
