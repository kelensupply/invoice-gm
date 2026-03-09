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
	$effect(() => {
		const currentUserId = user?.id;
		if (currentUserId && currentUserId !== lastUserId) {
			lastUserId = currentUserId;
			initClients(supabase, currentUserId);
			initEstimates(supabase, currentUserId);
			initInvoices(supabase, currentUserId);
			initSettings(supabase, currentUserId);
			initItems(supabase, currentUserId);
		}
	});

	let isAuthRoute = $derived(
		$page.url.pathname.startsWith("/login") ||
			$page.url.pathname.startsWith("/signup") ||
			$page.url.pathname === "/",
	);
</script>

{#if isAuthRoute}
	{@render children()}
{:else}
	<AppShell {session}>
		{@render children()}
	</AppShell>
{/if}
