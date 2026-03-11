<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { items, updateItem, deleteItem } from "$lib/stores/items";
    import { ITEM_CATEGORIES } from "$lib/constants/categories";
    import { settings } from "$lib/stores/settings";
    import { getCurrencySymbol } from "$lib/constants/currencies";
    import AppButton from "$lib/components/AppButton.svelte";
    import ConfirmDialog from "$lib/components/ConfirmDialog.svelte";
    import type { Item } from "$lib/stores/items";

    let item: Item | null = null;
    let name = "";
    let sku = "";
    let category = "";
    let description = "";
    let rate = 0;
    let unit = "pcs";
    let isEditing = false;
    let showDeleteDialog = false;

    $: {
        const itemId = $page.params.id;
        const foundItem = $items.find(i => i.id === itemId);
        if (foundItem) {
            item = foundItem;
            name = foundItem.name;
            sku = foundItem.sku;
            category = foundItem.category;
            description = foundItem.description;
            rate = foundItem.rate;
            unit = foundItem.unit;
        }
    }

    function handleSubmit(e: Event) {
        e.preventDefault();

        if (!name) {
            alert('Please enter an item name');
            return;
        }
        if (!category) {
            alert('Please select a category');
            return;
        }
        if (rate <= 0) {
            alert('Please enter a valid unit price');
            return;
        }

        if (item) {
            updateItem(item.id, {
                name,
                sku,
                category,
                description,
                rate,
                unit,
            });

            isEditing = false;
        }
    }

    function handleDelete() {
        if (item) {
            deleteItem(item.id);
            goto("/items");
        }
    }

    $: currencySymbol = getCurrencySymbol($settings.defaultCurrency);
</script>

