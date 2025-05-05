"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Blog } from "@/types/blog";
import GrapesJSEditor from "@/components/GrapesJSEditor";

export default function EditBlogContentPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params as { id: string };
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editorContent, setEditorContent] = useState<{ html: string; css: string }>({ html: '', css: '' });

  useEffect(() => {
    if (!id) return;
    async function fetchBlog() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/admin/api/blogs/${id}`);
        if (!res.ok) throw new Error("Blog introuvable");
        const data = await res.json();
        setBlog(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchBlog();
  }, [id]);

  const handleSave = async (data: { html: string; css: string }) => {
    if (!blog) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`/admin/api/blogs/${blog.id}/content`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: data }),
      });
      if (!res.ok) throw new Error("Erreur lors de la sauvegarde");
      router.refresh();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto py-8 px-4">
        {loading ? (
          <div>Chargement...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : blog ? (
          <>
            <h1 className="text-2xl font-bold mb-4">Édition du contenu visuel du blog : {blog.title}</h1>
            <div className="mb-4">
              <button
                className="bg-primary text-white px-4 py-2 rounded shadow"
                style={{ backgroundColor: "#FF385C" }}
                onClick={() => handleSave(editorContent)}
                disabled={saving}
              >
                {saving ? "Sauvegarde..." : "Sauvegarder"}
              </button>
            </div>            
            <GrapesJSEditor
              value={blog.content || { html: '', css: '' }}
              onChange={setEditorContent}
              height="80vh"
            />
          </>
        ) : null}
      </div>
    </div>
  );
}
