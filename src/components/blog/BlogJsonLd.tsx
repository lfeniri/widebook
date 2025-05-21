import React from 'react';
import { Blog } from '@/types/blog';
import { extractContentText, getHtmlContent } from '@/lib/extractContentText';

// Propriétés pour le composant BlogJsonLd
interface BlogJsonLdProps {
  blog: Blog;
  url: string;
}

// Composant React pour générer les données structurées JSON-LD pour un blog
const BlogJsonLd: React.FC<BlogJsonLdProps> = ({ blog, url }) => {
  // Obtenir le nom de l'auteur
  const getAuthorName = () => {
    if (!blog.author) return 'Anonyme';
    if (typeof blog.author === 'string') return blog.author;
    return blog.author.name || blog.author.email || 'Anonyme';
  };

  // Obtenir l'image à utiliser
  const getBlogImage = () => {
    if (blog.image && typeof blog.image === 'string') {
      // Si l'URL de l'image est relative, la rendre absolue
      if (blog.image.startsWith('/')) {
        return `${process.env.NEXT_PUBLIC_BASE_URL || 'https://widebook.fr'}${blog.image}`;
      }
      return blog.image;
    }
    // Image par défaut si pas d'image spécifiée
    return `${process.env.NEXT_PUBLIC_BASE_URL || 'https://widebook.fr'}/og-image.jpg`;
  };

  // Extraire une description du contenu
  const getDescription = () => {
    if (blog.seoDesc) return blog.seoDesc;
    
    // Tenter d'extraire du texte du contenu HTML
    const htmlContent = getHtmlContent(blog.content);
    if (htmlContent) {
      return extractContentText(htmlContent, 200);
    }
    
    return `Article de ${getAuthorName()} sur Widebook`;
  };

  // Formatage des dates de publication et modification
  const publishDate = blog.createdAt ? new Date(blog.createdAt).toISOString() : new Date().toISOString();
  const modifiedDate = blog.updatedAt ? new Date(blog.updatedAt).toISOString() : publishDate;

  // Créer les données structurées au format JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': blog.title,
    'name': blog.title,
    'description': getDescription(),
    'image': getBlogImage(),
    'datePublished': publishDate,
    'dateModified': modifiedDate,    'author': {
      '@type': 'Person',
      'name': getAuthorName(),
      'url': blog.author?.id ? `${process.env.NEXT_PUBLIC_BASE_URL || 'https://widebook.fr'}/profile/${blog.author.id}` : `${process.env.NEXT_PUBLIC_BASE_URL || 'https://widebook.fr'}/profile`
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Widebook',
      'logo': {
        '@type': 'ImageObject',
        'url': `${process.env.NEXT_PUBLIC_BASE_URL || 'https://widebook.fr'}/logo.svg`
      }
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': url
    },
    'inLanguage': 'fr-FR',
    'wordCount': blog.content && typeof blog.content === 'object' && blog.content.html ? 
                 blog.content.html.split(/\s+/).length : 0,
    'articleSection': blog.category?.name || 'Blog',
    'url': url,
    'isAccessibleForFree': true
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

export default BlogJsonLd;
