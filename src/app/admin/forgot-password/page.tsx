"use client";

import { supabase } from '@/lib/supabaseClient';
import React, { useState } from 'react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage('');
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/admin/login`,
    });
    if (error) setError(error.message);
    else setMessage('Un email de réinitialisation a été envoyé. Merci de valider le lien dans votre boîte email.');
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-300">
      <form onSubmit={handleForgotPassword} className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md flex flex-col gap-4">
        <h1 className="text-2xl font-bold mb-2 text-center">Mot de passe oublié</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border rounded px-3 py-2 focus:outline-none focus:ring w-full"
          required
        />
        {error && <div className="text-red-500 text-sm text-center">{error}</div>}
        {message && <div className="text-green-600 text-sm text-center">{message}</div>}
        <button
          type="submit"
          className="bg-primary text-white rounded px-4 py-2 font-semibold hover:bg-primary/90 transition-colors w-full"
          disabled={loading}
        >
          {loading ? 'Envoi...' : 'Envoyer le lien de réinitialisation'}
        </button>
        <div className="text-center mt-2">
          <a href="/admin/login" className="text-primary hover:underline">Retour à la connexion</a>
        </div>
      </form>
    </div>
  );
}
