import { createClient } from '@supabase/supabase-js';

// Utiliser les variables d'environnement pour les informations de connexion Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Vérifier que les variables d'environnement sont définies
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Les variables d\'environnement Supabase ne sont pas définies correctement.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
