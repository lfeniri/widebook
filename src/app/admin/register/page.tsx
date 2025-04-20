"use client";

import { supabase } from '@/lib/supabaseClient';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminRegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess("");
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) setError(error.message);
    else setSuccess("Un email de confirmation a été envoyé. Merci de valider le lien dans votre boîte email.");
    setLoading(false);
  };

  const handleOAuth = async (provider: 'google' | 'facebook') => {
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithOAuth({ provider });
    if (error) setError(error.message);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-300">
      <form onSubmit={handleRegister} className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md flex flex-col gap-4">
        <h1 className="text-2xl font-bold mb-2 text-center">Créer un compte</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border rounded px-3 py-2 focus:outline-none focus:ring w-full"
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="border rounded px-3 py-2 focus:outline-none focus:ring w-full"
          required
        />
        {error && <div className="text-red-500 text-sm text-center">{error}</div>}
        {success && <div className="text-green-600 text-sm text-center">{success}</div>}
        <button
          type="submit"
          className="bg-primary text-white rounded px-4 py-2 font-semibold hover:bg-primary/90 transition-colors w-full"
          disabled={loading}
        >
          {loading ? 'Inscription...' : "S'inscrire"}
        </button>
        <div className="flex flex-col gap-2 mt-2">
          <button
            type="button"
            onClick={() => handleOAuth('google')}
            className="bg-white border border-gray-300 rounded px-4 py-2 font-semibold flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
            disabled={loading}
          >
            <img src="/google.svg" alt="Google" className="h-5 w-5" /> S'inscrire avec Google
          </button>
          <button
            type="button"
            onClick={() => handleOAuth('facebook')}
            className="bg-white border border-gray-300 rounded px-4 py-2 font-semibold flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
            disabled={loading}
          >
            <img src="/facebook.svg" alt="Facebook" className="h-5 w-5" /> S'inscrire avec Facebook
          </button>
        </div>
        <div className="text-center mt-2">
          <a href="/admin/login" className="text-primary hover:underline">Déjà inscrit ? Se connecter</a>
        </div>
      </form>
    </div>
  );
}
