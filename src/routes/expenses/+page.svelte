<script lang="ts">
    import { goto } from "$app/navigation";
    import { expenses, deleteExpense } from "$lib/stores/expenses";
    import { settings } from "$lib/stores/settings";
    import { formatCurrency } from "$lib/utils/formatters";
    import DataTable from "$lib/components/DataTable.svelte";
    import AppButton from "$lib/components/AppButton.svelte";
    import PageHeader from "$lib/components/PageHeader.svelte";
    import ConfirmDialog from "$lib/components/ConfirmDialog.svelte";
    import type { Expense } from "$lib/models/expense";

    let dialogOpen = $state(false);
    let expenseToDelete: Expense | null = $state(null);

    const columns = [
        { key: "date", label: "Date" },
        { key: "category", label: "Category" },
        { key: "payee", label: "Payee" },
        { key: "amount", label: "Amount", align: "right" as const },
        { key: "actions", label: "", align: "right" as const },
    ];

    function confirmDelete(expenseRow: any) {
        expenseToDelete = expenseRow.raw;
        dialogOpen = true;
    }

    function handleDelete() {
        if (expenseToDelete) {
            deleteExpense(expenseToDelete.id);
        }
    }

    let tableData = $derived(
        $expenses.map((expense) => ({
            raw: expense,
            date: expense.date.toLocaleDateString(),
            category: expense.category,
            payee: expense.payee || "N/A",
            amount: formatCurrency(
                expense.amount,
                expense.currency || $settings.defaultCurrency,
            ),
        })),
    );
</script>

<svelte:head>
    <title>Purchases - Invoicer App</title>
</svelte:head>

<PageHeader title="Purchases" subtitle="Track your business purchases">
    <AppButton href="/expenses/new" variant="primary" size="sm">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            class="w-4 h-4 mr-1.5"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
            />
        </svg>
        Record Purchase
    </AppButton>
</PageHeader>

<DataTable
    {columns}
    data={tableData}
    emptyMessage="You haven't recorded any purchases yet."
>
    {#snippet emptyStateAction()}
        <AppButton
            href="/expenses/new"
            variant="primary"
            size="sm"
            class="mt-4"
        >
            Record your first purchase
        </AppButton>
    {/snippet}

    {#snippet row(row)}
        <td class="px-5 py-4 whitespace-nowrap text-sm text-slate-600">
            {row.date}
        </td>
        <td class="px-5 py-4 whitespace-nowrap">
            <span
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
            >
                {row.category}
            </span>
        </td>
        <td class="px-5 py-4 text-sm font-medium text-slate-900">
            {row.payee}
        </td>
        <td
            class="px-5 py-4 whitespace-nowrap text-sm font-bold text-slate-900 text-right"
        >
            {row.amount}
        </td>
        <td class="px-5 py-4 whitespace-nowrap text-right text-sm">
            <div
                class="flex justify-end gap-1.5 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity"
            >
                <button
                    class="p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                    onclick={(e: MouseEvent) => {
                        e.stopPropagation();
                        confirmDelete(row);
                    }}
                    title="Delete purchase"
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
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                    </svg>
                </button>
            </div>
        </td>
    {/snippet}
</DataTable>

<ConfirmDialog
    bind:open={dialogOpen}
    title="Delete Purchase"
    description="Are you sure you want to delete this purchase?"
    confirmText="Delete"
    destructive={true}
    onconfirm={handleDelete}
/>
