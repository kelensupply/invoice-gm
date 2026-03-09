<script lang="ts">
    import { goto } from "$app/navigation";
    import { addClient } from "$lib/stores/clients";
    import AppButton from "$lib/components/AppButton.svelte";

    let companyName = "";
    let contactName = "";
    let email = "";
    let phone = "";
    let website = "";
    let taxId = "";
    let address = "";
    let notes = "";

    function handleSubmit() {
        if (!companyName) return;

        addClient({
            companyName,
            contactName,
            email,
            phone,
            website,
            taxId,
            address,
            notes,
        });

        goto("/clients");
    }
</script>

<svelte:head>
    <title>New Client - Invoicer App</title>
</svelte:head>

<div class="p-8 max-w-2xl mx-auto">
    <div class="flex items-center gap-4 mb-8">
        <a
            href="/clients"
            class="text-slate-500 hover:text-slate-800 transition-colors"
            aria-label="Back to Clients"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2.5"
                stroke="currentColor"
                class="w-5 h-5"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
            </svg>
        </a>
        <h1 class="text-2xl font-bold text-slate-900 tracking-tight">
            New Client
        </h1>
    </div>

    <form
        on:submit|preventDefault={handleSubmit}
        class="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 space-y-6"
    >
        <div class="space-y-1">
            <label
                for="companyName"
                class="block text-xs font-bold uppercase tracking-widest text-slate-400"
                >Company Name *</label
            >
            <input
                id="companyName"
                type="text"
                bind:value={companyName}
                required
                placeholder="Acme Corp"
                class="block w-full border-slate-200 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 text-sm"
            />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div class="space-y-1">
                <label
                    for="contactName"
                    class="block text-xs font-bold uppercase tracking-widest text-slate-400"
                    >Contact Name</label
                >
                <input
                    id="contactName"
                    type="text"
                    bind:value={contactName}
                    placeholder="John Doe"
                    class="block w-full border-slate-200 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                />
            </div>
            <div class="space-y-1">
                <label
                    for="taxId"
                    class="block text-xs font-bold uppercase tracking-widest text-slate-400"
                    >Tax ID / Business No.</label
                >
                <input
                    id="taxId"
                    type="text"
                    bind:value={taxId}
                    placeholder="Optional"
                    class="block w-full border-slate-200 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                />
            </div>
        </div>

        <div class="space-y-1">
            <label
                for="email"
                class="block text-xs font-bold uppercase tracking-widest text-slate-400"
                >Email Address</label
            >
            <input
                id="email"
                type="email"
                bind:value={email}
                placeholder="john@example.com"
                class="block w-full border-slate-200 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 text-sm"
            />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div class="space-y-1">
                <label
                    for="phone"
                    class="block text-xs font-bold uppercase tracking-widest text-slate-400"
                    >Phone Number</label
                >
                <input
                    id="phone"
                    type="text"
                    bind:value={phone}
                    placeholder="555-0199"
                    class="block w-full border-slate-200 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                />
            </div>
            <div class="space-y-1">
                <label
                    for="website"
                    class="block text-xs font-bold uppercase tracking-widest text-slate-400"
                    >Website</label
                >
                <input
                    id="website"
                    type="url"
                    bind:value={website}
                    placeholder="https://example.com"
                    class="block w-full border-slate-200 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                />
            </div>
        </div>

        <div class="space-y-1">
            <label
                for="address"
                class="block text-xs font-bold uppercase tracking-widest text-slate-400"
                >Address</label
            >
            <textarea
                id="address"
                bind:value={address}
                rows="2"
                placeholder="123 Street Name, City, State, ZIP"
                class="block w-full border-slate-200 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 text-sm resize-none"
            ></textarea>
        </div>

        <div class="space-y-1">
            <label
                for="notes"
                class="block text-xs font-bold uppercase tracking-widest text-slate-400"
                >Internal Notes</label
            >
            <textarea
                id="notes"
                bind:value={notes}
                rows="2"
                placeholder="Key accounts, special requirements, etc."
                class="block w-full border-slate-200 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 text-sm resize-none"
            ></textarea>
        </div>

        <div class="pt-4 flex justify-end gap-3">
            <AppButton
                type="button"
                variant="secondary"
                on:click={() => goto("/clients")}>Cancel</AppButton
            >
            <AppButton type="submit" variant="primary">Create Client</AppButton>
        </div>
    </form>
</div>
