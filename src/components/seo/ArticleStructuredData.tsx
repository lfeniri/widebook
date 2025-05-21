import React from 'react';
import { Blog } from '@/types/blog';
import { extractContentText, getHtmlContent } from '@/lib/extractContentText';

interface ArticleStructuredDataProps {
  blog: Blog;
  url: string;
}

/**
 * Composant pour générer le balisage JSON-LD spécifique aux articles
 * Optimisé pour le référencement des blogs et articles
 */
const ArticleStructuredData: React.FC<ArticleStructuredDataProps> = ({ blog, url }) => {
  // URL de base pour les liens relatifs
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://widebook.fr';
  
  // Assurer que l'URL est absolue
  const fullUrl = url.startsWith('http') ? url : `${baseUrl}${url.startsWith('/') ? url : `/${url}`}`;
  
  // Extraction d'une description
  let description = blog.seoDesc || '';
  if (!description) {
    const htmlContent = getHtmlContent(blog.content);
    if (htmlContent) {
      description = extractContentText(htmlContent, 200);
    }
  }
  
  // Dates formatées
  const publishDate = blog.createdAt ? new Date(String(blog.createdAt)).toISOString() : new Date().toISOString();
  const modifiedDate = blog.updatedAt ? new Date(String(blog.updatedAt)).toISOString() : publishDate;
  
  // Construction de l'image
  const imageUrl = blog.image ? 
                 (blog.image.startsWith('http') ? blog.image : `${baseUrl}${blog.image.startsWith('/') ? blog.image : `/${blog.image}`}`) :
                 `${baseUrl}/og-image.jpg`;
  
  // Création des données structurées
  const articleData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': blog.seoTitle || blog.title,
    'name': blog.title,
    'description': description,    'author': {
      '@type': 'Person',
      'name': blog.author?.name || 'Widebook',
      'url': blog.author?.id ? `${baseUrl}/profile/${blog.author.id}` : `${baseUrl}/profile`
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Widebook',
      'logo': {
        '@type': 'ImageObject',
        'url': `${baseUrl}/logo.svg`
      }
    },
    'datePublished': publishDate,
    'dateModified': modifiedDate,
    'image': imageUrl,
    'url': fullUrl,
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': fullUrl
    },
    ...(blog.category ? {
      'articleSection': blog.category.name,
      'keywords': [blog.category.name, 'blog', 'article', blog.title]
    } : {})
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(articleData) }}
    />
  );
};

export default ArticleStructuredData;
