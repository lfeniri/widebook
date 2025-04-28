"use client";
import React, { useEffect, useState } from "react";
import { Category, Blog, BlogContentBlock } from '@/types/blog';
import { supabase } from '@/lib/supabaseClient';
import { fetchWithAuth } from '@/lib/fetchWithAuth';
import { useRouter } from 'next/navigation';
import { GridRenderer } from 'visual-blog-builder-lib/components/GridRenderer';
import { convertContentConfigToGrid } from '@/lib/utils';

export default function BlogForm({ onCreated, blog }: { onCreated?: () => void; blog?: Blog | null }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [title, setTitle] = useState("");
  const [contentConfig, setContentConfig] = useState<BlogContentBlock[] | undefined>(undefined);
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
    fetch("/admin/api/categories")
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  useEffect(() => {
    if (blog) {
      setTitle(blog.title || "");
      setContentConfig(blog.contentConfig || []);
      setSlug(blog.slug || "");
      setImage(blog.image || "");
      setCategoryId(blog.categoryId || "");
      setSeoTitle(blog.seoTitle || "");
      setSeoDesc(blog.seoDesc || "");
      setImageFile(null);
    } else {
      setTitle(""); setContentConfig([]); setSlug(""); setImage(""); setCategoryId(""); setSeoTitle(""); setSeoDesc(""); setImageFile(null);
    }
  }, [blog]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
        console.log("Form submission started");
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);
        let imageUrl = image;
        if (imageFile) {
            console.log("Uploading image...");
            const formData = new FormData();
            formData.append('file', imageFile);
            const uploadRes = await fetch('/admin/api/upload-image', {
                method: 'POST',
                body: formData,
            });
            const uploadData = await uploadRes.json();
            if (!uploadRes.ok) throw new Error(uploadData.error || 'Erreur upload image');
            imageUrl = uploadData.url;
            console.log("Image uploaded successfully: ", imageUrl);
        }
        console.log("Saving blog...");
        const method = blog ? "PUT" : "POST";
        const url = blog ? `/admin/api/blogs?id=${blog.id}` : "/admin/api/blogs";
        const res = await fetchWithAuth(url, {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title,
                contentConfig,
                slug,
                image: imageUrl,
                categoryId,
                seoTitle,
                seoDesc,
            }),
        });
        if (res.ok) {
            console.log("Blog saved successfully");
            if (blog) {
                setSuccess('Blog modifié avec succès !');
            } else {
                const data = await res.json();
                setSuccess('Blog créé avec succès !');
                setTimeout(() => {
                    setSuccess(null);
                    router.replace(`/admin/blogs/${data.id}`);
                }, 1200);
            }
        } else {
            const data = await res.json();
            setError(data.error || `Erreur lors de la ${blog ? 'modification' : 'création'} du blog.`);
            console.error("Error saving blog: ", data.error);
        }
        setLoading(false);
    } catch (err: any) {
        setLoading(false);
        setError(err?.message || `Erreur lors de la ${blog ? 'modification' : 'création'} du blog.`);
        console.error("Error during form submission: ", err);
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
      <GridRenderer grid={convertContentConfigToGrid(contentConfig || [])} />
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
