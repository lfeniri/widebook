"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Blog } from "@/types/blog";
import GrapesJSEditor from "@/components/GrapesJSEditor";
import BlogContentChatbot from "@/components/BlogContentChatbot";

export default function EditBlogContentPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params as { id: string };
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);  const [editorContent, setEditorContent] = useState<{ html: string; css: string }>({ html: '', css: '' });
  const [chatbotExpanded, setChatbotExpanded] = useState(false);
  const [, setChatbotUnreadCount] = useState(0);

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
        // Initialiser le contenu de l'éditeur avec celui du blog
        if (data.content) {
          setEditorContent(data.content);
        }
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
  
  // Gestion des mises à jour de contenu depuis le chatbot
  const handleContentUpdate = (newContent: { html: string; css: string }) => {
    setEditorContent(newContent);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto py-8 px-4">
        {loading ? (
          <div>Chargement...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : blog ? (
          <>            <h1 className="text-2xl font-bold mb-4">Édition du contenu visuel du blog : {blog.title}</h1>            
            <div className="mb-4 flex gap-3 justify-between">
              <div className="flex gap-3">
                <button
                  className="bg-primary text-white px-4 py-2 rounded shadow"
                  style={{ backgroundColor: "#FF385C" }}
                  onClick={() => handleSave(editorContent)}
                  disabled={saving}
                >
                  {saving ? "Sauvegarde..." : "Sauvegarder"}
                </button>
              </div>
            </div>
            <GrapesJSEditor
              value={editorContent || { html: '', css: '' }}
              onChange={setEditorContent}
              height="80vh"
            />
              {/* Composant chatbot - toujours ouvert mais peut être minimisé */}
            {blog && (              <BlogContentChatbot
                open={true}
                onClose={() => {/* Ne fait rien, le chat ne peut pas être fermé */}}
                blogId={blog.id}
                currentContent={editorContent}
                onContentUpdate={handleContentUpdate}
                initialExpanded={chatbotExpanded}
                onExpandChange={(expanded) => setChatbotExpanded(expanded)}
                onNewMessage={(count) => setChatbotUnreadCount(count)}
              />
            )}
          </>
        ) : null}
      </div>
    </div>
  );
}
