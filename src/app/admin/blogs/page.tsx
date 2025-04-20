"use client";
import React, { useEffect, useState } from "react";
import BlogForm from '@/components/BlogForm';
import { Blog } from '@/types/blog';

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchBlogs = async () => {
    setLoading(true);
    const res = await fetch("/admin/api/blogs");
    const data = await res.json();
    setBlogs(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h2 className="text-xl font-bold mb-4">Blogs</h2>
      <BlogForm onCreated={fetchBlogs} />
      {loading ? (
        <div>Chargement...</div>
      ) : (
        <ul className="space-y-4">
          {blogs.map(blog => (
            <li key={blog.id} className="bg-white rounded shadow p-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-semibold text-lg">{blog.title}</div>
                  <div className="text-gray-500 text-sm">Catégorie : {blog.category?.name}</div>
                  <div className="text-gray-400 text-xs">Auteur : {blog.author?.email}</div>
                </div>
                <div className="flex gap-2">
                  {/* Boutons d'édition/suppression à ajouter ici */}
                </div>
              </div>
              <div className="mt-2 text-gray-700 line-clamp-2" dangerouslySetInnerHTML={{ __html: blog.content }} />
              <div className="text-xs text-gray-400 mt-1">{blog.comments?.length ?? 0} commentaires</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
