// eslint-disable
"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { blogService } from '@/services';
import BlogsSection from '@/components/BlogsSection';
import { Blog } from '@/types/blog';

export default function ClientHomePageClient() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const data = await blogService.getClientBlogs("");
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBlogs();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pb-24">
      {/* Hero Section avec design moderne */}
      <section className="relative w-full px-4 pt-16 md:pt-28 mb-24 overflow-hidden">
        {/* Cercles décoratifs en arrière-plan */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-[400px] h-[400px] bg-emerald-400/10 rounded-full blur-3xl" />
        <div className="absolute -top-24 -right-24 w-[300px] h-[300px] bg-purple-400/10 rounded-full blur-3xl" />

        <div className="w-full flex flex-col md:flex-row items-center gap-12 z-10 relative">
          <div className="flex-1 flex flex-col gap-8 z-10">
            <div className="inline-flex items-center mb-4 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
              <span className="flex h-2 w-2 mr-2 rounded-full bg-blue-600"></span> Votre guide d'actualité et de conseils
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-gray-900 leading-tight">
              Découvrez des <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">insights précieux</span> pour votre quotidien
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl">
              Une plateforme qui vous conseille, vous aide à trouver les meilleures astuces, 
              les bonnes offres et vous garde à jour avec l'actualité dans tous les domaines.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white shadow-lg rounded-full px-8"
                onClick={() => {
                  document.getElementById('blogs')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span className="mr-2">Explorez nos blogs</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8L22 12L18 16"/><path d="M2 12H22"/></svg>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50 rounded-full px-8"
                onClick={() => {
                  document.getElementById('newsletter')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span>Restez informé</span>
              </Button>
            </div>

            {/* Statistiques */}
            <div className="grid grid-cols-3 gap-4 mt-8 max-w-md">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">{blogs.length}+</p>
                <p className="text-sm text-gray-500">Articles</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">24/7</p>
                <p className="text-sm text-gray-500">Actualités</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">100%</p>
                <p className="text-sm text-gray-500">Fiable</p>
              </div>
            </div>
          </div>
          <div className="flex-1 flex justify-center relative">
            <div className="relative w-full max-w-lg">
              <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
              <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
              <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
              <div className="relative">
                <img src="/globe.svg" alt="Widebook Insights" className="w-full drop-shadow-2xl relative z-10" />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Section caractéristiques */}
      <section className="w-full px-4 mb-24">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">Comment <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">widebook</span> vous accompagne</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center text-center">
            <div className="w-16 h-16 mb-6 rounded-full bg-blue-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Actualités à jour</h3>
            <p className="text-gray-600">Restez informé des dernières tendances et actualités dans tous les domaines qui vous intéressent.</p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center text-center">
            <div className="w-16 h-16 mb-6 rounded-full bg-teal-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-600"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Conseils d'experts</h3>
            <p className="text-gray-600">Bénéficiez de conseils exclusifs et d'astuces pratiques partagés par nos experts.</p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center text-center">
            <div className="w-16 h-16 mb-6 rounded-full bg-purple-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Bonnes affaires</h3>
            <p className="text-gray-600">Découvrez les meilleures offres et opportunités dans différents secteurs d'activité.</p>
          </div>      
        </div>
      </section>      {/* Section Blogs avec cartes redessinées - remplacée par le composant BlogsSection */}
      <BlogsSection initialBlogs={loading ? [] : blogs} />

      {/* Section newsletter */}      
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
            
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-1 px-5 py-3 rounded-full focus:outline-none"
              />
              <Button className="bg-white text-blue-600 hover:bg-blue-50 rounded-full px-6">
                S'abonner
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Section témoignages clients */}
      <section className="w-full px-4 mb-24">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">Ce que disent nos lecteurs</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {Array(3).fill(0).map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center gap-2 mb-2">
                {[1,2,3,4,5].map(star => (
                  <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 italic mb-6">"Témoignage client ici."</p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold">
                  {`A.B`}
                </div>
                <div className="ml-3">
                  <h4 className="font-semibold text-gray-900">{`Nom Prénom`}</h4>
                  <p className="text-sm text-gray-500">{`Fonction`}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
