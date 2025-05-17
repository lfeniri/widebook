import { Metadata } from 'next';
import { generateSeoMetadata } from '@/lib/seo';

export const metadata: Metadata = generateSeoMetadata({
  title: 'Votre profil',
  description: 'Gérez votre profil Widebook et vos paramètres personnels',
  canonical: '/profile',
  noIndex: true, // Garder les pages de profil privées
});

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      {children}
    </div>
  );
}
