import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Blog } from '@/types/blog';

interface BlogTableProps {
  blogs: Blog[];
  loading: boolean;
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  onSearch: (q: string) => void;
  search: string;
}

export default function BlogTable({ blogs, loading, page, pageCount, onPageChange, onSearch, search }: BlogTableProps) {
  return (
    <div className="w-full animate-fadeInUp">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <input
          type="text"
          placeholder="Rechercher par titre ou contenu..."
          value={search}
          onChange={e => onSearch(e.target.value)}
          className="border rounded px-3 py-2 w-full md:w-80"
        />
        <Link href="/admin/blogs/new" className="btn min-w-[160px] text-center">Créer un blog</Link>
      </div>
      <div className="overflow-x-auto rounded-lg border bg-white card">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 font-semibold">Titre</th>
              <th className="px-4 py-3 font-semibold">Catégorie</th>
              <th className="px-4 py-3 font-semibold">Auteur</th>
              <th className="px-4 py-3 font-semibold">Date</th>
              <th className="px-4 py-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="text-center py-8">Chargement...</td></tr>
            ) : blogs.length === 0 ? (
              <tr><td colSpan={5} className="text-center py-8">Aucun blog trouvé.</td></tr>
            ) : blogs.map(blog => (
              <tr key={blog.id} className="border-t hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 max-w-[220px] truncate">{blog.title}</td>
                <td className="px-4 py-3">{blog.category?.name}</td>
                <td className="px-4 py-3">{blog.author?.email}</td>
                <td className="px-4 py-3">{new Date(blog.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-3">
                  <Link href={`/admin/blogs/${blog.id}`} className="btn px-3 py-1 text-sm">Éditer</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: pageCount }, (_, i) => (
          <button
            key={i}
            className={`btn px-3 py-1 text-sm ${page === i + 1 ? 'bg-accent text-primary' : ''}`}
            onClick={() => onPageChange(i + 1)}
            disabled={page === i + 1}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
