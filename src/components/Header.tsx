"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface UserInfo {
  email: string;
  role: string;
}

export default function Header() {
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    async function fetchUser() {
      const { data: { session } } = await supabase.auth.getSession();
      console.log(session);
      if (session?.user) {
        // Fetch user role from public metadata or a custom table if needed
        let role = "";
        if (session.user?.role) {
          role = session.user.role;
        } else {
          // fallback: fetch from a custom profile table if needed
          // role = await fetchUserRole(session.user.id);
        }
        setUser({ email: session.user.email ?? "", role });
      } else {
        setUser(null);
      }
    }
    fetchUser();
    const { data: listener } = supabase.auth.onAuthStateChange(() => fetchUser());
    return () => { listener?.subscription.unsubscribe(); };
  }, []);

  const isAdmin = user && user.role === "admin";
  const isAuth = !!user;

  return (
    <header className="w-full border-b bg-white/80 backdrop-blur sticky top-0 z-30 transition-shadow shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">
        <div className="flex items-center gap-3">
          <img src="/logo.svg" alt="Logo" className="h-9 w-9" />
          <span className="font-bold text-2xl tracking-tight text-primary">SoluMind</span>
        </div>
        <nav className="flex gap-8 text-gray-700 text-base font-semibold">
          <a href="/client" className="hover:text-primary transition-colors">Accueil</a>
          {isAdmin && (
            <>
              <a href="/admin/categories" className="hover:text-primary transition-colors">Catégories</a>
              <a href="/admin/blogs" className="hover:text-primary transition-colors">Blog</a>
            </>
          )}
        </nav>
        <div className="flex items-center gap-2">
          {isAuth ? (
            <a href="/profile" title={user?.email} className="rounded-full w-8 h-8 flex items-center justify-center bg-green-500 text-white font-bold border-2 border-green-600 cursor-pointer">
              <span>{user?.email?.[0]?.toUpperCase()}</span>
            </a>
          ) : (
            <a href="/admin/login" className="bg-primary text-white px-4 py-2 rounded font-semibold hover:bg-primary/90 transition-colors">Connecter</a>
          )}
        </div>
      </div>
    </header>
  );
}
