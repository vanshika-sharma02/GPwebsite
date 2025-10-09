/**
 * Supabase Debug Script
 * Run this in your browser console or as a Node script to test Supabase connection
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vczctsjopkmmumlbmuzy.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZjemN0c2pvcGttbXVtbGJtdXp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk5MDg0MjYsImV4cCI6MjA3NTQ4NDQyNn0.6SQ3Lugm1i2Uuhy8wvyAFwpz3Ujg0_Ygw0q7cZugVf8';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Test 1: Check connection
async function testConnection() {
  console.log('🔍 Test 1: Testing Supabase connection...');
  try {
    const { data, error } = await supabase.from('enrollments').select('*').limit(1);
    if (error) {
      console.error('❌ Connection test failed:', error);
      return false;
    }
    console.log('✅ Connection successful!');
    console.log('Sample data:', data);
    return true;
  } catch (err) {
    console.error('❌ Unexpected error:', err);
    return false;
  }
}

// Test 2: Check table schema
async function checkTableSchema() {
  console.log('\n🔍 Test 2: Checking table schema...');
  try {
    const { data, error } = await supabase.from('enrollments').select('*').limit(0);
    if (error) {
      console.error('❌ Schema check failed:', error);
      return false;
    }
    console.log('✅ Table exists!');
    return true;
  } catch (err) {
    console.error('❌ Unexpected error:', err);
    return false;
  }
}

// Test 3: Try inserting test data
async function testInsert() {
  console.log('\n🔍 Test 3: Testing insert operation...');
  const testData = {
    name: 'Test User',
    email: 'test@example.com',
    phone: '+11234567890',
    message: 'This is a test',
    workshop_title: 'Test Workshop',
  };

  try {
    const { data, error } = await supabase
      .from('enrollments')
      .insert([testData])
      .select();

    if (error) {
      console.error('❌ Insert failed:', error);
      console.error('Error details:');
      console.error('  Code:', error.code);
      console.error('  Message:', error.message);
      console.error('  Details:', error.details);
      console.error('  Hint:', error.hint);
      return false;
    }

    console.log('✅ Insert successful!');
    console.log('Inserted data:', data);
    
    // Clean up test data
    if (data && data[0] && data[0].id) {
      await supabase.from('enrollments').delete().eq('id', data[0].id);
      console.log('🧹 Test data cleaned up');
    }
    
    return true;
  } catch (err) {
    console.error('❌ Unexpected error:', err);
    return false;
  }
}

// Test 4: Check RLS policies
async function checkRLS() {
  console.log('\n🔍 Test 4: Checking Row Level Security...');
  console.log('⚠️  If insert fails, you may need to check RLS policies in Supabase dashboard');
  console.log('📝 Required policy: Allow anonymous inserts on enrollments table');
}

// Run all tests
async function runAllTests() {
  console.log('🚀 Starting Supabase diagnostic tests...\n');
  
  const connected = await testConnection();
  if (!connected) {
    console.log('\n❌ Cannot proceed - connection failed');
    return;
  }

  await checkTableSchema();
  await testInsert();
  await checkRLS();

  console.log('\n' + '='.repeat(60));
  console.log('📊 DIAGNOSTIC COMPLETE');
  console.log('='.repeat(60));
  console.log('\nIf all tests passed, the issue might be:');
  console.log('1. Row Level Security (RLS) policies');
  console.log('2. Missing table columns');
  console.log('3. Column data type mismatches');
  console.log('\nTo fix:');
  console.log('1. Go to Supabase Dashboard → Authentication → Policies');
  console.log('2. Ensure "anon" role can INSERT into enrollments table');
  console.log('3. Check table structure matches:');
  console.log('   - name (text)');
  console.log('   - email (text)');
  console.log('   - phone (text)');
  console.log('   - message (text, nullable)');
  console.log('   - workshop_title (text)');
  console.log('   - created_at (timestamp with time zone, default: now())');
}

// Export for use
export { testConnection, checkTableSchema, testInsert, checkRLS, runAllTests };

// If running in browser console
if (typeof window !== 'undefined') {
  window.supabaseDebug = { testConnection, checkTableSchema, testInsert, checkRLS, runAllTests };
  console.log('💡 Supabase debug tools loaded!');
  console.log('Run: supabaseDebug.runAllTests()');
}
