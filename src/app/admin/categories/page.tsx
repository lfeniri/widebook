"use client";
import React, { useEffect, useState } from "react";
import { Category } from '@/types/blog';
import { categoryService } from "@/services";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      const data = await categoryService.getCategories();
      setCategories(data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await categoryService.createCategory({ name, description });
      setName("");
      setDescription("");
      fetchCategories();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erreur lors de l'ajout.";
      setError(errorMessage);
    }
    setLoading(false);
  };
  return (
    <div className="w-full py-8 animate-fadeInUp">
      <h2 className="text-2xl font-bold mb-4">Catégories</h2>
      <form onSubmit={handleAddCategory} className="flex flex-col md:flex-row gap-2 mb-6">
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
          className="btn min-w-[120px]"
          disabled={loading}
        >
          Ajouter
        </button>
      </form>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <ul className="grid gap-4 mt-4">
        {categories.map((cat, i) => (
          <li key={cat.id} className="card flex justify-between items-center animate-fadeInUp" style={{ animationDelay: `${i * 80}ms` }}>
            <div>
              <div className="font-semibold text-lg">{cat.name}</div>
              <div className="text-gray-500 text-sm">{cat.description}</div>
            </div>
            <span className="text-xs text-gray-400">{cat.blogs?.length || 0} blogs</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
