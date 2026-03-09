-- Drop existing objects if they exist to allow re-running
DROP TABLE IF EXISTS public.invoices CASCADE;
DROP TABLE IF EXISTS public.estimates CASCADE;
DROP TABLE IF EXISTS public.clients CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

-- Create profiles table (maps to company info for a user)
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    address TEXT,
    website TEXT,
    tax_id TEXT,
    logo TEXT, -- Store URL to logo in storage
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile." ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile." ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile." ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Create clients table
CREATE TABLE public.clients (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    company_name TEXT NOT NULL,
    contact_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for clients
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own clients." ON public.clients FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own clients." ON public.clients FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own clients." ON public.clients FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own clients." ON public.clients FOR DELETE USING (auth.uid() = user_id);

-- Create invoices table
-- Note: sender, client, and items are stored as JSONB to preserve historical snapshots at the time of invoice creation
CREATE TABLE public.invoices (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    invoice_number TEXT NOT NULL,
    po_number TEXT,
    date_issued TIMESTAMP WITH TIME ZONE NOT NULL,
    date_due TIMESTAMP WITH TIME ZONE NOT NULL,
    status TEXT NOT NULL,
    sender JSONB NOT NULL,
    client JSONB NOT NULL,
    items JSONB NOT NULL,
    tax_rate NUMERIC(5,2) DEFAULT 0 NOT NULL,
    discount NUMERIC DEFAULT 0 NOT NULL,
    shipping NUMERIC DEFAULT 0 NOT NULL,
    currency TEXT DEFAULT 'USD' NOT NULL,
    notes TEXT,
    terms TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for invoices
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own invoices." ON public.invoices FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own invoices." ON public.invoices FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own invoices." ON public.invoices FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own invoices." ON public.invoices FOR DELETE USING (auth.uid() = user_id);

-- Create estimates table
-- Note: sender, client, and items are stored as JSONB as well
CREATE TABLE public.estimates (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    estimate_number TEXT NOT NULL,
    reference_number TEXT,
    date_issued TIMESTAMP WITH TIME ZONE NOT NULL,
    date_valid_until TIMESTAMP WITH TIME ZONE NOT NULL,
    status TEXT NOT NULL,
    sender JSONB NOT NULL,
    client JSONB NOT NULL,
    items JSONB NOT NULL,
    tax_rate NUMERIC(5,2) DEFAULT 0 NOT NULL,
    discount NUMERIC DEFAULT 0 NOT NULL,
    shipping NUMERIC DEFAULT 0 NOT NULL,
    currency TEXT DEFAULT 'USD' NOT NULL,
    notes TEXT,
    terms TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for estimates
ALTER TABLE public.estimates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own estimates." ON public.estimates FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own estimates." ON public.estimates FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own estimates." ON public.estimates FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own estimates." ON public.estimates FOR DELETE USING (auth.uid() = user_id);

-- Set up storage bucket for logos if it doesn't exist
INSERT INTO storage.buckets (id, name, public) VALUES ('logos', 'logos', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for logos (public read, authenticated users can insert their own logos)
CREATE POLICY "Public access to logos" ON storage.objects FOR SELECT USING (bucket_id = 'logos');
CREATE POLICY "Authenticated users can upload logos" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'logos' AND auth.role() = 'authenticated');
CREATE POLICY "Users can update own logos" ON storage.objects FOR UPDATE USING (bucket_id = 'logos' AND auth.uid() = owner);
CREATE POLICY "Users can delete own logos" ON storage.objects FOR DELETE USING (bucket_id = 'logos' AND auth.uid() = owner);
