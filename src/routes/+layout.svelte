<script lang="ts">
	import "../app.css";
	import AppShell from "$lib/components/AppShell.svelte";
	import { invalidate } from "$app/navigation";
	import { onMount } from "svelte";
	import { page } from "$app/stores";
	import { initClients } from "$lib/stores/clients";
	import { initEstimates } from "$lib/stores/estimates";
	import { initInvoices } from "$lib/stores/invoices";
	import { initSettings } from "$lib/stores/settings";
	import { initItems } from "$lib/stores/items";
	import { initPayments } from "$lib/stores/payments";
	import { initHistory } from "$lib/stores/history";
	import { initTaxRates } from "$lib/stores/tax";
	import { initExpenses } from "$lib/stores/expenses";

	let { children, data } = $props();
	let { supabase, session, user } = $derived(data);

	onMount(() => {
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event: any, _newSession: any) => {
			if (_newSession?.expires_at !== session?.expires_at) {
				invalidate("supabase:auth");
			}
		});

		return () => subscription.unsubscribe();
	});

	let lastUserId: string | null = null;
	let isDataLoaded = $state(false);

	$effect(() => {
		const currentUserId = user?.id || null;
		if (currentUserId !== lastUserId) {
			lastUserId = currentUserId;
			if (currentUserId) {
				isDataLoaded = false;
				Promise.all([
					initClients(supabase, currentUserId),
					initEstimates(supabase, currentUserId),
					initInvoices(supabase, currentUserId),
					initSettings(supabase, currentUserId),
					initItems(supabase, currentUserId),
					initPayments(supabase, currentUserId),
					initHistory(supabase, currentUserId),
					initTaxRates(supabase, currentUserId),
					initExpenses(supabase, currentUserId),
				])
					.then(() => {
						console.log("Workspace data loaded successfully");
						isDataLoaded = true;
					})
					.catch((err) => {
						console.error("Failed to load workspace data:", err);
						// Still set loaded to true so the app remains usable even if some data is missing
						isDataLoaded = true;
					});
			} else {
				// Clear all stores explicitly on logout so data doesn't leak between sessions
				import("$lib/stores/clients").then((m) => m.clients.set([]));
				import("$lib/stores/estimates").then((m) =>
					m.estimates.set([]),
				);
				import("$lib/stores/invoices").then((m) => m.invoices.set([]));
				import("$lib/stores/settings").then((m) =>
					m.settings.set({
						company: {
							name: "",
							email: "",
							phone: "",
							address: "",
							website: "",
							taxId: "",
							domain: "",
						},
						defaultTaxRate: 0,
						defaultCurrency: "USD",
						defaultNotes: "",
						defaultTerms: "",
					}),
				);
				import("$lib/stores/items").then((m) => m.items.set([]));
				import("$lib/stores/payments").then((m) => m.payments.set([]));
				import("$lib/stores/history").then((m) =>
					m.documentHistory.set([]),
				);
				import("$lib/stores/tax").then((m) => m.taxRates.set([]));
				import("$lib/stores/expenses").then((m) => m.expenses.set([]));
			}
		}
	});

	let isAuthRoute = $derived(
		$page.url.pathname.startsWith("/login") ||
			$page.url.pathname.startsWith("/signup") ||
			$page.url.pathname.startsWith("/view") ||
			$page.url.pathname === "/",
	);
</script>

{#if isAuthRoute}
	{@render children()}
{:else}
	<AppShell {session}>
		{#if !isDataLoaded && session}
			<div class="flex items-center justify-center min-h-[60vh]">
				<div class="flex flex-col items-center gap-4">
					<svg
						class="animate-spin h-10 w-10 text-emerald-500"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
					>
						<circle
							class="opacity-25"
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							stroke-width="4"
						></circle>
						<path
							class="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
						></path>
					</svg>
					<p class="text-slate-500 font-medium animate-pulse">
						Loading your workspace...
					</p>
				</div>
			</div>
		{:else}
			{@render children()}
		{/if}
	</AppShell>
{/if}