<svelte:head>
    <title>{item?.name || 'Item'} - Invoicer App</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4 sm:px-6 lg:px-8">
    {#if item}
        <div class="max-w-3xl mx-auto">
            <!-- Header -->
            <div class="flex items-center justify-between gap-4 mb-8 flex-col sm:flex-row">
                <div class="flex items-center gap-4 w-full sm:w-auto">
                    <a
                        href="/items"
                        class="p-2 hover:bg-white rounded-lg transition-colors"
                        aria-label="Back to Items"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="2.5"
                            stroke="currentColor"
                            class="w-5 h-5 text-slate-500 hover:text-slate-800"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                            />
                        </svg>
                    </a>
                    <div>
                        <h1 class="text-3xl font-bold text-slate-900">{name || 'Item'}</h1>
                        <p class="text-slate-500 text-sm mt-0.5">View and manage item details</p>
                    </div>
                </div>
                <div class="flex gap-2">
                    {#if !isEditing}
                        <AppButton variant="secondary" onclick={() => (isEditing = true)}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="w-4 h-4 mr-2"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                                />
                            </svg>
                            Edit
                        </AppButton>
                        <AppButton variant="danger" onclick={() => (showDeleteDialog = true)}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="w-4 h-4 mr-2"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                />
                            </svg>
                            Delete
                        </AppButton>
                    {/if}
                </div>
            </div>

            <!-- Item Details Card -->
            <form
                onsubmit={handleSubmit}
                class="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden"
            >
                <!-- Basic Information Section -->
                <div class="p-6 sm:p-8 border-b border-slate-100">
                    <h2 class="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
                        <span class="w-1 h-1 bg-emerald-500 rounded-full"></span>
                        Basic Information
                    </h2>

                    <div class="space-y-4">
                        <div>
                            <label
                                for="name"
                                class="block text-sm font-medium text-slate-700 mb-2"
                            >
                                Item Name <span class="text-red-500">*</span>
                            </label>
                            <input
                                id="name"
                                type="text"
                                bind:value={name}
                                disabled={!isEditing}
                                placeholder="e.g., Graphic Design Service"
                                class="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-colors disabled:bg-slate-50 disabled:text-slate-600 disabled:cursor-not-allowed"
                            />
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label
                                    for="sku"
                                    class="block text-sm font-medium text-slate-700 mb-2"
                                >
                                    SKU / Item Code <span class="text-slate-400 text-xs font-normal">(Optional)</span>
                                </label>
                                <input
                                    id="sku"
                                    type="text"
                                    bind:value={sku}
                                    disabled={!isEditing}
                                    placeholder="e.g., GD-001"
                                    class="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-colors disabled:bg-slate-50 disabled:text-slate-600 disabled:cursor-not-allowed"
                                />
                            </div>
                            <div>
                                <label
                                    for="category"
                                    class="block text-sm font-medium text-slate-700 mb-2"
                                >
                                    Category <span class="text-red-500">*</span>
                                </label>
                                <select
                                    id="category"
                                    bind:value={category}
                                    disabled={!isEditing}
                                    class="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-colors bg-white cursor-pointer disabled:bg-slate-50 disabled:text-slate-600 disabled:cursor-not-allowed"
                                >
                                    <option value="" class="bg-slate-100 text-slate-500">Select a category...</option>
                                    {#each ITEM_CATEGORIES as cat}
                                        <option value={cat.value} class="bg-white text-slate-900">{cat.label}</option>
                                    {/each}
                                </select>
                            </div>
                            <div>
                                <label
                                    for="unit"
                                    class="block text-sm font-medium text-slate-700 mb-2"
                                >
                                    Unit <span class="text-slate-400 text-xs font-normal">(Optional)</span>
                                </label>
                                <select
                                    id="unit"
                                    bind:value={unit}
                                    disabled={!isEditing}
                                    class="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-colors bg-white cursor-pointer disabled:bg-slate-50 disabled:text-slate-600 disabled:cursor-not-allowed"
                                >
                                    <option value="" class="bg-slate-100 text-slate-500">Select unit...</option>
                                    <option value="pcs" class="bg-white text-slate-900">pcs (Pieces)</option>
                                    <option value="hrs" class="bg-white text-slate-900">hrs (Hours)</option>
                                    <option value="days" class="bg-white text-slate-900">days (Days)</option>
                                    <option value="kg" class="bg-white text-slate-900">kg (Kilograms)</option>
                                    <option value="unit" class="bg-white text-slate-900">unit</option>
                                    <option value="m" class="bg-white text-slate-900">m (Meters)</option>
                                    <option value="job" class="bg-white text-slate-900">job</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Details Section -->
                <div class="p-6 sm:p-8 border-b border-slate-100">
                    <h2 class="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
                        <span class="w-1 h-1 bg-emerald-500 rounded-full"></span>
                        Description & Pricing
                    </h2>

                    <div class="space-y-4">
                        <div>
                            <label
                                for="description"
                                class="block text-sm font-medium text-slate-700 mb-2"
                            >
                                Description <span class="text-slate-400 text-xs font-normal">(Optional)</span>
                            </label>
                            <textarea
                                id="description"
                                bind:value={description}
                                disabled={!isEditing}
                                rows="3"
                                placeholder="Briefly describe the product or service"
                                class="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-colors resize-none disabled:bg-slate-50 disabled:text-slate-600 disabled:cursor-not-allowed"
                            ></textarea>
                        </div>

                        <div>
                            <label
                                for="rate"
                                class="block text-sm font-medium text-slate-700 mb-2"
                            >
                                Unit Price <span class="text-red-500">*</span>
                            </label>
                            <div class="relative">
                                <span
                                    class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium"
                                    >{currencySymbol}</span
                                >
                                <input
                                    id="rate"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    bind:value={rate}
                                    disabled={!isEditing}
                                    placeholder="0.00"
                                    class="w-full pl-8 pr-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-colors disabled:bg-slate-50 disabled:text-slate-600 disabled:cursor-not-allowed"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Action Buttons -->
                {#if isEditing}
                    <div class="px-6 sm:px-8 py-6 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
                        <AppButton
                            type="button"
                            variant="secondary"
                            onclick={() => {
                                isEditing = false;
                                // Reset to item values
                                if (item) {
                                    name = item.name;
                                    sku = item.sku;
                                    category = item.category;
                                    description = item.description;
                                    rate = item.rate;
                                    unit = item.unit;
                                }
                            }}
                        >
                            Cancel
                        </AppButton>
                        <AppButton type="submit" variant="primary">Save Changes</AppButton>
                    </div>
                {/if}
            </form>
        </div>
    {:else}
        <div class="max-w-3xl mx-auto text-center">
            <a
                href="/items"
                class="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium"
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
                        d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                    />
                </svg>
                Back to Items
            </a>
            <p class="text-slate-500 mt-4">Item not found</p>
        </div>
    {/if}
</div>

<ConfirmDialog
    bind:open={showDeleteDialog}
    title="Delete Item"
    description={`Are you sure you want to delete ${name}? This action cannot be undone.`}
    confirmText="Delete"
    destructive={true}
    on:confirm={handleDelete}
/>
