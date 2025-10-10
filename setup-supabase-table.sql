-- Create enrollments table in Supabase
-- Run this SQL in your Supabase SQL Editor: https://supabase.com/dashboard/project/vczctsjopkmmumlbmuzy/sql

-- Create the enrollments table
CREATE TABLE IF NOT EXISTS public.enrollments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    country_code TEXT NOT NULL,
    message TEXT,
    workshop_title TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow INSERT for anonymous users
CREATE POLICY "Allow anonymous inserts" 
ON public.enrollments 
FOR INSERT 
TO anon 
WITH CHECK (true);

-- Create a policy to allow SELECT for authenticated users only (optional - for admin viewing)
CREATE POLICY "Allow authenticated users to view" 
ON public.enrollments 
FOR SELECT 
TO authenticated 
USING (true);

-- Grant necessary permissions
GRANT INSERT ON public.enrollments TO anon;
GRANT SELECT ON public.enrollments TO authenticated;

-- Create an index on created_at for faster queries
CREATE INDEX IF NOT EXISTS enrollments_created_at_idx ON public.enrollments(created_at DESC);

-- Create an index on email for faster lookups
CREATE INDEX IF NOT EXISTS enrollments_email_idx ON public.enrollments(email);

-- Verify the table was created
SELECT 
    table_name,
    column_name,
    data_type,
    is_nullable
FROM 
    information_schema.columns
WHERE 
    table_schema = 'public' 
    AND table_name = 'enrollments'
ORDER BY 
    ordinal_position;


