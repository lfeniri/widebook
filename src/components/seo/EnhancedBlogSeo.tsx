import React from 'react';
import BlogJsonLd from '@/components/blog/BlogJsonLd';
import BreadcrumbJsonLd from './BreadcrumbJsonLd';
import { Blog } from '@/types/blog';
import { cleanDescription } from '@/lib/seo';

interface EnhancedBlogSeoProps {
  blog: Blog;
  url: string;
  breadcrumbItems?: Array<{ name: string; item: string }>;
}

/**
 * Composant SEO amélioré spécifiquement pour les blogs
 * avec des balises JSON-LD complètes et d'autres éléments de SEO avancés
 */
const EnhancedBlogSeo: React.FC<EnhancedBlogSeoProps> = ({
  blog,
  url,
  breadcrumbItems,
}) => {
  // URL absolue
  const fullUrl = url ? (url.startsWith('http') ? url : `${process.env.NEXT_PUBLIC_BASE_URL || 'https://widebook.fr'}${url.startsWith('/') ? url : `/${url}`}`) : '';
  
  // Déterminer s'il y a du contenu HTML pour les articles en vedette
  const content = blog.content || {};
  const contentHtml = typeof content === 'object' && content.html || '';
  
  // Date de publication/modification
  const publishDate = blog.createdAt ? new Date(blog.createdAt).toISOString() : '';
  const modifiedDate = blog.updatedAt ? new Date(blog.updatedAt).toISOString() : '';
  
  // Extraire le texte pour les descriptions
  let textContent = '';
  if (contentHtml) {
    // Récupérer le texte brut du HTML pour les snippets
    textContent = cleanDescription(contentHtml, 200);
  }

  return (
    <>
      {/* Schema.org Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: blog.title,
            description: blog.seoDesc || textContent,
            image: blog.image,
            author: {
              '@type': 'Person',
              name: blog.author?.name || 'Widebook',
            },
            publisher: {
              '@type': 'Organization',
              name: 'Widebook',
              logo: {
                '@type': 'ImageObject',
                url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://widebook.fr'}/logo.svg`,
              },
            },
            datePublished: publishDate,
            dateModified: modifiedDate,
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': fullUrl,
            },
            ...(blog.category ? {
              about: {
                '@type': 'Thing',
                name: blog.category.name,
              },
            } : {}),
          }),
        }}
      />

      {/* Balises de partage social améliorées */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={blog.seoTitle || blog.title} />
      <meta name="twitter:description" content={blog.seoDesc || textContent} />
      {blog.image && <meta name="twitter:image" content={blog.image} />}
      
      {/* Open Graph supplémentaires */}
      <meta property="og:title" content={blog.seoTitle || blog.title} />
      <meta property="og:description" content={blog.seoDesc || textContent} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content="article" />
      {blog.image && <meta property="og:image" content={blog.image} />}
      {blog.category && <meta property="article:section" content={blog.category.name} />}
      {publishDate && <meta property="article:published_time" content={publishDate} />}
      {modifiedDate && <meta property="article:modified_time" content={modifiedDate} />}
      
      {/* Balise canonical explicite */}
      <link rel="canonical" href={fullUrl} />

      {/* Breadcrumbs si fournis */}
      {breadcrumbItems && breadcrumbItems.length > 0 && (
        <BreadcrumbJsonLd items={breadcrumbItems} />
      )}
      
      {/* Format Blog spécifique */}
      <BlogJsonLd blog={blog} url={fullUrl} />
    </>
  );
};

export default EnhancedBlogSeo;
