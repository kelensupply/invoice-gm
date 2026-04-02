import { ac as attributes, ad as clsx, g as derived } from "./index.js";
function AppButton($$renderer, $$props) {
  let {
    href = void 0,
    type = "button",
    variant = "primary",
    size = "md",
    fullWidth = false,
    children,
    class: className = "",
    $$slots,
    $$events,
    ...rest
  } = $$props;
  const baseStyle = "inline-flex items-center justify-center font-medium transition-all duration-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 min-h-[44px] sm:min-h-auto disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-emerald-500 text-white hover:bg-emerald-600 focus:ring-emerald-500 shadow-sm",
    secondary: "bg-slate-800 text-white hover:bg-slate-900 focus:ring-slate-800 shadow-sm",
    danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500 shadow-sm",
    ghost: "bg-transparent text-slate-600 hover:bg-slate-100 focus:ring-slate-500",
    outline: "bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 focus:ring-slate-200 shadow-sm"
  };
  const sizes = {
    sm: "px-3 py-2 sm:py-1.5 text-xs sm:text-xs",
    md: "px-4 py-3 sm:py-2 text-sm sm:text-sm",
    lg: "px-5 py-4 sm:py-2.5 text-base sm:text-base"
  };
  let classes = derived(() => `${baseStyle} ${variants[variant]} ${sizes[size]} ${fullWidth ? "w-full" : ""} ${className}`);
  if (href) {
    $$renderer.push("<!--[0-->");
    $$renderer.push(`<a${attributes({ href, class: clsx(classes()), ...rest })}>`);
    children?.($$renderer);
    $$renderer.push(`<!----></a>`);
  } else {
    $$renderer.push("<!--[-1-->");
    $$renderer.push(`<button${attributes({ type, class: clsx(classes()), ...rest })}>`);
    children?.($$renderer);
    $$renderer.push(`<!----></button>`);
  }
  $$renderer.push(`<!--]-->`);
}
export {
  AppButton as A
};
