# Supabase Form Submission Troubleshooting Guide

## 🔍 Quick Diagnosis

The form submission error usually occurs due to one of these issues:

### 1. **Row Level Security (RLS) Policies** ⭐ MOST COMMON
Your `enrollments` table likely has RLS enabled but no policy allowing anonymous inserts.

**Fix:**
1. Go to Supabase Dashboard: https://vczctsjopkmmumlbmuzy.supabase.co
2. Click on **Table Editor** → Select `enrollments` table
3. Click on the table name → **Policies** tab
4. Click **New Policy**
5. Choose **"Enable insert access for anon users"** template
6. Or create custom policy:
   ```sql
   CREATE POLICY "Allow anonymous inserts"
   ON public.enrollments
   FOR INSERT
   TO anon
   WITH CHECK (true);
   ```

### 2. **Table Schema Mismatch**
The table columns might not match what the form is sending.

**Required columns:**
- `id` - bigint, primary key, auto-increment
- `name` - text or varchar, NOT NULL
- `email` - text or varchar, NOT NULL
- `phone` - text or varchar, NOT NULL
- `message` - text or varchar, NULLABLE
- `workshop_title` - text or varchar, NOT NULL
- `created_at` - timestamp with time zone, DEFAULT now()

**Verify Schema:**
```sql
-- Run this in Supabase SQL Editor
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'enrollments'
ORDER BY ordinal_position;
```

### 3. **Missing Table**
If the `enrollments` table doesn't exist:

```sql
-- Create the table
CREATE TABLE public.enrollments (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT,
  workshop_title TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts
CREATE POLICY "Allow anonymous inserts"
ON public.enrollments
FOR INSERT
TO anon
WITH CHECK (true);

-- Allow authenticated users to read
CREATE POLICY "Allow authenticated reads"
ON public.enrollments
FOR SELECT
TO authenticated
USING (true);
```

---

## 🧪 Testing the Connection

### Method 1: Browser Console Test
1. Open your website: http://localhost:3000
2. Open browser DevTools (F12)
3. Go to **Console** tab
4. Paste this code:

```javascript
// Test Supabase connection
import { supabase } from './src/supabaseClient.js';

// Test 1: Read test
supabase.from('enrollments').select('*').limit(1)
  .then(({data, error}) => {
    if (error) console.error('❌ Read error:', error);
    else console.log('✅ Read success:', data);
  });

// Test 2: Insert test
const testData = {
  name: 'Test User',
  email: 'test@example.com',
  phone: '+11234567890',
  message: 'Test message',
  workshop_title: 'Test Workshop'
};

supabase.from('enrollments').insert([testData]).select()
  .then(({data, error}) => {
    if (error) {
      console.error('❌ Insert error:', error);
      console.error('Details:', error.message);
    } else {
      console.log('✅ Insert success:', data);
    }
  });
```

### Method 2: Check Browser Network Tab
1. Open DevTools → **Network** tab
2. Try submitting the form
3. Look for request to `supabase.co`
4. Check the response:
   - **200 OK** = Success
   - **400 Bad Request** = Data validation error
   - **401 Unauthorized** = RLS policy issue
   - **403 Forbidden** = Permission issue

---

## 🔧 Common Error Messages & Fixes

### Error: "new row violates row-level security policy"
**Cause:** RLS is enabled but no policy allows inserts  
**Fix:** Add INSERT policy for `anon` role (see above)

### Error: "null value in column violates not-null constraint"
**Cause:** Required field is empty  
**Fix:** Ensure all required fields have values, or make column NULLABLE

### Error: "column does not exist"
**Cause:** Table schema doesn't match the data being sent  
**Fix:** 
1. Check actual table columns in Supabase
2. Update form code to match column names exactly

### Error: "permission denied for table enrollments"
**Cause:** Table permissions not set for `anon` role  
**Fix:** Check RLS policies and grant INSERT permission

---

## 📊 Current Form Data Structure

The form currently sends:
```javascript
{
  name: "User Name",
  email: "user@example.com", 
  phone: "+11234567890",      // Country code + number (no spaces)
  message: "User message",     // Can be null
  workshop_title: "Workshop Name"
}
```

---

## 🚀 Quick Fix Checklist

- [ ] Go to Supabase Dashboard
- [ ] Navigate to Table Editor → `enrollments`
- [ ] Verify table exists
- [ ] Check all required columns exist
- [ ] Go to Policies tab
- [ ] Create policy: "Allow anonymous inserts"
- [ ] Test form submission
- [ ] Check browser console for detailed errors
- [ ] If still failing, check Network tab for API response

---

## 📸 Image Upload to Supabase

To upload images from `public/Media` to Supabase storage:

1. Make sure you have a storage bucket called `website`
2. Run the upload script:
   ```bash
   node upload-images-to-supabase.js
   ```

This will:
- Create the bucket if it doesn't exist
- Upload all images from `public/Media`
- Provide public URLs for each image
- Show you how to update your code

---

## 🆘 Still Not Working?

1. **Export your current table schema:**
   ```sql
   SELECT * FROM information_schema.columns 
   WHERE table_name = 'enrollments';
   ```

2. **Check RLS status:**
   ```sql
   SELECT tablename, rowsecurity 
   FROM pg_tables 
   WHERE tablename = 'enrollments';
   ```

3. **List all policies:**
   ```sql
   SELECT * FROM pg_policies 
   WHERE tablename = 'enrollments';
   ```

4. **Contact Support:**
   - Share the SQL query results above
   - Share the exact error from browser console
   - Include Network tab response

---

## 💡 Best Practices

1. **Always check browser console** for detailed error messages
2. **Test with Supabase Dashboard** first before coding
3. **Use `.select()` after `.insert()`** to get returned data
4. **Enable RLS** but create appropriate policies
5. **Keep sensitive operations server-side** (use Supabase Functions)

---

## 📚 Useful Links

- [Supabase Dashboard](https://vczctsjopkmmumlbmuzy.supabase.co)
- [RLS Documentation](https://supabase.com/docs/guides/auth/row-level-security)
- [Storage Documentation](https://supabase.com/docs/guides/storage)
- [Policies Guide](https://supabase.com/docs/guides/database/postgres/row-level-security)
