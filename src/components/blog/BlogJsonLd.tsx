import React from 'react';
import { Blog } from '@/types/blog';

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

  // Créer les données structurées au format JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': blog.title,
    'description': blog.seoDesc || '',
    'image': getBlogImage(),
    'datePublished': blog.createdAt,
    'dateModified': blog.updatedAt,
    'author': {
      '@type': 'Person',
      'name': getAuthorName()
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
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

export default BlogJsonLd;
