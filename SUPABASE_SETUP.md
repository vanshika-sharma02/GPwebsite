# Supabase Setup Guide

## 🗄️ Database Setup Instructions

Your Supabase connection is already configured in the website. Follow these steps to set up the database table:

---

## Step 1: Access Supabase Dashboard

1. Go to: https://vczctsjopkmmumlbmuzy.supabase.co
2. Log in to your Supabase account
3. Navigate to **SQL Editor** (in the left sidebar)

---

## Step 2: Verify Table Exists

Your Supabase database already has a table called `enrollments`. 

If you need to create it manually, copy and paste this SQL command into the SQL Editor and click **RUN**:

```sql
-- Create enrollments table (if it doesn't exist)
CREATE TABLE IF NOT EXISTS enrollments (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT,
  workshop_title TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  payment_completed BOOLEAN DEFAULT FALSE,
  payment_id TEXT
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_enrollments_email ON enrollments(email);
CREATE INDEX IF NOT EXISTS idx_enrollments_created_at ON enrollments(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert (for form submissions)
CREATE POLICY "Anyone can insert enrollments"
  ON enrollments
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policy to allow authenticated users to read all data
CREATE POLICY "Authenticated users can view all enrollments"
  ON enrollments
  FOR SELECT
  TO authenticated
  USING (true);
```

---

## Step 3: Verify Table Creation

1. Go to **Table Editor** in the left sidebar
2. You should see `enrollments` table
3. Click on it to view the structure

**Expected columns:**
- `id` - Auto-incrementing ID
- `name` - Student's full name
- `email` - Student's email address
- `phone` - Phone number with country code
- `message` - Student's background info
- `workshop_title` - Name of the workshop
- `created_at` - Timestamp of enrollment
- `payment_completed` - Boolean (for future use)
- `payment_id` - Razorpay payment ID (for future use)

---

## Step 4: Test the Form

1. Go to your website: http://localhost:3000
2. Navigate to the Workshop page
3. Fill out the enrollment form
4. Submit it
5. Check Supabase Table Editor - you should see the new entry!

---

## 📊 Viewing Enrollments

### In Supabase Dashboard:
1. Go to **Table Editor**
2. Click on `enrollments`
3. View all submissions in a table format
4. Export to CSV if needed

### Using SQL:
Go to SQL Editor and run:

```sql
-- View all enrollments
SELECT * FROM enrollments 
ORDER BY created_at DESC;

-- View enrollments from last 7 days
SELECT * FROM enrollments 
WHERE created_at >= NOW() - INTERVAL '7 days'
ORDER BY created_at DESC;

-- Count total enrollments
SELECT COUNT(*) as total_enrollments 
FROM enrollments;

-- View by workshop
SELECT workshop_title, COUNT(*) as count 
FROM enrollments 
GROUP BY workshop_title;
```

---

## 🔒 Security Notes

### Current Setup:
- ✅ Anyone can submit enrollments (needed for public form)
- ✅ Only authenticated users can view data
- ✅ Row Level Security (RLS) enabled
- ✅ Anon key is safe to expose in frontend

### To Access Data:
You need to be logged into Supabase dashboard with your account to view submissions.

---

## 🔗 Integration Status

### ✅ Already Configured:
- Supabase client initialized
- Connection configured
- Form submission saves to Supabase
- Also saves to localStorage as backup

### 📋 Data Flow:
1. User fills form on website
2. Clicks "Proceed to Payment"
3. **Data saved to Supabase database** ✓
4. **Data saved to localStorage** (backup) ✓
5. User redirected to Razorpay
6. You receive payment notification
7. Match payment with Supabase enrollment data

---

## 📧 Optional: Email Notifications

If you want to receive email notifications for each enrollment, add this function in Supabase:

### Step 1: Go to Database → Functions
### Step 2: Create new function:

```sql
CREATE OR REPLACE FUNCTION notify_new_enrollment()
RETURNS TRIGGER AS $$
BEGIN
  -- This will trigger an email via Supabase Edge Function
  -- You'll need to set up an Edge Function for this
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_enrollment_created
  AFTER INSERT ON enrollments
  FOR EACH ROW
  EXECUTE FUNCTION notify_new_enrollment();
```

---

## 🎯 What's Working Now

✅ Form submissions save to Supabase
✅ Phone numbers with country codes
✅ All countries dropdown (180+ countries)
✅ Data persists permanently in cloud database
✅ Easy to view and export data
✅ Secure and scalable

---

## 📞 Support

**Supabase Project URL**: https://vczctsjopkmmumlbmuzy.supabase.co
**Documentation**: https://supabase.com/docs

If you encounter any issues:
1. Check the browser console for errors
2. Verify the table was created correctly
3. Check RLS policies are enabled

---

## 🚀 Next Steps

1. ✅ Run the SQL command above to create the table
2. ✅ Test the form submission
3. ✅ Verify data appears in Supabase
4. 🎯 You're all set!

Your enrollment data will now be stored securely in Supabase and you can access it anytime from the dashboard!
