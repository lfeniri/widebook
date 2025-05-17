"use client";

import React, { useEffect, useState } from 'react';

const BlogHeaderInfoToggle = () => {
  const [iconColor, setIconColor] = useState('#4f46e5');
  
  // Fonction pour inverser la couleur du fond
  const getContrastColor = (bgColor: string = '#ffffff'): string => {
    // Convertir la couleur de fond en RGB si c'est un code hexadécimal
    let r, g, b;
    
    if (bgColor.startsWith('#')) {
      const hex = bgColor.replace('#', '');
      r = parseInt(hex.substring(0, 2), 16);
      g = parseInt(hex.substring(2, 4), 16);
      b = parseInt(hex.substring(4, 6), 16);
    } else if (bgColor.startsWith('rgb')) {
      const rgb = bgColor.match(/\d+/g);
      if (rgb && rgb.length >= 3) {
        r = parseInt(rgb[0]);
        g = parseInt(rgb[1]);
        b = parseInt(rgb[2]);
      } else {
        // Valeur par défaut si le format n'est pas reconnu
        return '#4f46e5';
      }
    } else {
      // Couleur par défaut si le format n'est pas reconnu
      return '#4f46e5';
    }
    
    // Calculer la luminance (formule simplifiée)
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    
    // Retourner noir si la luminance est élevée, blanc si elle est basse
    return luminance > 0.5 ? '#1e293b' : '#ffffff';
  };
  
  useEffect(() => {
    // Fonction pour détecter la couleur de fond
    const detectBackgroundColor = () => {
      try {
        // Récupérer l'élément parent du blog (ou un autre élément représentant le fond)
        const blogElement = document.querySelector('article') || document.body;
        
        // Récupérer la couleur de fond calculée
        const bgColor = window.getComputedStyle(blogElement).backgroundColor;
        
        // Définir la couleur de l'icône comme l'inverse de la couleur de fond
        setIconColor(getContrastColor(bgColor));
      } catch (error) {
        console.error('Erreur lors de la détection de la couleur de fond:', error);
      }
    };
    
    // Détecter la couleur au chargement
    detectBackgroundColor();
    
    // Observer les changements de couleur (optionnel, pour les thèmes dynamiques)
    const observer = new MutationObserver(detectBackgroundColor);
    const targetNode = document.body;
    observer.observe(targetNode, { attributes: true, attributeFilter: ['class', 'style'] });
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  const toggleHeaderInfo = () => {
    const headerInfo = document.getElementById('blog-header-info');
    if (headerInfo) {
      headerInfo.classList.toggle('hidden');
    }
  };
  return (
    <div className="absolute top-2 right-2 z-10">      <div
        className="cursor-pointer p-2 rounded-lg bg-white/60 backdrop-blur-sm shadow-sm hover:bg-white/80 hover:shadow-md hover:scale-110 transition-all duration-300"
        onClick={toggleHeaderInfo}
        role="button"
        aria-label="Afficher les informations du blog"
        tabIndex={0}
        style={{ backgroundColor: iconColor === '#ffffff' ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.6)' }}
      ><svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="32" 
          height="32" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke={iconColor}
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <path d="M14 2v6h6" />
          <path d="M16 13H8" />
          <path d="M16 17H8" />
          <path d="M10 9H8" />
        </svg>
      </div>
    </div>
  );
};

export default BlogHeaderInfoToggle;
