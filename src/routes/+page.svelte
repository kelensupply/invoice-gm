<script lang="ts">
    import AppButton from "$lib/components/AppButton.svelte";
</script>

<svelte:head>
    <title>Invoicer App - Managing your invoices seamlessly</title>
</svelte:head>

<div
    class="min-h-screen bg-slate-50 relative overflow-hidden flex flex-col items-center justify-center"
>
    <!-- Background Decorators -->
    <div
        class="absolute top-0 -left-4 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"
    ></div>
    <div
        class="absolute top-0 -right-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"
    ></div>
    <div
        class="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"
    ></div>

    <!-- Content Card -->
    <div
        class="relative z-10 w-full max-w-7xl mx-auto px-6 py-16 md:py-24 text-center mt-12"
    >
        <div
            class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-sm font-semibold mb-8 shadow-sm"
        >
            <span class="flex h-2 w-2 rounded-full bg-emerald-500"></span>
            Seamless Invoice Management
        </div>

        <h1
            class="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-8 leading-tight"
        >
            Create Invoices that <br /><span
                class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-blue-600"
                >Get You Paid Faster</span
            >
        </h1>

        <p
            class="text-lg md:text-xl text-slate-600 mb-12 max-w-2xl mx-auto font-medium"
        >
            A beautiful, intuitive, and extremely fast platform to generate
            invoices, send estimates, and track payments in real time. Built for
            modern freelancers and businesses.
        </p>

        <div
            class="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
            <a
                href="/signup"
                class="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
            >
                Get Started for Free
            </a>
            <a
                href="/login"
                class="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-slate-700 font-bold text-lg shadow-md border border-slate-200 hover:bg-slate-50 transition-colors duration-200"
            >
                Sign In
            </a>
        </div>

        <!-- Dashboard Preview image (placeholder but styled nicely) -->
        <div
            class="mt-20 relative mx-auto max-w-5xl rounded-2xl bg-white/40 ring-1 ring-white/60 shadow-2xl backdrop-blur-sm p-4 lg:p-6 mb-32"
        >
            <div
                class="rounded-xl overflow-hidden bg-slate-900 shadow-2xl border border-slate-800/10"
            >
                <div
                    class="h-8 bg-slate-800 border-b border-slate-700 flex items-center px-4 gap-2"
                >
                    <div class="w-3 h-3 rounded-full bg-red-500"></div>
                    <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div class="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <!-- Abstract UI representation -->
                <div
                    class="p-8 grid grid-cols-4 gap-6 opacity-80 mix-blend-screen"
                >
                    <!-- Sidebar -->
                    <div
                        class="col-span-1 h-80 bg-slate-800 rounded-xl flex flex-col gap-4 p-4"
                    >
                        <div
                            class="h-8 bg-slate-700 rounded-md mb-4 w-3/4"
                        ></div>
                        <div
                            class="h-6 bg-emerald-900/40 rounded-md w-full"
                        ></div>
                        <div
                            class="h-6 bg-slate-700/50 rounded-md w-full"
                        ></div>
                        <div
                            class="h-6 bg-slate-700/50 rounded-md w-full"
                        ></div>
                    </div>
                    <!-- Main Content -->
                    <div class="col-span-3 grid grid-rows-4 gap-6">
                        <!-- Stats row -->
                        <div class="row-span-1 grid grid-cols-3 gap-6">
                            <div
                                class="col-span-1 bg-gradient-to-br from-emerald-900/30 to-emerald-800/10 rounded-xl border border-emerald-800/30 p-4 flex flex-col justify-end"
                            >
                                <div
                                    class="h-4 w-1/2 bg-emerald-700/50 rounded mb-2"
                                ></div>
                                <div
                                    class="h-8 w-3/4 bg-emerald-500/50 rounded"
                                ></div>
                            </div>
                            <div
                                class="col-span-1 bg-slate-800 rounded-xl border border-slate-700/50 p-4 flex flex-col justify-end"
                            >
                                <div
                                    class="h-4 w-1/2 bg-slate-700 rounded mb-2"
                                ></div>
                                <div
                                    class="h-8 w-3/4 bg-slate-600 rounded"
                                ></div>
                            </div>
                            <div
                                class="col-span-1 bg-slate-800 rounded-xl border border-slate-700/50 p-4 flex flex-col justify-end"
                            >
                                <div
                                    class="h-4 w-1/2 bg-slate-700 rounded mb-2"
                                ></div>
                                <div
                                    class="h-8 w-3/4 bg-slate-600 rounded"
                                ></div>
                            </div>
                        </div>
                        <!-- List view -->
                        <div
                            class="row-span-3 bg-slate-800 rounded-xl border border-slate-700/50 flex flex-col p-4 gap-3"
                        >
                            <div
                                class="h-8 bg-slate-700/50 rounded-md w-full mb-2"
                            ></div>
                            <div
                                class="h-12 bg-slate-700/30 rounded-md w-full"
                            ></div>
                            <div
                                class="h-12 bg-slate-700/30 rounded-md w-full"
                            ></div>
                            <div
                                class="h-12 bg-slate-700/30 rounded-md w-full"
                            ></div>
                            <div
                                class="h-12 bg-slate-700/30 rounded-md w-full"
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Features Section -->
        <div class="py-16">
            <h2
                class="text-3xl font-bold text-slate-900 mb-16 underline decoration-emerald-500 decoration-4 underline-offset-8"
            >
                Everything you need to run your business
            </h2>
            <div
                class="grid grid-cols-1 md:grid-cols-3 gap-8 text-left max-w-6xl mx-auto px-4"
            >
                <div
                    class="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
                >
                    <div
                        class="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-6"
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
                                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                            />
                        </svg>
                    </div>
                    <h3 class="text-xl font-bold text-slate-900 mb-3">
                        Professional Invoices
                    </h3>
                    <p class="text-slate-600">
                        Create beautiful, brandable invoices in seconds. Export
                        them to PDF or send them directly via email.
                    </p>
                </div>

                <div
                    class="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
                >
                    <div
                        class="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6"
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
                                d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                            />
                        </svg>
                    </div>
                    <h3 class="text-xl font-bold text-slate-900 mb-3">
                        Client Management
                    </h3>
                    <p class="text-slate-600">
                        Keep all your client details organized in one place.
                        Easily search and select clients when creating new
                        documents.
                    </p>
                </div>

                <div
                    class="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
                >
                    <div
                        class="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-6"
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
                                d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z"
                            />
                        </svg>
                    </div>
                    <h3 class="text-xl font-bold text-slate-900 mb-3">
                        Cloud Synced
                    </h3>
                    <p class="text-slate-600">
                        Your data is securely backed up in the cloud with
                        Supabase. Access your business from any device,
                        anywhere.
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    :root {
        --animation-blob: blob 7s infinite;
    }

    .animate-blob {
        animation: var(--animation-blob);
    }

    .animation-delay-2000 {
        animation-delay: 2s;
    }

    .animation-delay-4000 {
        animation-delay: 4s;
    }

    @keyframes blob {
        0% {
            transform: translate(0px, 0px) scale(1);
        }
        33% {
            transform: translate(30px, -50px) scale(1.1);
        }
        66% {
            transform: translate(-20px, 20px) scale(0.9);
        }
        100% {
            transform: translate(0px, 0px) scale(1);
        }
    }
</style>
