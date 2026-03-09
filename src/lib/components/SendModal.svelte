<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import AppButton from "./AppButton.svelte";
    import { fade, scale } from "svelte/transition";

    export let open = false;
    export let title = "";
    export let type: "invoice" | "estimate" = "invoice";
    export let initialClientName = "";

    $: modalTitle =
        title || `Send ${type.charAt(0).toUpperCase() + type.slice(1)}`;
    export let initialClientEmail = "";

    const dispatch = createEventDispatcher();

    let fromName = "User Account";
    let fromEmail = "msgambia82@gmail.com";
    let clientName = initialClientName;
    let clientEmail = initialClientEmail;

    function handleSend() {
        dispatch("send", {
            fromName,
            fromEmail,
            clientName,
            clientEmail,
            method: "email",
        });
        open = false;
    }

    function handleWhatsApp() {
        dispatch("send", {
            fromName,
            fromEmail,
            clientName,
            clientEmail,
            method: "whatsapp",
        });
        open = false;
    }

    function close() {
        open = false;
        dispatch("close");
    }
</script>

{#if open}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
        on:click|self={close}
        transition:fade={{ duration: 200 }}
    >
        <div
            class="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative"
            transition:scale={{ duration: 200, start: 0.95 }}
        >
            <div
                class="p-6 border-b border-slate-100 flex items-center justify-between"
            >
                <h3 class="text-xl font-bold text-slate-800">{modalTitle}</h3>
                <button
                    on:click={close}
                    class="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-50 transition-colors"
                    aria-label="Close"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                        class="w-6 h-6"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>

            <div class="p-6 space-y-6">
                <!-- From Section -->
                <div class="space-y-3">
                    <h4
                        class="text-xs font-bold uppercase tracking-widest text-slate-400"
                    >
                        From
                    </h4>
                    <div class="grid grid-cols-2 gap-4">
                        <div class="space-y-1">
                            <label
                                for="fromName"
                                class="block text-[10px] text-slate-500"
                                >Name</label
                            >
                            <input
                                id="fromName"
                                type="text"
                                bind:value={fromName}
                                class="w-full text-sm border-slate-200 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                            />
                        </div>
                        <div class="space-y-1">
                            <label
                                for="fromEmail"
                                class="block text-[10px] text-slate-500"
                                >Email</label
                            >
                            <input
                                id="fromEmail"
                                type="email"
                                bind:value={fromEmail}
                                class="w-full text-sm border-slate-200 bg-slate-50 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                            />
                        </div>
                    </div>
                </div>

                <!-- Client Section -->
                <div class="space-y-3">
                    <h4
                        class="text-xs font-bold uppercase tracking-widest text-slate-400"
                    >
                        Client
                    </h4>
                    <div class="space-y-3">
                        <div class="space-y-1">
                            <label
                                for="toName"
                                class="block text-[10px] text-slate-500"
                                >Name</label
                            >
                            <input
                                id="toName"
                                type="text"
                                bind:value={clientName}
                                class="w-full text-sm border-slate-200 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                            />
                        </div>
                        <div class="space-y-1">
                            <label
                                for="toEmail"
                                class="block text-[10px] text-slate-500"
                                >Email</label
                            >
                            <input
                                id="toEmail"
                                type="email"
                                bind:value={clientEmail}
                                class="w-full text-sm border-slate-200 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div
                class="p-6 bg-slate-50 flex flex-col gap-3 sm:flex-row sm:justify-between items-center border-t border-slate-100"
            >
                <AppButton variant="secondary" on:click={close}
                    >Cancel</AppButton
                >
                <div class="flex gap-2">
                    <button
                        on:click={handleWhatsApp}
                        class="flex items-center gap-2 px-4 py-2 bg-[#25D366] text-white rounded-lg font-bold text-sm hover:brightness-95 transition-all shadow-sm shadow-[#25D366]/20"
                    >
                        <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path
                                d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
                            />
                        </svg>
                        WhatsApp
                    </button>
                    <AppButton variant="primary" on:click={handleSend}
                        >Send via Email</AppButton
                    >
                </div>
            </div>
        </div>
    </div>
{/if}
