"use client";

import { supabase } from '@/lib/supabaseClient';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import Head from 'next/head';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const router = useRouter();

  // Gestion de la connexion email/password
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
    } else if (data?.user || data?.session) {
      setSuccess('Connexion réussie, redirection...');
      setTimeout(() => router.replace('/client'), 800);
    } else {
      setError("Une erreur inconnue est survenue.");
    }
    setLoading(false);
  };

  // Gestion de la connexion OAuth
  const handleOAuth = async (provider: 'google' | 'facebook') => {
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: typeof window !== 'undefined' ? window.location.origin + '/admin/login' : undefined,
      },
    });
    if (error) setError(error.message);
    setLoading(false);
  };

  useEffect(() => {
    let ignore = false;
    let timeoutId: NodeJS.Timeout;

    async function handleOAuthCallback() {
      try {
        // 1. Si on a un hash OAuth, on le traite
        if (typeof window !== 'undefined' && window.location.hash.includes('access_token')) {
          // @ts-ignore: _saveSession est interne mais nécessaire ici
          await supabase.auth._saveSession(window.location.hash);
          window.location.replace(window.location.pathname); // recharge sans le hash
          return;
        }
        // 2. Sinon, on vérifie la session
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Erreur récupération session Supabase:', error);
        }
        console.log('Session Supabase:', session);
        if (!ignore) {
          if (session) {
            router.replace('/client');
          } else {
            setCheckingSession(false);
          }
        }
      } catch (e) {
        console.error('Erreur dans handleOAuthCallback:', e);
        setCheckingSession(false);
      }
    }

    handleOAuthCallback();
    // On écoute les changements d'auth
    const { data: listener } = supabase.auth.onAuthStateChange(() => handleOAuthCallback());
    // Timeout de secours pour ne pas rester bloqué
    timeoutId = setTimeout(() => {
      if (!ignore) setCheckingSession(false);
    }, 3000);
    return () => {
      ignore = true;
      clearTimeout(timeoutId);
      listener?.subscription.unsubscribe();
    };
  }, [router]);

  if (checkingSession) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <span>Chargement...</span>
      </main>
    );
  }

  return (
    <>
      {/* SEO: Titre de la page */}
      <Head>
        <title>Connexion Admin | Solumind</title>
        <meta name="description" content="Connexion à l'espace administrateur du blog Solumind." />
      </Head>
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f5f7fa] to-[#c3cfe2]">
        <div className="w-full max-w-md bg-white/90 rounded-2xl shadow-2xl p-8 flex flex-col gap-6 border border-slate-100">
          <div className="flex flex-col items-center gap-2">
            <Image 
              src="/logo.svg" 
              alt="Logo Solumind" 
              width={48} 
              height={48} 
              priority 
              style={{ height: "auto" }} 
            />
            <h1 className="text-2xl font-bold tracking-tight text-gray-800">Espace Admin</h1>
            <p className="text-gray-500 text-sm">Connecte-toi pour gérer le blog</p>
          </div>
          <form onSubmit={handleLogin} className="flex flex-col gap-4" autoComplete="on">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              required
              autoFocus
              disabled={loading}
              aria-label="Adresse email"
              autoComplete="email"
            />
            <Input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              required
              disabled={loading}
              aria-label="Mot de passe"
              autoComplete="current-password"
            />
            {error && <div className="text-red-500 text-sm text-center font-medium" role="alert">{error}</div>}
            {success && <div className="text-green-600 text-sm text-center font-medium" role="status">{success}</div>}
            <Button type="submit" className="w-full mt-2" disabled={loading}>
              {loading ? 'Connexion...' : 'Se connecter'}
            </Button>
          </form>
          <div className="flex items-center gap-2 my-2">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-xs text-slate-400 uppercase">ou</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>
          <div className="flex flex-col gap-2">
            <Button
              variant="outline"
              className="w-full flex items-center gap-2"
              onClick={() => handleOAuth('google')}
              disabled={loading}
              type="button"
            >
              <Image src="/google.svg" alt="Google" width={20} height={20} />
              Se connecter avec Google
            </Button>
            <Button
              variant="outline"
              className="w-full flex items-center gap-2"
              onClick={() => handleOAuth('facebook')}
              disabled={loading}
              type="button"
            >
              <Image src="/facebook.svg" alt="Facebook" width={20} height={20} />
              Se connecter avec Facebook
            </Button>
          </div>
          <div className="flex justify-between text-xs text-slate-500 mt-2">
            <a href="/admin/register" className="hover:underline text-primary font-medium">S'inscrire</a>
            <a href="/admin/forgot-password" className="hover:underline text-primary font-medium">Mot de passe oublié ?</a>
          </div>
        </div>
      </main>
    </>
  );
}
