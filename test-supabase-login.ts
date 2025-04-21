// test-supabase-login.ts
// Script Node.js pour tester le login Supabase en ligne de commande
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hkcpvwbfeybfbdwyjkgd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhrY3B2d2JmZXliZmJkd3lqa2dkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUwOTY4MDIsImV4cCI6MjA2MDY3MjgwMn0.sXGyE9E8gbQ2x_ztfxbhLe51we-IbgRyaQJ1YJPJ79c';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testLogin(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    console.error('Erreur de connexion:', error.message);
    process.exit(1);
  }
  if (data?.user) {
    console.log('Connexion réussie! Utilisateur:', data.user);
    process.exit(0);
  } else {
    console.error('Aucun utilisateur retourné. Data:', data);
    process.exit(2);
  }
}

// Utilisation: node test-supabase-login.js email@example.com motdepasse
const [,, email, password] = process.argv;
if (!email || !password) {
  console.error('Usage: node test-supabase-login.js <email> <password>');
  process.exit(1);
}

testLogin(email, password);
