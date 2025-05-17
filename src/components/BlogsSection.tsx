"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Blog } from '@/types/blog';
import BlogCategoryFilter from '@/components/BlogCategoryFilter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { blogService } from '@/services';

interface BlogsSectionProps {
  initialBlogs?: Blog[];
}

export default function BlogsSection({ initialBlogs }: BlogsSectionProps) {
  // Définir loading à true si initialBlogs est undefined ou vide
  const hasInitialBlogs = initialBlogs && initialBlogs.length > 0;
  
  const [blogs, setBlogs] = useState<Blog[]>(initialBlogs || []);
  const [loading, setLoading] = useState(!hasInitialBlogs);
  const [categoryId, setCategoryId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loadingBlogId, setLoadingBlogId] = useState<string | null>(null);
  const router = useRouter();
  
  // Log pour déboguer
  console.log('BlogsSection - hasInitialBlogs:', hasInitialBlogs, 'initialBlogs:', initialBlogs?.length, 'blogs:', blogs.length, 'categoryId:', categoryId, 'loading:', loading);

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
  // Effet pour charger les blogs quand on change de catégorie
  useEffect(() => {
    // Si la catégorie change, rechargeons les blogs
    if (categoryId) {
      setLoading(true); // Marquer comme chargement en cours
      fetchBlogs(categoryId);
    } else if (initialBlogs && initialBlogs.length > 0 && categoryId === "") {
      // Si on revient à "toutes les catégories" et qu'on a des blogs initiaux
      setBlogs(initialBlogs);
      setLoading(false);
    } else if (categoryId === "") {
      // Si on est sur "toutes les catégories" mais sans blogs initiaux
      fetchBlogs("");
    }
  }, [categoryId, initialBlogs]);

  // Effet pour initialiser les blogs si initialBlogs change
  useEffect(() => {
    if (initialBlogs && initialBlogs.length > 0) {
      setBlogs(initialBlogs);
    }
  }, [initialBlogs]);

  useEffect(() => {
    setLoadingBlogId(null); // Reset loading state on component mount
  }, [router]);
  // Filtrage des blogs en fonction de la recherche
  const filteredBlogs = searchQuery.trim() === "" 
    ? blogs 
    : blogs.filter(blog => 
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (blog.content?.html && blog.content.html.toLowerCase().includes(searchQuery.toLowerCase()))
      );

  return (
    <section className="w-full px-4 mb-20" id="blogs">
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
            >
              <Link href={`/client/blog/${blog.slug}`} className="block h-48 relative overflow-hidden">
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
  );
}
