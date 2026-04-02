import { a as attr_class, f as stringify, c as escape_html, g as derived } from "./index.js";
function StatusBadge($$renderer, $$props) {
  let { status } = $$props;
  const config = {
    draft: {
      style: "bg-slate-100 text-slate-600 border-slate-200",
      label: "Draft"
    },
    sent: {
      style: "bg-blue-50 text-blue-700 border-blue-100",
      label: "Sent"
    },
    viewed: {
      style: "bg-teal-50 text-teal-700 border-teal-100",
      label: "Viewed"
    },
    paid: {
      style: "bg-emerald-50 text-emerald-700 border-emerald-100",
      label: "Paid"
    },
    overdue: {
      style: "bg-red-50 text-red-700 border-red-100",
      label: "Overdue"
    },
    accepted: {
      style: "bg-emerald-50 text-emerald-700 border-emerald-100",
      label: "Accepted"
    },
    declined: {
      style: "bg-slate-50 text-slate-500 border-slate-200",
      label: "Declined"
    },
    expired: {
      style: "bg-orange-50 text-orange-700 border-orange-100",
      label: "Expired"
    }
  };
  let item = derived(() => config[status] || {
    style: "bg-slate-100 text-slate-600 border-slate-200",
    label: status
  });
  $$renderer.push(`<span${attr_class(`inline-flex items-center justify-center px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest rounded-md border ${stringify(item().style)} whitespace-nowrap`)}>${escape_html(item().label)}</span>`);
}
export {
  StatusBadge as S
};
