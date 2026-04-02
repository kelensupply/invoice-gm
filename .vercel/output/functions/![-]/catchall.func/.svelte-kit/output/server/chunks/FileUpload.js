import { b as attr, a as attr_class, c as escape_html, j as bind_props, f as stringify } from "./index.js";
function FileUpload($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      value = null,
      label = "Upload a file",
      sublabel = "or drag and drop here",
      accept = "image/*",
      formatHint = "PDF, JPG, PNG, TXT, DOC",
      onupload,
      onremove
    } = $$props;
    $$renderer2.push(`<div class="relative group cursor-pointer" role="button" tabindex="0"><input type="file"${attr("accept", accept)} class="hidden"/> <div${attr_class(`w-full aspect-square md:aspect-auto md:h-48 bg-white rounded-xl border-2 border-dashed ${stringify(value ? "border-emerald-100" : "border-slate-200")} flex flex-center transition-all group-hover:border-emerald-300 group-hover:bg-slate-50/50`)}>`);
    if (value) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="relative w-full h-full p-4 flex items-center justify-center"><img${attr("src", value)} alt="Uploaded file" class="max-h-full max-w-full object-contain"/> <button type="button" title="Remove file" class="absolute top-2 right-2 p-1.5 bg-white shadow-sm border border-slate-200 rounded-full text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg></button></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<div class="flex flex-col items-center justify-center w-full p-8 text-center space-y-3"><div class="p-3 bg-slate-50 rounded-full text-slate-300 group-hover:bg-emerald-50 group-hover:text-emerald-500 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 002.25 1.5zm10.5-11.25h.008v.008h-.008V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"></path></svg></div> <div><div class="text-sm font-semibold text-slate-600"><span class="text-emerald-600 hover:text-emerald-500 transition-colors">${escape_html(label)}</span> ${escape_html(sublabel)}</div> <div class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">${escape_html(formatHint)}</div></div></div>`);
    }
    $$renderer2.push(`<!--]--></div></div>`);
    bind_props($$props, { value });
  });
}
export {
  FileUpload as F
};
