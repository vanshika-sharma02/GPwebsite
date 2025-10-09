# 🚨 URGENT: Fix Supabase Form Submission


## The Problem
**Row Level Security (RLS) is blocking your form submissions**

Both your form and storage uploads are being blocked by Supabase's security policies.

---

## ✅ STEP-BY-STEP FIX (5 minutes)

### Step 1: Go to Supabase Dashboard
Open: https://vczctsjopkmmumlbmuzy.supabase.co


### Step 2: Fix Enrollments Table Policies

1. Click **Table Editor** in left sidebar
2. Click on `enrollments` table
3. Click the **Policies** button (looks like a shield icon)
4. You should see "Row Level Security is enabled" but probably no policies

5. Click **"New Policy"** button
6. Click **"Get started quickly"**
7. Select: **"Enable insert access for users based on user_id"**
8. **IMPORTANT:** Change it to this:

   - Policy name: `Allow anonymous inserts`
   - Target roles: `anon`
   - Policy command: `INSERT`
   - Policy definition: `true` (just the word true, no quotes)

9. Click **"Review"** then **"Save policy"**

### Step 3: Create Storage Bucket

1. Click **Storage** in left sidebar
2. Click **"New bucket"** button
3. Bucket name: `website`
4. Make it **Public**: Toggle ON
5. Click **"Create bucket"**

### Step 4: Fix Storage Policies

1. In Storage, click on the `website` bucket
2. Click **"Policies"** tab
3. Click **"New Policy"**
4. Select **"Allow public read access"**
5. Click **"Review"** then **"Save policy"**

6. Click **"New Policy"** again
7. Select **"Allow public uploads"** 
8. Click **"Review"** then **"Save policy"**

---

## 🧪 Test It Now

1. Go back to your website: http://localhost:3000/portfolio
2. Fill out the form
3. Submit
4. Check browser console (F12 → Console tab) for detailed errors
5. If you see "✅ Enrollment saved to Supabase:" = SUCCESS!

---

## 📸 Upload Images After Fixing

Once the policies are fixed, run:

```bash
node upload-images-to-supabase.js
```

This will upload:
- `COTS POSTER IMAGE.jpeg` → Hero background
- `Headshot.jpeg` → Aryan's photo
- `writing.png` → Workshop background

---

## 🆘 Alternative: Create Table with Correct Policies

If the `enrollments` table has issues, **delete it and recreate**:

1. Go to **SQL Editor** in Supabase
2. Paste this SQL:

```sql
-- Drop existing table (BE CAREFUL - this deletes all data!)
DROP TABLE IF EXISTS public.enrollments CASCADE;

-- Create fresh table
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

-- Allow anonymous inserts (for form submissions)
CREATE POLICY "Allow anonymous inserts"
ON public.enrollments
FOR INSERT
TO anon
WITH CHECK (true);

-- Allow authenticated users to read (for you to view data)
CREATE POLICY "Allow authenticated reads"
ON public.enrollments
FOR SELECT
TO authenticated
USING (true);

-- Create indexes for better performance
CREATE INDEX idx_enrollments_email ON public.enrollments(email);
CREATE INDEX idx_enrollments_created_at ON public.enrollments(created_at DESC);
```

3. Click **"Run"**
4. You should see "Success. No rows returned"

---

## 📋 Quick Checklist

- [ ] Fixed enrollments table RLS policy
- [ ] Created `website` storage bucket  
- [ ] Added storage read policy
- [ ] Added storage upload policy
- [ ] Tested form submission
- [ ] Uploaded images to Supabase
- [ ] Updated image URLs in code

---

## 🔍 How to Check if It Worked

### Test 1: Form Submission
1. Fill form on /portfolio page
2. Click Submit
3. Open Console (F12)
4. Look for green checkmark: ✅
5. Check Supabase Dashboard → Table Editor → enrollments
6. Your test entry should be there!

### Test 2: Storage
1. Go to Supabase → Storage → website bucket
2. You should see your images
3. Click an image → Copy public URL
4. Paste URL in new tab
5. Image should load!

---

## 💡 Why This Happened

Supabase enables RLS by default for security, but:
- **No policies = No access** (even for anon users)
- Form submissions need **INSERT permission**
- Storage needs **READ and UPLOAD permissions**

This is GOOD security - just needs proper setup!

---

## 📞 Still Having Issues?

1. **Check browser console** - it now shows detailed errors
2. **Check Network tab** - see exact API response
3. **Run SQL query:**
   ```sql
   SELECT * FROM pg_policies WHERE tablename = 'enrollments';
   ```
4. Screenshot the results and check if policies exist

---

## ✨ Once Fixed

Your form will:
- ✅ Save to Supabase database
- ✅ Save to localStorage (backup)
- ✅ Redirect to Razorpay payment
- ✅ Show success message

Your images will:
- ✅ Be hosted on Supabase CDN
- ✅ Load faster (CDN distribution)
- ✅ Be publicly accessible
- ✅ Have permanent URLs
