import { notFound } from 'next/navigation';
import BlogPageServer from './BlogPageServer';
import BlogInteractivity from './BlogInteractivity';
import BlogClientSeo from './BlogClientSeo';
import { prisma } from '@/lib/prisma';
import { serializeFromPrisma } from './blogUtils';
import { Metadata } from 'next';
import { generateSeoMetadata } from '@/lib/seo';
import { extractContentText, getHtmlContent } from '@/lib/extractContentText';

// Revalidation périodique des pages de blog (toutes les 3 heures)
export const revalidate = 10800;

// Fonction pour pré-générer les chemins statiques pour les blogs
export async function generateStaticParams() {
  // Récupérer tous les blogs pour pré-générer leurs pages
  const blogs = await prisma.blog.findMany({
    select: {
      slug: true,
    },
  });
  
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

// Fonction de génération de métadonnées dynamiques pour le SEO
export async function generateMetadata({ 
  params 
}: { 
  params: { slug: string } 
}): Promise<Metadata> {
  const { slug } = await params;
  
  // Récupérer les données du blog pour les métadonnées
  const blog = await prisma.blog.findUnique({
    where: { slug },
    include: { 
      category: true,
      author: true 
    }
  });
    // Si le blog n'existe pas, retourner les métadonnées par défaut
  if (!blog) {
    return generateSeoMetadata({
      title: 'Blog non trouvé',
      description: 'Le blog que vous recherchez n\'existe pas',
      noIndex: true
    });
  }
  
  // Extraire les informations utiles du blog
  const { title, seoDesc, seoTitle, image, category, content, createdAt, updatedAt } = blog;
  const authorName = blog.author?.name || '';
  const categoryName = category?.name || '';
  
  // Extraire le texte du contenu pour une meilleure description
  const htmlContent = getHtmlContent(content);
  const contentText = htmlContent ? extractContentText(htmlContent, 200) : '';
  
  // Construire les mots-clés
  const keywordsText = `${title}, ${categoryName}, blog, article, ${authorName}`;
  
  // Générer les métadonnées SEO
  return generateSeoMetadata({
    title: seoTitle || title,
    description: seoDesc || contentText || `Article de ${authorName} dans la catégorie ${categoryName}`,
    canonical: `/client/blog/${slug}`,
    ogImage: image || undefined,
    ogType: 'article' as 'article',
    keywords: keywordsText,
    additionalOgParams: {
      authors: authorName ? [authorName] : undefined,
      publishedTime: createdAt ? new Date(String(createdAt)).toISOString() : undefined,
      modifiedTime: updatedAt ? new Date(String(updatedAt)).toISOString() : undefined,
      section: categoryName,
      tags: [categoryName, 'blog', 'article'],
    }
  });
}

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
                      typeof blogContent.js === 'string' && blogContent.js.trim().length > 0;  return (
    <>
      {/* Rendu côté serveur du contenu principal du blog */}
      <BlogPageServer blog={serializedBlog} />
      
      {/* Composant client pour SEO supplémentaire */}
      <BlogClientSeo blog={serializedBlog} />
      
      {/* Composant client uniquement pour le code JavaScript du blog */}
      {hasJavaScript && blogContent.js && (
        <BlogInteractivity 
          js={String(blogContent.js)} 
          blogId={serializedBlog.id} 
        />
      )}
    </>
  );
}


