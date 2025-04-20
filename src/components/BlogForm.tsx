"use client";
import React, { useEffect, useState } from "react";
import { Category } from '@/types/blog';
import { supabase } from '@/lib/supabaseClient';
import { fetchWithAuth } from '@/lib/fetchWithAuth';

export default function BlogForm({ onCreated }: { onCreated: () => void }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [slug, setSlug] = useState("");
  const [image, setImage] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDesc, setSeoDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/admin/api/categories")
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    try{
      e.preventDefault();
      setLoading(true);
      setError(null);
      const res = await fetchWithAuth("/admin/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          slug,
          image,
          categoryId,
          seoTitle,
          seoDesc,
        }),
      });
      if (res.ok) {
        setTitle(""); setContent(""); setSlug(""); setImage(""); setCategoryId(""); setSeoTitle(""); setSeoDesc("");
        onCreated();
      } else {
        const data = await res.json();
        setError(data.error || "Erreur lors de la création du blog.");
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError("Erreur lors de la création du blog.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded shadow p-4 mb-8 flex flex-col gap-3">
      <h3 className="font-semibold text-lg mb-2">Créer un nouveau blog</h3>
      <input type="text" placeholder="Titre" value={title} onChange={e => setTitle(e.target.value)} className="border rounded px-3 py-2" required />
      <input type="text" placeholder="Slug (url)" value={slug} onChange={e => setSlug(e.target.value)} className="border rounded px-3 py-2" required />
      <select value={categoryId} onChange={e => setCategoryId(e.target.value)} className="border rounded px-3 py-2" required>
        <option value="">Choisir une catégorie</option>
        {categories.map((cat: Category) => (
          <option key={cat.id} value={cat.id}>{cat.name}</option>
        ))}
      </select>
      <input type="text" placeholder="Image (URL)" value={image} onChange={e => setImage(e.target.value)} className="border rounded px-3 py-2" />
      <textarea placeholder="Contenu HTML" value={content} onChange={e => setContent(e.target.value)} className="border rounded px-3 py-2 min-h-[120px] font-mono" required />
      <input type="text" placeholder="SEO Title" value={seoTitle} onChange={e => setSeoTitle(e.target.value)} className="border rounded px-3 py-2" />
      <input type="text" placeholder="SEO Description" value={seoDesc} onChange={e => setSeoDesc(e.target.value)} className="border rounded px-3 py-2" />
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <button type="submit" className="bg-primary text-white rounded px-4 py-2 font-semibold hover:bg-primary/90 transition-colors" disabled={loading}>
        {loading ? "Création..." : "Créer le blog"}
      </button>
    </form>
  );
}
