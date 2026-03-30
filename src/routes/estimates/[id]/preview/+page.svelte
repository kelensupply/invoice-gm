<script lang="ts">
    import { page } from "$app/stores";
    import { onMount, tick } from "svelte";
    import { estimates } from "$lib/stores/estimates";
    import { addInvoice, invoices } from "$lib/stores/invoices";
    import { documentHistory } from "$lib/stores/history";
    import { goto } from "$app/navigation";
    import { generateEstimatePdf } from "$lib/services/pdf-service";
    import AppButton from "$lib/components/AppButton.svelte";
    import ShareModal from "$lib/components/ShareModal.svelte";
    import { formatCurrency, formatDate } from "$lib/utils/formatters";

    // Get ID from URL
    let id = $derived($page.params.id);
    let estimate = $derived($estimates.find((e) => e.id === id));

    // Calculate totals
    let total = $derived(estimate ? calculateTotal(estimate) : 0);
    let history = $derived($documentHistory.filter((h) => h.documentId === id));

    let pdfUrl: string | null = $state(null);
    let loading = $state(true);
    let isShareModalOpen = $state(false);

    let shareUrl = $derived(
        typeof window !== "undefined"
            ? `${window.location.origin}/view/${id}`
            : "",
    );

    function calculateTotal(doc: any) {
        const subtotal = doc.items.reduce(
            (sum: number, item: any) => sum + item.rate * item.quantity,
            0,
        );
        const taxAmount = subtotal * (doc.taxRate / 100);
        return subtotal + taxAmount + (doc.shipping || 0) - (doc.discount || 0);
    }

    onMount(async () => {
        if (estimate) {
            await tick();
            generatePreview();
        } else {
            loading = false;
        }
    });

    function generatePreview() {
        if (!estimate) return;
        try {
            loading = true;
            const doc = generateEstimatePdf(estimate);
            const pdfBlob = doc.output("blob");
            pdfUrl = URL.createObjectURL(pdfBlob);
        } catch (e) {
            console.error("Error generating PDF preview:", e);
        } finally {
            loading = false;
        }
    }

    function handleDownload() {
        if (!estimate) return;
        const doc = generateEstimatePdf(estimate);
        doc.save(`${estimate.estimateNumber}.pdf`);
    }

    function handleConvertToInvoice() {
        if (!estimate) return;

        const nextIdx = $invoices.length + 1;
        const newInvoiceNumber = `INV-${nextIdx.toString().padStart(3, "0")}`;

        const newInvoiceData = {
            invoiceNumber: newInvoiceNumber,
            poNumber: estimate.referenceNumber,
            dateIssued: new Date(),
            dateDue: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
            status: "draft",
            sender: estimate.sender,
            client: estimate.client,
            items: estimate.items,
            taxRate: estimate.taxRate,
            discount: estimate.discount,
            shipping: estimate.shipping,
            currency: estimate.currency,
            notes: estimate.notes,
            terms: estimate.terms,
        };

        const newId = addInvoice(newInvoiceData as any);
        goto(`/invoices/${newId}/preview`);
    }
</script>

<svelte:head>
    <title
        >Preview {estimate?.estimateNumber || "Estimate"} - Invoicer App</title
    >
</svelte:head>

<div
    class="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-4 flex items-center justify-between"
