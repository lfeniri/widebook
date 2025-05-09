"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Blog } from "@/types/blog";
import SolumindEditorComponent from "@/components/SolumindEditorComponent";
import BlogContentChatbot from "@/components/BlogContentChatbot";

export default function EditBlogContentSolumindPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params as { id: string };
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editorContent, setEditorContent] = useState<{ html: string; css: string; js: string }>({ 
    html: '', 
    css: '', 
    js: '' 
  });
  const [chatbotExpanded, setChatbotExpanded] = useState(false);
  const [chatbotUnreadCount, setChatbotUnreadCount] = useState(0);

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
        // Initialize the editor content from the blog data
        if (data.content) {
          setEditorContent({
            html: data.content.html || '',
            css: data.content.css || '',
            js: data.content.js || '' // Include JS content if available
          });
        }
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchBlog();
  }, [id]);

  const handleSave = async (data: { html: string; css: string; js: string }) => {
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
  
  // Handle content updates from the chatbot
  const handleContentUpdate = (newContent: { html: string; css: string }) => {
    // Preserve the current JS when updating from the chatbot
    setEditorContent({
      html: newContent.html,
      css: newContent.css,
      js: editorContent.js
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto py-8 px-4">
        {loading ? (
          <div>Chargement...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : blog ? (
          <>            <h1 className="text-2xl font-bold mb-4">Édition du contenu visuel du blog (Solumind Editor) : {blog.title}</h1>
            <div className="mb-4 flex gap-3 justify-between">
              <div className="flex gap-3">                <button
                  className="bg-primary text-white px-4 py-2 rounded shadow flex items-center gap-2"
                  style={{ backgroundColor: "#FF385C" }}
                  onClick={() => handleSave(editorContent)}
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sauvegarde...
                    </>
                  ) : (
                    "Sauvegarder"
                  )}
                </button>
              </div>
              <div>
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
                  onClick={() => router.push(`/admin/blogs/${blog.id}/edit-content`)}
                >
                  Revenir à l'éditeur GrapesJS
                </button>
              </div>            </div>
              {/* Éditeur SolumindEditor avec notre implémentation CodeMirror */}
            <SolumindEditorComponent
              value={editorContent}
              onChange={setEditorContent}
              height="80vh"
              config={{
                canvas: {
                  styles: [
                    'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css'
                  ]
                }
              }}
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
