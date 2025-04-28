"use client";
import React, { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { BlogContentBlock } from '@/types/blog';

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface EditorAIBuilderProps {
  initialContentConfig: BlogContentBlock[];
  onContentConfigChange: (blocks: BlogContentBlock[]) => void;
  blogId: string;
}

const OPENROUTER_API_URL = "/api/openrouter";

export default function EditorAIBuilder({ initialContentConfig, onContentConfigChange, blogId }: EditorAIBuilderProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [contentConfig, setContentConfig] = useState<BlogContentBlock[]>(initialContentConfig);
  const [loading, setLoading] = useState(false);

  // Charger la discussion à l'initialisation
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(`/api/blogs/${blogId}/chat?blogId=${blogId}`);
        if (res.ok) {
          const data = await res.json();
          // On suppose que chaque message a { role, content }
          setMessages(data.map((msg: any) => ({ role: msg.role, content: msg.content })));
        }
      } catch (e) {
        // Optionnel : afficher une erreur ou ignorer
      }
    };
    fetchMessages();
  }, [blogId]);

  const handleSend = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setMessages([...messages, { role: "user", content: input }]);
    setInput("");

    try {
      // Envoie le contentConfig courant (JSON)
      const res = await fetchWithAuth(OPENROUTER_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          blogId,
          message: input,
          contentConfig, // Utilise le contentConfig courant
        }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        setMessages((msgs) => [
          ...msgs,
          { role: "assistant", content: `Erreur API: ${errorData.error || res.statusText}` },
        ]);
        setLoading(false);
        return;
      }
      const data = await res.json();
      setMessages((msgs) => [
        ...msgs,
        { role: "assistant", content: "✅ La génération IA est terminée, la page a été mise à jour en temps réel ci-dessous." },
      ]);
      setContentConfig(data.contentConfig || []);
      onContentConfigChange(data.contentConfig || []);
    } catch (e: any) {
      setMessages((msgs) => [
        ...msgs,
        { role: "assistant", content: `Erreur lors de l'appel à OpenRouter: ${e?.message || e}` },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="border rounded p-2 bg-muted">
        <div className="mb-2 font-semibold">Discussion</div>
        <div className="h-40 overflow-y-auto bg-background p-2 rounded text-sm">
          {messages.length === 0 && <div className="text-muted-foreground">Aucune discussion pour l'instant.</div>}
          {messages.map((msg, i) => (
            <div key={i} className={msg.role === "user" ? "text-right" : "text-left text-primary"}>
              <span className="font-bold">{msg.role === "user" ? "Vous" : "AI"}:</span> {msg.content}
            </div>
          ))}
        </div>
        <div className="flex gap-2 mt-2">
          <input
            className="flex-1 border rounded px-2 py-1"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Décrivez ce que vous voulez modifier ou générer..."
            disabled={loading}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <Button
            type="button"
            onClick={handleSend}
            disabled={loading || !input.trim()}
          >
            {loading ? "..." : "Envoyer"}
          </Button>
        </div>
      </div>
      <div>
        <div className="mb-1 font-semibold">Aperçu du rendu</div>
        <div className="border rounded p-4 min-h-[200px] bg-background">
          <pre className="text-xs whitespace-pre-wrap break-all">{JSON.stringify(contentConfig, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
}
