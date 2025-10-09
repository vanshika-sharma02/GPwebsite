# Gitanjali Productions Website - Setup Guide

## 🎉 **SUPABASE IS NOW CONFIGURED!**

Your form data is automatically being saved to Supabase cloud database.

See **SUPABASE_SETUP.md** for complete setup instructions.

---

## 📋 Table of Contents
1. [Supabase Database Setup](#supabase-database-setup)
2. [Image Hosting Setup](#image-hosting-setup)
3. [Current Status](#current-status)

---

## 🗄️ Supabase Database Setup

### ✅ Current Implementation (PRIMARY)
- Form data is automatically saved to **Supabase cloud database**
- Permanent, secure, scalable storage
- Real-time data access from dashboard
- Also saves to **browser localStorage** as backup

### Setup Required:
1. Open `SUPABASE_SETUP.md` file
2. Copy the SQL command
3. Run it in your Supabase SQL Editor
4. Done! Your database is ready

**Project URL**: https://vczctsjopkmmumlbmuzy.supabase.co

---

## 📊 Alternative Form Data Storage Options

### Option 1: Google Sheets (Alternative - FREE)
**Best for: Easy setup, viewing data like a spreadsheet**

#### Setup Steps:
1. Go to https://script.google.com
2. Create a new project
3. Copy this code:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      new Date(),
      data.name,
      data.email,
      data.phone,
      data.message || '',
      data.workshopTitle
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'success'
    })).setMimeType(ContentService.MimeType.JSON);
  } catch(error) {
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Click "Deploy" > "New deployment"
5. Choose "Web app"
6. Set "Execute as" to "Me"
7. Set "Who has access" to "Anyone"
8. Click "Deploy" and copy the URL
9. In your website, update line 56 in `/src/pages/portfolio/index.js`:
   ```javascript
   const scriptURL = 'YOUR_COPIED_URL_HERE';
   ```

10. Create a Google Sheet with headers:
    - Timestamp | Name | Email | Phone | Message | Workshop

11. Link the script to your sheet:
    - In Apps Script, go to "Project Settings"
    - Copy the Script ID
    - In your Google Sheet: Extensions > Apps Script
    - Paste and connect

### Option 2: EmailJS (Also FREE)
**Best for: Getting instant email notifications**

#### Setup Steps:
1. Go to https://www.emailjs.com/
2. Sign up (free plan allows 200 emails/month)
3. Add an email service (Gmail, Outlook, etc.)
4. Create an email template with variables: `{{name}}`, `{{email}}`, `{{phone}}`, `{{message}}`
5. Install EmailJS in your project:
   ```bash
   npm install @emailjs/browser
   ```
6. Add to `/src/pages/portfolio/index.js`:
   ```javascript
   import emailjs from '@emailjs/browser';
   
   // In handleFormSubmit, add:
   emailjs.send(
     'YOUR_SERVICE_ID',
     'YOUR_TEMPLATE_ID',
     {
       name: formData.name,
       email: formData.email,
       phone: formData.phone,
       message: formData.message
     },
     'YOUR_PUBLIC_KEY'
   ).then(() => {
     console.log('Email sent successfully');
   });
   ```

### Option 3: Formspree (Easiest - FREE)
**Best for: Simplest setup, emails sent to you**

1. Go to https://formspree.io/
2. Create a free account
3. Get your form endpoint
4. Update form in `/src/pages/portfolio/index.js`:
   ```javascript
   const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify(formData)
   });
   ```

---

## 🖼️ Image Hosting Setup

### Current Files to Host:
- Aryan's headshot/profile photo
- Film stills (if any)
- Logo (if custom)
- Any other production photos

### Recommended: Cloudflare Images ($5/month)
**Best quality-to-price ratio**

#### Setup:
1. Sign up at https://www.cloudflare.com/
2. Go to "Images" in dashboard
3. Upload images (they auto-optimize)
4. Get public URLs
5. Use in your website:

```javascript
// In content_option.js, add:
const imageUrls = {
  aryanHeadshot: "https://imagedelivery.net/YOUR_ACCOUNT/aryan-headshot/public",
  logo: "https://imagedelivery.net/YOUR_ACCOUNT/logo/public"
};
```

### Alternative: Bunny CDN ($1/month)
**Most affordable**

#### Setup:
1. Sign up at https://bunny.net
2. Create a "Storage Zone"
3. Upload via web interface or FTP
4. Enable "Pull Zone" (CDN)
5. Use URLs like: `https://yourzone.b-cdn.net/image.jpg`

### Free Option: ImgBB
**For testing/small sites**

1. Go to https://imgbb.com/
2. Upload images (no signup needed for basic use)
3. Get direct links
4. Use in website

### Best Practice: Image Optimization
Before uploading anywhere:
1. Use https://squoosh.app to compress
2. Convert to WebP format (30% smaller)
3. Resize to max needed size (1920px width for full-screen)

---

## 🎯 Current Status

### ✅ Working Features:
- Form saves to localStorage automatically
- All enrollments viewable in browser console
- Payment link integration
- Smooth scroll to enrollment form
- FAQs and refund policy on workshop page
- All headings in black
- Cursor always visible

### 🔄 Needs Setup (Choose One):
- [ ] Google Sheets integration (recommended)
- [ ] EmailJS integration
- [ ] Formspree integration

### 📝 To Access Saved Data Now:
1. Open browser console (F12)
2. Type: `localStorage.getItem('workshopEnrollments')`
3. Copy and paste into a text editor
4. Format as needed

### 📊 Example Data Structure:
```json
[
  {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+91 98765 43210",
    "message": "Interested in screenwriting",
    "timestamp": "2025-10-08T10:30:00.000Z",
    "workshopTitle": "Screenwriting Intensive"
  }
]
```

---

## 🚀 Quick Start Commands

### View all enrollments:
```javascript
// In browser console:
console.table(JSON.parse(localStorage.getItem('workshopEnrollments')))
```

### Export enrollments to CSV:
```javascript
// In browser console:
const data = JSON.parse(localStorage.getItem('workshopEnrollments'));
const csv = data.map(row => 
  `${row.timestamp},${row.name},${row.email},${row.phone},"${row.message}"`
).join('\n');
console.log('Timestamp,Name,Email,Phone,Message\n' + csv);
```

### Clear test data:
```javascript
localStorage.removeItem('workshopEnrollments')
```

---

## 📞 Support

For questions about setup:
- Email: aryanb1304@gmail.com
- WhatsApp: +16464004636

---

## 🎬 Next Steps

1. **Choose a data storage method** (Google Sheets recommended)
2. **Set up image hosting** (Cloudflare Images recommended)
3. **Test the enrollment flow**
4. **Monitor submissions** via your chosen method
5. **Deploy to production**

The website is fully functional with localStorage backup. Choose your preferred storage method above based on your needs!
