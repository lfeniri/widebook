import { serverBlogService } from '@/services/serverBlogService';
import { MetadataRoute } from 'next';

// Ajout de la revalidation ISR - régénère le sitemap toutes les 3 heures
export const revalidate = 10800;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Récupérer tous les blogs publics
  const blogs = await serverBlogService.getPublicBlogs();
  // Trouver la date de dernière modification parmi tous les blogs
  const lastModified = new Date(Math.max( ...blogs.map((blog) => new Date(blog.updatedAt || blog.createdAt).getTime()))
        || new Date());

  // URL de base
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://widebook.fr';
    // Pages statiques avec fréquences optimisées
  const staticPages = [
    {
      url: `${baseUrl}`,
      lastModified: lastModified,
      changeFrequency: 'daily' as const, // La page d'accueil change plus fréquemment
      priority: 1.0,
    },
    {
      url: `${baseUrl}/client`,
      lastModified: lastModified,
      changeFrequency: 'daily' as const,
      priority: 0.4,
    },
    {
      url: `${baseUrl}/authors`,
      lastModified: new Date('2024-06-10'),
      changeFrequency: 'monthly' as const, // Pages d'auteurs moins fréquemment mises à jour
      priority: 0.4,
    },
  ];  // URLs des blogs avec date de modification dynamique
  const blogUrls = blogs.map((blog) => ({
    url: `${baseUrl}/client/book-page/${blog.slug}`,
    lastModified: new Date(blog.updatedAt || blog.createdAt),
    changeFrequency: 'daily' as const,
    priority: 1.0,
  }));

  // Combiner toutes les URLs
  return [...staticPages, ...blogUrls];
}
