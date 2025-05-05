import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  // Récupérer le message courant, blogId, grapesJs content
  const { message, blogId, currentContent } = await req.json();
  if (!message || !blogId) {
    return NextResponse.json({ error: 'Champs requis manquants.' }, { status: 400 });
  }
  // Récupérer toute la discussion pour ce blog
  const dbMessages = await prisma.blogChatMessage.findMany({
    where: { blogId },
    orderBy: { createdAt: 'asc' },
    take: 15 // Limiter à 15 messages pour éviter les problèmes de taille
  });
  
  // Stocker le message de l'utilisateur
  await prisma.blogChatMessage.create({
    data: {
      blogId,
      role: 'user',
      content: message,
      createdAt: new Date()
    },
  });
  
  // Construire l'historique pour l'IA - Filtrer les messages trop longs (notamment des réponses JSON précédentes)
  let messages = dbMessages.map(m => {
    // Pour les réponses JSON précédentes, ne pas les inclure complètement dans l'historique
    if (m.role === 'assistant' && m.content.startsWith('{') && m.content.includes('"html":')) {
      return { role: m.role, content: "J'ai précédemment modifié le HTML/CSS selon votre demande." };
    }
    return { role: m.role, content: m.content };
  });
    // Ajouter les instructions système
  if (messages.length === 0 && currentContent) {
    // Premier message dans la conversation
    messages = [
      { role: 'system', content: 'Tu es un assistant expert en développement web qui aide à modifier le contenu d\'un blog. Tu recevras un objet JSON contenant le HTML et CSS actuels du blog.' },
      { role: 'system', content: 'L\'utilisateur peut te demander des modifications sur le contenu. Tu dois répondre avec un JSON contenant le HTML et CSS modifiés selon sa demande.' },
      { role: 'system', content: JSON.stringify(currentContent) },
    ];
  } else if (currentContent) {
    // Mettre à jour le contenu actuel dans chaque nouvelle requête
    messages.push({ role: 'system', content: `Voici le contenu actuel du blog: ${JSON.stringify(currentContent)}` });
  }
  // Ajouter des instructions spécifiques pour le format de réponse
  messages.push({ 
    role: 'system', 
    content: "Tu dois répondre UNIQUEMENT avec un objet JSON valide au format strict {\"html\":\"...\",\"css\":\"...\"}. Ce JSON ne doit contenir aucune explication ni commentaire additionnel. Si tu as besoin de plus d'informations, pose simplement ta question sans inclure de JSON."
  });
  
  messages.push({
    role: 'system',
    content: "IMPORTANT: Ton JSON doit être valide selon la syntaxe JavaScript. Vérifie que tous les guillemets sont bien échappés et que la structure est correcte. Pas de balises ```json ou ``` autour du JSON."
  });
  
  // Ajouter le message utilisateur
  messages.push({ role: 'user', content: message });
  // Appel à l'API IA
  const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
  const OPENROUTER_TOKEN = process.env.OPENROUTER_TOKEN;
  const MODEL = "deepseek/deepseek-r1:free";
  const body = { 
    model: MODEL, 
    messages
  };
  console.log("Appel à l'API IA avec le corps : ", body);
  
  const res = await fetch(OPENROUTER_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENROUTER_TOKEN}`,
    },
    body: JSON.stringify(body),
  });  const data = await res.json();
  
  // Extraire et traiter la réponse
  let aiResponse = "";
  let isJsonResponse = false;
  let parsedContent = null;
    if (data && Array.isArray(data.choices) && data.choices.length > 0) {
    const content = data.choices[0]?.message?.content || "";
    
    // Nettoyer la réponse de tout balisage markdown
    aiResponse = content
      .replace(/^```json[\r\n]*/i, "")
      .replace(/^```[\r\n]*/i, "")
      .replace(/```$/g, "")
      .trim();
    
    // Simple vérification si ça ressemble à un JSON
    const startsWithBrace = aiResponse.trimStart().startsWith('{');
    
    // Nous vérifions simplement si c'est un JSON valide sans modifications
    if (startsWithBrace) {
      try {
        // Tenter de parser le JSON tel quel sans modifications
        parsedContent = JSON.parse(aiResponse);
        if (parsedContent && typeof parsedContent === 'object' && parsedContent.html !== undefined) {
          isJsonResponse = true;
          console.log("Réponse identifiée comme JSON valide");
        } else {
          isJsonResponse = false;
          console.log("La réponse est un JSON mais ne contient pas de propriété 'html'");
        }
      } catch (e) {
        console.error("Erreur lors du parsing JSON:", aiResponse);
        isJsonResponse = false;
        console.log("La réponse n'est pas un JSON valide");
      }
    } else {
      // Si ce n'est pas un JSON valide, c'est probablement une question ou une réponse textuelle
      isJsonResponse = false;
      console.log("Réponse identifiée comme texte (non-JSON)", aiResponse);
    }
  }
    // Préparation du contenu pour le stockage et la réponse
  const contentToStore = aiResponse;
    // Stocker la réponse IA
  try {
    await prisma.blogChatMessage.create({
      data: {
        blogId,
        role: 'assistant',
        content: contentToStore,
        isJsonContent: isJsonResponse, // Stocker l'information si c'est un JSON valide
      },
    });
  } catch (err) {
    console.error('Erreur lors de la création du message assistant:', err);
    return NextResponse.json({ error: 'Erreur lors de la sauvegarde du message assistant', details: String(err) }, { status: 500 });
  }
  
  // Renvoyer la réponse avec l'indicateur si c'est un JSON pour GrapesJS ou une question/message
  return NextResponse.json({ 
    content: aiResponse,  // Renvoyer la réponse telle quelle
    isJsonContent: isJsonResponse,
    message: isJsonResponse 
      ? "✅ Les modifications ont été appliquées avec succès à votre contenu." 
      : aiResponse
  }, { status: res.status });
}
