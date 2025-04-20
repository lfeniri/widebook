// eslint-disable
"use client";
import React, { useEffect, useState } from "react";
import BlogCategoryFilter from '@/components/BlogCategoryFilter';
import Link from 'next/link';
import { Blog } from '@/types/blog';

export default function ClientHomePageClient() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);
  const [categoryId, setCategoryId] = useState("");

  const fetchBlogs = async (catId = "") => {
    setLoading(true);
    let url = '/client/api/blogs';
    if (catId) url += `?categoryId=${catId}`;
    const res = await fetch(url);
    const data = await res.json();
    setBlogs(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs(categoryId);
  }, [categoryId]);

  return (
    <div className="max-w-5xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Tous les blogs</h1>
      <BlogCategoryFilter onChange={setCategoryId} />
      {loading ? <div>Chargement...</div> : (
        <ul className="grid md:grid-cols-2 gap-6">
          {blogs.map(blog => (
            <li key={blog.id} className="bg-white rounded shadow p-4 flex flex-col gap-2">
              <Link href={`/client/blog/${blog.slug}`} className="text-xl font-semibold hover:text-primary transition-colors">
                {blog.title}
              </Link>
              <div className="text-gray-500 text-sm">Catégorie : {blog.category?.name}</div>
              <div className="text-xs text-gray-400">Publié le {new Date(blog.createdAt).toLocaleDateString()}</div>
              {blog.image && <img src={blog.image} alt="" className="rounded w-full h-40 object-cover" />}
              <div className="line-clamp-3 text-gray-700" dangerouslySetInnerHTML={{ __html: blog.content }} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
