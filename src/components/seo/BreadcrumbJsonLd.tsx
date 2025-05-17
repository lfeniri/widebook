import React from 'react';

interface BreadcrumbItem {
  name: string;
  item: string;
}

interface BreadcrumbJsonLdProps {
  items: BreadcrumbItem[];
  baseUrl?: string;
}

/**
 * Composant pour générer le balisage structuré JSON-LD des fils d'Ariane (breadcrumbs)
 * Ce balisage aide Google à comprendre la hiérarchie de votre site
 * et peut améliorer l'affichage dans les résultats de recherche
 */
const BreadcrumbJsonLd: React.FC<BreadcrumbJsonLdProps> = ({ 
  items,
  baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://widebook.fr'
}) => {
  // Vérifier qu'il y a des éléments à afficher
  if (!items || items.length === 0) {
    return null;
  }

  // Créer le format BreadcrumbList pour le balisage structuré
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': item.item.startsWith('http') ? item.item : `${baseUrl}${item.item}`
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

export default BreadcrumbJsonLd;
