<script lang="ts">
    import type { InvoiceItem } from "$lib/models/invoice";
    import { formatCurrency } from "$lib/utils/formatters";
    import { createEventDispatcher } from "svelte";
    import { items } from "$lib/stores/items";

    export let item: InvoiceItem;
    export let currency: string = "USD";

    const dispatch = createEventDispatcher();

    let showSuggestions = false;
    let filteredItems: any[] = [];

    $: total = item.rate * item.quantity;

    function handleUpdate() {
        dispatch("update", item);
    }

    function handleRemove() {
        dispatch("remove", item.id);
    }

    function handleItemNameInput() {
        handleUpdate();
        
        if (item.name.trim().length > 0) {
            filteredItems = $items.filter(availableItem =>
                availableItem.name.toLowerCase().includes(item.name.toLowerCase())
            );
            showSuggestions = filteredItems.length > 0;
        } else {
            showSuggestions = false;
            filteredItems = [];
        }
    }

    function selectSuggestedItem(suggestedItem: any) {
        item.name = suggestedItem.name;
        item.rate = suggestedItem.rate;
        item.description = suggestedItem.description || "";
        item.unit = suggestedItem.unit || "pcs";
        
        showSuggestions = false;
        filteredItems = [];
        handleUpdate();
    }
</script>

<!-- Item row with collapsible description -->
<div class="border-b border-slate-100 hover:bg-slate-50 transition-colors group">
    <!-- Main row: Name, Rate, Qty, Line Total -->
    <div class="py-4 px-4 grid grid-cols-12 gap-4 items-start">
        <!-- Drag Handle -->
        <div class="col-span-1 flex items-center justify-center pt-1">
            <div class="flex-shrink-0 flex items-center justify-center text-slate-300 group-hover:text-slate-400 cursor-move">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    class="w-4 h-4"
                >
                    <path
                        d="M7 2a2 2 0 100 4 2 2 0 000-4zM7 8a2 2 0 100 4 2 2 0 000-4zM7 14a2 2 0 100 4 2 2 0 000-4zM13 2a2 2 0 100 4 2 2 0 000-4zM13 8a2 2 0 100 4 2 2 0 000-4zM13 14a2 2 0 100 4 2 2 0 000-4z"
                    />
                </svg>
            </div>
        </div>

        <!-- Item Name Input with Autocomplete -->
        <div class="col-span-6 relative">
            <input
                id="item-name-{item.id}"
                type="text"
                bind:value={item.name}
                oninput={handleItemNameInput}
                onfocus={() => {
                    if (item.name.trim().length > 0 && filteredItems.length > 0) {
                        showSuggestions = true;
                    }
                }}
                onblur={() => {
                    setTimeout(() => {
                        showSuggestions = false;
                    }, 200);
                }}
                placeholder="Item name (start typing to search)"
                class="block w-full bg-white border border-slate-200 rounded px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 text-sm font-medium transition-colors"
            />
            
            <!-- Autocomplete Suggestions Dropdown -->
            {#if showSuggestions && filteredItems.length > 0}
                <div class="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded shadow-lg z-50 max-h-48 overflow-y-auto">
                    {#each filteredItems as suggestedItem (suggestedItem.id)}
                        <button
                            type="button"
                            onclick={() => selectSuggestedItem(suggestedItem)}
                            class="w-full text-left px-3 py-2 hover:bg-emerald-50 transition-colors border-b border-slate-100 last:border-b-0"
                        >
                            <div class="flex flex-col gap-0.5">
                                <div class="font-medium text-slate-900 text-sm">{suggestedItem.name}</div>
                                <div class="text-xs text-slate-500">
                                    {formatCurrency(suggestedItem.rate, currency)} • {suggestedItem.unit || 'pcs'}
                                </div>
                            </div>
                        </button>
                    {/each}
                </div>
            {/if}
        </div>

        <!-- Rate Input -->
        <div class="col-span-2">
            <div class="flex items-center gap-1 h-full">
                <input
                    id="item-rate-{item.id}"
                    type="number"
                    bind:value={item.rate}
                    oninput={handleUpdate}
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    class="block w-full bg-white border border-slate-200 rounded px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 text-sm text-right transition-colors"
                />
            </div>
        </div>

        <!-- Qty Input -->
        <div class="col-span-1">
            <input
                id="item-qty-{item.id}"
                type="number"
                bind:value={item.quantity}
                oninput={handleUpdate}
                min="1"
                step="1"
                placeholder="1"
                class="block w-full bg-white border border-slate-200 rounded px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 text-sm text-center transition-colors"
            />
        </div>

        <!-- Line Total (Read-only) -->
        <div class="col-span-1 text-right pt-2">
            <div class="font-semibold text-slate-900 text-sm">
                {formatCurrency(total, currency)}
            </div>
        </div>

        <!-- Delete Button -->
        <div class="col-span-1 flex items-center justify-end">
            <button
                type="button"
                onclick={handleRemove}
                class="text-slate-300 hover:text-red-500 transition-all p-1"
                title="Remove item"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    class="w-4 h-4"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </button>
        </div>
    </div>

    <!-- Description row - using same grid alignment -->
    <div class="px-4 pb-4 grid grid-cols-12 gap-4">
        <div class="col-span-1"></div>
        <div class="col-span-6">
            <textarea
                id="item-desc-{item.id}"
                bind:value={item.description}
                oninput={handleUpdate}
                placeholder="Item description"
                rows="1"
                class="block w-full bg-white border border-slate-200 rounded px-3 py-2 text-slate-600 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 text-sm resize-none transition-colors"
            ></textarea>
        </div>
        <div class="col-span-5"></div>
    </div>
</div>

