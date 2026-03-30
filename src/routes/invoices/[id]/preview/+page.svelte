<script lang="ts">
    import { page } from "$app/stores";
    import { onMount, tick } from "svelte";
    import { invoices, updateInvoice } from "$lib/stores/invoices";
    import { payments } from "$lib/stores/payments";
    import { documentHistory } from "$lib/stores/history";
    import { generateInvoicePdf } from "$lib/services/pdf-service";
    import AppButton from "$lib/components/AppButton.svelte";
    import PaymentModal from "$lib/components/PaymentModal.svelte";
    import ShareModal from "$lib/components/ShareModal.svelte";
    import { formatCurrency, formatDate } from "$lib/utils/formatters";

    // Get invoice ID from URL
    let invoiceId = $derived($page.params.id);
    let invoice = $derived($invoices.find((inv) => inv.id === invoiceId));

    // Calculate totals
    let invoiceTotal = $derived(invoice ? calculateTotal(invoice) : 0);
    let invoicePayments = $derived(
        $payments.filter((p) => p.invoiceId === invoiceId),
    );
    let history = $derived(
        $documentHistory.filter((h) => h.documentId === invoiceId),
    );
    let totalPaid = $derived(
        invoicePayments.reduce((sum, p) => sum + p.amount, 0),
    );
    let balanceDue = $derived(Math.max(0, invoiceTotal - totalPaid));

    let pdfUrl = $state<string | null>(null);
    let loading = $state(true);
    let isPaymentModalOpen = $state(false);
    let isShareModalOpen = $state(false);
    let activeTab = $state<"payments" | "history">("payments");

    let shareUrl = $derived(
        typeof window !== "undefined"
            ? `${window.location.origin}/view/${invoiceId}`
            : "",
    );

    function calculateTotal(invoice: any) {
        const subtotal = invoice.items.reduce(
            (sum: number, item: any) => sum + item.rate * item.quantity,
            0,
        );
        const taxAmount = subtotal * (invoice.taxRate / 100);
        return subtotal + taxAmount + invoice.shipping - invoice.discount;
    }

    onMount(async () => {
        if (invoice) {
            // Wait a tick to ensure component is mounted
            await tick();
            generatePreview();
        } else {
            loading = false; // No invoice found
        }
    });

    function generatePreview() {
        if (!invoice) return;

        try {
            loading = true;
            const doc = generateInvoicePdf(invoice);
            const pdfBlob = doc.output("blob");
            pdfUrl = URL.createObjectURL(pdfBlob);
        } catch (e) {
            console.error("Error generating PDF preview:", e);
        } finally {
            loading = false;
        }
    }

    function handleDownload() {
        if (!invoice) return;
        const doc = generateInvoicePdf(invoice);
        doc.save(`${invoice.invoiceNumber}.pdf`);
    }

    function handlePaymentRecorded() {
        // Automatically check if invoice is fully paid and prompt status update
        if (invoiceId && balanceDue <= 0 && invoice?.status !== "paid") {
            updateInvoice(invoiceId, { status: "paid", paidAt: new Date() });
        }
    }
</script>

<svelte:head>
    <title>Preview {invoice?.invoiceNumber || "Invoice"} - Invoicer App</title>
</svelte:head>

