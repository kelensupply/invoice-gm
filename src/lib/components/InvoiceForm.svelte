<script lang="ts">
    import { onMount } from "svelte";
    import { v4 as uuidv4 } from "uuid";
    import { slide, fade } from "svelte/transition";
    import { dndzone } from "svelte-dnd-action";
    import SendModal from "$lib/components/SendModal.svelte";
    import { CURRENCIES } from "$lib/constants/currencies";

    import { settings } from "$lib/stores/settings";
    import { clients } from "$lib/stores/clients";
    import { invoices } from "$lib/stores/invoices";
    import { estimates } from "$lib/stores/estimates";
    import { taxRates } from "$lib/stores/tax";

    import AppButton from "$lib/components/AppButton.svelte";
    import LineItemRow from "$lib/components/LineItemRow.svelte";
    import FileUpload from "$lib/components/FileUpload.svelte";
    import { formatCurrency } from "$lib/utils/formatters";

    import type { Invoice, InvoiceItem } from "$lib/models/invoice";
    import type { Estimate } from "$lib/models/estimate";
    import type { Client } from "$lib/models/client";
    import type { CompanyInfo } from "$lib/models/company";

    let {
        type = "invoice",
        initialData = {},
        onsave,
    } = $props<{
        type?: "invoice" | "estimate";
        initialData?: Partial<Invoice | Estimate>;
        onsave?: (data: any) => void;
    }>();

    function generateDefaultNumber() {
        if (type === "invoice") {
            const nextIdx = $invoices.length + 1;
            return `INV-${nextIdx.toString().padStart(3, "0")}`;
        } else {
            const nextIdx = $estimates.length + 1;
            return `EST-${nextIdx.toString().padStart(3, "0")}`;
        }
    }

    // Helper to extract initial values from initialData prop
    function getInitialValues() {
        const d = initialData as any;
        return {
            docNumber: d?.invoiceNumber || d?.estimateNumber || "",
            referenceNumber: d?.poNumber || d?.referenceNumber || "",
            dateIssued: (d?.dateIssued ? new Date(d.dateIssued) : new Date())
                .toISOString()
                .split("T")[0],
            dateDue: (d?.dateDue
                ? new Date(d.dateDue)
                : d?.dateValidUntil
                  ? new Date(d.dateValidUntil)
                  : new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
            )
                .toISOString()
                .split("T")[0],
            sender: d?.sender ? { ...d.sender } : { ...$settings.company },
            selectedClientId:
                d?.client?.id || ($clients.length > 0 ? $clients[0].id : ""),
            items: d?.items
                ? d.items.map((i: any) => ({ ...i }))
                : [
                      {
                          id: uuidv4(),
                          name: "",
                          description: "",
                          rate: 0,
                          quantity: 1,
                      },
                  ],
            taxRate: d?.taxRate ?? $settings.defaultTaxRate,
            discount: d?.discount ?? 0,
            shipping: d?.shipping ?? 0,
            currency: d?.currency ?? $settings.defaultCurrency,
            notes: d?.notes ?? $settings.defaultNotes,
            terms: d?.terms ?? $settings.defaultTerms,
        };
    }

    const init = getInitialValues();

    // Form state - initialized with safe defaults, not directly from prop
    let docNumber = $state(init.docNumber);
    let referenceNumber = $state(init.referenceNumber);
    let dateIssued = $state(init.dateIssued);
    let dateDue = $state(init.dateDue);
    let sender: CompanyInfo = $state(init.sender);
    let selectedClientId = $state(init.selectedClientId);
    let items: InvoiceItem[] = $state(init.items);
    let taxRate = $state(init.taxRate);
    let selectedTaxRate = $state(init.taxRate);
    $effect(() => {
        if (selectedTaxRate !== -1) {
            taxRate = selectedTaxRate;
        }
    });
    let discount = $state(init.discount);
    let shipping = $state(init.shipping);
    let currency = $state(init.currency);
    let notes = $state(init.notes);
    let terms = $state(init.terms);

    // Reinitialize when initialData identity changes (e.g., navigating to a different record)
    $effect(() => {
        const d = initialData as any;
        // Use a stable key to detect identity change
        const key = d?.id || d?.invoiceNumber || d?.estimateNumber || "";
        if (key) {
            const v = getInitialValues();
            docNumber = v.docNumber;
            referenceNumber = v.referenceNumber;
            dateIssued = v.dateIssued;
            dateDue = v.dateDue;
            sender = v.sender;
            selectedClientId = v.selectedClientId;
            items = v.items;
            taxRate = v.taxRate;
            selectedTaxRate = v.taxRate;
            discount = v.discount;
            shipping = v.shipping;
            currency = v.currency;
            notes = v.notes;
            terms = v.terms;
        }
    });

    // Ship To address - allow custom shipping address
    let shipToName = $state("");
    let shipToAddress = $state("");
    let shipToEmail = $state("");
    let shipToPhone = $state("");
    let useCustomShipTo = $state(false);

    // UI state
    let activeClientTab: "billed" | "shipped" = $state("billed");
    let showShippingField = $state(false);
    let showDiscountField = $state(false);
    let showTaxField = $state(false);

    let showShipping = $derived(showShippingField || shipping > 0);
    let showDiscount = $derived(showDiscountField || discount > 0);
    let showTax = $derived(showTaxField || taxRate > 0 || $taxRates.length > 0);

    // Computed
    let subtotal = $derived(
        items.reduce((sum, item) => sum + item.rate * item.quantity, 0),
    );
    let taxAmount = $derived(subtotal * (taxRate / 100));
    let total = $derived(subtotal + taxAmount + shipping - discount);

    function handleDndConsider(e: CustomEvent) {
        items = e.detail.items;
    }

    function handleDndFinalize(e: CustomEvent) {
        items = e.detail.items;
    }

    function addNewItem() {
        items = [
            ...items,
            { id: uuidv4(), name: "", description: "", rate: 0, quantity: 1 },
        ];
    }

    function handleItemUpdate(updatedItem: InvoiceItem) {
        items = items.map((item) =>
            item.id === updatedItem.id ? updatedItem : item,
        );
    }

    function handleItemRemove(idToRemove: string) {
        if (items.length > 1) {
            items = items.filter((item) => item.id !== idToRemove);
        }
    }

    function onSave(status: any = "draft") {
        const client = $clients.find((c) => c.id === selectedClientId);
        if (!client) return;

        const data: any = {
            dateIssued: new Date(dateIssued),
            sender: { ...sender },
            client: { ...client },
            items: items.filter((i) => i.name.trim() !== ""),
            taxRate,
            discount,
            shipping,
            currency,
            notes,
            terms,
            status,
        };

        if (type === "invoice") {
            data.invoiceNumber = docNumber;
            data.poNumber = referenceNumber;
            data.dateDue = new Date(dateDue);
        } else {
            data.estimateNumber = docNumber;
            data.referenceNumber = referenceNumber;
            data.dateValidUntil = new Date(dateDue);
        }

        if (onsave) onsave(data);
    }

    let showSendModal = $state(false);

    function handleSaveAndSend() {
        showSendModal = true;
    }

    function onSend(details: any) {
        console.log(`Sending ${type} via ${details.method}`, details);
        // In a real app, we'd trigger the email/whatsapp service here
        onSave("sent");
    }
