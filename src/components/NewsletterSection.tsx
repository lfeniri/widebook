"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    
    if (!email || !email.includes('@')) {
      setErrorMessage("Veuillez entrer une adresse email valide.");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'inscription');
      }

      setIsSubscribed(true);
      setEmail("");
    } catch (error) {
      console.error("Erreur d'inscription:", error);
      setErrorMessage("Une erreur s'est produite. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="newsletter" className="w-full px-4 mb-16">
      <div className="relative bg-gradient-to-r from-blue-600 to-teal-500 rounded-2xl p-10 overflow-hidden shadow-xl">
        {/* Formes décoratives */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/3" />
        
        <div className="relative z-10 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Restez informé</h2>            
          <p className="text-blue-50 mb-8 w-full">
            Recevez nos derniers articles et conseils directement dans votre boîte mail. 
            Inscrivez-vous à notre newsletter pour ne rien manquer !
          </p>
          
          {isSubscribed ? (
            <div className="bg-white/90 p-6 rounded-xl text-blue-700 shadow-lg">
              <h3 className="text-xl font-bold mb-2">Merci pour votre inscription !</h3>
              <p>
                Votre email est bien enregistré. Vous recevrez prochainement nos meilleures offres 
                et actualités. Vos données restent confidentielles et ne seront jamais partagées 
                avec des tiers.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
              {errorMessage && (
                <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg mb-2 text-sm">
                  {errorMessage}
                </div>
              )}
              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <input
                  type="email"
                  placeholder="Votre adresse email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-5 py-3 rounded-full focus:outline-none"
                  disabled={isSubmitting}
                />
                <Button 
                  type="submit"
                  className="bg-white text-blue-600 hover:bg-blue-50 rounded-full px-6"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'En cours...' : 'S\'abonner'}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