<!-- Sticky Header Toolbar -->
<div
    class="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-4 flex items-center justify-between"
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
            Back
        </a>
        <div class="h-6 w-px bg-slate-300 mx-2"></div>
        <div class="flex flex-col">
            <h1
                class="text-xl font-bold text-slate-800 tracking-tight flex items-center gap-2"
            >
                Invoice Preview
                {#if invoice}
                    <span
                        class="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-widest"
                        >{invoice.invoiceNumber}</span
                    >
                {/if}
            </h1>
            {#if invoice}
                <div
                    class="text-sm font-medium mt-0.5"
                    class:text-emerald-600={balanceDue <= 0}
                    class:text-amber-500={balanceDue > 0 && totalPaid > 0}
                    class:text-slate-500={totalPaid === 0}
                >
                    Balance Due: {formatCurrency(balanceDue, invoice.currency)}
                </div>
            {/if}
        </div>
    </div>

    <div
        class="flex items-center gap-2 overflow-x-auto pb-1 -mb-1 no-scrollbar flex-nowrap min-w-0"
    >
        {#if invoice}
            <AppButton
                variant="outline"
                size="sm"
                onclick={() => (isPaymentModalOpen = true)}
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
                        d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                    />
                </svg>
                <span class="hidden xs:inline">Record Payment</span>
                <span class="xs:hidden">Pay</span>
            </AppButton>
        {/if}
        <AppButton
            variant="outline"
            size="sm"
            onclick={() => (isShareModalOpen = true)}
            disabled={!invoice}
            class="whitespace-nowrap flex-shrink-0"
        >
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
                    d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
                />
            </svg>
            Share
        </AppButton>
        <AppButton
            variant="secondary"
            size="sm"
            href={`/invoices/${invoiceId}`}
            disabled={!invoice}
            class="whitespace-nowrap flex-shrink-0"
        >
            Edit
        </AppButton>
        <AppButton
            variant="secondary"
            size="sm"
            onclick={() => window.print()}
            disabled={!invoice}
            class="whitespace-nowrap flex-shrink-0"
        >
            Print
        </AppButton>
        <AppButton
            variant="primary"
            size="sm"
            onclick={handleDownload}
            disabled={!invoice}
            class="whitespace-nowrap flex-shrink-0"
        >
            Download
        </AppButton>
    </div>
</div>

<div
    class="h-[calc(100vh-73px)] bg-slate-100 flex p-6 overflow-hidden gap-6 flex-col lg:flex-row"
>
    <!-- PDF Viewer Area -->
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
        {:else if !invoice}
            <div
                class="max-w-md w-full bg-white p-12 rounded-2xl shadow-xl text-center border border-slate-200"
            >
                <div
                    class="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-10 w-10 text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                    </svg>
                </div>
                <h3
                    class="text-2xl font-black text-slate-900 mb-2 tracking-tight"
                >
                    Invoice Not Found
                </h3>
                <p class="text-slate-500 mb-8">
                    The document you're looking for could not be found or has
                    been deleted.
                </p>
                <AppButton variant="primary" href="/invoices"
                    >Return to List</AppButton
                >
            </div>
        {:else if pdfUrl}
            <div
                class="w-full h-full max-w-4xl bg-white shadow-2xl rounded-xl ring-1 ring-slate-900/10 overflow-hidden relative animate-in zoom-in-95 duration-500 mx-auto"
            >
                <iframe
                    src={pdfUrl}
                    class="w-full h-full border-0"
                    title="PDF Preview"
                ></iframe>
            </div>
        {/if}
    </div>

    <!-- Payments Sidebar -->
    {#if invoice}
        <div class="w-full lg:w-96 flex-shrink-0 flex flex-col gap-6 h-full">
            <div
                class="bg-white rounded-2xl shadow-sm border border-slate-200 p-0 flex flex-col flex-grow overflow-hidden"
            >
                <!-- Tab Header -->
                <div class="flex border-b border-slate-100">
                    <button
                        class="flex-1 py-4 text-sm font-bold transition-all border-b-2 {activeTab ===
                        'payments'
                            ? 'text-emerald-600 border-emerald-600 bg-emerald-50/30'
                            : 'text-slate-400 border-transparent hover:text-slate-600 hover:bg-slate-50'}"
                        onclick={() => (activeTab = "payments")}
                    >
                        Payments
                    </button>
                    <button
                        class="flex-1 py-4 text-sm font-bold transition-all border-b-2 {activeTab ===
                        'history'
                            ? 'text-emerald-600 border-emerald-600 bg-emerald-50/30'
                            : 'text-slate-400 border-transparent hover:text-slate-600 hover:bg-slate-50'}"
                        onclick={() => (activeTab = "history")}
                    >
                        History
                    </button>
                </div>

                <div class="p-6 flex flex-col flex-grow overflow-hidden">
                    {#if activeTab === "payments"}
                        <div class="flex items-center justify-between mb-6">
                            <h3
                                class="text-lg font-bold text-slate-900 flex items-center gap-2"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="2"
                                    stroke="currentColor"
                                    class="w-5 h-5 text-emerald-600"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                Payments
                            </h3>
                            {#if balanceDue > 0}
                                <AppButton
                                    variant="outline"
                                    size="sm"
                                    onclick={() => (isPaymentModalOpen = true)}
                                >
                                    Add
                                </AppButton>
                            {/if}
                        </div>

                        <div
                            class="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-6 flex justify-between items-center"
                        >
                            <div>
                                <div
                                    class="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1"
                                >
                                    Balance Due
                                </div>
                                <div
                                    class="text-xl font-bold {balanceDue <= 0
                                        ? 'text-emerald-600'
                                        : 'text-slate-900'}"
                                >
                                    {formatCurrency(
                                        balanceDue,
                                        invoice.currency,
                                    )}
                                </div>
                            </div>
                            {#if balanceDue <= 0}
                                <div
                                    class="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                                >
                                    Paid
                                </div>
                            {/if}
                        </div>

                        <div class="flex-grow overflow-y-auto pr-2 space-y-4">
                            {#if invoicePayments.length === 0}
                                <div class="text-center py-8">
                                    <p
                                        class="text-sm font-medium text-slate-400"
                                    >
                                        No payments yet
                                    </p>
                                </div>
                            {:else}
                                {#each invoicePayments as payment}
                                    <div
                                        class="bg-white border border-slate-100 rounded-lg p-3 shadow-sm"
                                    >
                                        <div
                                            class="flex justify-between items-start mb-1"
                                        >
                                            <div
                                                class="font-bold text-slate-900"
                                            >
                                                {formatCurrency(
                                                    payment.amount,
                                                    invoice.currency,
                                                )}
                                            </div>
                                            <div
                                                class="text-[10px] text-slate-400 font-bold uppercase"
                                            >
                                                {formatDate(
                                                    payment.paymentDate,
                                                )}
                                            </div>
                                        </div>
                                        {#if payment.paymentMethod}
                                            <div
                                                class="text-[10px] text-slate-500 font-medium bg-slate-50 px-1.5 py-0.5 rounded inline-block"
                                            >
                                                {payment.paymentMethod}
                                            </div>
                                        {/if}
                                    </div>
                                {/each}
                            {/if}
                        </div>
                    {:else if activeTab === "history"}
                        <div class="flex items-center justify-between mb-6">
                            <h3
                                class="text-lg font-bold text-slate-900 flex items-center gap-2"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="2"
                                    stroke="currentColor"
                                    class="w-5 h-5 text-slate-600"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                Activity Log
                            </h3>
                        </div>

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
                                            >
                                                {formatDate(item.createdAt)}
                                            </span>
                                            <span
                                                class="text-sm font-bold text-slate-700 leading-tight"
                                            >
                                                {item.action
                                                    .replace("_", " ")
                                                    .toUpperCase()}
                                            </span>
                                            {#if item.description}
                                                <p
                                                    class="text-xs text-slate-500 mt-1 leading-relaxed"
                                                >
                                                    {item.description}
                                                </p>
                                            {/if}
                                        </div>
                                    </div>
                                {/each}
                            </div>
                        </div>
                    {/if}
                </div>
            </div>
        </div>

        {#if invoice && invoiceId}
            <PaymentModal
                {invoiceId}
                {invoiceTotal}
                invoiceCurrency={invoice.currency}
                bind:isOpen={isPaymentModalOpen}
                onrecorded={handlePaymentRecorded}
            />
        {/if}

        {#if invoice}
            <ShareModal
                bind:isOpen={isShareModalOpen}
                {shareUrl}
                documentNumber={invoice.invoiceNumber}
                onshare={() => {
                    if (invoice && invoice.status !== "paid") {
                        updateInvoice(invoice.id, {
                            status: "sent",
                            sentAt: new Date(),
                        });
                    }
                }}
            />
        {/if}
    {/if}
</div>
