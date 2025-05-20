"use client";

import userAuthService from '@/services/userAuthService';
import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import UrlDebugger from '@/components/UrlDebugger';

// Component that uses useSearchParams must be wrapped in Suspense
function ResetPasswordForm() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [tokenChecked, setTokenChecked] = useState(false);
  const [hasToken, setHasToken] = useState(false);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  // Vérifie la présence du token dans l'URL lors du chargement de la page
  useEffect(() => {
    async function checkSession() {
      try {
        // Vérifier si nous avons une session active avec Supabase
        // Cette approche est plus fiable que de chercher des paramètres spécifiques
        const { session } = await userAuthService.getSession();
        
        console.log("Vérification de session pour réinitialisation:", !!session);
        
        if (session) {
          // Si nous avons une session, c'est que la redirection de Supabase a fonctionné
          setHasToken(true);
        } else {
          // Vérifier si nous avons d'autres indices dans l'URL
          // Supabase peut utiliser différents formats selon la configuration
          const hash = window.location.hash; // Vérifier si on a des tokens dans le hash
          const fullUrl = window.location.href;
          
          console.log("URL complète pour debug:", fullUrl);
          
          if (hash && (hash.includes('access_token') || hash.includes('type=recovery'))) {
            console.log("Tokens trouvés dans le hash de l'URL");
            // Traiter les tokens du hash si nécessaire
            await userAuthService.saveOAuthSession(hash);
            setHasToken(true);
          } else {
            // Vérifier d'autres paramètres possibles
            const code = searchParams?.get('code');
            const token = searchParams?.get('token') || searchParams?.get('t');
            const type = searchParams?.get('type');
            
            if (code || token) {
              console.log("Code ou token trouvé dans l'URL");
              setHasToken(true);
            } else {
              setError("Aucun token de réinitialisation valide n'a été trouvé. Veuillez demander un nouveau lien de réinitialisation.");
            }
          }
        }
      } catch (err) {
        console.error("Erreur lors de la vérification de la session:", err);
        setError("Une erreur est survenue lors de la vérification de votre identité.");
      } finally {
        setTokenChecked(true);
      }
    }
    
    checkSession();
  }, [searchParams]);
  // Gestion de la soumission du formulaire pour mettre à jour le mot de passe
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation des mots de passe
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
    
    if (password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }
    
    setLoading(true);
    setError(null);
    setMessage(null);
    
    try {
      console.log("Tentative de mise à jour du mot de passe");
      
      // Vérifier à nouveau la session avant de continuer
      const { session } = await userAuthService.getSession();
      
      if (!session) {
        // Si nous n'avons pas de session, essayer de récupérer les infos depuis l'URL
        const hash = window.location.hash;
        if (hash) {
          await userAuthService.saveOAuthSession(hash);
        } else {
          throw new Error("Impossible de confirmer votre identité. Veuillez demander un nouveau lien de réinitialisation.");
        }
      }
      
      // Maintenant, mettons à jour le mot de passe
      const { error } = await userAuthService.updatePassword(password);
      
      if (error) {
        console.error("Erreur lors de la mise à jour du mot de passe:", error);
        setError(error.message);
      } else {
        setMessage("Votre mot de passe a été mis à jour avec succès.");
        setTimeout(() => {
          router.push('/admin/login');
        }, 1500);
      }
    } catch (err: any) {
      console.error("Exception lors de la mise à jour du mot de passe:", err);
      setError(err.message || "Une erreur est survenue lors de la réinitialisation du mot de passe.");
    } finally {
      setLoading(false);
    }
  };

  // Si la vérification du token est en cours
  if (!tokenChecked) {
    return (      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-300">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md text-center">
          <p>Vérification du token de réinitialisation...</p>
          {process.env.NODE_ENV === 'development' && <UrlDebugger />}
        </div>
      </div>
    );
  }

  // Si aucun token valide n'est trouvé
  if (tokenChecked && !hasToken) {
    return (      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-300">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md flex flex-col gap-4">
          <h1 className="text-2xl font-bold mb-2 text-center">Lien invalide ou expiré</h1>
          <p className="text-center">{error || "Le lien de réinitialisation est invalide ou a expiré."}</p>          <Button 
            onClick={() => router.push('/admin/forgot-password')}
            className="mt-4 bg-blue-600 text-white hover:bg-blue-700 w-full font-semibold py-2"
          >
            Demander un nouveau lien
          </Button>
          {process.env.NODE_ENV === 'development' && <UrlDebugger />}
        </div>
      </div>
    );
  }

  // Formulaire de réinitialisation de mot de passe
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-300">
      <form onSubmit={handleResetPassword} className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md flex flex-col gap-4">
        <h1 className="text-2xl font-bold mb-2 text-center">Réinitialiser votre mot de passe</h1>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Nouveau mot de passe
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full"
              minLength={8}
            />
          </div>
          
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirmer le mot de passe
            </label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full"
              minLength={8}
            />
          </div>
        </div>
        
        {error && <div className="text-red-500 text-sm text-center">{error}</div>}
        {message && <div className="text-green-600 text-sm text-center">{message}</div>}
          <Button
          type="submit"
          className="w-full mt-4 bg-blue-600 text-white hover:bg-blue-700 font-semibold py-2"
          disabled={loading}
        >
          {loading ? 'Mise à jour...' : 'Mettre à jour le mot de passe'}
        </Button>
        
        <div className="text-center mt-2">
          <a href="/admin/login" className="text-primary hover:underline text-sm">
            Retour à la connexion
          </a>
        </div>
      </form>
    </div>  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-300">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md text-center">
          <p>Chargement...</p>
        </div>
      </div>
    }>
      <ResetPasswordForm />
    </Suspense>
  );
}
