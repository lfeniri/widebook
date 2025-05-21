"use client";

import React, { useEffect } from 'react';
import Head from 'next/head';
import { Blog } from '@/types/blog';

interface SeoTagsInjectorProps {
  blog: Blog;
  url: string;
}

/**
 * Composant client qui injecte des balises meta et SEO supplémentaires
 * Utilise next/head pour les balises qui ne peuvent pas être ajoutées côté serveur
 */
const SeoTagsInjector: React.FC<SeoTagsInjectorProps> = ({ blog, url }) => {
  // URL absolue
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://widebook.fr';
  const fullUrl = url.startsWith('http') ? url : `${baseUrl}${url.startsWith('/') ? url : `/${url}`}`;
  
  // Construction de l'image pour les réseaux sociaux
  const imageUrl = blog.image ? 
                 (blog.image.startsWith('http') ? blog.image : `${baseUrl}${blog.image.startsWith('/') ? blog.image : `/${blog.image}`}`) :
                 `${baseUrl}/og-image.jpg`;
  
  // Dates formatées pour OpenGraph
  const publishDate = blog.createdAt ? new Date(String(blog.createdAt)).toISOString() : '';
  const modifiedDate = blog.updatedAt ? new Date(String(blog.updatedAt)).toISOString() : '';
  
  return (
    <Head>
      {/* Balises canoniques et alternatives */}
      <link rel="canonical" href={fullUrl} />
      
      {/* Facebook Open Graph */}
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:site_name" content="Widebook" />
      <meta property="og:title" content={blog.seoTitle || blog.title} />
      <meta property="og:description" content={blog.seoDesc || `Article de ${blog.author?.name || 'Widebook'}`} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content="article" />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      
      {/* Facebook article specifics */}
      {publishDate && <meta property="article:published_time" content={publishDate} />}
      {modifiedDate && <meta property="article:modified_time" content={modifiedDate} />}
      {blog.category?.name && <meta property="article:section" content={blog.category.name} />}
      <meta property="article:tag" content={blog.category?.name || 'Blog'} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={blog.seoTitle || blog.title} />
      <meta name="twitter:description" content={blog.seoDesc || `Article de ${blog.author?.name || 'Widebook'}`} />
      <meta name="twitter:image" content={imageUrl} />
      
      {/* Publisher and Author info */}
      <meta name="author" content={blog.author?.name || 'Widebook'} />
      <meta name="publisher" content="Widebook" />
      
      {/* Mobile device optimization */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="HandheldFriendly" content="true" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
    </Head>
  );
};

export default SeoTagsInjector;
