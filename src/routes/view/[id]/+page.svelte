<script lang="ts">
    import { onMount } from "svelte";
    import { formatCurrency, formatDate } from "$lib/utils/formatters";
    import { getCurrencySymbol } from "$lib/constants/currencies";

    let { data } = $props();
    const doc = $derived(data.document);
    const type = $derived(data.type);

    // Calculate totals
    const subtotal = $derived(
        doc.items.reduce(
            (sum: number, item: any) => sum + item.rate * item.quantity,
            0,
        ),
    );
    const taxAmount = $derived(subtotal * ((doc.tax_rate || 0) / 100));
    const total = $derived(
        subtotal + taxAmount + (doc.shipping || 0) - (doc.discount || 0),
    );

    function handlePrint() {
        window.print();
    }

    onMount(() => {
        // State machine hook: Mark as viewed when public link is opened
        if (type === "invoice" && doc.status === "sent") {
            fetch(`/api/invoices/${doc.id}/view`, {
                method: "POST",
            }).catch((e) =>
                console.error("Failed to mark invoice as viewed", e),
            );
        }
    });
</script>

<svelte:head>
    <title
        >{type === "invoice" ? "Invoice" : "Estimate"}
        {doc.invoice_number || doc.estimate_number} - {doc.sender.name}</title
    >
</svelte:head>

<div
    class="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 print:p-0 print:bg-white"
