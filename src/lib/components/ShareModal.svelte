<script lang="ts">
    import AppButton from "./AppButton.svelte";

    let {
        isOpen = $bindable(false),
        shareUrl,
        documentNumber,
        onshare,
    } = $props<{
        isOpen?: boolean;
        shareUrl: string;
        documentNumber: string;
        onshare?: (method: string) => void;
    }>();

    let copyLabel = $state("Copy Link");

    function handleCopy() {
        navigator.clipboard.writeText(shareUrl);
        copyLabel = "Copied!";
        setTimeout(() => (copyLabel = "Copy Link"), 2000);
    }

    function shareWhatsApp() {
        if (onshare) onshare("whatsapp");
        const text = encodeURIComponent(
            `Hi, here is the document ${documentNumber}: ${shareUrl}`,
        );
        window.open(`https://wa.me/?text=${text}`, "_blank");
    }

    function shareEmail() {
        if (onshare) onshare("email");
        const subject = encodeURIComponent(`Document ${documentNumber}`);
        const body = encodeURIComponent(
            `Hi, you can view your document here: ${shareUrl}`,
        );
        window.location.href = `mailto:?subject=${subject}&body=${body}`;
    }
</script>

{#if isOpen}
    <div
        class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
    >
        <!-- Backdrop -->
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div
            class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
            onclick={() => (isOpen = false)}
        ></div>

        <!-- Modal Content -->
        <div
            class="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in duration-300"
        >
            <div class="p-8">
                <div class="flex items-center justify-between mb-6">
                    <h3
                        class="text-xl font-black text-slate-900 tracking-tight"
                    >
                        Share Document
                    </h3>
                    <button
                        onclick={() => (isOpen = false)}
                        aria-label="Close dialog"
                        class="p-2 hover:bg-slate-100 rounded-full transition-colors"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5 text-slate-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                <div class="space-y-6">
                    <!-- URL Section -->
                    <div
                        class="bg-slate-50 p-4 rounded-2xl border border-slate-100"
                    >
                        <div
                            class="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2"
                        >
                            Public Link
                        </div>
                        <div class="flex gap-2">
                            <input
                                type="text"
                                readonly
                                value={shareUrl}
                                class="flex-1 bg-transparent border-none text-xs font-medium text-slate-600 focus:ring-0 truncate"
                            />
                            <button
                                onclick={handleCopy}
                                class="text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors whitespace-nowrap"
                            >
                                {copyLabel}
                            </button>
                        </div>
                    </div>

                    <!-- Actions -->
                    <div class="grid grid-cols-2 gap-3">
                        <button
                            onclick={shareWhatsApp}
                            class="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-[#25D366]/10 hover:bg-[#25D366]/20 transition-all group"
                        >
                            <div
                                class="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg shadow-[#25D366]/30 group-hover:scale-110 transition-transform"
                            >
                                <svg
                                    class="w-5 h-5 text-white"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.634 1.437h.005c6.551 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
                                    />
                                </svg>
                            </div>
                            <span class="text-xs font-bold text-slate-700"
                                >WhatsApp</span
                            >
                        </button>

                        <button
                            onclick={shareEmail}
                            class="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 transition-all group"
                        >
                            <div
                                class="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition-transform"
                            >
                                <svg
                                    class="w-5 h-5 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2.5"
                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    />
                                </svg>
                            </div>
                            <span class="text-xs font-bold text-slate-700"
                                >Email</span
                            >
                        </button>
                    </div>

                    <AppButton
                        variant="secondary"
                        class="w-full rounded-2xl"
                        onclick={() => (isOpen = false)}
                    >
                        Close
                    </AppButton>
                </div>
            </div>
        </div>
    </div>
{/if}
