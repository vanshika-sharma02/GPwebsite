-- Fix RLS Policy for enrollments table
-- Run this in your Supabase SQL Editor

-- First, drop any existing policies
DROP POLICY IF EXISTS "Allow anonymous inserts" ON public.enrollments;
DROP POLICY IF EXISTS "Allow anon insert" ON public.enrollments;
DROP POLICY IF EXISTS "Allow anonymous inserts" ON public.enrollments;

-- Create a new, simple policy for anonymous inserts
CREATE POLICY "Enable insert for anonymous users" 
ON public.enrollments 
FOR INSERT 
TO anon 
WITH CHECK (true);

-- Grant explicit permissions
GRANT INSERT ON public.enrollments TO anon;
GRANT SELECT ON public.enrollments TO authenticated;

-- Verify the policy was created
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'enrollments';
