import React from 'react';
import { Blog } from '@/types/blog';
import BlogHeaderInfoToggle from './BlogHeaderInfoToggle';

interface BlogHeaderProps {
  blog: Blog;
}

// Fonction pour formater une date
const formatDate = (dateString: string): string => {
  try {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  } catch (error) {
    console.error('Error formatting date:', error);
    return String(dateString) || 'Date inconnue';
  }
};

// Fonction pour extraire le nom de la catégorie en toute sécurité
const getCategoryName = (category: any): string => {
  if (!category) return 'Non classé';
  if (typeof category === 'string') return category;
  if (typeof category === 'object' && category.name) return category.name;
  return 'Non classé';
};

// Fonction pour extraire le nom de l'auteur en toute sécurité
const getAuthorName = (author: any): string => {
  try {
    if (!author) return 'Auteur anonyme';
    if (typeof author === 'string') return author;
    if (typeof author === 'object') {
      // Si name est un objet (format firstname/lastname)
      if (author.name && typeof author.name === 'object' && author.name !== null) {
        const firstName = author.name.firstname || author.name.first_name || '';
        const lastName = author.name.lastname || author.name.last_name || '';
        if (firstName || lastName) {
          return `${firstName} ${lastName}`.trim();
        }
      }
      // Si name est une chaîne
      else if (author.name && typeof author.name === 'string') {
        return author.name;
      }
        // Autres propriétés possibles
      const authorName = author.full_name || 
                        author.first_name;
      
      // S'assurer que la valeur est une chaîne et ne jamais afficher l'email
      return typeof authorName === 'string' && authorName ? authorName : 'Auteur anonyme';
    }
    return 'Auteur anonyme';
  } catch (error) {
    console.error('Error getting author name:', error);
    return 'Auteur anonyme';
  }
};

const BlogHeader: React.FC<BlogHeaderProps> = ({ blog }) => {
  // Vérifier et nettoyer les données du blog pour éviter les erreurs de rendu
  const sanitizedBlog = {
    ...blog,
    // Assurez-vous que l'auteur et la catégorie sont des objets valides
    author: blog.author || undefined,
    category: blog.category || undefined,
    // Assurez-vous que les propriétés textuelles sont des chaînes
    title: typeof blog.title === 'string' ? blog.title : String(blog.title || 'Sans titre'),
    seoDesc: typeof blog.seoDesc === 'string' ? blog.seoDesc : String(blog.seoDesc || '')
  };

  return (
    <>
      {/* Header Info Toggle Button (Client Component) */}
      <BlogHeaderInfoToggle />
      
      {/* Blog Header Information (hidden by default) */}
      <div id="blog-header-info" className="hidden w-full p-6 mb-6 bg-white/90 backdrop-blur-sm rounded-lg shadow-md transition-all duration-300">
        <h1 className="text-3xl font-bold mb-2">{sanitizedBlog.title}</h1>
        <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-4">
          {sanitizedBlog.author && (
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span>{getAuthorName(sanitizedBlog.author)}</span>
            </div>
          )}
          
          {sanitizedBlog.createdAt && (
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar">
                <path d="M8 2v4" />
                <path d="M16 2v4" />
                <rect width="18" height="18" x="3" y="4" rx="2" />
                <path d="M3 10h18" />
              </svg>
              <span>Publié le {formatDate(sanitizedBlog.createdAt)}</span>
            </div>
          )}
          
          {sanitizedBlog.category && (
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-tag">
                <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
                <path d="M7 7h.01" />
              </svg>
              <span>{getCategoryName(sanitizedBlog.category)}</span>
            </div>
          )}
        </div>
        
        {sanitizedBlog.seoDesc && (
          <p className="text-gray-700 italic">{sanitizedBlog.seoDesc}</p>
        )}
      </div>
    </>
  );
};

export default BlogHeader;
