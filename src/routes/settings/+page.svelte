<script lang="ts">
    import { settings, updateSettings } from "$lib/stores/settings";
    import AppButton from "$lib/components/AppButton.svelte";
    import { CURRENCIES } from "$lib/constants/currencies";

    let activeTab = "company";

    // Create local copies to edit, save on success
    let editedSettings = JSON.parse(JSON.stringify($settings));

    function handleSave() {
        updateSettings(editedSettings);
        alert("Settings saved successfully!");
    }
</script>

<svelte:head>
    <title>Settings - Invoicer App</title>
</svelte:head>

<div class="p-8 max-w-5xl mx-auto">
    <div class="flex items-center justify-between mb-8">
        <h1 class="text-2xl font-bold text-slate-900 tracking-tight">
            Settings
        </h1>
        <AppButton variant="primary" onclick={handleSave}>
            Save Changes
        </AppButton>
    </div>

    <div class="flex flex-col md:flex-row gap-8 items-start">
        <!-- Sidebar Tabs -->
        <div
            class="w-full md:w-64 shrink-0 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden"
        >
            <nav class="flex flex-col" aria-label="Tabs">
                <button
                    onclick={() => (activeTab = "company")}
                    class="flex items-center gap-3 px-4 py-3 text-sm font-medium border-l-2 transition-colors {activeTab ===
                    'company'
                        ? 'bg-slate-50 border-emerald-500 text-emerald-700'
                        : 'bg-white border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900'}"
                >
                    <svg
                        class="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                    </svg>
                    Company Profile
                </button>
                <button
                    onclick={() => (activeTab = "defaults")}
                    class="flex items-center gap-3 px-4 py-3 text-sm font-medium border-l-2 transition-colors {activeTab ===
                    'defaults'
                        ? 'bg-slate-50 border-emerald-500 text-emerald-700'
                        : 'bg-white border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900'}"
                >
                    <svg
                        class="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                    </svg>
                    Invoice Defaults
                </button>
            </nav>
        </div>

        <!-- Content Area -->
        <div
            class="flex-1 bg-white rounded-xl shadow-sm border border-slate-200"
        >
            {#if activeTab === "company"}
                <div class="p-6 sm:p-8">
                    <div class="mb-6">
                        <h2
                            class="text-xl font-bold text-slate-900 tracking-tight"
                        >
                            Company Profile
                        </h2>
                        <p class="text-sm text-slate-500 mt-1">
                            This information appears on your invoices.
                        </p>
                    </div>

                    <div class="space-y-6 max-w-2xl">
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div class="col-span-1 sm:col-span-2">
                                <label
                                    for="fCompanyName"
                                    class="block text-sm font-medium leading-6 text-slate-900 mb-1"
                                    >Company Name</label
                                >
                                <input
                                    id="fCompanyName"
                                    type="text"
                                    bind:value={editedSettings.company.name}
                                    class="block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-emerald-500 sm:text-sm font-semibold"
                                />
                            </div>

                            <div class="col-span-1 sm:col-span-2">
                                <label
                                    for="fDomain"
                                    class="block text-sm font-medium leading-6 text-slate-900 mb-1"
                                    >Domain (Concern)</label
                                >
                                <input
                                    id="fDomain"
                                    type="text"
                                    bind:value={editedSettings.company.domain}
                                    placeholder="e.g. Health Tech, Construction, etc."
                                    class="block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-emerald-500 sm:text-sm"
                                />
                            </div>

                            <div>
                                <label
                                    for="fEmail"
                                    class="block text-sm font-medium leading-6 text-slate-900 mb-1"
                                    >Email</label
                                >
                                <input
                                    id="fEmail"
                                    type="email"
                                    bind:value={editedSettings.company.email}
                                    class="block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-emerald-500 sm:text-sm"
                                />
                            </div>

                            <div>
                                <label
                                    for="fPhone"
                                    class="block text-sm font-medium leading-6 text-slate-900 mb-1"
                                    >Phone</label
                                >
                                <input
                                    id="fPhone"
                                    type="tel"
                                    bind:value={editedSettings.company.phone}
                                    class="block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-emerald-500 sm:text-sm"
                                />
                            </div>

                            <div class="col-span-1 sm:col-span-2">
                                <label
                                    for="fAddress"
                                    class="block text-sm font-medium leading-6 text-slate-900 mb-1"
                                    >Address</label
                                >
                                <textarea
                                    id="fAddress"
                                    bind:value={editedSettings.company.address}
                                    rows="3"
                                    class="block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-emerald-500 sm:text-sm resize-none"
                                ></textarea>
                            </div>

                            <div>
                                <label
                                    for="fWebsite"
                                    class="block text-sm font-medium leading-6 text-slate-900 mb-1"
                                    >Website</label
                                >
                                <input
                                    id="fWebsite"
                                    type="url"
                                    bind:value={editedSettings.company.website}
                                    class="block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-emerald-500 sm:text-sm"
                                />
                            </div>

                            <div>
                                <label
                                    for="fTaxId"
                                    class="block text-sm font-medium leading-6 text-slate-900 mb-1"
                                    >Tax ID / Business Number</label
                                >
                                <input
                                    id="fTaxId"
                                    type="text"
                                    bind:value={editedSettings.company.taxId}
                                    class="block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-emerald-500 sm:text-sm"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            {/if}

            {#if activeTab === "defaults"}
                <div class="p-6 sm:p-8">
                    <div class="mb-6">
                        <h2
                            class="text-xl font-bold text-slate-900 tracking-tight"
                        >
                            Invoice Defaults
                        </h2>
                        <p class="text-sm text-slate-500 mt-1">
                            These settings will be applied to all new invoices
                            automatically.
                        </p>
                    </div>

                    <div
                        class="space-y-6 max-w-2xl border-t border-slate-100 pt-6"
                    >
                        <div
                            class="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-6 border-b border-slate-100"
                        >
                            <div>
                                <label
                                    for="fDefCurrency"
                                    class="block text-sm font-medium leading-6 text-slate-900 mb-1"
                                    >Default Currency</label
                                >
                                <select
                                    id="fDefCurrency"
                                    bind:value={editedSettings.defaultCurrency}
                                    class="block w-full rounded-md border-0 py-2 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-emerald-500 sm:text-sm"
                                >
                                    {#each CURRENCIES as c}
                                        <option value={c.code}
                                            >{c.code} - {c.name}</option
                                        >
                                    {/each}
                                </select>
                            </div>

                            <div>
                                <label
                                    for="fDefTax"
                                    class="block text-sm font-medium leading-6 text-slate-900 mb-1"
                                    >Default Tax Rate (%)</label
                                >
                                <input
                                    id="fDefTax"
                                    type="number"
                                    bind:value={editedSettings.defaultTaxRate}
                                    min="0"
                                    max="100"
                                    step="0.01"
                                    class="block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-emerald-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div class="space-y-6">
                            <div>
                                <label
                                    for="fDefNotes"
                                    class="block text-sm font-medium leading-6 text-slate-900 mb-1"
                                    >Default Notes</label
                                >
                                <p class="text-xs text-slate-500 mb-2">
                                    Visible to your clients
                                </p>
                                <textarea
                                    id="fDefNotes"
                                    bind:value={editedSettings.defaultNotes}
                                    rows="3"
                                    class="block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-emerald-500 sm:text-sm resize-none"
                                ></textarea>
                            </div>

                            <div>
                                <label
                                    for="fDefTerms"
                                    class="block text-sm font-medium leading-6 text-slate-900 mb-1"
                                    >Default Terms & Conditions</label
                                >
                                <textarea
                                    id="fDefTerms"
                                    bind:value={editedSettings.defaultTerms}
                                    rows="3"
                                    class="block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-emerald-500 sm:text-sm resize-none"
                                ></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            {/if}
        </div>
    </div>
</div>
