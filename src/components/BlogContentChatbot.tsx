"use client";

import React, { useState, useEffect, useRef } from "react";
import FloatingChatbot from "./FloatingChatbot";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  isJsonContent?: boolean;
}

interface BlogContentChatbotProps {
  open: boolean;
  onClose: () => void;
  blogId: string;
  currentContent: { html: string; css: string; js?: string };
  onContentUpdate: (content: { html: string; css: string; js?: string }) => void;
  initialExpanded?: boolean;
  onExpandChange?: (isExpanded: boolean) => void;
  onNewMessage?: (count: number) => void;
}

export default function BlogContentChatbot({
  open,
  onClose,
  blogId,
  currentContent,
  onContentUpdate,
  initialExpanded = false,
  onExpandChange,
  onNewMessage,
}: BlogContentChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const prevMessagesLengthRef = useRef(0);

  // Récupérer l'historique des messages
  useEffect(() => {
    if (open && blogId) {
      fetchMessages();
    }
  }, [open, blogId]);
  // Auto-scroll vers le bas lors de l'ajout de nouveaux messages
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
    
    // Vérifier s'il y a de nouveaux messages de l'assistant
    if (messages.length > prevMessagesLengthRef.current) {
      const newAssistantMessages = messages.slice(prevMessagesLengthRef.current)
        .filter(msg => msg.role === 'assistant').length;
      
      if (newAssistantMessages > 0 && !initialExpanded) {
        setUnreadCount(prev => prev + newAssistantMessages);
      }
      
      prevMessagesLengthRef.current = messages.length;
    }
  }, [messages, initialExpanded]);
  
  // Mettre à jour le compteur de messages non lus
  useEffect(() => {
    if (onNewMessage) {
      onNewMessage(unreadCount);
    }
  }, [unreadCount, onNewMessage]);
  
  // Réinitialiser le compteur lorsque le chatbot est agrandi
  useEffect(() => {
    if (initialExpanded) {
      setUnreadCount(0);
    }
  }, [initialExpanded]);

  const fetchMessages = async () => {
    try {
      const response = await fetch(`/api/blogs/${blogId}/messages`);
      if (response.ok) {
        const data = await response.json();
        setMessages(data.messages || []);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des messages:", error);
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
      const userMessage = {
      id: Date.now().toString(),
      role: 'user' as const,
      content: newMessage,
      isJsonContent: false
    };
    
    // Ajouter le message de l'utilisateur immédiatement
    setMessages((prev) => [...prev, userMessage]);
    setNewMessage('');
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/openrouter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: newMessage,
          blogId,
          currentContent,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Erreur réseau');
      }
      
      const data = await response.json();
        // Gestion des réponses selon leur type
      console.log("Réponse de l'API:", data);
        if (data.isJsonContent && data.content) {
        try {
          // C'est un JSON de contenu, le parser et l'appliquer
          let contentObj;
          
          // Simple parsing du JSON
          if (typeof data.content === 'string') {
            contentObj = JSON.parse(data.content);
          } else {
            contentObj = data.content;
          }
            // Vérifier que le JSON contient bien les propriétés attendues
          if (contentObj && contentObj.html !== undefined) {
            // Logging pour débogage
            console.log("Contenu HTML à appliquer (premiers 100 caractères):", 
                       contentObj.html.substring(0, 100) + "...");
            
            // Appliquer les modifications au contenu
            onContentUpdate(contentObj);
            
            // Récupérer les messages mis à jour depuis l'API pour avoir le bon état isJsonContent
            fetchMessages();
          } else {
            throw new Error("Format JSON invalide: propriété 'html' manquante");
          }        } catch (error) {
          console.error("Erreur lors du parsing JSON:", error);
          // En cas d'erreur, afficher un message d'erreur clair
          setMessages((prev) => [
            ...prev,
            {
              id: (Date.now() + 1).toString(),
              role: 'assistant',
              content: "Je n'ai pas pu appliquer les modifications demandées. Format de réponse incorrect.",
              isJsonContent: false
            },
          ]);
        }      } else {
        // C'est une question ou une réponse textuelle normale
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: data.message || data.content || "Désolé, je n'ai pas pu traiter votre demande",
            isJsonContent: false
          },
        ]);
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi du message:", error);
        // Ajouter un message d'erreur
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: "Une erreur est survenue lors de la communication avec l'assistant",
          isJsonContent: false
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };  return (
    <FloatingChatbot 
      open={open} 
      onClose={onClose}
      initialExpanded={initialExpanded}
      onExpandChange={onExpandChange}
      unreadCount={unreadCount}
    >      <div className="flex flex-col h-full p-3">
        <div 
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto mb-4 space-y-4"
        >{messages.length === 0 ? (
            <div className="text-center text-gray-500 mt-8 text-xs">
              Commencez à discuter avec l&apos;assistant pour modifier le contenu de votre blog.
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`p-2 rounded-lg mb-2 max-w-[90%] text-xs ${
                  msg.role === 'user'
                    ? 'bg-blue-100 ml-auto'
                    : msg.isJsonContent 
                      ? 'bg-green-100 mr-auto' 
                      : 'bg-gray-100 mr-auto'
                }`}
              >
                <div className="text-xs font-semibold mb-1 flex items-center">
                  {msg.role === 'user' ? 'Vous' : 'Assistant'}
                  {msg.isJsonContent && (
                    <span className="ml-1 text-green-600 text-xs bg-green-50 px-1 py-0.5 rounded">✓</span>
                  )}
                </div>
                <div className="whitespace-pre-wrap text-xs">
                  {msg.isJsonContent ? "✅ Modifications appliquées avec succès" : msg.content}
                </div>
              </div>
            ))
          )}
            {isLoading && (
            <div className="bg-gray-100 p-2 rounded-lg max-w-[90%] mr-auto">
              <div className="flex space-x-1 items-center">
                <div className="text-xs font-semibold">Assistant</div>
                <div className="flex space-x-1">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse"></div>
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse delay-100"></div>
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse delay-200"></div>
                </div>
              </div>
            </div>
          )}        </div>
          <form onSubmit={sendMessage} className="mt-auto border-t pt-2 sticky bottom-0 bg-white">
          <div className="flex items-center">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Votre message..."
              className="flex-1 border rounded-l-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            /><button
              type="submit"
              className={`bg-blue-600 text-white py-2 px-4 rounded-r-lg text-sm ${
                isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
              }`}
              disabled={isLoading}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button></div>
        </form>
      </div>
    </FloatingChatbot>
  );
}
