"use client";

import { supabase } from '@/lib/supabaseClient';
import React, { useState } from 'react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
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
      <form onSubmit={handleLogin} className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md flex flex-col gap-4">
        <h1 className="text-2xl font-bold mb-2 text-center">Connexion Admin</h1>
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
        <button
          type="submit"
          className="bg-primary text-white rounded px-4 py-2 font-semibold hover:bg-primary/90 transition-colors w-full"
          disabled={loading}
        >
          {loading ? 'Connexion...' : 'Se connecter'}
        </button>
        <div className="flex flex-col gap-2 mt-2">
          <button
            type="button"
            onClick={() => handleOAuth('google')}
            className="bg-white border border-gray-300 rounded px-4 py-2 font-semibold flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
            disabled={loading}
          >
            <img src="/google.svg" alt="Google" className="h-5 w-5" /> Se connecter avec Google
          </button>
          <button
            type="button"
            onClick={() => handleOAuth('facebook')}
            className="bg-white border border-gray-300 rounded px-4 py-2 font-semibold flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
            disabled={loading}
          >
            <img src="/facebook.svg" alt="Facebook" className="h-5 w-5" /> Se connecter avec Facebook
          </button>
        </div>
      </form>
    </div>
  );
}
