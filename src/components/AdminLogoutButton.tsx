"use client";

import userAuthService from '@/services/userAuthService';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function AdminLogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await userAuthService.signOut();
    router.push('/'); // Redirige vers la page d'accueil après déconnexion
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white rounded px-4 py-2 font-semibold hover:bg-red-600 transition-colors"
    >
      Déconnexion
    </button>
  );
}
