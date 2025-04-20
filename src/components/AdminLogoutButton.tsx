"use client";

import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function AdminLogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
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
