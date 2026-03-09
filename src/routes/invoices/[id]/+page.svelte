<script lang="ts">
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";
    import { invoices, updateInvoice } from "$lib/stores/invoices";
    import InvoiceForm from "$lib/components/InvoiceForm.svelte";
    import AppButton from "$lib/components/AppButton.svelte";

    const invoiceId = $page.params.id;
    const invoice = $derived($invoices.find((inv) => inv.id === invoiceId));

    function handleSave(invoiceData: any) {
        if (!invoiceId) return;
        updateInvoice(invoiceId, invoiceData);
        goto("/invoices");
    }
</script>

<svelte:head>
    <title>Edit Invoice {invoice?.invoiceNumber || ""} - Invoicer App</title>
</svelte:head>

<!-- Sticky Header Toolbar -->
<div
    class="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-4 flex items-center justify-between shadow-sm"
>
    <div class="flex items-center gap-4">
        <a
            href="/invoices"
            class="group text-slate-500 hover:text-slate-800 flex items-center gap-2 font-medium text-sm transition-all"
        >
            <div
                class="p-1 rounded-full group-hover:bg-slate-100 transition-colors"
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
                        d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                    />
                </svg>
            </div>
            Back to Invoices
        </a>
        <div class="h-6 w-px bg-slate-300 mx-2"></div>
        <h1
            class="text-xl font-bold text-slate-800 tracking-tight flex items-center gap-2"
        >
            Edit Invoice <span class="text-emerald-600"
                >{invoice?.invoiceNumber || ""}</span
            >
        </h1>
    </div>
</div>

<div class="px-8 py-10 max-w-5xl mx-auto">
    {#if !invoice}
        <div
            class="bg-white p-12 rounded-2xl shadow-xl text-center border border-slate-200"
        >
            <h3 class="text-2xl font-black text-slate-900 mb-2 tracking-tight">
                Invoice Not Found
            </h3>
            <p class="text-slate-500 mb-8">
                The invoice you're trying to edit doesn't exist.
            </p>
            <AppButton variant="primary" href="/invoices"
                >Return to List</AppButton
            >
        </div>
    {:else}
        <InvoiceForm type="invoice" initialData={invoice} onsave={handleSave} />
    {/if}
</div>