>
    <div class="flex items-center gap-4">
        <a
            href="/estimates"
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
            Back
        </a>
        <div class="h-6 w-px bg-slate-300 mx-2"></div>
        <div class="flex flex-col">
            <h1
                class="text-xl font-bold text-slate-800 tracking-tight flex items-center gap-2"
            >
                Estimate Preview
                {#if estimate}
                    <span
                        class="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-widest"
                        >{estimate.estimateNumber}</span
                    >
                {/if}
            </h1>
        </div>
    </div>

    <div
        class="flex items-center gap-2 overflow-x-auto pb-1 -mb-1 no-scrollbar flex-nowrap min-w-0"
    >
        <AppButton
            variant="outline"
            size="sm"
            onclick={() => (isShareModalOpen = true)}
            disabled={!estimate}
            class="whitespace-nowrap flex-shrink-0"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                class="w-4 h-4 mr-1 sm:mr-2"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
                />
            </svg>
            Share
        </AppButton>
        <AppButton
            variant="outline"
            size="sm"
            onclick={handleConvertToInvoice}
            disabled={!estimate}
            class="whitespace-nowrap flex-shrink-0 text-emerald-600 border-emerald-200 hover:bg-emerald-50"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                class="w-4 h-4 mr-1 sm:mr-2"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                />
            </svg>
            Convert to Invoice
        </AppButton>
        <AppButton
            variant="secondary"
            size="sm"
            href={`/estimates/${id}`}
            disabled={!estimate}
            class="whitespace-nowrap flex-shrink-0"
        >
            Edit
        </AppButton>
        <AppButton
            variant="secondary"
            size="sm"
            onclick={() => window.print()}
            disabled={!estimate}
            class="whitespace-nowrap flex-shrink-0"
        >
            Print
        </AppButton>
        <AppButton
            variant="primary"
            size="sm"
            onclick={handleDownload}
            disabled={!estimate}
            class="whitespace-nowrap flex-shrink-0"
        >
            Download
        </AppButton>
    </div>
</div>

<div
    class="h-[calc(100vh-73px)] bg-slate-100 flex p-6 overflow-hidden gap-6 flex-col lg:flex-row"
>
    <div
        class="flex-grow flex items-center justify-center bg-slate-100 rounded-xl relative h-full"
    >
        {#if loading}
            <div class="flex flex-col items-center">
                <div
                    class="w-12 h-12 border-4 border-slate-200 border-t-emerald-500 rounded-full animate-spin mb-4"
                ></div>
                <p
                    class="text-slate-500 font-bold uppercase tracking-widest text-[10px]"
                >
                    Preparing Document...
                </p>
            </div>
        {:else if !estimate}
            <div
                class="max-w-md w-full bg-white p-12 rounded-2xl shadow-xl text-center border border-slate-200"
            >
                <h3
                    class="text-2xl font-black text-slate-900 mb-2 tracking-tight"
                >
                    Estimate Not Found
                </h3>
                <AppButton variant="primary" href="/estimates"
                    >Return to List</AppButton
                >
            </div>
        {:else if pdfUrl}
            <div
                class="w-full h-full max-w-4xl bg-white shadow-2xl rounded-xl ring-1 ring-slate-900/10 overflow-hidden relative mx-auto"
            >
                <iframe
                    src={pdfUrl}
                    class="w-full h-full border-0"
                    title="PDF Preview"
                ></iframe>
            </div>
        {/if}
    </div>

    <!-- History Sidebar -->
    {#if estimate}
        <div class="w-full lg:w-96 flex-shrink-0 flex flex-col gap-6 h-full">
            <div
                class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col flex-grow overflow-hidden"
            >
                <h3 class="text-lg font-bold text-slate-900 mb-6">
                    Activity Log
                </h3>
                <div class="flex-grow overflow-y-auto pr-2">
                    <div
                        class="relative pl-6 border-l-2 border-slate-100 space-y-8"
                    >
                        {#each history as item}
                            <div class="relative">
                                <div
                                    class="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-2 border-white bg-slate-300 ring-2 ring-slate-100"
                                ></div>
                                <div class="flex flex-col">
                                    <span
                                        class="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1"
                                        >{formatDate(item.createdAt)}</span
                                    >
                                    <span
                                        class="text-sm font-bold text-slate-700 leading-tight"
                                        >{item.action
                                            .replace("_", " ")
                                            .toUpperCase()}</span
                                    >
                                    {#if item.description}<p
                                            class="text-xs text-slate-500 mt-1 leading-relaxed"
                                        >
                                            {item.description}
                                        </p>{/if}
                                </div>
                            </div>
                        {/each}
                    </div>
                </div>
            </div>
        </div>

        <ShareModal
            bind:isOpen={isShareModalOpen}
            {shareUrl}
            documentNumber={estimate.estimateNumber}
        />
    {/if}
</div>
