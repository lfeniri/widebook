import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hkcpvwbfeybfbdwyjkgd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhrY3B2d2JmZXliZmJkd3lqa2dkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUwOTY4MDIsImV4cCI6MjA2MDY3MjgwMn0.sXGyE9E8gbQ2x_ztfxbhLe51we-IbgRyaQJ1YJPJ79c';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
