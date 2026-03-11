export const ITEM_CATEGORIES = [
    { value: 'services', label: 'Services' },
    { value: 'software', label: 'Software & Subscriptions' },
    { value: 'hardware', label: 'Hardware & Equipment' },
    { value: 'consulting', label: 'Consulting & Advisory' },
    { value: 'design', label: 'Design & Creative' },
    { value: 'development', label: 'Development & Programming' },
    { value: 'marketing', label: 'Marketing & Advertising' },
    { value: 'maintenance', label: 'Maintenance & Support' },
    { value: 'training', label: 'Training & Education' },
    { value: 'hosting', label: 'Hosting & Infrastructure' },
    { value: 'products', label: 'Physical Products' },
    { value: 'licenses', label: 'Licenses & Subscriptions' },
    { value: 'supplies', label: 'Office Supplies' },
    { value: 'other', label: 'Other' },
];

export function getCategoryLabel(value: string): string {
    const category = ITEM_CATEGORIES.find(c => c.value === value);
    return category ? category.label : value;
}
