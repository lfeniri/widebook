import React, { useState } from "react";

export default function CommentForm({ blogId, onCommented }: { blogId: string, onCommented: () => void }) {
  const [authorEmail, setAuthorEmail] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await fetch("/client/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content, blogId, authorEmail }),
    });
    if (res.ok) {
      setContent("");
      setAuthorEmail("");
      onCommented();
    } else {
      const data = await res.json();
      setError(data.error || "Erreur lors de l'envoi du commentaire.");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded shadow p-4 mt-6 flex flex-col gap-2">
      <h3 className="font-semibold text-base mb-1">Laisser un commentaire</h3>
      <input
        type="email"
        placeholder="Votre email"
        value={authorEmail}
        onChange={e => setAuthorEmail(e.target.value)}
        className="border rounded px-3 py-2"
        required
      />
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
