import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vczctsjopkmmumlbmuzy.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZjemN0c2pvcGttbXVtbGJtdXp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk5MDg0MjYsImV4cCI6MjA3NTQ4NDQyNn0.6SQ3Lugm1i2Uuhy8wvyAFwpz3Ujg0_Ygw0q7cZugVf8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
