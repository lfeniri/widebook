"use client";
import React, { useEffect, useState } from "react";
import BlogTable from '@/components/BlogTable';
import { Blog } from '@/types/blog';

const PAGE_SIZE = 10;

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [search, setSearch] = useState("");

  const fetchBlogs = async (page = 1, search = "") => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page), pageSize: String(PAGE_SIZE), search });
    const res = await fetch(`/admin/api/blogs?${params.toString()}`);
    const data = await res.json();
    setBlogs(data.blogs);
    setPageCount(data.pageCount);
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs(page, search);
  }, [page, search]);

  return (
    <div className="max-w-6xl mx-auto py-8 animate-fadeInUp">
      <h2 className="text-2xl font-bold mb-6">Gestion des blogs</h2>
      <BlogTable
        blogs={blogs}
        loading={loading}
        page={page}
        pageCount={pageCount}
        onPageChange={setPage}
        onSearch={q => { setPage(1); setSearch(q); }}
        search={search}
      />
    </div>
  );
}
