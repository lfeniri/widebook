"use client";
import React from "react";
import HomePage from '@/components/HomePage';
import { useRouter } from 'next/navigation';

/**
 * Wrapper autour du composant HomePage pour la version entièrement client
 * Cette version charge les blogs côté client via API
 */
export default function ClientHomePage() {
  const router = useRouter();

  return <HomePage clientSideFetching={true} />;
}
