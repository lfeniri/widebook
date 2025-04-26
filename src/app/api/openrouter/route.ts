import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  // Récupérer le message courant, blogId, et role
  const { message, blogId, initialHtml } = await req.json();
  if (!message || !blogId) {
    return NextResponse.json({ error: 'Champs requis manquants.' }, { status: 400 });
  }

  // Stocker le message
  await prisma.blogChatMessage.create({
    data: {
      blogId,
      role: 'user',
      content: message,
      createdAt: new Date()
    },
  });
  // Récupérer toute la discussion pour ce blog
  const dbMessages = await prisma.blogChatMessage.findMany({
    where: { blogId },
    orderBy: { createdAt: 'asc' },
  });

  // Construire l'historique pour l'IA
  let messages = dbMessages.map(m => ({ role: m.role, content: m.content }));
  if (messages.length === 0 && initialHtml) {
    messages = [
      { role: 'system', content: 'Voici le contenu HTML existant du blog sous forme de fichier. Utilise-le comme base pour toutes les modifications.' },
      { role: 'system', content: initialHtml },
    ];
  }
  messages.push({ role: 'system', content: "la réponse doit etre que le html, sans explication, et uniquement le contenue sans la balise html ou header ou footer." });
  messages.push({ role: 'system', content: "Si la demande de l'utilisateur ne correspond pas a l'adaptation du html de la discution, répondez avec le meme html existant sans aucune modification." });

  // Appel à l'API IA
  const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
  const OPENROUTER_TOKEN = process.env.OPENROUTER_TOKEN;
  const MODEL = "deepseek/deepseek-r1-distill-llama-70b:free";
  const body = { model: MODEL, messages };
  const res = await fetch(OPENROUTER_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENROUTER_TOKEN}`,
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  // Extraire le HTML de la réponse
  let html = "";
  if (data && Array.isArray(data.choices)) {
    for (const choice of data.choices) {
      const content = choice?.message?.content || "";
      if (/<[a-z][\s\S]*>/i.test(content)) {
        html = content;
        break;
      }
    }
    if (!html && data.choices[0]?.message?.content) {
      html = data.choices[0].message.content;
    }
  }
  // Stocker la réponse IA (sans authorId)
  await prisma.blogChatMessage.create({
    data: {
      blogId,
      role: 'assistant',
      content: html,
    },
  });
  return NextResponse.json({ html }, { status: res.status });
}
