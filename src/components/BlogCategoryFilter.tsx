"use client";
import React, { useEffect, useState } from "react";
import { Category } from '@/types/blog';

export default function BlogCategoryFilter({ onChange }: { onChange: (categoryId: string) => void }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    fetch("/client/api/categories")
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  return (
    <div className="mb-6 flex gap-2 flex-wrap">
      <button
        className={`px-4 py-1 rounded-full border font-medium ${selected === "" ? "bg-primary text-white" : "bg-white text-gray-700"}`}
        onClick={() => { setSelected(""); onChange(""); }}
      >
        Toutes
      </button>
      {categories.map((cat: Category) => (
        <button
          key={cat.id}
          className={`px-4 py-1 rounded-full border font-medium ${selected === cat.id ? "bg-primary text-white" : "bg-white text-gray-700"}`}
          onClick={() => { setSelected(cat.id); onChange(cat.id); }}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
