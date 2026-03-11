<script lang="ts">
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";
    import { clients, updateClient } from "$lib/stores/clients";
    import AppButton from "$lib/components/AppButton.svelte";
    import { COUNTRY_CODES } from "$lib/constants/countries";
    import { onMount } from "svelte";

    const clientId = $page.params.id as string;
    const client = $derived($clients.find((c) => c.id === clientId));

    let companyName = $state("");
    let contactName = $state("");
    let email = $state("");
    let countryCode = $state("+1");
    let phone = $state("");
    let website = $state("");
    let taxId = $state("");
    let address = $state("");
    let notes = $state("");
    let countrySearch = $state("");
    let showCountryDropdown = $state(false);

    let filteredCountries = $derived(
        countrySearch
            ? COUNTRY_CODES.filter(
                  (c) =>
                      c.country.toLowerCase().includes(countrySearch.toLowerCase()) ||
                      c.code.includes(countrySearch)
              )
            : COUNTRY_CODES
    );

    let selectedCountry = $derived(COUNTRY_CODES.find((c) => c.code === countryCode));

    function selectCountry(code: string) {
        countryCode = code;
        countrySearch = "";
        showCountryDropdown = false;
    }

    $effect(() => {
        if (client) {
            companyName = client.companyName || "";
            contactName = client.contactName || "";
            email = client.email || "";
            
            // Parse phone into country code and number
            const phoneStr = client.phone || "";
            const match = phoneStr.match(/^(\+\d{1,3})(.*)$/);
            if (match) {
                countryCode = match[1];
                phone = match[2];
            } else {
                phone = phoneStr;
            }
            
            website = client.website || "";
            taxId = client.taxId || "";
            address = client.address || "";
            notes = client.notes || "";
        }
    });

    function handleSubmit() {
        if (!companyName) return;

        const fullPhone = phone ? `${countryCode}${phone}` : "";

        updateClient(clientId, {
            companyName,
            contactName,
            email,
            phone: fullPhone,
            website,
            taxId,
            address,
            notes,
        });

        goto("/clients");
    }
</script>

