import { NextRequest, NextResponse } from "next/server";
import { fetchWithAuth } from "@/lib/fetchWithAuth";

export async function POST(req: NextRequest) {
  console.log("[API/openrouter] Reçu POST");
  const { message, history, initialHtml } = await req.json();
  console.log("[API/openrouter] Payload reçu:", { message, history, initialHtml });
  const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
  const OPENROUTER_TOKEN = process.env.OPENROUTER_TOKEN || "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";
  const MODEL = "deepseek/deepseek-chat-v3-0324";

  // Reconstruire l'historique pour OpenRouter
  let messages = Array.isArray(history) ? [...history] : [];
  if (messages.length === 0 && initialHtml) {
    messages = [
      {
        role: "system",
        content: "Voici le contenu HTML existant du blog sous forme de fichier. Utilise-le comme base pour toutes les modifications.",
      },
      {
        role: "system",
        content: initialHtml,
    }
    ];
  }
  messages.push({ role: "system", content: "la réponse doit etre que le html, sans explication, et uniquement le contenue sans la balise html ou header ou footer."});
  messages.push({ role: "system", content: "Si la demande de l'utilisateur ne correspond pas a l'adaptation du html de la discution, répondez avec le meme html existant sans aucune modification."});

  if (message) {
    messages.push({ role: "user", content: message });
  }

  const body = {
    model: MODEL,
    messages,
  };
  console.log("[API/openrouter] Body envoyé à OpenRouter:", body);

  const res = await fetch(OPENROUTER_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENROUTER_TOKEN}`,
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  console.log("[API/openrouter] Réponse OpenRouter brute:", data);
  console.log("[API/openrouter] data:", data);

  // Extraire le HTML de la réponse (suppose que le HTML est dans content)
  let html = "";
  if (data && Array.isArray(data.choices)) {
    // Cherche le premier message assistant qui contient du HTML
    for (const choice of data.choices) {
      const content = choice?.message?.content || "";
      // Heuristique simple : on prend tout le content si il contient des balises HTML
      if (/<[a-z][\s\S]*>/i.test(content)) {
        html = content;
        break;
      }
    }
    // Fallback : prend le premier content si aucun HTML détecté
    if (!html && data.choices[0]?.message?.content) {
      html = data.choices[0].message.content;
    }
  }
  console.log("[API/openrouter] HTML extrait:", html);

  return NextResponse.json({ html }, { status: res.status });
}
