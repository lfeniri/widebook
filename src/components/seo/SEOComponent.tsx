import React from 'react';
import BlogJsonLd from '@/components/blog/BlogJsonLd';
import BreadcrumbJsonLd from './BreadcrumbJsonLd';
import FaqJsonLd from './FaqJsonLd';
import { Blog } from '@/types/blog';

interface SeoComponentProps {
  /** Type de page (blog, page, home, etc.) */
  pageType?: 'blog' | 'category' | 'home' | 'profile' | 'other';
  /** Données du blog (si pageType est 'blog') */
  blog?: Blog;
  /** URL canonique de la page */
  url?: string;
  /** Items du fil d'Ariane */
  breadcrumbItems?: Array<{ name: string; item: string }>;
  /** Questions fréquentes pour les pages d'information */
  faqs?: Array<{ question: string; answer: string }>;
}

/**
 * Composant SEO centralisé qui regroupe tous les marquages JSON-LD nécessaires
 * Ajoute le bon balisage structuré en fonction du type de page
 */
const SEOComponent: React.FC<SeoComponentProps> = ({
  pageType = 'other',
  blog,
  url,
  breadcrumbItems,
  faqs,
}) => {
  // URL absolue
  const fullUrl = url ? (url.startsWith('http') ? url : `${process.env.NEXT_PUBLIC_BASE_URL || 'https://widebook.fr'}${url.startsWith('/') ? url : `/${url}`}`) : '';

  return (
    <>
      {/* Ajouter le balisage JSON-LD de blog si approprié */}
      {pageType === 'blog' && blog && (
        <BlogJsonLd blog={blog} url={fullUrl} />
      )}

      {/* Ajouter les breadcrumbs si fournis */}
      {breadcrumbItems && breadcrumbItems.length > 0 && (
        <BreadcrumbJsonLd items={breadcrumbItems} />
      )}

      {/* Ajouter les FAQs si fournies */}
      {faqs && faqs.length > 0 && (
        <FaqJsonLd faqs={faqs} />
      )}
    </>
  );
};

export default SEOComponent;
