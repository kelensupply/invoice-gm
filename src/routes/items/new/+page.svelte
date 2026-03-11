<script lang="ts">
  import { goto } from "$app/navigation";
  import { addItem } from "$lib/stores/items";
  import { ITEM_CATEGORIES } from "$lib/constants/categories";
  import { settings } from "$lib/stores/settings";
  import { getCurrencySymbol } from "$lib/constants/currencies";
  import AppButton from "$lib/components/AppButton.svelte";

  let name = "";
  let sku = "";
  let category = "";
  let description = "";
  let rate = 0;
  let unit = "pcs";
  let showScannerNote = false;

  function handleSubmit(e: Event) {
    e.preventDefault();

    if (!name) {
      alert("Please enter an item name");
      return;
    }
    if (!category) {
      alert("Please select a category");
      return;
    }
    if (rate <= 0) {
      alert("Please enter a valid unit price");
      return;
    }

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

  async function handleBarcodeScan() {
    // Check if the device supports the Barcode Detection API
    if ("BarcodeDetector" in window) {
      try {
        const barcodes = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });
        // For now, show a note to the user
        showScannerNote = true;
        setTimeout(() => {
          showScannerNote = false;
        }, 3000);
      } catch (err) {
        // Fallback: allow manual input
        alert(
          "Camera access is needed to scan barcodes. Please enter the SKU manually.",
        );
      }
    } else {
      // Fallback: for devices that don't support BarcodeDetector
      alert(
        "Barcode scanning requires a compatible device. Please enter the SKU manually.",
      );
    }
  }

  $: currencySymbol = getCurrencySymbol($settings.defaultCurrency);
</script>

<svelte:head>
  <title>New Item - InvoiceMa App</title>
</svelte:head>

<div
  class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4 sm:px-6 lg:px-8"
>
  <div class="max-w-3xl mx-auto">
    <!-- Header -->
    <div class="flex items-center gap-4 mb-8">
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
        <h1 class="text-3xl font-bold text-slate-900">New Item</h1>
        <p class="text-slate-500 text-sm mt-0.5">
          Add a new item to your library
        </p>
      </div>
    </div>

    <!-- Main Form Card -->
    <form
      onsubmit={handleSubmit}
      class="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden"
    >
      <!-- Basic Information Section -->
      <div class="p-6 sm:p-8 border-b border-slate-100">
        <h2
          class="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2"
        >
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
              required
              placeholder="e.g., Graphic Design Service"
              class="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-colors"
            />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label
                for="sku"
                class="block text-sm font-medium text-slate-700 mb-2"
              >
                SKU / Item Code <span class="text-slate-400 text-xs font-normal"
                  >(Optional)</span
                >
              </label>
              <div class="relative">
                <input
                  id="sku"
                  type="text"
                  bind:value={sku}
                  placeholder="e.g., GD-001"
                  class="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-colors pr-10"
                />
                <button
                  type="button"
                  onclick={handleBarcodeScan}
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-600 transition-colors p-1"
                  title="Scan barcode"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-5 h-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3 4.5h3m3 0h3m3 0h3M3 9h3m3 0h3m3 0h3M3 13.5h3m3 0h3m3 0h3M3 18h3m3 0h3m3 0h3M9 4.5v13.5M15 4.5v13.5"
                    />
                  </svg>
                </button>
              </div>
              {#if showScannerNote}
                <p class="text-xs text-emerald-600 mt-1">
                  Camera permission required for scanning
                </p>
              {/if}
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
                required
                class="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-colors bg-white cursor-pointer"
              >
                <option value="" class="bg-slate-100 text-slate-500"
                  >Select a category...</option
                >
                {#each ITEM_CATEGORIES as cat}
                  <option value={cat.value} class="bg-white text-slate-900"
                    >{cat.label}</option
                  >
                {/each}
              </select>
            </div>
            <div>
              <label
                for="unit"
                class="block text-sm font-medium text-slate-700 mb-2"
              >
                Unit <span class="text-slate-400 text-xs font-normal"
                  >(Optional)</span
                >
              </label>
              <select
                id="unit"
                bind:value={unit}
                class="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-colors bg-white cursor-pointer"
              >
                <option value="" class="bg-slate-100 text-slate-900"
                  >Select unit...</option
                >
                <option value="pcs" class="bg-white text-slate-600"
                  >pcs (Pieces)</option
                >
                <option value="hrs" class="bg-white text-slate-600"
                  >hrs (Hours)</option
                >
                <option value="days" class="bg-white text-slate-600"
                  >days (Days)</option
                >
                <option value="kg" class="bg-white text-slate-600"
                  >kg (Kilograms)</option
                >
                <option value="unit" class="bg-white text-slate-600"
                  >unit</option
                >
                <option value="m" class="bg-white text-slate-600"
                  >m (Meters)</option
                >
                <option value="job" class="bg-white text-slate-600">job</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- Details Section -->
      <div class="p-6 sm:p-8 border-b border-slate-100">
        <h2
          class="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2"
        >
          <span class="w-1 h-1 bg-emerald-500 rounded-full"></span>
          Description & Pricing
        </h2>

        <div class="space-y-4">
          <div>
            <label
              for="description"
              class="block text-sm font-medium text-slate-700 mb-2"
            >
              Description <span class="text-slate-400 text-xs font-normal"
                >(Optional)</span
              >
            </label>
            <textarea
              id="description"
              bind:value={description}
              rows="3"
              placeholder="Briefly describe the product or service"
              class="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-colors resize-none"
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
                required
                bind:value={rate}
                placeholder="0.00"
                class="w-full pl-8 pr-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-colors"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div
        class="px-6 sm:px-8 py-6 bg-slate-50 border-t border-slate-100 flex justify-end gap-3"
      >
        <AppButton
          type="button"
          variant="secondary"
          onclick={() => goto("/items")}>Cancel</AppButton
        >
        <AppButton type="submit" variant="primary">Add Item</AppButton>
      </div>
    </form>
  </div>
</div>
