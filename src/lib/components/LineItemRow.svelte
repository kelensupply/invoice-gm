<script lang="ts">
    import type { InvoiceItem } from "$lib/models/invoice";
    import { formatCurrency } from "$lib/utils/formatters";
    import { createEventDispatcher } from "svelte";

    export let item: InvoiceItem;
    export let currency: string = "USD";

    const dispatch = createEventDispatcher();

    $: total = item.rate * item.quantity;

    function handleUpdate() {
        dispatch("update", item);
    }

    function handleRemove() {
        dispatch("remove", item.id);
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

        <!-- Item Name Input -->
        <div class="col-span-6">
            <input
                id="item-name-{item.id}"
                type="text"
                bind:value={item.name}
                oninput={handleUpdate}
                placeholder="Item name"
                class="block w-full bg-white border border-slate-200 rounded px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 text-sm font-medium transition-colors"
            />
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

