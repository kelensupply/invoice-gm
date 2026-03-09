<script lang="ts">
    import { enhance } from "$app/forms";

    let { form } = $props();
    let loading = $state(false);
    let showPassword = $state(false);
    let showConfirm = $state(false);
</script>

<svelte:head>
    <title>Reset Password - Invoicer App</title>
</svelte:head>

<div
    class="min-h-screen bg-slate-50 flex flex-col justify-center relative overflow-hidden"
>
    <div
        class="absolute top-0 left-0 -ml-20 -mt-20 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40"
    ></div>
    <div
        class="absolute bottom-0 right-0 -mr-20 -mb-20 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40"
    ></div>

    <div class="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4 sm:px-0">
        <div
            class="bg-white/80 backdrop-blur-xl py-10 px-6 sm:px-12 shadow-2xl rounded-3xl border border-white"
        >
            <div class="mb-8 text-center">
                <div
                    class="mx-auto w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center text-white mb-6 shadow-lg shadow-emerald-500/30"
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
                            d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                        />
                    </svg>
                </div>
                <h2
                    class="text-3xl font-extrabold text-slate-900 tracking-tight"
                >
                    Set New Password
                </h2>
                <p class="mt-2 text-sm text-slate-600">
                    Enter and confirm your new password below.
                </p>
            </div>

            {#if form?.success}
                <div
                    class="rounded-xl bg-emerald-50 p-5 border border-emerald-100 text-center"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-10 h-10 text-emerald-500 mx-auto mb-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <p class="text-sm font-semibold text-emerald-800">
                        Password updated!
                    </p>
                    <p class="text-xs text-emerald-700 mt-1">
                        Your password has been changed successfully.
                    </p>
                    <a
                        href="/login"
                        class="mt-4 inline-block text-sm font-bold text-emerald-700 underline"
                        >Go to login</a
                    >
                </div>
            {:else}
                {#if form?.error}
                    <div
                        class="mb-5 rounded-xl bg-red-50 p-4 border border-red-100 text-sm text-red-700 font-medium"
                    >
                        {form.error}
                    </div>
                {/if}

                <form
                    method="POST"
                    class="space-y-5"
                    use:enhance={() => {
                        loading = true;
                        return async ({ update }) => {
                            await update();
                            loading = false;
                        };
                    }}
                >
                    <div>
                        <label
                            for="password"
                            class="block text-sm font-semibold text-slate-900 mb-1.5"
                            >New Password</label
                        >
                        <div class="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                id="password"
                                required
                                minlength="8"
                                placeholder="Min 8 characters"
                                class="block w-full rounded-xl border border-slate-200 bg-white/50 px-4 py-3 pr-12 text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 transition-all duration-200 outline-none sm:text-sm"
                            />
                            <button
                                type="button"
                                onclick={() => (showPassword = !showPassword)}
                                class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                            >
                                {#if showPassword}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        class="w-5 h-5"
                                        ><path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                                        /></svg
                                    >
                                {:else}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        class="w-5 h-5"
                                        ><path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                        /><path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        /></svg
                                    >
                                {/if}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label
                            for="confirm"
                            class="block text-sm font-semibold text-slate-900 mb-1.5"
                            >Confirm Password</label
                        >
                        <div class="relative">
                            <input
                                type={showConfirm ? "text" : "password"}
                                name="confirm"
                                id="confirm"
                                required
                                minlength="8"
                                placeholder="Repeat your password"
                                class="block w-full rounded-xl border border-slate-200 bg-white/50 px-4 py-3 pr-12 text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 transition-all duration-200 outline-none sm:text-sm"
                            />
                            <button
                                type="button"
                                onclick={() => (showConfirm = !showConfirm)}
                                class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                            >
                                {#if showConfirm}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        class="w-5 h-5"
                                        ><path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                                        /></svg
                                    >
                                {:else}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        class="w-5 h-5"
                                        ><path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                        /><path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        /></svg
                                    >
                                {/if}
                            </button>
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
                                Updating...
                            {:else}
                                Update Password
                            {/if}
                        </button>
                    </div>
                </form>
            {/if}
        </div>
    </div>
</div>
