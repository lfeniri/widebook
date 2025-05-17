import { Metadata } from 'next';

// Type pour la configuration des métadonnées SEO
export interface SeoProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
  noIndex?: boolean;
  keywords?: string;
  ogAuthor?: string;
  additionalOgParams?: Record<string, any>;
}

/**
 * Construit l'URL absolue à partir d'un chemin relatif
 * @param path Chemin relatif (commençant par / ou non)
 * @returns URL absolue
 */
export function getAbsoluteUrl(path: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://widebook.fr';
  return `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
}

/**
 * Génère les balises meta à partir d'une liste de mots-clés
 * @param keywords Liste de mots-clés séparés par des virgules ou tableau de mots-clés
 * @returns Chaîne formatée pour les balises meta
 */
export function formatKeywords(keywords: string | string[]): string {
  if (Array.isArray(keywords)) {
    return keywords.join(', ');
  }
  return keywords;
}

/**
 * Nettoie un texte pour l'utiliser comme meta description
 * @param text Texte à nettoyer
 * @param maxLength Longueur maximale (par défaut 160 caractères)
 * @returns Texte nettoyé et tronqué
 */
export function cleanDescription(text: string, maxLength = 160): string {
  if (!text) return '';
  
  // Supprimer les balises HTML
  const withoutHtml = text.replace(/<[^>]*>/g, ' ');
  
  // Supprimer les espaces multiples
  const withoutExtraSpaces = withoutHtml.replace(/\s+/g, ' ').trim();
  
  // Tronquer à la longueur maximale
  if (withoutExtraSpaces.length <= maxLength) {
    return withoutExtraSpaces;
  }
  
  // Tronquer sans couper les mots
  return withoutExtraSpaces.substring(0, maxLength).split(' ').slice(0, -1).join(' ') + '...';
}

/**
 * Génère des métadonnées SEO pour les pages Next.js
 */
export function generateSeoMetadata({
  title,
  description,
  canonical,
  ogType = 'website',
  ogImage,
  noIndex = false,
  keywords,
  ogAuthor,
  additionalOgParams = {}
}: SeoProps): Metadata {
  // URL de base
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://widebook.fr';
  
  // Image OG par défaut
  const defaultOgImage = `${baseUrl}/og-image.jpg`;

  // Normaliser le type OpenGraph pour correspondre aux types attendus par Next.js
  const normalizedOgType = (ogType === 'website' || ogType === 'article' || 
    ogType === 'book' || ogType === 'profile') ? ogType : 'website';

  // Titre complet avec le nom du site
  const fullTitle = title ? `${title} | Widebook` : 'Widebook - Plateforme de blogs et publications';
  const defaultDescription = 'Créez et partagez vos idées sur Widebook, la plateforme de blogs et publications inspirée par Airbnb.';

  // Métadonnées de base
  const metadata: Metadata = {
    title: fullTitle,
    description: description || defaultDescription,
    keywords: keywords || 'blog, article, publication, contenu, rédaction, écriture',
    
    // Configuration des robots
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
      },
    },
    
    // Configuration OpenGraph
    openGraph: {
      title: fullTitle,
      description: description || defaultDescription,
      url: canonical ? `${baseUrl}${canonical}` : baseUrl,
      siteName: 'Widebook',
      locale: 'fr_FR',
      type: normalizedOgType,
      images: [
        {
          url: ogImage || defaultOgImage,
          width: 1200,
          height: 630,
          alt: title || 'Widebook',
        },
      ],
      ...(ogAuthor ? { authors: [ogAuthor] } : {}),
      ...additionalOgParams,
    },
    
    // Configuration Twitter Card
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: description || defaultDescription,
      images: ogImage ? [ogImage] : [defaultOgImage],
    },
  };

  // Ajouter un lien canonique si spécifié
  if (canonical) {
    metadata.alternates = {
      canonical: `${baseUrl}${canonical}`,
    };
  }

  return metadata;
}
