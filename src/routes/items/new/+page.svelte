<script lang="ts">
    import { goto } from "$app/navigation";
    import { addItem } from "$lib/stores/items";
    import AppButton from "$lib/components/AppButton.svelte";

    let name = "";
    let sku = "";
    let category = "";
    let description = "";
    let rate = 0;
    let unit = "pcs";

    function handleSubmit() {
        if (!name) return;

        addItem({
            name,
            sku,
            category,
            description,
            rate,
            unit,
        });

        goto("/items");
    }
</script>

<svelte:head>
    <title>New Item - Invoicer App</title>
</svelte:head>

<div class="p-8 max-w-2xl mx-auto">
    <div class="flex items-center gap-4 mb-8">
        <a
            href="/items"
            class="text-slate-500 hover:text-slate-800 transition-colors"
            aria-label="Back to Items"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2.5"
                stroke="currentColor"
                class="w-5 h-5"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
            </svg>
        </a>
        <h1 class="text-2xl font-bold text-slate-900 tracking-tight">
            New Item
        </h1>
    </div>

    <form
        on:submit|preventDefault={handleSubmit}
        class="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 space-y-6"
    >
        <div class="space-y-1">
            <label
                for="name"
                class="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-1"
                >Item Name *</label
            >
            <input
                id="name"
                type="text"
                bind:value={name}
                required
                placeholder="e.g. Graphic Design"
                class="block w-full border-slate-200 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 text-sm"
            />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div class="space-y-1">
                <label
                    for="sku"
                    class="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-1"
                    >SKU / Item Code</label
                >
                <input
                    id="sku"
                    type="text"
                    bind:value={sku}
                    placeholder="e.g. GD-001"
                    class="block w-full border-slate-200 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                />
            </div>
            <div class="space-y-1">
                <label
                    for="category"
                    class="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-1"
                    >Category</label
                >
                <input
                    id="category"
                    type="text"
                    bind:value={category}
                    placeholder="e.g. Services"
                    class="block w-full border-slate-200 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                />
            </div>
        </div>

        <div class="space-y-1">
            <label
                for="description"
                class="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-1"
                >Description</label
            >
            <textarea
                id="description"
                bind:value={description}
                rows="2"
                placeholder="Briefly describe the product or service"
                class="block w-full border-slate-200 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 text-sm resize-none"
            ></textarea>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div class="space-y-1">
                <label
                    for="rate"
                    class="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-1"
                    >Default Rate</label
                >
                <div class="relative">
                    <span
                        class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm"
                        >$</span
                    >
                    <input
                        id="rate"
                        type="number"
                        step="0.01"
                        bind:value={rate}
                        class="block w-full pl-7 border-slate-200 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                    />
                </div>
            </div>
            <div class="space-y-1">
                <label
                    for="unit"
                    class="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-1"
                    >Unit</label
                >
                <select
                    id="unit"
                    bind:value={unit}
                    class="block w-full border-slate-200 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                >
                    <option value="pcs">pcs (Pieces)</option>
                    <option value="hrs">hrs (Hours)</option>
                    <option value="days">days (Days)</option>
                    <option value="kg">kg (Kilograms)</option>
                    <option value="unit">unit</option>
                    <option value="m">m (Meters)</option>
                    <option value="job">job</option>
                </select>
            </div>
        </div>

        <div class="pt-4 flex justify-end gap-3">
            <AppButton
                type="button"
                variant="secondary"
                on:click={() => goto("/items")}>Cancel</AppButton
            >
            <AppButton type="submit" variant="primary">Add Item</AppButton>
        </div>
    </form>
</div>
