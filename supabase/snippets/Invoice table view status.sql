-- Add timestamp tracking columns for the invoice state machine
ALTER TABLE invoices
ADD COLUMN sent_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN viewed_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN paid_at TIMESTAMP WITH TIME ZONE;
