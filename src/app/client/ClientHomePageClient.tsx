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

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f5f7fa] to-[#c3cfe2] pb-20">
      {/* Hero Section améliorée */}
      <section className="relative w-full flex flex-col md:flex-row items-center gap-12 mb-16 px-4 pt-16 md:pt-24 animate-fadeInUp">
        <div className="flex-1 flex flex-col gap-6 z-10">
          <h1 className="text-5xl md:text-6xl font-black text-primary drop-shadow-xl leading-tight mb-4">
            Bienvenue sur <span className="text-[#ff385c]">widebook</span><br />
            <span className="text-gray-800">Le blog qui inspire et connecte</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mb-6">
            Explorez des articles exclusifs, conseils d'experts et retours d'expérience pour progresser chaque jour.
          </p>
          <Button
            size="lg"
            className="w-fit bg-[#ff385c] hover:bg-[#e11d48] text-white shadow-lg animate-fadeIn delay-200"
            onClick={() => {
              document.getElementById('blogs')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span>Découvrir les blogs</span>
          </Button>
        </div>
        <div className="flex-1 flex justify-center relative z-0">
          <div className="absolute -top-8 -right-8 w-80 h-80 bg-[#ff385c]/10 rounded-full blur-3xl" />
          <img src="/globe.svg" alt="Inspiration" className="w-80 h-80 object-contain drop-shadow-2xl relative z-10" />
        </div>
      </section>
      {/* Section Blogs */}
      <section className="max-w-7xl mx-auto px-4" id="blogs">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900 animate-fadeInUp">Tous les blogs</h2>
          <BlogCategoryFilter onChange={setCategoryId} />
        </div>
        {loading ? (
          <div className="text-center py-12 text-lg text-gray-500 animate-pulse">Chargement...</div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-12 text-gray-400">Aucun blog trouvé.</div>
        ) : (
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 animate-fadeInUp">
            {blogs.map((blog, i) => (
              <li
                key={blog.id}
                className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col overflow-hidden border border-gray-100 hover:border-[#ff385c]/40 animate-fadeInUp"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                {blog.image && (
                  <Link href={`/client/blog/${blog.slug}`}
                    className="block overflow-hidden h-48 bg-gray-100">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                )}
                <div className="flex-1 flex flex-col p-6 gap-3">
                  <div className="flex items-center gap-2 mb-1">
                    {blog.category?.name && (
                      <Badge className="bg-[#ff385c]/10 text-[#ff385c] font-semibold px-3 py-1 text-xs rounded-full">
                        {blog.category.name}
                      </Badge>
                    )}
                    <span className="text-xs text-gray-400 ml-auto" suppressHydrationWarning>{new Date(blog.createdAt).toLocaleDateString("fr-FR")}</span>
                  </div>
                  <Link href={`/client/blog/${blog.slug}`}
                    className="text-lg font-bold text-gray-900 group-hover:text-[#ff385c] transition-colors line-clamp-2">
                    {blog.title}
                  </Link>
                  {blog.content && (
                    <div
                      className="prose max-w-none"
                      suppressHydrationWarning
                      dangerouslySetInnerHTML={{ __html: typeof blog.content === 'string' ? blog.content : '' }}
                    />
                  )}
                  <div className="mt-auto flex items-center gap-2 pt-4">
                    <span className="text-xs text-gray-500">Par {blog.author?.email || 'Auteur inconnu'}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      className="ml-auto group-hover:border-[#ff385c] group-hover:text-[#ff385c] transition-colors flex items-center justify-center min-w-[70px]"
                      disabled={loadingBlogId === blog.id}
                      onClick={async (e) => {
                        e.preventDefault();
                        setLoadingBlogId(blog.id);
                        router.push(`/client/blog/${blog.slug}`);
                      }}
                    >
                      {loadingBlogId === blog.id ? (
                        <svg className="animate-spin h-4 w-4 mr-1 text-[#ff385c]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                        </svg>
                      ) : 'Lire'}
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
