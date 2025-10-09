# 📸 Upload Media to Supabase - Quick Guide

## ⚠️ Important: Manual Setup Required First

The automatic upload script requires you to manually create the storage bucket first due to security policies.

---

## 🚀 Step-by-Step Instructions

### Step 1: Create Storage Bucket in Supabase Dashboard

1. Go to: https://vczctsjopkmmumlbmuzy.supabase.co
2. Click **Storage** in the left sidebar
3. Click **"New bucket"** button
4. Enter these details:
   - **Bucket name**: `website`
   - **Public bucket**: Toggle **ON** ✓
5. Click **"Create bucket"**

### Step 2: Set Storage Policies

1. In Storage, click on the `website` bucket you just created
2. Click **"Policies"** tab
3. Click **"New Policy"**
4. Select **"Allow public read access"**
   - This lets anyone view your images (needed for website)
5. Click **"Review"** then **"Save policy"**

6. Click **"New Policy"** again
7. Select **"Allow public write access"** (or create custom policy)
   - Policy name: `Allow anonymous uploads`
   - Target roles: `anon`
   - Policy command: `INSERT`
   - Policy definition: `true`
8. Click **"Review"** then **"Save policy"**

### Step 3: Run Upload Script

Once the bucket is created with proper policies:

```bash
cd /Users/vanshikasharma/Desktop/react-portfolio
node upload-images-to-supabase.js
```

The script will:
- ✅ Upload all images from `public/Media/` folder
- ✅ Generate public URLs for each image
- ✅ Show you exactly how to update your code with the new URLs

---

## 📁 Images That Will Be Uploaded

- `1.png` - Enrollment section background
- `2.png` - Contact page background
- `afar.png` - Accolades section background
- `COTS POSTER IMAGE.jpeg` - Hero section background
- `Headshot.jpeg` - About page profile image
- `immortal.png` - Process section background
- `writing.png` - Workshop hero background

---

## 🔄 Alternative: Manual Upload

If you prefer, you can also upload images manually:

1. Go to Supabase Dashboard → Storage → `website` bucket
2. Click **"Upload files"**
3. Select all images from `public/Media/` folder
4. After upload, click each image to get its public URL
5. Update your code to use these URLs

---

## 📝 After Upload: Update Your Code

Once images are uploaded, you'll need to replace local paths with Supabase URLs in:

### Files to Update:
- `src/pages/home/index.js` - Hero and process backgrounds
- `src/pages/about/index.js` - Headshot and accolades background
- `src/pages/portfolio/index.js` - Workshop hero and enrollment backgrounds
- `src/pages/contact/index.js` - Contact page background

### Example:
Change from:
```javascript
backgroundImage: `url(${process.env.PUBLIC_URL}/Media/writing.png)`
```

To:
```javascript
backgroundImage: `url(https://vczctsjopkmmumlbmuzy.supabase.co/storage/v1/object/public/website/writing.png)`
```

---

## ✅ Benefits of Using Supabase Storage

- 🚀 **Faster**: CDN-powered delivery
- 💰 **Free tier**: 1GB storage included
- 🔒 **Secure**: Row-level security
- 📊 **Scalable**: Automatic optimization
- 🌍 **Global**: Edge network distribution

---

## 🆘 Need Help?

If you encounter any issues:
1. Check `FIX_SUPABASE_NOW.md` for troubleshooting
2. Verify bucket policies are set correctly
3. Ensure bucket is set to "Public"
4. Check console for specific error messages

---

**Ready?** Follow Step 1 above to create your bucket! 🎉

