const ITEM_CATEGORIES = [
  { value: "services", label: "Services" },
  { value: "software", label: "Software & Subscriptions" },
  { value: "hardware", label: "Hardware & Equipment" },
  { value: "consulting", label: "Consulting & Advisory" },
  { value: "design", label: "Design & Creative" },
  { value: "development", label: "Development & Programming" },
  { value: "marketing", label: "Marketing & Advertising" },
  { value: "maintenance", label: "Maintenance & Support" },
  { value: "training", label: "Training & Education" },
  { value: "hosting", label: "Hosting & Infrastructure" },
  { value: "products", label: "Physical Products" },
  { value: "licenses", label: "Licenses & Subscriptions" },
  { value: "supplies", label: "Office Supplies" },
  { value: "other", label: "Other" }
];
const EXPENSE_CATEGORIES = [
  { value: "advertising", label: "Advertising & Marketing" },
  { value: "travel", label: "Travel & Meals" },
  { value: "utilities", label: "Utilities (Rent, Power, Internet)" },
  { value: "software", label: "Software & Subscriptions" },
  { value: "office", label: "Office Supplies" },
  { value: "insurance", label: "Insurance" },
  { value: "taxes", label: "Taxes & Licenses" },
  { value: "salary", label: "Salaries & Wages" },
  { value: "legal", label: "Legal & Professional Services" },
  { value: "equipment", label: "Equipment & Maintenance" },
  { value: "training", label: "Training & Development" },
  { value: "bank", label: "Bank Fees & Interest" },
  { value: "other", label: "Other" }
];
function getCategoryLabel(value) {
  const category = [...ITEM_CATEGORIES, ...EXPENSE_CATEGORIES].find((c) => c.value === value);
  return category ? category.label : value;
}
export {
  EXPENSE_CATEGORIES as E,
  ITEM_CATEGORIES as I,
  getCategoryLabel as g
};
