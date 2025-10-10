# 🔧 Supabase Enrollment Form Fix

## Problem
The error "Could not find the table 'public.enrollments' in the schema cache" occurs because the `enrollments` table doesn't exist in your Supabase database yet.

## ✅ Solution (5 Minutes)

### Step 1: Access Supabase SQL Editor
1. Go to: https://supabase.com/dashboard/project/vczctsjopkmmumlbmuzy/sql
2. Log in to your Supabase account

### Step 2: Create the Table
1. Click **"New Query"** button
2. Copy the entire contents of `setup-supabase-table.sql` file
3. Paste it into the SQL editor
4. Click **"Run"** button

### Step 3: Verify Setup
After running the SQL:
- You should see a success message
- The table structure will be displayed at the bottom
- You should see 8 columns: id, full_name, email, phone, country_code, message, workshop_title, created_at

### Step 4: Test the Form
1. Refresh your website
2. Fill out the enrollment form
3. Submit it
4. You should see "Thank you! Your enrollment has been submitted successfully."

## 📊 View Submissions

To view form submissions:
1. Go to: https://supabase.com/dashboard/project/vczctsjopkmmumlbmuzy/editor
2. Click on **"enrollments"** table in the left sidebar
3. You'll see all enrollment submissions

## 🔐 What Was Set Up

### Table Structure
- **id**: Unique identifier (auto-generated)
- **full_name**: Student's full name
- **email**: Student's email address
- **phone**: Student's phone number
- **country_code**: Country code for phone
- **message**: Optional message from student
- **workshop_title**: Name of the workshop
- **created_at**: Timestamp of submission

### Security (RLS Policies)
- ✅ Anonymous users can INSERT (submit forms)
- ✅ Only authenticated users can SELECT (view submissions)
- ✅ Data is protected and secure

### Performance
- Indexes created on `created_at` and `email` for fast queries

## 🚨 If You Still See Errors

1. **Clear browser cache**: Hard refresh (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)
2. **Check Supabase URL**: Verify the URL in `src/supabaseClient.js` matches your project
3. **Check API Key**: Ensure the anon key in `src/supabaseClient.js` is correct
4. **Contact Support**: If issues persist, check Supabase logs in the dashboard

## 📝 Current Configuration

- **Supabase URL**: `https://vczctsjopkmmumlbmuzy.supabase.co`
- **Project**: vczctsjopkmmumlbmuzy
- **Table**: public.enrollments
- **RLS**: Enabled with appropriate policies

## ✨ What's Fixed

1. ✅ Error message now shows simple "Error submitting form" instead of technical details
2. ✅ SQL script provided to create the table with proper structure
3. ✅ RLS policies configured for security
4. ✅ Indexes added for performance
5. ✅ Backup to localStorage still works if Supabase fails

---

**Need Help?** Check the Supabase dashboard logs or contact support with your project ID: `vczctsjopkmmumlbmuzy`


