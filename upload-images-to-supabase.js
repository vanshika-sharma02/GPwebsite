#!/usr/bin/env node

/**
 * Upload Images to Supabase Storage
 * 
 * This script uploads images from the public/Media folder to Supabase storage bucket
 * 
 * Usage:
 *   node upload-images-to-supabase.js
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabaseUrl = 'https://vczctsjopkmmumlbmuzy.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZjemN0c2pvcGttbXVtbGJtdXp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk5MDg0MjYsImV4cCI6MjA3NTQ4NDQyNn0.6SQ3Lugm1i2Uuhy8wvyAFwpz3Ujg0_Ygw0q7cZugVf8';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const BUCKET_NAME = 'website';
const MEDIA_DIR = path.join(__dirname, 'public', 'Media');

// Get MIME type based on file extension
function getMimeType(filename) {
  const ext = path.extname(filename).toLowerCase();
  const mimeTypes = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.webp': 'image/webp',
  };
  return mimeTypes[ext] || 'application/octet-stream';
}

// Check if bucket exists, create if not
async function ensureBucket() {
  console.log(`🔍 Checking if bucket "${BUCKET_NAME}" exists...`);
  
  const { data: buckets, error } = await supabase.storage.listBuckets();
  
  if (error) {
    console.error('❌ Error listing buckets:', error);
    return false;
  }

  const bucketExists = buckets.some(bucket => bucket.name === BUCKET_NAME);
  
  if (bucketExists) {
    console.log(`✅ Bucket "${BUCKET_NAME}" exists!`);
    return true;
  }

  console.log(`📦 Creating bucket "${BUCKET_NAME}"...`);
  const { data, error: createError } = await supabase.storage.createBucket(BUCKET_NAME, {
    public: true,
    fileSizeLimit: 52428800, // 50MB
  });

  if (createError) {
    console.error('❌ Error creating bucket:', createError);
    return false;
  }

  console.log(`✅ Bucket "${BUCKET_NAME}" created successfully!`);
  return true;
}

// Upload a single file
async function uploadFile(filePath, fileName) {
  try {
    const fileBuffer = fs.readFileSync(filePath);
    const mimeType = getMimeType(fileName);

    console.log(`📤 Uploading ${fileName}...`);

    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(fileName, fileBuffer, {
        contentType: mimeType,
        upsert: true, // Overwrite if exists
      });

    if (error) {
      console.error(`❌ Error uploading ${fileName}:`, error);
      return null;
    }

    // Get public URL
    const { data: publicURL } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(fileName);

    console.log(`✅ Uploaded: ${fileName}`);
    console.log(`   URL: ${publicURL.publicUrl}`);

    return publicURL.publicUrl;
  } catch (err) {
    console.error(`❌ Unexpected error uploading ${fileName}:`, err);
    return null;
  }
}

// Main upload function
async function uploadAllImages() {
  console.log('🚀 Starting image upload to Supabase...\n');

  // Check if Media directory exists
  if (!fs.existsSync(MEDIA_DIR)) {
    console.error(`❌ Media directory not found: ${MEDIA_DIR}`);
    return;
  }

  // Ensure bucket exists
  const bucketReady = await ensureBucket();
  if (!bucketReady) {
    console.error('❌ Cannot proceed - bucket not available');
    return;
  }

  // Get all files in Media directory
  const files = fs.readdirSync(MEDIA_DIR);
  const imageFiles = files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp'].includes(ext);
  });

  if (imageFiles.length === 0) {
    console.log('⚠️  No image files found in Media directory');
    return;
  }

  console.log(`\n📁 Found ${imageFiles.length} image(s) to upload:\n`);

  const results = {};

  for (const file of imageFiles) {
    const filePath = path.join(MEDIA_DIR, file);
    const url = await uploadFile(filePath, file);
    if (url) {
      results[file] = url;
    }
  }

  // Output summary
  console.log('\n' + '='.repeat(80));
  console.log('📊 UPLOAD SUMMARY');
  console.log('='.repeat(80));
  console.log(`\n✅ Successfully uploaded ${Object.keys(results).length} / ${imageFiles.length} images\n`);

  if (Object.keys(results).length > 0) {
    console.log('🔗 Public URLs:');
    console.log('─'.repeat(80));
    Object.entries(results).forEach(([filename, url]) => {
      console.log(`${filename}:`);
      console.log(`  ${url}\n`);
    });

    // Generate content_option.js update
    console.log('─'.repeat(80));
    console.log('📝 Update your content_option.js with these URLs:\n');
    console.log('const introdata = {');
    console.log('  ...,');
    if (results['COTS POSTER IMAGE.jpeg']) {
      console.log(`  your_img_url: "${results['COTS POSTER IMAGE.jpeg']}",`);
    }
    console.log('};');
    
    console.log('\nconst dataabout = {');
    console.log('  ...,');
    if (results['Headshot.jpeg']) {
      console.log(`  headshot: "${results['Headshot.jpeg']}",`);
    }
    console.log('};');

    console.log('\nconst workshopIntro = {');
    console.log('  ...,');
    if (results['writing.png']) {
      console.log(`  backgroundImage: "${results['writing.png']}",`);
    }
    console.log('};');
  }

  console.log('\n' + '='.repeat(80));
  console.log('✨ Upload complete!');
  console.log('='.repeat(80));
  console.log('\n💡 Next steps:');
  console.log('1. Update your code to use the Supabase URLs');
  console.log('2. These images are now served from Supabase CDN');
  console.log('3. You can manage them in Supabase Dashboard → Storage\n');
}

// Run the upload
uploadAllImages().catch(err => {
  console.error('❌ Fatal error:', err);
  process.exit(1);
});
