"use client";
import React, { useEffect, useState } from "react";
import { Category, Blog } from '@/types/blog';
import { supabase } from '@/lib/supabaseClient';
import { fetchWithAuth } from '@/lib/fetchWithAuth';
import { useRouter } from 'next/navigation';
import { Html } from "next/document";
import { API_PATHS } from '@/lib/constants';


export default function BlogForm({ onCreated, blog }: { onCreated?: () => void; blog?: Blog | null }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState<any>({});
  const [slug, setSlug] = useState("");
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [categoryId, setCategoryId] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDesc, setSeoDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {        const res = await fetch(API_PATHS.ADMIN.CATEGORIES);
        if (!res.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Impossible de charger les catégories. Veuillez réessayer plus tard.");
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (blog) {
      setTitle(blog.title || "");
      setContent(blog.content || {});
      setSlug(blog.slug || "");
      setImage(blog.image || "");
      setCategoryId(blog.categoryId || "");
      setSeoTitle(blog.seoTitle || "");
      setSeoDesc(blog.seoDesc || "");
      setImageFile(null);
    } else {
      setTitle(""); setContent({}); setSlug(""); setImage(""); setCategoryId(""); setSeoTitle(""); setSeoDesc(""); setImageFile(null);
    }
  }, [blog]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !slug || !categoryId) {
      setError("Veuillez remplir tous les champs obligatoires.");
      return;
    }
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      let imageUrl = image;
      if (imageFile) {
        const formData = new FormData();
        formData.append('file', imageFile);        const uploadRes = await fetch(API_PATHS.ADMIN.UPLOAD_IMAGE, {
          method: 'POST',
          body: formData
        });
        const uploadData = await uploadRes.json();
        if (!uploadRes.ok) throw new Error(uploadData.error || 'Erreur upload image');
        imageUrl = uploadData.url;
      }      const res = await fetchWithAuth(`${API_PATHS.ADMIN.BLOGS.BASE}${blog ? `/${blog.id}` : ""}`, {
        method: blog ? "PUT" : "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          slug,
          categoryId,
          seoTitle,
          seoDesc,
          image: imageUrl,
          content
        })
      });

      if (!res.ok) {
        throw new Error("Failed to save blog");
      }
      
      setSuccess("Blog enregistré avec succès !");
      if (onCreated) onCreated();
    } catch (err) {
      console.error("Error saving blog:", err);
      setError("Une erreur est survenue lors de l'enregistrement du blog.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded shadow p-4 mb-8 flex flex-col gap-3 card animate-fadeInUp">
      <h3 className="font-semibold text-lg mb-2">{blog ? 'Modifier le blog' : 'Créer un nouveau blog'}</h3>
      <input type="text" placeholder="Titre" value={title} onChange={e => setTitle(e.target.value)} className="border rounded px-3 py-2" required />
      <input type="text" placeholder="Slug (url)" value={slug} onChange={e => setSlug(e.target.value)} className="border rounded px-3 py-2" required />
      <select value={categoryId} onChange={e => setCategoryId(e.target.value)} className="border rounded px-3 py-2" required>
        <option value="">Choisir une catégorie</option>
        {categories.map((cat: Category) => (
          <option key={cat.id} value={cat.id}>{cat.name}</option>
        ))}
      </select>
      <input type="file" accept="image/*" onChange={handleImageChange} className="border rounded px-3 py-2" />
      {imageFile && <div className="text-xs text-gray-500">Image sélectionnée : {imageFile.name}</div>}
      {/* Remplacement du textarea par l'éditeur combiné */}
      <input type="text" placeholder="SEO Title" value={seoTitle} onChange={e => setSeoTitle(e.target.value)} className="border rounded px-3 py-2" />
      <input type="text" placeholder="SEO Description" value={seoDesc} onChange={e => setSeoDesc(e.target.value)} className="border rounded px-3 py-2" />
      {error && <div className="text-red-500 text-sm">{error}</div>}
      {success && <div className="text-green-600 text-sm">{success}</div>}
      <button
        type="submit"
        className="w-full bg-primary hover:bg-primary/90 transition-colors text-white font-semibold rounded-lg px-6 py-3 mt-4 shadow focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        style={{ backgroundColor: "#FF385C" }} // Couleur Airbnb.fr
        disabled={loading}
      >
        {loading ? (
          <>
        <svg className="animate-spin h-5 w-5 text-white mr-2" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
        </svg>
        Enregistrement...
          </>
        ) : blog ? 'Modifier' : 'Créer'}
      </button>
    </form>
  );
}