>
    <div class="max-w-4xl mx-auto">
        <!-- Public View Notice (Not shown in print) -->
        <div
            class="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden"
        >
            <div class="flex items-center gap-2 text-slate-500">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                </svg>
                <span class="text-sm font-medium">Public View Mode</span>
            </div>
            <button
                onclick={handlePrint}
                class="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-700 font-bold text-sm shadow-sm hover:bg-slate-50 transition-colors"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                    />
                </svg>
                Print or Save as PDF
            </button>
        </div>

        <!-- Premium Invoice Layout -->
        <div
            class="bg-white shadow-2xl rounded-3xl overflow-hidden border border-slate-200 print:shadow-none print:border-none print:rounded-none"
        >
            <!-- Header Banner -->
            <div class="h-2 bg-emerald-500 print:hidden"></div>

            <div class="p-8 sm:p-12">
                <!-- Top Section: Logo and Title -->
                <div
                    class="flex flex-col sm:flex-row justify-between items-start gap-8 mb-12"
                >
                    <div>
                        {#if doc.sender.logo}
                            <img
                                src={doc.sender.logo}
                                alt={doc.sender.name}
                                class="h-16 w-auto mb-4 object-contain"
                            />
                        {:else}
                            <div
                                class="text-2xl font-black text-emerald-600 mb-2"
                            >
                                {doc.sender.name}
                            </div>
                        {/if}
                        <div
                            class="text-slate-500 text-sm max-w-xs whitespace-pre-line"
                        >
                            {doc.sender.address}
                        </div>
                    </div>
                    <div class="text-right sm:text-right w-full sm:w-auto">
                        <h1
                            class="text-4xl font-black text-slate-900 uppercase tracking-tight mb-2"
                        >
                            {type === "invoice" ? "Invoice" : "Estimate"}
                        </h1>
                        <div
                            class="text-slate-500 font-bold uppercase tracking-widest text-xs"
                        >
                            #{doc.invoice_number || doc.estimate_number}
                        </div>
                    </div>
                </div>

                <!-- Info Grid -->
                <div
                    class="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12 py-8 border-y border-slate-100"
                >
                    <div>
                        <div
                            class="text-[10px] font-black uppercase text-emerald-600 tracking-widest mb-4"
                        >
                            Bill To
                        </div>
                        <div class="text-lg font-bold text-slate-900 mb-1">
                            {doc.client.company_name}
                        </div>
                        <div class="text-slate-700 font-medium mb-1">
                            {doc.client.contact_name}
                        </div>
                        <div
                            class="text-slate-500 text-sm whitespace-pre-line leading-relaxed"
                        >
                            {doc.client.address}
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <div
                                class="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1"
                            >
                                Date Issued
                            </div>
                            <div class="text-sm font-bold text-slate-900">
                                {formatDate(new Date(doc.date_issued))}
                            </div>
                        </div>
                        <div>
                            <div
                                class="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1"
                            >
                                {type === "invoice"
                                    ? "Due Date"
                                    : "Valid Until"}
                            </div>
                            <div class="text-sm font-bold text-slate-900">
                                {formatDate(
                                    new Date(
                                        doc.date_due || doc.date_valid_until,
                                    ),
                                )}
                            </div>
                        </div>
                        {#if doc.po_number || doc.reference_number}
                            <div class="col-span-2">
                                <div
                                    class="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1"
                                >
                                    {doc.po_number ? "PO Number" : "Reference"}
                                </div>
                                <div class="text-sm font-bold text-slate-900">
                                    {doc.po_number || doc.reference_number}
                                </div>
                            </div>
                        {/if}
                    </div>
                </div>

                <!-- Items Layout -->
                <div class="mb-12">
                    <!-- Desktop Table -->
                    <div class="hidden sm:block overflow-x-auto">
                        <table class="w-full text-left border-collapse">
                            <thead>
                                <tr class="border-b-2 border-slate-900">
                                    <th
                                        class="py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest"
                                        >Description</th
                                    >
                                    <th
                                        class="py-4 px-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right"
                                        >Qty</th
                                    >
                                    <th
                                        class="py-4 px-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right"
                                        >Price</th
                                    >
                                    <th
                                        class="py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right"
                                        >Total</th
                                    >
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-100">
                                {#each doc.items as item}
                                    <tr>
                                        <td class="py-5">
                                            <div
                                                class="font-bold text-slate-900"
                                            >
                                                {item.name}
                                            </div>
                                            {#if item.description}
                                                <div
                                                    class="text-xs text-slate-500 mt-1"
                                                >
                                                    {item.description}
                                                </div>
                                            {/if}
                                        </td>
                                        <td
                                            class="py-5 px-4 text-right text-sm font-medium text-slate-700"
                                            >{item.quantity}</td
                                        >
                                        <td
                                            class="py-5 px-4 text-right text-sm font-medium text-slate-700"
                                        >
                                            {formatCurrency(
                                                item.rate,
                                                doc.currency,
                                            )}
                                        </td>
                                        <td
                                            class="py-5 text-right text-sm font-bold text-slate-900"
                                        >
                                            {formatCurrency(
                                                item.rate * item.quantity,
                                                doc.currency,
                                            )}
                                        </td>
                                    </tr>
                                {/each}
                            </tbody>
                        </table>
                    </div>

                    <!-- Mobile Card Layout -->
                    <div class="sm:hidden space-y-4">
                        <div
                            class="text-[10px] font-black uppercase text-slate-400 tracking-widest border-b border-slate-100 pb-2"
                        >
                            Items
                        </div>
                        {#each doc.items as item}
                            <div
                                class="py-4 border-b border-slate-50 last:border-0 text-left"
                            >
                                <div class="font-bold text-slate-900 mb-1">
                                    {item.name}
                                </div>
                                {#if item.description}
                                    <div class="text-xs text-slate-500 mb-3">
                                        {item.description}
                                    </div>
                                {/if}
                                <div class="flex justify-between items-end">
                                    <div class="text-xs text-slate-500">
                                        <span class="font-bold text-slate-700"
                                            >{item.quantity}</span
                                        >
                                        × {formatCurrency(
                                            item.rate,
                                            doc.currency,
                                        )}
                                    </div>
                                    <div class="font-bold text-slate-900">
                                        {formatCurrency(
                                            item.rate * item.quantity,
                                            doc.currency,
                                        )}
                                    </div>
                                </div>
                            </div>
                        {/each}
                    </div>
                </div>

                <!-- Totals Section -->
                <div class="flex justify-end mb-12">
                    <div class="w-full sm:w-64 space-y-3">
                        <div
                            class="flex justify-between text-sm text-slate-500 font-medium"
                        >
                            <span>Subtotal</span>
                            <span>{formatCurrency(subtotal, doc.currency)}</span
                            >
                        </div>
                        {#if doc.tax_rate > 0}
                            <div
                                class="flex justify-between text-sm text-slate-500 font-medium"
                            >
                                <span>Tax ({doc.tax_rate}%)</span>
                                <span
                                    >{formatCurrency(
                                        taxAmount,
                                        doc.currency,
                                    )}</span
                                >
                            </div>
                        {/if}
                        {#if doc.shipping > 0}
                            <div
                                class="flex justify-between text-sm text-slate-500 font-medium"
                            >
                                <span>Shipping</span>
                                <span
                                    >{formatCurrency(
                                        doc.shipping,
                                        doc.currency,
                                    )}</span
                                >
                            </div>
                        {/if}
                        {#if doc.discount > 0}
                            <div
                                class="flex justify-between text-sm text-red-500 font-medium"
                            >
                                <span>Discount</span>
                                <span
                                    >-{formatCurrency(
                                        doc.discount,
                                        doc.currency,
                                    )}</span
                                >
                            </div>
                        {/if}
                        <div
                            class="pt-3 border-t border-slate-200 flex justify-between items-center"
                        >
                            <span
                                class="text-lg font-black text-slate-900 uppercase tracking-tight"
                                >Total</span
                            >
                            <span class="text-2xl font-black text-emerald-600"
                                >{formatCurrency(total, doc.currency)}</span
                            >
                        </div>
                    </div>
                </div>

                <!-- Footer: Notes & Terms -->
                <div
                    class="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12 border-t border-slate-100"
                >
                    {#if doc.notes}
                        <div>
                            <div
                                class="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2"
                            >
                                Notes
                            </div>
                            <p
                                class="text-xs text-slate-600 leading-relaxed whitespace-pre-line"
                            >
                                {doc.notes}
                            </p>
                        </div>
                    {/if}
                    {#if doc.terms}
                        <div>
                            <div
                                class="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2"
                            >
                                Terms & Conditions
                            </div>
                            <p
                                class="text-xs text-slate-600 leading-relaxed whitespace-pre-line"
                            >
                                {doc.terms}
                            </p>
                        </div>
                    {/if}
                </div>
            </div>

            <!-- Bottom Branding -->
            <div
                class="bg-slate-50 p-6 flex items-center justify-center gap-2 print:hidden"
            >
                <span
                    class="text-[10px] font-bold text-slate-400 uppercase tracking-widest"
                    >Powered by</span
                >
                <div class="flex items-center gap-1">
                    <div
                        class="w-4 h-4 bg-emerald-500 rounded flex items-center justify-center"
                    >
                        <div class="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span
                        class="text-[10px] font-black text-slate-900 uppercase tracking-tight"
                        >Invoicer GM</span
                    >
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    @media print {
        :global(body) {
            background: white !important;
        }
        .print\:hidden {
            display: none !important;
        }
    }
</style>
