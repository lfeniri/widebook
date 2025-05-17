"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Blog } from "@/types/blog";
import GrapesJSEditor from "@/components/GrapesJSEditor";
import BlogContentChatbot from "@/components/BlogContentChatbot";
import { blogService } from '@/services';

export default function EditBlogContentPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params as { id: string };
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);  const [editorContent, setEditorContent] = useState<{ html: string; css: string }>({ html: '', css: '' });
  const [chatbotExpanded, setChatbotExpanded] = useState(false);
  const [, setChatbotUnreadCount] = useState(0);  useEffect(() => {
    if (!id) return;
    async function fetchBlog() {
      setLoading(true);
      setError(null);
      try {
        const data = await blogService.getAdminBlogById(id);
        setBlog(data);
        // Initialiser le contenu de l'éditeur avec celui du blog
        if (data.content) {
          // Assurer que l'objet content a les propriétés html et css (nécessaires pour le type)
          const content = {
            html: data.content.html || '',
            css: data.content.css || ''
          };
          setEditorContent(content);
        }
      } catch (e: any) {
        setError(e.message || "Blog introuvable");
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
      await blogService.updateBlogContent(blog.id, data);
      router.refresh();
    } catch (e: any) {
      setError(e.message || "Erreur lors de la sauvegarde");
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
      <div className="w-full py-8 px-4">
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
