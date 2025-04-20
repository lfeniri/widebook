"use client";
import React, { useEffect, useState } from "react";
import { Category } from '@/types/blog';
import { fetchWithAuth } from "@/lib/fetchWithAuth";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    const res = await fetch("/admin/api/categories");
    const data = await res.json();
    setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await fetchWithAuth("/admin/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description }),
    });
    if (res.ok) {
      setName("");
      setDescription("");
      fetchCategories();
    } else {
      const data = await res.json();
      setError(data.error || "Erreur lors de l'ajout.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h2 className="text-xl font-bold mb-4">Catégories</h2>
      <form onSubmit={handleAddCategory} className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Nom de la catégorie"
          value={name}
          onChange={e => setName(e.target.value)}
          className="border rounded px-3 py-2 flex-1"
          required
        />
        <input
          type="text"
          placeholder="Description (optionnelle)"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="border rounded px-3 py-2 flex-1"
        />
        <button
          type="submit"
          className="bg-primary text-white rounded px-4 py-2 font-semibold hover:bg-primary/90 transition-colors"
          disabled={loading}
        >
          Ajouter
        </button>
      </form>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <ul className="space-y-2">
        {categories.map(cat => (
          <li key={cat.id} className="bg-white rounded shadow p-3 flex justify-between items-center">
            <div>
              <div className="font-semibold">{cat.name}</div>
              <div className="text-gray-500 text-sm">{cat.description}</div>
            </div>
            <span className="text-xs text-gray-400">{cat.blogs.length} blogs</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
