"use client";
import React from "react";
import HomePage from '@/components/HomePage';
import { Blog } from '@/types/blog';

interface HomePageClientProps {
  blogs: Blog[];
}

/**
 * Wrapper autour du composant HomePage pour la version préchargée côté serveur
 * Utilise les blogs préchargés depuis le serveur
 */
export default function HomePageClient({ blogs }: HomePageClientProps) {
  return <HomePage initialBlogs={blogs} clientSideFetching={false} />;
}
