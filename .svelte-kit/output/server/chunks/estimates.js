import { w as writable } from "./index2.js";
import { v4 } from "uuid";
import { l as logDocumentAction } from "./history.js";
const estimates = writable([]);
const addEstimate = (estimate) => {
  const id = v4();
  const newEstimate = { ...estimate, id };
  estimates.update((e) => [...e, newEstimate]);
  logDocumentAction({
    documentType: "estimate",
    documentId: id,
    action: "created",
    description: `Estimate ${estimate.estimateNumber} created.`
  });
  return id;
};
const updateEstimate = (id, updates) => {
  estimates.update((e) => e.map((est) => est.id === id ? { ...est, ...updates } : est));
  if (updates.status) {
    logDocumentAction({
      documentType: "estimate",
      documentId: id,
      action: "status_updated",
      description: `Status changed to ${updates.status}.`
    });
  }
};
export {
  addEstimate as a,
  estimates as e,
  updateEstimate as u
};
