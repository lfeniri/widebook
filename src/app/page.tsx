import ServerHomePage from '@/components/ServerHomePage';
import type { Metadata } from 'next';
import { generateSeoMetadata } from '@/lib/seo';

// Revalidation périodique de la page d'accueil (toutes les 3 heures)
export const revalidate = 10800;

export const metadata: Metadata = generateSeoMetadata({
  title: 'Widebook - Votre guide d\'actualité et de conseils',
  description: 'Découvrez des insights précieux pour votre quotidien avec Widebook, une plateforme qui vous conseille, vous informe et vous aide à trouver les meilleures astuces.',
  canonical: '/',
  ogType: 'website',
});

export default function Home() {
  // Cette page utilise désormais un composant rendu côté serveur pour un meilleur SEO
  return <ServerHomePage />;
}
