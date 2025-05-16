import { notFound } from 'next/navigation';
import BlogPageServer from './BlogPageServer';
import BlogInteractivity from './BlogInteractivity';
import { prisma } from '@/lib/prisma';
import { serializeFromPrisma } from './blogUtils';

export default async function BlogPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  if (!slug) notFound();
  
  // Récupération des données du blog directement dans la page principale
  // pour éviter un affichage "Chargement..." inutile
  const blog = await prisma.blog.findUnique({
    where: { slug },
    include: { 
      category: true, 
      author: true, 
      comments: { 
        include: { 
          author: true 
        } 
      }
    }
  });

  if (!blog) notFound();
  
  // Sérialiser le blog pour un typage sûr
  const serializedBlog = serializeFromPrisma(blog);
  
  // Récupérer le contenu du blog pour vérifier s'il y a du JavaScript
  const blogContent = blog.content;
  const hasJavaScript = typeof blogContent === 'object' && blogContent && 'js' in blogContent && 
                      typeof blogContent.js === 'string' && blogContent.js.trim().length > 0;

  return (
    <>
      {/* Rendu côté serveur du contenu principal du blog */}
      <BlogPageServer blog={serializedBlog} />
      
      {/* Composant client uniquement pour le code JavaScript du blog */}
      {hasJavaScript && blogContent.js && (
        <BlogInteractivity 
          js={blogContent.js} 
          blogId={serializedBlog.id} 
        />
      )}
    </>
  );
}


