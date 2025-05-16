"use client";

import React, { useEffect, useRef } from 'react';

interface BlogInteractivityProps {
  js?: string;
  blogId: string;
}

/**
 * Composant client qui gère uniquement les aspects interactifs du blog
 * comme l'exécution du JavaScript et les interactions utilisateur
 */
const BlogInteractivity: React.FC<BlogInteractivityProps> = ({ js, blogId }) => {
  const scriptContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!js || !scriptContainerRef.current) return;
    
    try {
      // Créer un élément script pour exécuter le JavaScript du blog
      const scriptElement = document.createElement('script');
      scriptElement.textContent = js;
      
      // Nettoyer tout script existant
      scriptContainerRef.current.innerHTML = '';
      
      // Ajouter le script au DOM
      scriptContainerRef.current.appendChild(scriptElement);
    } catch (error) {
      console.error('Erreur lors de l\'exécution du JavaScript du blog:', error);
    }
    
    // Cleanup lors du démontage du composant
    return () => {
      if (scriptContainerRef.current) {
        scriptContainerRef.current.innerHTML = '';
      }
    };
  }, [js, blogId]);

  return <div ref={scriptContainerRef} className="blog-script-container" />;
};

export default BlogInteractivity;
