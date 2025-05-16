import React from 'react';
import { Blog } from '@/types/blog';

interface BlogPageServerProps {
  blog: Blog;
}

const BlogPageServer: React.FC<BlogPageServerProps> = ({ blog }) => {
  // Support both the old { html, css } format and the new { html, css, js } format
  const content = blog.content || {};
  const contentHtml = typeof content === 'object' && content.html || '';
  const contentCss = typeof content === 'object' && content.css || '';
  
  // Formater la date
  const formattedDate = blog.createdAt 
    ? new Date(blog.createdAt).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    : '';
  
  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      {/* En-tête du blog */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-3">{blog.title}</h1>
        
        <div className="flex items-center text-sm text-gray-600 mb-4">
          {formattedDate && (
            <span className="mr-4">{formattedDate}</span>
          )}
          
          {blog.category?.name && (
            <span className="bg-[#ff385c]/10 text-[#ff385c] font-medium px-2 py-1 rounded-full text-xs">
              {blog.category.name}
            </span>
          )}
          
          {blog.author?.email && (
            <span className="ml-auto">
              Par {blog.author.email}
            </span>
          )}
        </div>
        
        {blog.image && (
          <div className="w-full h-64 md:h-96 overflow-hidden rounded-lg mb-8">
            <img 
              src={blog.image} 
              alt={blog.title} 
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </header>
      
      {/* Contenu du blog */}
      {content && (
        <div className="blog-content-container prose prose-lg max-w-none">
          {/* Rendre le HTML du blog directement */}
          <div 
            className="blog-content" 
            dangerouslySetInnerHTML={{ __html: contentHtml }} 
          />
          
          {/* Injecter le CSS directement */}
          {contentCss && (
            <style dangerouslySetInnerHTML={{ __html: contentCss }} />
          )}
        </div>
      )}
    </article>
  );
};

export default BlogPageServer;
