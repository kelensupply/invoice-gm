import { w as writable } from "./index2.js";
import { v4 } from "uuid";
const documentHistory = writable([]);
const logDocumentAction = (action) => {
  const id = v4();
  const createdAt = /* @__PURE__ */ new Date();
  const newAction = { ...action, id, createdAt };
  documentHistory.update((h) => [newAction, ...h]);
};
export {
  documentHistory as d,
  logDocumentAction as l
};
