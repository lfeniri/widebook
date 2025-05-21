"use client";

import React from 'react';
import Head from 'next/head';
import { Blog } from '@/types/blog';
import { cleanDescription } from '@/lib/seo';

interface AdvancedBlogMetaProps {
  blog: Blog;
  url: string;
}

/**
 * Composant client pour ajouter des balises meta spécifiques pour blog
 * Ce composant est nécessaire pour compléter les métadonnées avancées dans la partie client
 * notamment pour des plateformes de partage social et autres balises spécifiques.
 */
const AdvancedBlogMeta: React.FC<AdvancedBlogMetaProps> = ({ blog, url }) => {
  // Extraire le texte depuis le contenu HTML pour les descriptions
  const extractTextFromHtml = () => {
    if (!blog.content) return '';
    
    const content = blog.content;
    if (typeof content === 'object' && content.html) {
      return cleanDescription(content.html, 200);
    }
    
    return '';
  };

  // URL absolue
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://widebook.fr';
  const fullUrl = url.startsWith('http') ? url : `${baseUrl}${url.startsWith('/') ? url : `/${url}`}`;
  
  // Dates formatées
  const publishDate = blog.createdAt ? new Date(blog.createdAt).toISOString() : '';
  const modifiedDate = blog.updatedAt ? new Date(blog.updatedAt).toISOString() : '';
  
  // Texte pour description
  const description = blog.seoDesc || extractTextFromHtml() || 
                      `Article de ${blog.author?.name || 'Widebook'} dans la catégorie ${blog.category?.name || 'Blog'}`;

  // Image à utiliser
  const imageUrl = blog.image ? 
                 (blog.image.startsWith('http') ? blog.image : `${baseUrl}${blog.image.startsWith('/') ? blog.image : `/${blog.image}`}`) :
                 `${baseUrl}/og-image.jpg`;

  return (
    <Head>
      {/* Balises meta pour Twitter cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@widebook" />
      <meta name="twitter:title" content={blog.seoTitle || blog.title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:creator" content={blog.author?.name ? `@${blog.author.name}` : '@widebook'} />
      
      {/* Balises meta Open Graph supplémentaires */}
      <meta property="article:published_time" content={publishDate} />
      <meta property="article:modified_time" content={modifiedDate} />
      {blog.category?.name && <meta property="article:section" content={blog.category.name} />}
      <meta property="article:tag" content={blog.category?.name || 'Blog'} />
      
      {/* Balises meta pour les moteurs de recherche spécifiques */}
      <meta name="news_keywords" content={`${blog.title}, ${blog.category?.name || 'Blog'}, article, ${blog.author?.name || 'Widebook'}`} />
      
      {/* Balises de navigation pour les robots */}
      <link rel="canonical" href={fullUrl} />
      
      {/* Balises pour l'indexation mobile */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="HandheldFriendly" content="true" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
    </Head>
  );
};

export default AdvancedBlogMeta;
