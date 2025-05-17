import { notFound } from 'next/navigation';
import BlogPageServer from './BlogPageServer';
import BlogInteractivity from './BlogInteractivity';
import { prisma } from '@/lib/prisma';
import { serializeFromPrisma } from './blogUtils';
import { Metadata } from 'next';
import { generateSeoMetadata } from '@/lib/seo';

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
  const { slug } = params;
  
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
  const { title, seoDesc, seoTitle, image, category } = blog;
  const authorName = blog.author?.name || '';
  const categoryName = category?.name || '';
  
  // Générer les métadonnées SEO
  return generateSeoMetadata({
    title: seoTitle || title,
    description: seoDesc || `Article de ${authorName} dans la catégorie ${categoryName}`,
    canonical: `/client/blog/${slug}`,
    ogImage: image || undefined,
    ogType: 'article'
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
                      typeof blogContent.js === 'string' && blogContent.js.trim().length > 0;

  return (
    <>
      {/* Rendu côté serveur du contenu principal du blog */}
      <BlogPageServer blog={serializedBlog} />
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


