import { c as escape_html, b as attr, j as bind_props, i as head, a as attr_class, f as stringify, e as ensure_array_like, g as derived, s as store_get, d as unsubscribe_stores } from "../../../../../chunks/index.js";
import { p as page } from "../../../../../chunks/stores.js";
import { i as invoices, u as updateInvoice } from "../../../../../chunks/invoices.js";
import { w as writable } from "../../../../../chunks/index2.js";
import { v4 } from "uuid";
import { l as logDocumentAction } from "../../../../../chunks/history.js";
import { S as ShareModal, a as generateInvoicePdf } from "../../../../../chunks/ShareModal.js";
import { A as AppButton } from "../../../../../chunks/AppButton.js";
import { f as formatCurrency, a as formatDate } from "../../../../../chunks/formatters.js";
const payments = writable([]);
const addPayment = (payment) => {
  const id = v4();
  const newPayment = { ...payment, id };
  payments.update((p) => [...p, newPayment]);
  logDocumentAction({
    documentType: "invoice",
    documentId: payment.invoiceId,
    action: "payment_recorded",
    description: `Payment of ${payment.amount} recorded.`
  });
  return id;
};
function PaymentModal($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      invoiceId,
      invoiceTotal,
      invoiceCurrency,
      isOpen = false,
      onrecorded,
      onclose
    } = $$props;
    let amount = 0;
    let paymentDate = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    let paymentMethod = "";
    let referenceNumber = "";
    let notes = "";
    function handleSubmit() {
      if (!amount || amount <= 0) return;
      addPayment({
        invoiceId,
        amount,
        paymentDate: new Date(paymentDate),
        paymentMethod,
        referenceNumber,
        notes
      });
      if (onrecorded) onrecorded();
      closeModal();
    }
    function closeModal() {
      isOpen = false;
      if (onclose) onclose();
      amount = invoiceTotal;
      paymentDate = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
      paymentMethod = "";
      referenceNumber = "";
      notes = "";
    }
    if (isOpen) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm"><div class="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden border border-slate-200"><div class="px-6 py-4 border-b border-slate-100 flex justify-between items-center"><h3 class="text-xl font-bold text-slate-800 tracking-tight">Record Payment</h3> <button aria-label="Close dialog" class="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-full hover:bg-slate-100"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg></button></div> <div class="p-6"><div class="mb-6 bg-slate-50 p-4 rounded-lg flex justify-between items-center border border-slate-100"><span class="text-sm font-medium text-slate-500">Invoice Total</span> <span class="text-lg font-bold text-slate-900">${escape_html(formatCurrency(invoiceTotal, invoiceCurrency))}</span></div> <div class="space-y-4"><div><label for="payment-amount" class="block text-sm font-medium text-slate-700 mb-1">Amount Received</label> <div class="relative"><span class="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500 font-medium">${escape_html(invoiceCurrency)}</span> <input id="payment-amount" type="number"${attr("value", amount)} min="0" step="0.01" class="block w-full pl-12 bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20" required=""/></div></div> <div><label for="payment-date" class="block text-sm font-medium text-slate-700 mb-1">Payment Date</label> <input id="payment-date" type="date"${attr("value", paymentDate)} class="block w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20" required=""/></div> <div><label for="payment-method" class="block text-sm font-medium text-slate-700 mb-1">Payment Method (Optional)</label> `);
      $$renderer2.select(
        {
          id: "payment-method",
          value: paymentMethod,
          class: "block w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20"
        },
        ($$renderer3) => {
          $$renderer3.option({ value: "" }, ($$renderer4) => {
            $$renderer4.push(`Select a method...`);
          });
          $$renderer3.option({ value: "Bank Transfer" }, ($$renderer4) => {
            $$renderer4.push(`Bank Transfer`);
          });
          $$renderer3.option({ value: "Credit Card" }, ($$renderer4) => {
            $$renderer4.push(`Credit Card`);
          });
          $$renderer3.option({ value: "Cash" }, ($$renderer4) => {
            $$renderer4.push(`Cash`);
          });
          $$renderer3.option({ value: "PayPal" }, ($$renderer4) => {
            $$renderer4.push(`PayPal`);
          });
          $$renderer3.option({ value: "Check" }, ($$renderer4) => {
            $$renderer4.push(`Check`);
          });
          $$renderer3.option({ value: "Other" }, ($$renderer4) => {
            $$renderer4.push(`Other`);
          });
        }
      );
      $$renderer2.push(`</div> <div><label for="payment-ref" class="block text-sm font-medium text-slate-700 mb-1">Reference Number (Optional)</label> <input id="payment-ref" type="text"${attr("value", referenceNumber)} placeholder="e.g. Transaction ID or Check Number" class="block w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20"/></div> <div><label for="payment-notes" class="block text-sm font-medium text-slate-700 mb-1">Notes (Optional)</label> <textarea id="payment-notes" rows="2" placeholder="Internal notes about this payment" class="block w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20">`);
      const $$body = escape_html(notes);
      if ($$body) {
        $$renderer2.push(`${$$body}`);
      }
      $$renderer2.push(`</textarea></div></div></div> <div class="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">`);
      AppButton($$renderer2, {
        variant: "ghost",
        onclick: closeModal,
        children: ($$renderer3) => {
          $$renderer3.push(`<!---->Cancel`);
        },
        $$slots: { default: true }
      });
      $$renderer2.push(`<!----> `);
      AppButton($$renderer2, {
        variant: "primary",
        onclick: handleSubmit,
        children: ($$renderer3) => {
          $$renderer3.push(`<!---->Record Payment`);
        },
        $$slots: { default: true }
      });
      $$renderer2.push(`<!----></div></div></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { isOpen });
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let invoiceId = derived(() => store_get($$store_subs ??= {}, "$page", page).params.id);
    let invoice = derived(() => store_get($$store_subs ??= {}, "$invoices", invoices).find((inv) => inv.id === invoiceId()));
    let invoiceTotal = derived(() => invoice() ? calculateTotal(invoice()) : 0);
    let invoicePayments = derived(() => store_get($$store_subs ??= {}, "$payments", payments).filter((p) => p.invoiceId === invoiceId()));
    let totalPaid = derived(() => invoicePayments().reduce((sum, p) => sum + p.amount, 0));
    let balanceDue = derived(() => Math.max(0, invoiceTotal() - totalPaid()));
    let isPaymentModalOpen = false;
    let isShareModalOpen = false;
    let shareUrl = derived(() => typeof window !== "undefined" ? `${window.location.origin}/view/${invoiceId()}` : "");
    function calculateTotal(invoice2) {
      const subtotal = invoice2.items.reduce((sum, item) => sum + item.rate * item.quantity, 0);
      const taxAmount = subtotal * (invoice2.taxRate / 100);
      return subtotal + taxAmount + invoice2.shipping - invoice2.discount;
    }
    function handleDownload() {
      if (!invoice()) return;
      const doc = generateInvoicePdf(invoice());
      doc.save(`${invoice().invoiceNumber}.pdf`);
    }
    function handlePaymentRecorded() {
      if (invoiceId() && balanceDue() <= 0 && invoice()?.status !== "paid") {
        updateInvoice(invoiceId(), { status: "paid", paidAt: /* @__PURE__ */ new Date() });
      }
    }
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      head("ire7te", $$renderer3, ($$renderer4) => {
        $$renderer4.title(($$renderer5) => {
          $$renderer5.push(`<title>Preview ${escape_html(invoice()?.invoiceNumber || "Invoice")} - Invoicer App</title>`);
        });
      });
      $$renderer3.push(`<div class="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-4 flex items-center justify-between"><div class="flex items-center gap-4"><a href="/invoices" class="group text-slate-500 hover:text-slate-800 flex items-center gap-2 font-medium text-sm transition-all"><div class="p-1 rounded-full group-hover:bg-slate-100 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"></path></svg></div> Back</a> <div class="h-6 w-px bg-slate-300 mx-2"></div> <div class="flex flex-col"><h1 class="text-xl font-bold text-slate-800 tracking-tight flex items-center gap-2">Invoice Preview `);
      if (invoice()) {
        $$renderer3.push("<!--[0-->");
        $$renderer3.push(`<span class="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-widest">${escape_html(invoice().invoiceNumber)}</span>`);
      } else {
        $$renderer3.push("<!--[-1-->");
      }
      $$renderer3.push(`<!--]--></h1> `);
      if (invoice()) {
        $$renderer3.push("<!--[0-->");
        $$renderer3.push(`<div${attr_class("text-sm font-medium mt-0.5", void 0, {
          "text-emerald-600": balanceDue() <= 0,
          "text-amber-500": balanceDue() > 0 && totalPaid() > 0,
          "text-slate-500": totalPaid() === 0
        })}>Balance Due: ${escape_html(formatCurrency(balanceDue(), invoice().currency))}</div>`);
      } else {
        $$renderer3.push("<!--[-1-->");
      }
      $$renderer3.push(`<!--]--></div></div> <div class="flex items-center gap-2 overflow-x-auto pb-1 -mb-1 no-scrollbar flex-nowrap min-w-0">`);
      if (invoice()) {
        $$renderer3.push("<!--[0-->");
        AppButton($$renderer3, {
          variant: "outline",
          size: "sm",
          onclick: () => isPaymentModalOpen = true,
          class: "whitespace-nowrap flex-shrink-0",
          children: ($$renderer4) => {
            $$renderer4.push(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 mr-1 sm:mr-2"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"></path></svg> <span class="hidden xs:inline">Record Payment</span> <span class="xs:hidden">Pay</span>`);
          },
          $$slots: { default: true }
        });
      } else {
        $$renderer3.push("<!--[-1-->");
      }
      $$renderer3.push(`<!--]--> `);
      AppButton($$renderer3, {
        variant: "outline",
        size: "sm",
        onclick: () => isShareModalOpen = true,
        disabled: !invoice(),
        class: "whitespace-nowrap flex-shrink-0",
        children: ($$renderer4) => {
          $$renderer4.push(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 mr-2"><path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"></path></svg> Share`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      AppButton($$renderer3, {
        variant: "secondary",
        size: "sm",
        href: `/invoices/${invoiceId()}`,
        disabled: !invoice(),
        class: "whitespace-nowrap flex-shrink-0",
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->Edit`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      AppButton($$renderer3, {
        variant: "secondary",
        size: "sm",
        onclick: () => window.print(),
        disabled: !invoice(),
        class: "whitespace-nowrap flex-shrink-0",
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->Print`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      AppButton($$renderer3, {
        variant: "primary",
        size: "sm",
        onclick: handleDownload,
        disabled: !invoice(),
        class: "whitespace-nowrap flex-shrink-0",
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->Download`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----></div></div> <div class="h-[calc(100vh-73px)] bg-slate-100 flex p-6 overflow-hidden gap-6 flex-col lg:flex-row"><div class="flex-grow flex items-center justify-center bg-slate-100 rounded-xl relative h-full">`);
      {
        $$renderer3.push("<!--[0-->");
        $$renderer3.push(`<div class="flex flex-col items-center"><div class="w-12 h-12 border-4 border-slate-200 border-t-emerald-500 rounded-full animate-spin mb-4"></div> <p class="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Preparing Document...</p></div>`);
      }
      $$renderer3.push(`<!--]--></div> `);
      if (invoice()) {
        $$renderer3.push("<!--[0-->");
        $$renderer3.push(`<div class="w-full lg:w-96 flex-shrink-0 flex flex-col gap-6 h-full"><div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-0 flex flex-col flex-grow overflow-hidden"><div class="flex border-b border-slate-100"><button${attr_class(`flex-1 py-4 text-sm font-bold transition-all border-b-2 ${stringify(
          "text-emerald-600 border-emerald-600 bg-emerald-50/30"
        )}`)}>Payments</button> <button${attr_class(`flex-1 py-4 text-sm font-bold transition-all border-b-2 ${stringify("text-slate-400 border-transparent hover:text-slate-600 hover:bg-slate-50")}`)}>History</button></div> <div class="p-6 flex flex-col flex-grow overflow-hidden">`);
        {
          $$renderer3.push("<!--[0-->");
          $$renderer3.push(`<div class="flex items-center justify-between mb-6"><h3 class="text-lg font-bold text-slate-900 flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 text-emerald-600"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> Payments</h3> `);
          if (balanceDue() > 0) {
            $$renderer3.push("<!--[0-->");
            AppButton($$renderer3, {
              variant: "outline",
              size: "sm",
              onclick: () => isPaymentModalOpen = true,
              children: ($$renderer4) => {
                $$renderer4.push(`<!---->Add`);
              },
              $$slots: { default: true }
            });
          } else {
            $$renderer3.push("<!--[-1-->");
          }
          $$renderer3.push(`<!--]--></div> <div class="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-6 flex justify-between items-center"><div><div class="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Balance Due</div> <div${attr_class(`text-xl font-bold ${stringify(balanceDue() <= 0 ? "text-emerald-600" : "text-slate-900")}`)}>${escape_html(formatCurrency(balanceDue(), invoice().currency))}</div></div> `);
          if (balanceDue() <= 0) {
            $$renderer3.push("<!--[0-->");
            $$renderer3.push(`<div class="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Paid</div>`);
          } else {
            $$renderer3.push("<!--[-1-->");
          }
          $$renderer3.push(`<!--]--></div> <div class="flex-grow overflow-y-auto pr-2 space-y-4">`);
          if (invoicePayments().length === 0) {
            $$renderer3.push("<!--[0-->");
            $$renderer3.push(`<div class="text-center py-8"><p class="text-sm font-medium text-slate-400">No payments yet</p></div>`);
          } else {
            $$renderer3.push("<!--[-1-->");
            $$renderer3.push(`<!--[-->`);
            const each_array = ensure_array_like(invoicePayments());
            for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
              let payment = each_array[$$index];
              $$renderer3.push(`<div class="bg-white border border-slate-100 rounded-lg p-3 shadow-sm"><div class="flex justify-between items-start mb-1"><div class="font-bold text-slate-900">${escape_html(formatCurrency(payment.amount, invoice().currency))}</div> <div class="text-[10px] text-slate-400 font-bold uppercase">${escape_html(formatDate(payment.paymentDate))}</div></div> `);
              if (payment.paymentMethod) {
                $$renderer3.push("<!--[0-->");
                $$renderer3.push(`<div class="text-[10px] text-slate-500 font-medium bg-slate-50 px-1.5 py-0.5 rounded inline-block">${escape_html(payment.paymentMethod)}</div>`);
              } else {
                $$renderer3.push("<!--[-1-->");
              }
              $$renderer3.push(`<!--]--></div>`);
            }
            $$renderer3.push(`<!--]-->`);
          }
          $$renderer3.push(`<!--]--></div>`);
        }
        $$renderer3.push(`<!--]--></div></div></div> `);
        if (invoice() && invoiceId()) {
          $$renderer3.push("<!--[0-->");
          PaymentModal($$renderer3, {
            invoiceId: invoiceId(),
            invoiceTotal: invoiceTotal(),
            invoiceCurrency: invoice().currency,
            onrecorded: handlePaymentRecorded,
            get isOpen() {
              return isPaymentModalOpen;
            },
            set isOpen($$value) {
              isPaymentModalOpen = $$value;
              $$settled = false;
            }
          });
        } else {
          $$renderer3.push("<!--[-1-->");
        }
        $$renderer3.push(`<!--]--> `);
        if (invoice()) {
          $$renderer3.push("<!--[0-->");
          ShareModal($$renderer3, {
            shareUrl: shareUrl(),
            documentNumber: invoice().invoiceNumber,
            onshare: () => {
              if (invoice() && invoice().status !== "paid") {
                updateInvoice(invoice().id, { status: "sent", sentAt: /* @__PURE__ */ new Date() });
              }
            },
            get isOpen() {
              return isShareModalOpen;
            },
            set isOpen($$value) {
              isShareModalOpen = $$value;
              $$settled = false;
            }
          });
        } else {
          $$renderer3.push("<!--[-1-->");
        }
        $$renderer3.push(`<!--]-->`);
      } else {
        $$renderer3.push("<!--[-1-->");
      }
      $$renderer3.push(`<!--]--></div>`);
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
