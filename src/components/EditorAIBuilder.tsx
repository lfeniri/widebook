"use client";
import React, { useState, useRef } from "react";
import { Button } from "./ui/button";
import { fetchWithAuth } from "@/lib/fetchWithAuth";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface EditorAIBuilderProps {
  initialHtml: string;
  onHtmlChange: (html: string) => void;
  blogId: string; // Ajout de la prop blogId
}

const OPENROUTER_API_URL = "/api/openrouter";

export default function EditorAIBuilder({ initialHtml, onHtmlChange, blogId }: EditorAIBuilderProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [html, setHtml] = useState(initialHtml);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setMessages([...messages, { role: "user", content: input }]);
    setInput("");

    try {
      // Un seul appel à openrouter, le back gère tout (sauvegarde + génération IA)
      const res = await fetchWithAuth(OPENROUTER_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          blogId,
          message: input,
          initialHtml,
        }),
      });
      const data = await res.json();
      setMessages((msgs) => [
        ...msgs,
        { role: "assistant", content: "✅ La génération IA est terminée, la page a été mise à jour en temps réel ci-dessous." },
      ]);
      setHtml(data.html || "");
      onHtmlChange(data.html || "");
    } catch (e) {
      setMessages((msgs) => [
        ...msgs,
        { role: "assistant", content: "Erreur lors de l'appel à OpenRouter." },
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
        <div className="border rounded p-4 min-h-[200px] bg-background" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  );
}
