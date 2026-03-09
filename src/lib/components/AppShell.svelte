<script lang="ts">
    import Sidebar from "./Sidebar.svelte";

    let { children, session } = $props<{ children: any; session: any }>();
</script>

<div class="flex min-h-screen bg-slate-100 font-sans text-slate-800">
    <Sidebar {session} />
    <main class="flex-1 ml-64 min-w-0">
        <!-- Render children passed to this component -->
        {@render children()}
    </main>
</div>
