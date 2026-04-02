import { w as writable } from "./index2.js";
import { v4 } from "uuid";
import { l as logDocumentAction } from "./history.js";
const invoices = writable([]);
const addInvoice = (invoice) => {
  const id = v4();
  const newInvoice = { ...invoice, id, status: "draft" };
  invoices.update((i) => [...i, newInvoice]);
  logDocumentAction({
    documentType: "invoice",
    documentId: id,
    action: "created",
    description: `Invoice ${invoice.invoiceNumber} created.`
  });
  return id;
};
const updateInvoice = (id, updates) => {
  invoices.update((i) => i.map((inv) => inv.id === id ? { ...inv, ...updates } : inv));
  if (updates.status) {
    logDocumentAction({
      documentType: "invoice",
      documentId: id,
      action: "status_updated",
      description: `Status changed to ${updates.status}.`
    });
  }
};
export {
  addInvoice as a,
  invoices as i,
  updateInvoice as u
};
