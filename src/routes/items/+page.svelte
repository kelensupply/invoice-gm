<script lang="ts">
    import { goto } from "$app/navigation";
    import { items, deleteItem } from "$lib/stores/items";
    import { getCategoryLabel } from "$lib/constants/categories";
    import { settings } from "$lib/stores/settings";
    import { formatCurrency } from "$lib/utils/formatters";
    import DataTable from "$lib/components/DataTable.svelte";
    import AppButton from "$lib/components/AppButton.svelte";
    import ConfirmDialog from "$lib/components/ConfirmDialog.svelte";
    import type { Item } from "$lib/stores/items";

    let dialogOpen = false;
    let itemToDelete: Item | null = null;

    const columns = [
        { key: "name", label: "Item Name" },
        { key: "category", label: "Category" },
        { key: "description", label: "Description" },
        { key: "rate", label: "Default Rate", align: "right" as const },
    ];

    function confirmDelete(itemRow: any) {
        itemToDelete = itemRow.raw;
        dialogOpen = true;
    }

    function handleDelete() {
        if (itemToDelete) {
            deleteItem(itemToDelete.id);
        }
    }

    function handleItemClick(itemId: string) {
        goto(`/items/${itemId}`);
    }

    $: tableData = $items.map((item) => ({
        raw: item,
        name: item.name,
        category: getCategoryLabel(item.category),
        description: item.description,
        rate: formatCurrency(item.rate, $settings.defaultCurrency),
    }));
</script>

<svelte:head>
    <title>Items - Invoicer App</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-slate-50 via-slate-50 to-slate-100">
    <div class="p-8 max-w-7xl mx-auto">
        <!-- Header Section -->
        <div
            class="flex items-center justify-between mb-8 flex-col sm:flex-row gap-4"
        >
            <div>
                <h1 class="text-4xl font-bold text-slate-900 tracking-tight">
                    Items Library
                </h1>
                <p class="text-slate-500 text-sm mt-2">Manage your products and services</p>
            </div>
            <AppButton href="/items/new" variant="primary">
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
                Add Item
            </AppButton>
        </div>

        <!-- Data Table Card -->
        <div class="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">

    <DataTable
        {columns}
        data={tableData}
        emptyMessage="You haven't added any items yet."
    >
        {#snippet emptyStateAction()}
            <AppButton
                href="/items/new"
                variant="primary"
                size="sm"
                class="mt-4"
            >
                Add your first item
            </AppButton>
        {/snippet}

        {#snippet row(row)}
            <td
                class="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-900 cursor-pointer hover:text-emerald-600 transition-colors"
                onclick={() => handleItemClick(row.raw.id)}
            >
                {row.name}
            </td>
            <td 
                class="px-6 py-4 whitespace-nowrap cursor-pointer hover:opacity-80 transition-opacity"
                onclick={() => handleItemClick(row.raw.id)}
            >
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                    {row.category}
                </span>
            </td>
            <td 
                class="px-6 py-4 text-sm text-slate-600 max-w-md truncate cursor-pointer hover:text-slate-900 transition-colors"
                onclick={() => handleItemClick(row.raw.id)}
            >{row.description}</td
            >
            <td
                class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-900 text-right cursor-pointer hover:text-emerald-600 transition-colors"
                onclick={() => handleItemClick(row.raw.id)}
            >{row.rate}</td
            >

            <!-- Actions hidden by default, shown on row hover -->
            <td
                class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
            >
                <div
                    class="flex justify-end gap-2 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity"
                >
                    <button
                        class="text-slate-400 hover:text-emerald-600 p-1"
                        onclick={(e: MouseEvent) => {
                            e.stopPropagation();
                            handleItemClick(row.raw.id);
                        }}
                        title="Edit"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-4 h-4"
                            ><path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                            /></svg
                        >
                    </button>
                    <button
                        class="text-slate-400 hover:text-red-600 p-1"
                        onclick={(e: MouseEvent) => {
                            e.stopPropagation();
                            confirmDelete(row);
                        }}
                        title="Delete"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-4 h-4"
                            ><path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            /></svg
                        >
                    </button>
                </div>
            </td>
        {/snippet}
    </DataTable>
        </div>
    </div>
</div>

<ConfirmDialog
    bind:open={dialogOpen}
    title="Delete Item"
    description={`Are you sure you want to delete ${itemToDelete?.name}?`}
    confirmText="Delete"
    destructive={true}
    on:confirm={handleDelete}
/>