<svelte:head>
    <title>Edit Client - InvoiceMe App</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto">        <!-- Header -->
        <div class="flex items-center gap-4 mb-8">
            <a
                href="/clients"
                class="p-2 hover:bg-white rounded-lg transition-colors"
                aria-label="Back to Clients"
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
                <h1 class="text-3xl font-bold text-slate-900">Edit Client</h1>
                <p class="text-slate-500 text-sm mt-0.5">Update client information</p>
            </div>
        </div>

        {#if !client}
            <div
                class="bg-white p-8 rounded-2xl shadow-lg border border-slate-200 text-center"
            >
                <p class="text-slate-500">Client not found.</p>
                <AppButton href="/clients" variant="secondary" class="mt-4"
                    >Back to List</AppButton
                >
            </div>
        {:else}
            <!-- Main Form Card -->
            <form
                onsubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}
                class="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden"
            >
                <!-- Company Section -->
                <div class="p-6 sm:p-8 border-b border-slate-100">
                    <h2 class="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
                        <span class="w-1 h-1 bg-emerald-500 rounded-full"></span>
                        Company Information
                    </h2>
                    
                    <div class="space-y-4">
                        <div>
                            <label
                                for="companyName"
                                class="block text-sm font-medium text-slate-700 mb-2"
                            >
                                Company Name <span class="text-red-500">*</span>
                            </label>
                            <input
                                id="companyName"
                                type="text"
                                bind:value={companyName}
                                required
                                placeholder="e.g., Acme Corporation"
                                class="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-colors"
                            />
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label
                                    for="contactName"
                                    class="block text-sm font-medium text-slate-700 mb-2"
                                >
                                    Contact Name
                                </label>
                                <input
                                    id="contactName"
                                    type="text"
                                    bind:value={contactName}
                                    placeholder="e.g., John Doe"
                                    class="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-colors"
                                />
                            </div>
                            <div>
                                <label
                                    for="taxId"
                                    class="block text-sm font-medium text-slate-700 mb-2"
                                >
                                    Tax ID / Business No.
                                </label>
                                <input
                                    id="taxId"
                                    type="text"
                                    bind:value={taxId}
                                    placeholder="Optional"
                                    class="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-colors"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Contact Section -->
                <div class="p-6 sm:p-8 border-b border-slate-100">
                    <h2 class="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
                        <span class="w-1 h-1 bg-emerald-500 rounded-full"></span>
                        Contact Information
                    </h2>

                    <div class="space-y-4">
                        <div>
                            <label
                                for="email"
                                class="block text-sm font-medium text-slate-700 mb-2"
                            >
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                bind:value={email}
                                placeholder="e.g., john@company.com"
                                class="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-colors"
                            />
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-slate-700 mb-2">
                                Phone Number
                            </label>
                            <div class="flex gap-3">
                                <!-- Country Code Dropdown -->
                                <div class="relative w-[160px]">
                                    <button
                                        type="button"
                                        onclick={() => (showCountryDropdown = !showCountryDropdown)}
                                        class="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-colors bg-white text-left flex items-center justify-between hover:border-slate-400"
                                    >
                                        <span class="text-sm font-medium">
                                            {#if selectedCountry}
                                                {selectedCountry.flag} {selectedCountry.code}
                                            {:else}
                                                +1
                                            {/if}
                                        </span>
                                        <svg
                                            class="w-4 h-4 text-slate-500 transition-transform {showCountryDropdown ? 'rotate-180' : ''}"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M19 14l-7 7m0 0l-7-7m7 7V3"
                                            />
                                        </svg>
                                    </button>

                                    {#if showCountryDropdown}
                                        <div class="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-300 rounded-lg shadow-lg z-10">
                                            <input
                                                type="text"
                                                placeholder="Search country..."
                                                bind:value={countrySearch}
                                                class="w-full px-3 py-2 border-b border-slate-200 rounded-t-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/10 text-sm"
                                                autofocus
                                            />
                                            <div class="max-h-48 overflow-y-auto">
                                                {#each filteredCountries as { code, country, flag }}
                                                    <button
                                                        type="button"
                                                        onclick={() => selectCountry(code)}
                                                        class="w-full text-left px-4 py-2 hover:bg-emerald-50 transition-colors text-sm border-b border-slate-100 last:border-0 flex items-center gap-2"
                                                    >
                                                        <span class="text-lg">{flag}</span>
                                                        <span class="font-medium">{code}</span>
                                                        <span class="text-slate-500">{country}</span>
                                                    </button>
                                                {/each}
                                            </div>
                                        </div>
                                    {/if}
                                </div>

                                <!-- Phone Input -->
                                <input
                                    id="phone"
                                    type="tel"
                                    bind:value={phone}
                                    placeholder="555-0199 or 5550199"
                                    class="flex-1 px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-colors"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                for="website"
                                class="block text-sm font-medium text-slate-700 mb-2"
                            >
                                Website
                            </label>
                            <input
                                id="website"
                                type="url"
                                bind:value={website}
                                placeholder="https://example.com"
                                class="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-colors"
                            />
                        </div>
                    </div>
                </div>

                <!-- Address Section -->
                <div class="p-6 sm:p-8 border-b border-slate-100">
                    <h2 class="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
                        <span class="w-1 h-1 bg-emerald-500 rounded-full"></span>
                        Address
                    </h2>

                    <div>
                        <label
                            for="address"
                            class="block text-sm font-medium text-slate-700 mb-2"
                        >
                            Street Address
                        </label>
                        <textarea
                            id="address"
                            bind:value={address}
                            rows="3"
                            placeholder="123 Street Name, City, State, ZIP, Country"
                            class="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-colors resize-none"
                        ></textarea>
                    </div>
                </div>

                <!-- Notes Section -->
                <div class="p-6 sm:p-8 border-b border-slate-100">
                    <h2 class="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
                        <span class="w-1 h-1 bg-emerald-500 rounded-full"></span>
                        Additional Notes
                    </h2>

                    <div>
                        <label
                            for="notes"
                            class="block text-sm font-medium text-slate-700 mb-2"
                        >
                            Internal Notes
                        </label>
                        <textarea
                            id="notes"
                            bind:value={notes}
                            rows="3"
                            placeholder="Key accounts, special requirements, payment terms, etc."
                            class="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-colors resize-none"
                        ></textarea>
                    </div>
                </div>

                <!-- Action Buttons -->
                <div class="px-6 sm:px-8 py-6 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
                    <AppButton
                        type="button"
                        variant="secondary"
                        onclick={() => goto("/clients")}>Cancel</AppButton
                    >
                    <AppButton type="submit" variant="primary">Update Client</AppButton>
                </div>
            </form>
        {/if}
    </div>
</div>
