-- Temporarily disable RLS to get enrollments working
-- Run this in your Supabase SQL Editor

-- Disable RLS on enrollments table
ALTER TABLE public.enrollments DISABLE ROW LEVEL SECURITY;

-- Grant all permissions to anonymous users
GRANT ALL ON public.enrollments TO anon;
GRANT ALL ON public.enrollments TO authenticated;

-- Verify RLS is disabled
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'enrollments';
