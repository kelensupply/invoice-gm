<script lang="ts">
    import type { Snippet } from "svelte";

    let {
        href = undefined,
        type = "button" as const,
        variant = "primary" as const,
        size = "md" as const,
        fullWidth = false,
        children,
        class: className = "",
        ...rest
    } = $props<{
        href?: string;
        type?: "button" | "submit" | "reset";
        variant?: "primary" | "secondary" | "danger" | "ghost" | "outline";
        size?: "sm" | "md" | "lg";
        fullWidth?: boolean;
        children?: Snippet;
        class?: string;
        [key: string]: any;
    }>();

    const baseStyle =
        "inline-flex items-center justify-center font-medium transition-all duration-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2";

    const variants = {
        primary:
            "bg-emerald-500 text-white hover:bg-emerald-600 focus:ring-emerald-500 shadow-sm",
        secondary:
            "bg-slate-800 text-white hover:bg-slate-900 focus:ring-slate-800 shadow-sm",
        danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500 shadow-sm",
        ghost: "bg-transparent text-slate-600 hover:bg-slate-100 focus:ring-slate-500",
        outline:
            "bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 focus:ring-slate-200 shadow-sm",
    };

    const sizes = {
        sm: "px-3 py-1.5 text-xs",
        md: "px-4 py-2 text-sm",
        lg: "px-5 py-2.5 text-base",
    };

    let classes = $derived(
        `${baseStyle} ${variants[variant as keyof typeof variants]} ${sizes[size as keyof typeof sizes]} ${fullWidth ? "w-full" : ""} ${className}`,
    );
</script>

{#if href}
    <a {href} class={classes} {...rest}>
        {@render children?.()}
    </a>
{:else}
    <button {type} class={classes} {...rest}>
        {@render children?.()}
    </button>
{/if}
