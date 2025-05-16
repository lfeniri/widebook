// eslint-disable
"use client";
import React, { useEffect, useState } from "react";
import BlogCategoryFilter from '@/components/BlogCategoryFilter';
import Link from 'next/link';
import { Blog } from '@/types/blog';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRouter } from 'next/navigation';
import { blogService } from '@/services';

export default function ClientHomePageClient() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const router = useRouter();
  const [loadingBlogId, setLoadingBlogId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchBlogs = async (catId = "") => {
    setLoading(true);
    try {
      const data = await blogService.getClientBlogs(catId);
      setBlogs(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs(categoryId);
  }, [categoryId]);

  useEffect(() => {
    setLoadingBlogId(null); // Reset loading state on component mount
  }, [router]);
  // Filtrage des blogs en fonction de la recherche
  const filteredBlogs = blogs.filter(blog => 
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (blog.content?.html && blog.content.html.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pb-24">
      {/* Hero Section avec design moderne */}
      <section className="relative w-full px-4 pt-16 md:pt-28 mb-24 overflow-hidden">
        {/* Cercles décoratifs en arrière-plan */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-[400px] h-[400px] bg-emerald-400/10 rounded-full blur-3xl" />
        <div className="absolute -top-24 -right-24 w-[300px] h-[300px] bg-purple-400/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 z-10 relative">
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
              >
                <span>Comment ça marche</span>
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
      <section className="max-w-7xl mx-auto px-4 mb-24">
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
      </section>

      {/* Section Blogs avec cartes redessinées */}
      <section className="max-w-7xl mx-auto px-4 mb-20" id="blogs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
          <h2 className="text-4xl font-bold text-gray-900">
            Explorez nos <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">articles</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            {/* Barre de recherche */}
            <div className="relative">
              <input 
                type="text" 
                placeholder="Rechercher un article..." 
                className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <BlogCategoryFilter onChange={setCategoryId} />
          </div>
        </div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="h-48 bg-gray-200 animate-pulse" />
                <div className="p-6 space-y-4">
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-8 bg-gray-200 rounded animate-pulse" />
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="text-center py-16">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-medium text-gray-700 mb-2">Aucun blog trouvé</h3>
            <p className="text-gray-500">Essayez de modifier vos critères de recherche ou de navigation.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog, i) => (
              <div
                key={blog.id}
                className="group bg-white rounded-xl shadow-lg overflow-hidden border border-transparent hover:border-blue-400 transition-all duration-300 hover:-translate-y-1 flex flex-col h-full"
                style={{ animationDelay: `${i * 100}ms` }}
              >                <Link href={`/client/blog/${blog.slug}`} className="block h-48 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {blog.image ? (
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                    </div>
                  )}
                </Link>
                <div className="flex-1 flex flex-col p-6">
                  <div className="flex items-center gap-2 mb-3">
                    {blog.category?.name && (
                      <Badge className="bg-blue-50 text-blue-600 hover:bg-blue-100 font-medium px-3 py-1 rounded-full">
                        {blog.category.name}
                      </Badge>
                    )}
                    <span className="text-xs text-gray-400 ml-auto" suppressHydrationWarning>
                      {new Date(blog.createdAt).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "short",
                        year: "numeric"
                      })}
                    </span>
                  </div>
                    <Link href={`/client/blog/${blog.slug}`}
                    className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-3 line-clamp-2">
                    {blog.title}
                  </Link>
  
                  
                  <div className="mt-auto pt-4 flex items-center">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold text-sm">
                        {blog.author?.email ? blog.author.email.charAt(0).toUpperCase() : 'A'}
                      </div>
                      <span className="text-sm text-gray-600 ml-2 line-clamp-1">
                        {blog.author?.email?.split('@')[0] || 'Auteur inconnu'}
                      </span>
                    </div>
                    
                    <Button
                      size="sm"
                      className="ml-auto rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow min-w-[100px]"
                      disabled={loadingBlogId === blog.id}
                      onClick={async (e) => {
                        e.preventDefault();
                        setLoadingBlogId(blog.id);
                        router.push(`/client/blog/${blog.slug}`);
                      }}
                    >
                      {loadingBlogId === blog.id ? (
                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                        </svg>
                      ) : (
                        <>
                          <span>Lire l'article</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Section newsletter */}
      <section className="max-w-5xl mx-auto px-4 mb-16">
        <div className="relative bg-gradient-to-r from-blue-600 to-teal-500 rounded-2xl p-10 overflow-hidden shadow-xl">
          {/* Formes décoratives */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/3" />
          
          <div className="relative z-10 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Restez informé</h2>
            <p className="text-blue-50 mb-8 max-w-xl mx-auto">
              Recevez nos derniers articles et conseils directement dans votre boîte mail. 
              Inscrivez-vous à notre newsletter pour ne rien manquer !
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
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
      <section className="max-w-7xl mx-auto px-4 mb-24">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">Ce que disent nos lecteurs</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/*
            {
              name: "Marie Dupont",
              role: "Entrepreneur",
              quote: "Widebook m'a aidé à rester à jour avec les dernières tendances dans mon domaine. Les conseils sont précieux et m'ont permis d'améliorer mon business."
            },
            {
              name: "Thomas Martin",
              role: "Expert Marketing",
              quote: "Une source d'information fiable et des articles de qualité. Je consulte Widebook quotidiennement pour m'informer et me former continuellement."
            },
            {
              name: "Sophie Legrand",
              role: "Étudiante",
              quote: "Les articles sont clairs et accessibles. J'ai trouvé énormément de conseils pratiques qui m'ont aidé dans mes études et mes projets personnels."
            }
          */}
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
