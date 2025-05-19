import { Suspense } from 'react';
import ClientHomePage from './ClientHomePage';
import type { Metadata } from 'next';
import { generateSeoMetadata } from '@/lib/seo';

export const metadata: Metadata = generateSeoMetadata({
  title: 'Widebook Client - Version dynamique',
  description: 'Version entièrement client de Widebook, avec chargement dynamique des données.',
  canonical: '/client',
  ogType: 'website',
});

export default function ClientPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Chargement...</div>}>
      <ClientHomePage />
    </Suspense>
  );
}