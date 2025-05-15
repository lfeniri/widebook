import React, { useState, useEffect } from "react";
import { commentService } from "@/services";
import userAuthService from "@/services/userAuthService";
import { supabase } from "@/lib/supabaseClient";

export default function CommentForm({ blogId, onCommented }: { blogId: string, onCommented: () => void }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  useEffect(() => {
    async function fetchUser() {
      const profile = await userAuthService.getUserProfile();
      setUserEmail(profile?.email ?? null);
    }
    fetchUser();
    const { data: listener } = userAuthService.onAuthStateChange(() => fetchUser());
    return () => { listener?.subscription.unsubscribe(); };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await commentService.addComment(blogId, content);
      setContent("");
      onCommented();
    } catch (err: any) {
      setError(err?.message || "Erreur inattendue lors de l'envoi du commentaire.");
    }
    setLoading(false);
  };

  if (!userEmail) return null;

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 mt-6 flex flex-col gap-3">
      <h3 className="font-semibold text-lg mb-2 text-primary flex items-center gap-2">
        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V10a2 2 0 012-2h2m10-4h-4m0 0V4m0 0v4m0-4a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
        Laisser un commentaire
      </h3>
      <textarea
        placeholder="Votre commentaire..."
        value={content}
        onChange={e => setContent(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-2 min-h-[70px] focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-base"
        required
      />
      {error && <div className="text-red-500 text-sm font-medium">{error}</div>}
      <button
        type="submit"
        className="bg-[#ff385c] hover:bg-[#e11d48] text-white rounded-lg px-5 py-2 font-semibold transition-colors shadow-sm self-end flex items-center gap-2 disabled:opacity-60"
        disabled={loading}
      >
        {loading ? (
          <svg className="animate-spin h-4 w-4 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
          </svg>
        ) : null}
        {loading ? "Envoi..." : "Commenter"}
      </button>
    </form>
  );
}
