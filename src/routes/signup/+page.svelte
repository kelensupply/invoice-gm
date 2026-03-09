<script lang="ts">
    import { enhance } from "$app/forms";

    let { form } = $props();
    let loading = $state(false);
</script>

<svelte:head>
    <title>Sign up - Invoicer App</title>
</svelte:head>

<div
    class="min-h-screen bg-slate-50 flex flex-col justify-center relative overflow-hidden"
>
    <!-- Background Decorators -->
    <div
        class="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40"
    ></div>
    <div
        class="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40"
    ></div>

    <div class="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4 sm:px-0">
        <div
            class="bg-white/80 backdrop-blur-xl py-10 px-6 sm:px-12 shadow-2xl rounded-3xl border border-white"
        >
            <div class="mb-10 text-center">
                <div
                    class="mx-auto w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center text-white mb-6 shadow-lg shadow-emerald-500/30"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                        class="w-7 h-7"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                        />
                    </svg>
                </div>
                <h2
                    class="text-3xl font-extrabold text-slate-900 tracking-tight"
                >
                    Create your account
                </h2>
                <p class="mt-2 text-sm text-slate-600">
                    Join thousands of modern businesses
                </p>
            </div>

            <form
                class="space-y-5"
                method="POST"
                use:enhance={() => {
                    loading = true;
                    return async ({ update }) => {
                        await update();
                        loading = false;
                    };
                }}
            >
                {#if form?.error}
                    <div
                        class="rounded-xl bg-red-50 p-4 border border-red-100 flex items-start gap-3"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                                clip-rule="evenodd"
                            />
                        </svg>
                        <div class="text-sm font-medium text-red-700">
                            {form.error}
                        </div>
                    </div>
                {/if}

                {#if form?.success}
                    <div
                        class="rounded-xl bg-emerald-50 p-4 border border-emerald-100 flex items-start gap-3"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                clip-rule="evenodd"
                            />
                        </svg>
                        <div class="text-sm font-medium text-emerald-700">
                            Check your email for the confirmation link to
                            complete your signup!
                        </div>
                    </div>
                {/if}

                <div>
                    <label
                        for="email"
                        class="block text-sm font-semibold text-slate-900 mb-1.5"
                        >Email address</label
                    >
                    <div class="relative">
                        <input
                            type="email"
                            name="email"
                            id="email"
                            autocomplete="email"
                            required
                            placeholder="you@domain.com"
                            class="block w-full rounded-xl border border-slate-200 bg-white/50 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 transition-all duration-200 outline-none sm:text-sm"
                        />
                    </div>
                </div>

                <div>
                    <label
                        for="password"
                        class="block text-sm font-semibold text-slate-900 mb-1.5"
                        >Password</label
                    >
                    <div class="relative">
                        <input
                            type="password"
                            name="password"
                            id="password"
                            autocomplete="new-password"
                            required
                            placeholder="••••••••"
                            class="block w-full rounded-xl border border-slate-200 bg-white/50 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 transition-all duration-200 outline-none sm:text-sm"
                        />
                    </div>
                </div>

                <div class="pt-2">
                    <button
                        type="submit"
                        disabled={loading}
                        class="flex w-full justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                        {#if loading}
                            <svg
                                class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                            Creating account...
                        {:else}
                            Sign up freely
                        {/if}
                    </button>
                </div>
            </form>

            <div class="mt-8 text-center sm:text-sm text-slate-600">
                Already have an account?
                <a
                    href="/login"
                    class="font-bold text-emerald-600 hover:text-emerald-500 transition-colors"
                    >Sign in</a
                >
            </div>
        </div>
    </div>
</div>
