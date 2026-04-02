import { w as writable } from "./index2.js";
const defaultSettings = {
  company: {
    name: "My Company",
    email: "hello@mycompany.com",
    phone: "",
    address: "",
    website: "",
    taxId: "",
    domain: ""
  },
  defaultTaxRate: 0,
  defaultCurrency: "USD",
  defaultNotes: "Thank you for your business.",
  defaultTerms: "Payment due upon receipt."
};
const settings = writable(defaultSettings);
const updateSettings = (updates) => {
  settings.update((s) => {
    const newSettings = { ...s, ...updates };
    return newSettings;
  });
};
export {
  settings as s,
  updateSettings as u
};
