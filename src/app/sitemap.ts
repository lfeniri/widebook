import { serverBlogService } from '@/services/serverBlogService';
import { MetadataRoute } from 'next';

// Ajout de la revalidation ISR - régénère le sitemap toutes les 3 heures
export const revalidate = 10800;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Récupérer tous les blogs publics
  const blogs = await serverBlogService.getPublicBlogs();
  
  // URL de base
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://widebook.fr';
    // Pages statiques avec fréquences optimisées
  const staticPages = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const, // La page d'accueil change plus fréquemment
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const, // La liste des blogs change quand un nouveau blog est publié
      priority: 0.8,
    },
    {
      url: `${baseUrl}/client`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/profile`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const, // Pages de profil moins fréquemment mises à jour
      priority: 0.5,
    },
  ];
  // URLs des blogs avec date de modification dynamique
  const blogUrls = blogs.map((blog) => ({
    url: `${baseUrl}/client/blog/${blog.slug}`,
    lastModified: new Date(blog.updatedAt || blog.createdAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // URLs des catégories (si nécessaire)
  // Obtenir les catégories uniques des blogs
  const categoryIds = [...new Set(blogs.map(blog => blog.categoryId).filter(Boolean))];
  const categoryUrls = categoryIds.map((id) => ({
    url: `${baseUrl}/blogs?category=${id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }));

  // Combiner toutes les URLs
  return [...staticPages, ...blogUrls, ...categoryUrls];
}
