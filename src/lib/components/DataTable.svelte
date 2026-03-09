<script lang="ts">
    import type { Snippet } from "svelte";

    type Column = {
        key: string;
        label: string;
        align?: "left" | "center" | "right";
    };

    let {
        data = [],
        columns = [],
        emptyMessage = "No records found.",
        emptyStateAction,
        row: rowSnippet,
        onRowClick,
    } = $props<{
        data: any[];
        columns: Column[];
        emptyMessage?: string;
        emptyStateAction?: Snippet;
        row?: Snippet<[any, number]>;
        onRowClick?: (item: any) => void;
    }>();

    function handleRowClick(item: any) {
        if (onRowClick) {
            onRowClick(item);
        }
    }
</script>

<div
    class="w-full bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden"
>
    {#if data.length === 0}
        <div
            class="flex flex-col items-center justify-center p-12 text-slate-500"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-12 h-12 mb-4 text-slate-300"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                />
            </svg>
            <p class="text-sm font-medium">{emptyMessage}</p>
            {@render emptyStateAction?.()}
        </div>
    {:else}
        <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-slate-200">
                <thead class="bg-slate-50">
                    <tr>
                        {#each columns as col}
                            <th
                                scope="col"
                                class="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider text-{col.align ||
                                    'left'}"
                            >
                                {col.label}
                            </th>
                        {/each}
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-slate-200">
                    {#each data as row, i}
                        <tr
                            class="hover:bg-slate-50 focus-within:bg-slate-50 cursor-pointer transition-colors"
                            onclick={() => handleRowClick(row)}
                        >
                            {#if rowSnippet}
                                {@render rowSnippet(row, i)}
                            {:else}
                                {#each columns as col}
                                    <td
                                        class="px-6 py-4 whitespace-nowrap text-sm text-slate-600"
                                    >
                                        {row[col.key]}
                                    </td>
                                {/each}
                            {/if}
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    {/if}
</div>
