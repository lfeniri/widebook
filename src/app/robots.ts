import { MetadataRoute } from 'next';

/**
 * Robots.txt configuration for SEO optimization
 * This file helps search engines understand which areas of the site to crawl and index
 * @returns {MetadataRoute.Robots} The robots.txt configuration
 */
export default function robots(): MetadataRoute.Robots {
  // URL de base
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://widebook.fr';
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/blogs/',
          '/client/',
          '/profile/',
        ],
        disallow: [
          '/admin/',
          '/api/',
          '/reset-password/',
          '/*/draft/',    // Versions brouillon
          '/_next/data/',  // Données JSON d'API routes (pas nécessaires pour le SEO)
        ],
        crawlDelay: 10,   // Délai entre les requêtes du crawler en secondes
      },
      {
        // Règles spécifiques pour Googlebot
        userAgent: 'Googlebot',
        allow: [
          '/',
          '/blogs/',
          '/client/',
          '/profile/',
        ],
        disallow: [
          '/admin/',
          '/api/',
          '/reset-password/',
          '/_next/data/',  // Données JSON d'API routes (pas nécessaires pour le SEO)
        ],
      },
      {
        // Règles spécifiques pour Bingbot
        userAgent: 'Bingbot',
        allow: [
          '/',
          '/blogs/',
          '/client/',
          '/profile/',
        ],
        disallow: [
          '/admin/',
          '/api/',
          '/reset-password/',
          '/_next/data/',  // Données JSON d'API routes (pas nécessaires pour le SEO)
        ],
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
