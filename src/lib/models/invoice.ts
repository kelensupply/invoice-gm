import type { CompanyInfo } from './company';
import type { Client } from './client';

export type InvoiceStatus = 'draft' | 'sent' | 'viewed' | 'paid' | 'overdue';

export interface InvoiceItem {
    id: string;
    name: string;
    description: string;
    rate: number;
    quantity: number;
    unit?: string;
    taxRate?: number; // Per-item tax percentage override
}

export interface Invoice {
    id: string;
    invoiceNumber: string; // e.g., "INV-00001"
    poNumber?: string;
    dateIssued: Date;
    dateDue: Date;
    status: InvoiceStatus;
    sender: CompanyInfo; // frozen state of sender at time of creation
    client: Client; // frozen state of client at time of creation
    items: InvoiceItem[];
    taxRate: number; // Global tax rate percentage
    discount: number; // Global discount amount (flat)
    shipping: number; // Shipping cost
    currency: string; // e.g., "USD"
    notes: string;
    terms: string;
    sentAt?: Date;
    viewedAt?: Date;
    paidAt?: Date;
}
