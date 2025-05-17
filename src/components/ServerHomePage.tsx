import React from "react";
import { serverBlogService } from '@/services/serverBlogService';
import HomePageClient from '@/components/HomePageClient';
import { Blog } from '@/types/blog';

// Ce composant est rendu côté serveur pour un meilleur SEO
export default async function ServerHomePage() {
  // Récupération des blogs côté serveur
  let blogs: Blog[] = [];
  try {
    blogs = await serverBlogService.getPublicBlogs();
  } catch (error) {
    console.error("Error fetching blogs:", error);
  }

  // On passe les données récupérées côté serveur au composant client pour l'interactivité
  return <HomePageClient blogs={blogs} />;
}
