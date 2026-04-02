import { b as attr, c as escape_html, a as attr_class, f as stringify, e as ensure_array_like, j as bind_props, s as store_get, d as unsubscribe_stores, i as head } from "../../../chunks/index.js";
import { s as settings, u as updateSettings } from "../../../chunks/settings.js";
import { A as AppButton } from "../../../chunks/AppButton.js";
import { F as FileUpload } from "../../../chunks/FileUpload.js";
import { P as PageHeader } from "../../../chunks/PageHeader.js";
function FormField($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      id,
      label,
      value = "",
      type = "text",
      placeholder = "",
      required = false,
      rows = 3,
      error = void 0,
      hint = void 0,
      options = [],
      children
    } = $$props;
    $$renderer2.push(`<div class="space-y-1.5"><label${attr("for", id)} class="block text-sm font-medium text-slate-700">${escape_html(label)} `);
    if (required) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<span class="text-red-500 ml-0.5">*</span>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></label> `);
    if (type === "textarea") {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<textarea${attr("id", id)}${attr("name", id)}${attr("placeholder", placeholder)}${attr("required", required, true)}${attr("rows", rows)}${attr_class(`input-base resize-none ${stringify(error ? "input-error" : "")}`)}>`);
      const $$body = escape_html(value);
      if ($$body) {
        $$renderer2.push(`${$$body}`);
      }
      $$renderer2.push(`</textarea>`);
    } else if (type === "select") {
      $$renderer2.push("<!--[1-->");
      $$renderer2.select(
        {
          id,
          name: id,
          value,
          required,
          class: `input-base ${stringify(error ? "input-error" : "")}`
        },
        ($$renderer3) => {
          if (children) {
            $$renderer3.push("<!--[0-->");
            children($$renderer3);
            $$renderer3.push(`<!---->`);
          } else {
            $$renderer3.push("<!--[-1-->");
            $$renderer3.push(`<!--[-->`);
            const each_array = ensure_array_like(options);
            for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
              let opt = each_array[$$index];
              $$renderer3.option({ value: opt.value }, ($$renderer4) => {
                $$renderer4.push(`${escape_html(opt.label)}`);
              });
            }
            $$renderer3.push(`<!--]-->`);
          }
          $$renderer3.push(`<!--]-->`);
        },
        void 0,
        void 0,
        void 0,
        void 0,
        true
      );
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<input${attr("type", type)}${attr("id", id)}${attr("name", id)}${attr("value", value)}${attr("placeholder", placeholder)}${attr("required", required, true)}${attr_class(`input-base ${stringify(error ? "input-error" : "")}`)}/>`);
    }
    $$renderer2.push(`<!--]--> `);
    if (error) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<p class="text-xs text-red-600 flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3.5 h-3.5 flex-shrink-0"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg> ${escape_html(error)}</p>`);
    } else if (hint) {
      $$renderer2.push("<!--[1-->");
      $$renderer2.push(`<p class="text-xs text-slate-500">${escape_html(hint)}</p>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div>`);
    bind_props($$props, { value });
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let activeTab = "company";
    let saveMessage = "";
    let saveError = "";
    let editedSettings = JSON.parse(JSON.stringify(store_get($$store_subs ??= {}, "$settings", settings)));
    function handleSave() {
      if (!editedSettings.company.name.trim()) {
        saveError = "Company name is required";
        setTimeout(() => saveError = "", 3e3);
        return;
      }
      updateSettings(editedSettings);
      saveMessage = "Settings saved successfully!";
      setTimeout(() => saveMessage = "", 3e3);
    }
    function handleLogoUpload(url) {
      editedSettings.company.logo = url;
    }
    function handleLogoRemove() {
      editedSettings.company.logo = void 0;
    }
    const settingsTabs = [
      {
        id: "company",
        label: "Company Profile",
        icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
      },
      {
        id: "defaults",
        label: "Invoice Defaults",
        icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      },
      {
        id: "tax",
        label: "Tax Rates",
        icon: "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
      }
    ];
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      head("1i19ct2", $$renderer3, ($$renderer4) => {
        $$renderer4.title(($$renderer5) => {
          $$renderer5.push(`<title>Settings - Invoicer App</title>`);
        });
      });
      PageHeader($$renderer3, {
        title: "Settings",
        subtitle: "Manage your company profile and invoice defaults",
        children: ($$renderer4) => {
          AppButton($$renderer4, {
            variant: "primary",
            size: "sm",
            onclick: handleSave,
            children: ($$renderer5) => {
              $$renderer5.push(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 mr-1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"></path></svg> Save Changes`);
            },
            $$slots: { default: true }
          });
        }
      });
      $$renderer3.push(`<!----> `);
      if (saveMessage) {
        $$renderer3.push("<!--[0-->");
        $$renderer3.push(`<div class="mb-5 p-4 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-3"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-emerald-500 flex-shrink-0"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd"></path></svg> <p class="text-sm font-medium text-emerald-700">${escape_html(saveMessage)}</p></div>`);
      } else {
        $$renderer3.push("<!--[-1-->");
      }
      $$renderer3.push(`<!--]--> `);
      if (saveError) {
        $$renderer3.push("<!--[0-->");
        $$renderer3.push(`<div class="mb-5 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-red-500 flex-shrink-0"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd"></path></svg> <p class="text-sm font-medium text-red-700">${escape_html(saveError)}</p></div>`);
      } else {
        $$renderer3.push("<!--[-1-->");
      }
      $$renderer3.push(`<!--]--> <div class="flex flex-col lg:flex-row gap-5"><div class="w-full lg:w-56 shrink-0"><nav class="section-card overflow-hidden flex lg:flex-col" aria-label="Settings navigation"><!--[-->`);
      const each_array = ensure_array_like(settingsTabs);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let tab = each_array[$$index];
        $$renderer3.push(`<button${attr_class(`flex items-center gap-2.5 px-4 py-3 text-sm font-medium border-b lg:border-b-0 lg:border-l-2 transition-colors flex-1 lg:flex-initial ${stringify(activeTab === tab.id ? "bg-emerald-50 border-emerald-500 text-emerald-700" : "border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900")}`)}><svg class="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"${attr("d", tab.icon)}></path></svg> <span class="hidden sm:inline lg:inline">${escape_html(tab.label)}</span></button>`);
      }
      $$renderer3.push(`<!--]--></nav></div> <div class="flex-1 min-w-0">`);
      {
        $$renderer3.push("<!--[0-->");
        $$renderer3.push(`<div class="section-card p-5 sm:p-6"><div class="mb-6"><h2 class="section-title">Company Profile</h2> <p class="text-muted mt-1">This information appears on your invoices and estimates.</p></div> <div class="space-y-8 max-w-xl"><div class="pb-6 border-b border-slate-100"><h3 class="text-sm font-semibold text-slate-900 mb-1">Company Logo</h3> <p class="text-muted mb-4">Recommended size: 200×200px or higher.</p> `);
        FileUpload($$renderer3, {
          value: editedSettings.company.logo,
          label: "Upload Logo",
          sublabel: "PNG, JPG, or SVG",
          accept: "image/*",
          formatHint: "PNG, JPG, SVG",
          onupload: handleLogoUpload,
          onremove: handleLogoRemove
        });
        $$renderer3.push(`<!----></div> <div class="pb-6 border-b border-slate-100 space-y-4"><h3 class="text-sm font-semibold text-slate-900">Basic Information</h3> `);
        FormField($$renderer3, {
          id: "fCompanyName",
          label: "Company Name",
          placeholder: "e.g., Acme Corporation",
          required: true,
          get value() {
            return editedSettings.company.name;
          },
          set value($$value) {
            editedSettings.company.name = $$value;
            $$settled = false;
          }
        });
        $$renderer3.push(`<!----> `);
        FormField($$renderer3, {
          id: "fDomain",
          label: "Industry / Domain",
          placeholder: "e.g., Consulting, Construction",
          get value() {
            return editedSettings.company.domain;
          },
          set value($$value) {
            editedSettings.company.domain = $$value;
            $$settled = false;
          }
        });
        $$renderer3.push(`<!----></div> <div class="pb-6 border-b border-slate-100 space-y-4"><h3 class="text-sm font-semibold text-slate-900">Contact Information</h3> `);
        FormField($$renderer3, {
          id: "fEmail",
          label: "Email Address",
          type: "email",
          placeholder: "contact@company.com",
          get value() {
            return editedSettings.company.email;
          },
          set value($$value) {
            editedSettings.company.email = $$value;
            $$settled = false;
          }
        });
        $$renderer3.push(`<!----> `);
        FormField($$renderer3, {
          id: "fPhone",
          label: "Phone Number",
          type: "tel",
          placeholder: "+1 (555) 000-0000",
          get value() {
            return editedSettings.company.phone;
          },
          set value($$value) {
            editedSettings.company.phone = $$value;
            $$settled = false;
          }
        });
        $$renderer3.push(`<!----> `);
        FormField($$renderer3, {
          id: "fWebsite",
          label: "Website",
          type: "url",
          placeholder: "https://company.com",
          get value() {
            return editedSettings.company.website;
          },
          set value($$value) {
            editedSettings.company.website = $$value;
            $$settled = false;
          }
        });
        $$renderer3.push(`<!----></div> <div class="space-y-4"><h3 class="text-sm font-semibold text-slate-900">Address &amp; Tax Information</h3> `);
        FormField($$renderer3, {
          id: "fAddress",
          label: "Business Address",
          type: "textarea",
          rows: 3,
          placeholder: "123 Street Name, City, State, ZIP",
          get value() {
            return editedSettings.company.address;
          },
          set value($$value) {
            editedSettings.company.address = $$value;
            $$settled = false;
          }
        });
        $$renderer3.push(`<!----> `);
        FormField($$renderer3, {
          id: "fTaxId",
          label: "Tax ID / Business Number",
          placeholder: "e.g., EIN, VAT Number",
          get value() {
            return editedSettings.company.taxId;
          },
          set value($$value) {
            editedSettings.company.taxId = $$value;
            $$settled = false;
          }
        });
        $$renderer3.push(`<!----></div></div></div>`);
      }
      $$renderer3.push(`<!--]--> `);
      {
        $$renderer3.push("<!--[-1-->");
      }
      $$renderer3.push(`<!--]--> `);
      {
        $$renderer3.push("<!--[-1-->");
      }
      $$renderer3.push(`<!--]--></div></div>`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _page as default
};
