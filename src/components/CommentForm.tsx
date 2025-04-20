import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { fetchWithAuth } from "@/lib/fetchWithAuth";

export default function CommentForm({ blogId, onCommented }: { blogId: string, onCommented: () => void }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUser() {
      const { data: { session } } = await supabase.auth.getSession();
      setUserEmail(session?.user?.email ?? null);
    }
    fetchUser();
    const { data: listener } = supabase.auth.onAuthStateChange(() => fetchUser());
    return () => { listener?.subscription.unsubscribe(); };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetchWithAuth("/client/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, blogId }),
      });
      if (res.ok) {
        setContent("");
        onCommented();
      } else {
        const data = await res.json();
        setError(data.error || "Erreur lors de l'envoi du commentaire.");
      }
    } catch (err: any) {
      setError(err?.message || "Erreur inattendue lors de l'envoi du commentaire.");
    }
    setLoading(false);
  };

  if (!userEmail) return null;

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded shadow p-4 mt-6 flex flex-col gap-2">
      <h3 className="font-semibold text-base mb-1">Laisser un commentaire</h3>
      <textarea
        placeholder="Votre commentaire"
        value={content}
        onChange={e => setContent(e.target.value)}
        className="border rounded px-3 py-2 min-h-[60px]"
        required
      />
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <button type="submit" className="bg-primary text-white rounded px-4 py-2 font-semibold hover:bg-primary/90 transition-colors" disabled={loading}>
        {loading ? "Envoi..." : "Commenter"}
      </button>
    </form>
  );
}
