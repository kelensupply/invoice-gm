<script lang="ts">
    import { clients, deleteClient } from "$lib/stores/clients";
    import DataTable from "$lib/components/DataTable.svelte";
    import AppButton from "$lib/components/AppButton.svelte";
    import ConfirmDialog from "$lib/components/ConfirmDialog.svelte";
    import type { Client } from "$lib/models/client";
    import { goto } from "$app/navigation";

    let dialogOpen = $state(false);
    let clientToDelete: Client | null = $state(null);

    const columns = [
        { key: "companyName", label: "Company" },
        { key: "contactName", label: "Contact" },
        { key: "email", label: "Email" },
        { key: "phone", label: "Phone" },
        { key: "actions", label: "", align: "right" as const },
    ];

    function confirmDelete(client: any) {
        clientToDelete = client.raw;
        dialogOpen = true;
    }

    function handleDelete() {
        if (clientToDelete) {
            deleteClient(clientToDelete.id);
        }
    }

    let tableData = $derived(
        $clients.map((client) => ({
            raw: client,
            companyName: client.companyName,
            contactName: client.contactName,
            email: client.email,
            phone: client.phone,
        })),
    );

    function handleRowClick(item: any) {
        goto(`/clients/${item.raw.id}`);
    }
</script>

<svelte:head>
    <title>Clients - Invoicer App</title>
</svelte:head>

<div class="p-8 max-w-7xl mx-auto">
    <div
        class="flex items-center justify-between mb-8 flex-col sm:flex-row gap-4"
    >
        <h1 class="text-2xl font-bold text-slate-900 tracking-tight">
            Clients
        </h1>
        <AppButton href="/clients/new" variant="primary">
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
                    d="M12 4.5v15m7.5-7.5h-15"
                />
            </svg>
            Add Client
        </AppButton>
    </div>

    <DataTable
        {columns}
        data={tableData}
        onRowClick={handleRowClick}
        emptyMessage="You haven't added any clients yet."
    >
        {#snippet emptyStateAction()}
            <AppButton
                href="/clients/new"
                variant="primary"
                size="sm"
                class="mt-4"
            >
                Add your first client
            </AppButton>
        {/snippet}

        {#snippet row(rowData)}
            <td
                class="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-900"
            >
                {rowData.companyName}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                {rowData.contactName}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                {rowData.email}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                {rowData.phone}
            </td>

            <td
                class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
            >
                <div class="flex justify-end gap-2">
                    <AppButton
                        variant="outline"
                        size="sm"
                        href={`/clients/${rowData.raw.id}`}
                        onclick={(e: MouseEvent) => e.stopPropagation()}
                    >
                        Edit
                    </AppButton>
                    <button
                        class="text-slate-400 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 transition-colors"
                        onclick={(e: MouseEvent) => {
                            e.stopPropagation();
                            confirmDelete(rowData);
                        }}
                        title="Delete"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-4 h-4"
                            ><path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            /></svg
                        >
                    </button>
                </div>
            </td>
        {/snippet}
    </DataTable>
</div>

<ConfirmDialog
    bind:open={dialogOpen}
    title="Delete Client"
    description={`Are you sure you want to delete ${clientToDelete?.companyName}? This action cannot be undone.`}
    confirmText="Delete"
    destructive={true}
    on:confirm={handleDelete}
/>