</script>

<div
    class="bg-white shadow-2xl rounded-2xl overflow-hidden border border-slate-200 ring-1 ring-slate-900/5"
>
    <!-- Header: Logo & From Info -->
    <div
        class="p-6 md:p-12 border-b border-slate-100 flex flex-col md:flex-row justify-between gap-10 bg-gradient-to-br from-slate-50 to-white"
    >
        <div class="w-full md:w-1/3">
            <FileUpload bind:value={sender.logo} label="Add your logo" />
        </div>

        <div class="flex-1 space-y-3">
            <div class="text-left md:text-right">
                <span
                    class="inline-block text-xs font-black uppercase tracking-widest text-slate-300 border border-slate-200 rounded-md px-2 py-0.5 mb-2"
                >
                    {type === "invoice" ? "INVOICE" : "ESTIMATE"}
                </span>
            </div>
            <div>
                <input
                    bind:value={sender.name}
                    placeholder="Your Company Name"
                    class="block w-full text-left md:text-right border-b-2 border-slate-200 focus:border-emerald-500 pb-1 text-slate-900 focus:outline-none font-bold text-2xl placeholder:text-slate-300 bg-transparent transition-colors"
                />
            </div>
            <div>
                <textarea
                    bind:value={sender.address}
                    placeholder="Address, City, State, ZIP&#10;Phone | Email | Website"
                    rows="4"
                    class="block w-full text-left md:text-right border-none p-0 text-slate-500 focus:ring-0 text-sm resize-none placeholder:text-slate-300 bg-transparent leading-relaxed"
                ></textarea>
            </div>
        </div>
    </div>

    <!-- Middle: Client & Document Details -->
    <div class="flex flex-col lg:flex-row border-b border-slate-100">
        <!-- Client Section -->
        <div
            class="lg:w-1/2 p-6 md:p-12 border-b lg:border-b-0 lg:border-r border-slate-100"
        >
            <div class="flex gap-4 mb-6 border-b border-slate-100 pb-3">
                <button
                    class="text-[10px] font-black uppercase tracking-widest pb-2 transition-all {activeClientTab ===
                    'billed'
                        ? 'text-emerald-600 border-b-2 border-emerald-500 -mb-px'
                        : 'text-slate-400 hover:text-slate-600'}"
                    onclick={() => (activeClientTab = "billed")}
                >
                    Billed To
                </button>
                <button
                    class="text-[10px] font-black uppercase tracking-widest pb-2 transition-all {activeClientTab ===
                    'shipped'
                        ? 'text-emerald-600 border-b-2 border-emerald-500 -mb-px'
                        : 'text-slate-400 hover:text-slate-600'}"
                    onclick={() => (activeClientTab = "shipped")}
                >
                    Ship To
                </button>
                <div class="flex-1 text-right">
                    <AppButton variant="ghost" size="sm" href="/clients/new"
                        >+ New client</AppButton
                    >
                </div>
            </div>

            {#if activeClientTab === "billed"}
                <!-- Billed To Section -->
                {#if $clients.length === 0}
                    <div
                        class="rounded-xl border-2 border-dashed border-slate-200 p-8 text-center"
                    >
                        <p class="text-sm text-slate-400 font-medium">
                            No clients yet.
                        </p>
                        <a
                            href="/clients/new"
                            class="mt-2 inline-block text-sm font-bold text-emerald-600 hover:underline"
                            >Add your first client →</a
                        >
                    </div>
                {:else}
                    <div class="relative mb-4">
                        <select
                            bind:value={selectedClientId}
                            class="block w-full rounded-xl border-2 border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 bg-white py-3 pl-4 pr-10 text-slate-900 font-bold text-lg appearance-none cursor-pointer outline-none transition-all"
                        >
                            {#each $clients as client}
                                <option value={client.id}
                                    >{client.companyName}</option
                                >
                            {/each}
                        </select>
                        <div
                            class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="2.5"
                                stroke="currentColor"
                                class="w-4 h-4"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                                />
                            </svg>
                        </div>
                    </div>

                    {#if selectedClientId}
                        {@const activeClient = $clients.find(
                            (c) => c.id === selectedClientId,
                        )}
                        {#if activeClient}
                            <div
                                class="bg-gradient-to-br from-emerald-50 to-slate-50 rounded-xl p-4 text-sm text-slate-600 space-y-2 border border-slate-100"
                            >
                                <div class="font-semibold text-slate-900">
                                    {activeClient.companyName}
                                </div>
                                {#if activeClient.email}
                                    <div class="flex items-center gap-2">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke-width="1.5"
                                            stroke="currentColor"
                                            class="w-4 h-4 text-slate-400"
                                            ><path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                                            /></svg
                                        >
                                        <span>{activeClient.email}</span>
                                    </div>
                                {/if}
                                {#if activeClient.phone}
                                    <div class="flex items-center gap-2">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke-width="1.5"
                                            stroke="currentColor"
                                            class="w-4 h-4 text-slate-400"
                                            ><path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                                            /></svg
                                        >
                                        <span>{activeClient.phone}</span>
                                    </div>
                                {/if}
                                {#if activeClient.address}
                                    <div class="flex items-start gap-2">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke-width="1.5"
                                            stroke="currentColor"
                                            class="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0"
                                            ><path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                                            /><path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                                            /></svg
                                        >
                                        <span class="whitespace-pre-wrap"
                                            >{activeClient.address}</span
                                        >
                                    </div>
                                {/if}
                            </div>
                        {/if}
                    {/if}
                {/if}
            {:else if activeClientTab === "shipped"}
                <!-- Ship To Section -->
                <div class="space-y-4">
                    <div class="flex items-center gap-2 mb-4">
                        <input
                            type="checkbox"
                            id="customShipTo"
                            bind:checked={useCustomShipTo}
                            class="w-4 h-4 text-emerald-600 border-slate-300 rounded focus:ring-emerald-500"
                        />
                        <label
                            for="customShipTo"
                            class="text-sm font-medium text-slate-700 cursor-pointer"
                        >
                            Use a different shipping address
                        </label>
                    </div>

                    {#if useCustomShipTo}
                        <div
                            class="space-y-4 bg-emerald-50 rounded-xl p-4 border border-emerald-200"
                        >
                            <div>
                                <label
                                    for="shipToName"
                                    class="block text-xs font-semibold text-slate-600 mb-1.5"
                                >
                                    Recipient Name
                                </label>
                                <input
                                    id="shipToName"
                                    type="text"
                                    bind:value={shipToName}
                                    placeholder="Enter recipient name"
                                    class="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-colors bg-white"
                                />
                            </div>

                            <div>
                                <label
                                    for="shipToAddress"
                                    class="block text-xs font-semibold text-slate-600 mb-1.5"
                                >
                                    Shipping Address
                                </label>
                                <textarea
                                    id="shipToAddress"
                                    bind:value={shipToAddress}
                                    rows="3"
                                    placeholder="Street address, city, state, ZIP, country"
                                    class="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-colors bg-white resize-none"
                                ></textarea>
                            </div>

                            <div class="grid grid-cols-2 gap-3">
                                <div>
                                    <label
                                        for="shipToEmail"
                                        class="block text-xs font-semibold text-slate-600 mb-1.5"
                                    >
                                        Email (Optional)
                                    </label>
                                    <input
                                        id="shipToEmail"
                                        type="email"
                                        bind:value={shipToEmail}
                                        placeholder="recipient@example.com"
                                        class="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-colors bg-white"
                                    />
                                </div>
                                <div>
                                    <label
                                        for="shipToPhone"
                                        class="block text-xs font-semibold text-slate-600 mb-1.5"
                                    >
                                        Phone (Optional)
                                    </label>
                                    <input
                                        id="shipToPhone"
                                        type="tel"
                                        bind:value={shipToPhone}
                                        placeholder="+1 (555) 000-0000"
                                        class="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-colors bg-white"
                                    />
                                </div>
                            </div>
                        </div>
                    {:else}
                        <!-- Show billing client info or prompt to use custom -->
                        {#if selectedClientId}
                            {@const activeClient = $clients.find(
                                (c) => c.id === selectedClientId,
                            )}
                            {#if activeClient}
                                <div
                                    class="bg-gradient-to-br from-blue-50 to-slate-50 rounded-xl p-4 text-sm text-slate-600 space-y-2 border border-slate-100"
                                >
                                    <div class="font-semibold text-slate-900">
                                        {activeClient.companyName}
                                    </div>
                                    <p class="text-xs text-slate-500 italic">
                                        Using billing address for shipping
                                    </p>
                                    {#if activeClient.address}
                                        <div
                                            class="flex items-start gap-2 mt-2 pt-2 border-t border-slate-200"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke-width="1.5"
                                                stroke="currentColor"
                                                class="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0"
                                                ><path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                                                /><path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                                                /></svg
                                            >
                                            <span class="whitespace-pre-wrap"
                                                >{activeClient.address}</span
                                            >
                                        </div>
                                    {/if}
                                </div>
                            {/if}
                        {/if}
                    {/if}
                </div>
            {/if}
        </div>

        <!-- Document Info Section -->
        <div class="lg:w-1/2 p-6 md:p-12">
            <h3
                class="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2 border-b border-slate-100 pb-3"
            >
                <span class="w-2 h-2 bg-emerald-500 rounded-full"></span>
                Document Details
            </h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                <div class="space-y-1.5">
                    <label
                        for="date-issued"
                        class="block text-[10px] font-bold uppercase tracking-widest text-slate-500"
                        >Date Issued</label
                    >
                    <input
                        id="date-issued"
                        type="date"
                        bind:value={dateIssued}
                        class="block w-full rounded-lg border-2 border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 px-3 py-2.5 text-slate-900 font-semibold text-sm outline-none transition-all"
                    />
                </div>
                <div class="space-y-1.5">
                    <label
                        for="date-due"
                        class="block text-[10px] font-bold uppercase tracking-widest text-slate-500"
                    >
                        {type === "invoice" ? "Date Due" : "Valid Until"}
                    </label>
                    <input
                        id="date-due"
                        type="date"
                        bind:value={dateDue}
                        class="block w-full rounded-lg border-2 border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 px-3 py-2.5 text-slate-900 font-semibold text-sm outline-none transition-all"
                    />
                </div>
                <div class="space-y-1.5">
                    <label
                        for="doc-number"
                        class="block text-[10px] font-bold uppercase tracking-widest text-slate-500"
                    >
                        {type === "invoice" ? "Invoice #" : "Estimate #"}
                    </label>
                    <input
                        id="doc-number"
                        type="text"
                        bind:value={docNumber}
                        placeholder="e.g. INV-001"
                        class="block w-full rounded-lg border-2 border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 px-3 py-2.5 text-slate-900 font-semibold text-sm outline-none transition-all placeholder:text-slate-300"
                    />
                </div>
                <div class="space-y-1.5">
                    <label
                        for="currency-select"
                        class="block text-[10px] font-bold uppercase tracking-widest text-slate-500"
                        >Currency</label
                    >
                    <div class="relative">
                        <select
                            id="currency-select"
                            bind:value={currency}
                            class="block w-full rounded-lg border-2 border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 px-3 py-2.5 text-slate-900 font-semibold text-sm outline-none transition-all appearance-none bg-white cursor-pointer"
                        >
                            {#each CURRENCIES as c}
                                <option value={c.code}
                                    >{c.code} ({c.symbol}) - {c.name}</option
                                >
                            {/each}
                        </select>
                        <div
                            class="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="2.5"
                                stroke="currentColor"
                                class="w-3.5 h-3.5"
                                ><path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                                /></svg
                            >
                        </div>
                    </div>
                </div>
                <div class="space-y-1.5 col-span-2">
                    <label
                        for="ref-number"
                        class="block text-[10px] font-bold uppercase tracking-widest text-slate-500"
                    >
                        {type === "invoice" ? "PO Number" : "Reference #"}
                    </label>
                    <input
                        id="ref-number"
                        type="text"
                        bind:value={referenceNumber}
                        placeholder="Optional reference number"
                        class="block w-full rounded-lg border-2 border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 px-3 py-2.5 text-slate-900 font-semibold text-sm outline-none transition-all placeholder:text-slate-300"
                    />
                </div>
            </div>
        </div>
    </div>

    <!-- Line Items Section -->
    <div class="p-6 md:p-12 pb-4">
        <h3
            class="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2 border-b border-slate-100 pb-3"
        >
            <span class="w-2 h-2 bg-emerald-500 rounded-full"></span>
            Line Items
        </h3>
        <div
            class="hidden md:grid grid-cols-12 gap-4 pb-4 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b-2 border-slate-200"
        >
            <div class="col-span-1"></div>
            <div class="col-span-6">Item</div>
            <div class="col-span-2 text-right">Rate</div>
            <div class="col-span-1 text-center">Qty</div>
            <div class="col-span-1 text-right">Line Total</div>
            <div class="col-span-1"></div>
        </div>

        <div
            use:dndzone={{
                items,
                dragDisabled: items.length <= 1,
                flipDurationMs: 200,
            }}
            onconsider={handleDndConsider}
            onfinalize={handleDndFinalize}
            class="divide-y divide-slate-100"
        >
            {#each items as item (item.id)}
                <div transition:slide={{ duration: 200 }}>
                    <LineItemRow
                        bind:item={items[items.indexOf(item)]}
                        {currency}
                        onupdate={handleItemUpdate}
                        onremove={handleItemRemove}
                    />
                </div>
            {/each}
        </div>

        <div class="pt-6 pb-2">
            <button
                type="button"
                onclick={addNewItem}
                class="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-bold text-sm transition-all border-2 border-dashed border-emerald-200 hover:border-emerald-400 rounded-xl px-5 py-3 hover:bg-emerald-50"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2.5"
                    stroke="currentColor"
                    class="w-4 h-4"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                    />
                </svg>
                Add line item
            </button>
        </div>
    </div>

    <!-- Footer: Totals & Notes -->
    <div
        class="p-6 md:p-12 pt-0 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16"
    >
        <!-- Notes & Terms -->
        <div class="space-y-6 pt-8">
            <div class="">
                <h4
                    class="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2"
                >
                    <span class="w-1.5 h-1.5 bg-emerald-500 rounded-full"
                    ></span>
                    Notes
                </h4>
                <textarea
                    bind:value={notes}
                    rows="3"
                    placeholder="Notes or payment details (optional)..."
                    class="block w-full rounded-lg border-2 border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 px-3 py-2.5 text-slate-600 text-sm placeholder:text-slate-300 resize-none outline-none transition-all leading-relaxed"
                ></textarea>
            </div>
            <div class="">
                <h4
                    class="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2"
                >
                    <span class="w-1.5 h-1.5 bg-emerald-500 rounded-full"
                    ></span>
                    Terms & Conditions
                </h4>
                <textarea
                    bind:value={terms}
                    rows="2"
                    placeholder="Payment terms and conditions."
                    class="block w-full rounded-lg border-2 border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 px-3 py-2.5 text-slate-600 text-sm placeholder:text-slate-300 resize-none outline-none transition-all leading-relaxed"
                ></textarea>
            </div>
        </div>

        <!-- Totals -->
        <div class="pt-8">
            <div
                class="bg-slate-50 rounded-2xl p-6 border border-slate-100 space-y-3"
            >
                <div class="flex justify-between items-center py-1.5">
                    <span class="font-semibold text-slate-500 text-sm"
                        >Subtotal</span
                    >
                    <span class="font-bold text-slate-900"
                        >{formatCurrency(subtotal, currency)}</span
                    >
                </div>

                {#if showShipping}
                    <div
                        class="flex justify-between items-center py-1.5 border-t border-slate-200"
                        transition:slide
                    >
                        <span class="font-semibold text-slate-500 text-sm"
                            >Shipping</span
                        >
                        <div class="flex items-center gap-1">
                            <span class="text-slate-400 text-sm"
                                >{currency}</span
                            >
                            <input
                                type="number"
                                bind:value={shipping}
                                class="w-24 text-right rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-0 px-2 py-1 font-bold text-slate-900 text-sm bg-white outline-none"
                            />
                        </div>
                    </div>
                {/if}

                {#if showDiscount}
                    <div
                        class="flex justify-between items-center py-1.5 border-t border-slate-200"
                        transition:slide
                    >
                        <span class="font-semibold text-slate-500 text-sm"
                            >Discount</span
                        >
                        <div class="flex items-center gap-1">
                            <span class="text-slate-400 text-sm"
                                >{currency}</span
                            >
                            <input
                                type="number"
                                bind:value={discount}
                                class="w-24 text-right rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-0 px-2 py-1 font-bold text-slate-900 text-sm bg-white outline-none"
                            />
                        </div>
                    </div>
                {/if}

                {#if showTax}
                    <div
                        class="flex justify-between items-center py-1.5 border-t border-slate-200"
                        transition:slide
                    >
                        <div class="flex items-center gap-2">
                            <span class="font-semibold text-slate-500 text-sm"
                                >Tax</span
                            >
                            <div class="flex items-center gap-1">
                                {#if $taxRates.length > 0}
                                    <select
                                        bind:value={selectedTaxRate}
                                        class="w-32 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-0 px-2 py-1 font-bold text-slate-900 text-sm bg-white outline-none"
                                    >
                                        <option value={0}>No Tax (0%)</option>
                                        {#each $taxRates as rate}
                                            <option value={rate.rate}
                                                >{rate.name} ({rate.rate}%)</option
                                            >
                                        {/each}
                                        <option value={-1}>Custom...</option>
                                    </select>
                                    {#if selectedTaxRate === -1}
                                        <input
                                            type="number"
                                            bind:value={taxRate}
                                            class="w-14 text-center rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-0 px-2 py-1 font-bold text-slate-900 text-sm bg-white outline-none ml-1"
                                        />
                                    {/if}
                                {:else}
                                    <input
                                        type="number"
                                        bind:value={taxRate}
                                        class="w-14 text-center rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-0 px-2 py-1 font-bold text-slate-900 text-sm bg-white outline-none"
                                    />
                                {/if}
                                <span class="text-slate-400 text-sm">%</span>
                            </div>
                        </div>
                        <span class="font-bold text-slate-900"
                            >{formatCurrency(taxAmount, currency)}</span
                        >
                    </div>
                {/if}

                <!-- Optional add buttons -->
                <div
                    class="flex flex-wrap gap-2 pt-2 border-t border-slate-200"
                >
                    {#if !showShipping}
                        <button
                            class="text-xs font-semibold text-slate-500 hover:text-emerald-600 bg-white border border-slate-200 hover:border-emerald-300 rounded-lg px-2.5 py-1 transition-all"
                            onclick={() => (showShippingField = true)}
                            >+ Shipping</button
                        >
                    {/if}
                    {#if !showDiscount}
                        <button
                            class="text-xs font-semibold text-slate-500 hover:text-emerald-600 bg-white border border-slate-200 hover:border-emerald-300 rounded-lg px-2.5 py-1 transition-all"
                            onclick={() => (showDiscountField = true)}
                            >+ Discount</button
                        >
                    {/if}
                    {#if !showTax}
                        <button
                            class="text-xs font-semibold text-slate-500 hover:text-emerald-600 bg-white border border-slate-200 hover:border-emerald-300 rounded-lg px-2.5 py-1 transition-all"
                            onclick={() => (showTaxField = true)}>+ Tax</button
                        >
                    {/if}
                </div>

                <!-- Grand Total -->
                <div
                    class="pt-4 mt-2 border-t-4 border-slate-900 flex justify-between items-center"
                >
                    <span
                        class="font-black text-lg uppercase tracking-widest text-slate-900"
                        >Total</span
                    >
                    <span
                        class="font-black text-4xl tracking-tighter text-slate-900"
                        >{formatCurrency(total, currency)}</span
                    >
                </div>
            </div>

            <!-- Action Buttons -->
            <div
                class="pt-6 flex flex-col sm:flex-row justify-end gap-3 no-print"
            >
                <AppButton
                    variant="secondary"
                    size="md"
                    onclick={() => onSave("draft")}>Save as Draft</AppButton
                >
                <AppButton
                    variant="primary"
                    size="md"
                    onclick={handleSaveAndSend}>Save &amp; Send</AppButton
                >
            </div>
        </div>
    </div>

    {#if selectedClientId}
        {@const activeClient = $clients.find((c) => c.id === selectedClientId)}
        <SendModal
            bind:open={showSendModal}
            title={`Send ${type === "invoice" ? "Invoice" : "Estimate"}`}
            {type}
            initialClientName={activeClient?.companyName || ""}
            initialClientEmail={activeClient?.email || ""}
            onsend={onSend}
        />
    {/if}
</div>
