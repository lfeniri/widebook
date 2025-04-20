import { supabase } from './supabaseClient';

/**
 * Effectue un fetch en injectant automatiquement le token Supabase si l'utilisateur est connecté.
 * @param input URL ou Request
 * @param init options fetch
 */
export async function fetchWithAuth(input: RequestInfo | URL, init: RequestInit = {}) {
  const { data: { session } } = await supabase.auth.getSession();
  const accessToken = session?.access_token;
  const headers = new Headers(init.headers || {});
  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }
  return fetch(input, { ...init, headers });
}
