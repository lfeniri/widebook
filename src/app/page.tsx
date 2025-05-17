import ServerHomePage from '@/components/ServerHomePage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Widebook - Votre guide d\'actualité et de conseils',
  description: 'Découvrez des insights précieux pour votre quotidien avec Widebook, une plateforme qui vous conseille, vous informe et vous aide à trouver les meilleures astuces.',
  keywords: 'blog, actualité, conseils, astuces, bonnes affaires, expertise, information',
  openGraph: {
    title: 'Widebook - Votre guide d\'actualité et de conseils',
    description: 'Découvrez des insights précieux pour votre quotidien avec Widebook, une plateforme qui vous conseille, vous informe et vous aide à trouver les meilleures astuces.',
    url: 'https://widebook.fr',
    siteName: 'Widebook',
    images: [
      {
        url: '/globe.svg',
        width: 800,
        height: 600,
        alt: 'Widebook - Votre guide d\'actualité et de conseils',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
};

export default function Home() {
  // Cette page utilise désormais un composant rendu côté serveur pour un meilleur SEO
  return <ServerHomePage />;
}
