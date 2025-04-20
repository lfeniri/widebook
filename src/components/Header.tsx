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
    <header className="sticky-header animate-fadeInUp">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <img src="/logo.svg" alt="Logo" className="h-10 w-10 drop-shadow-md" />
          <span className="font-bold text-2xl tracking-tight text-primary">SoluMind</span>
        </div>
        <nav className="hidden md:flex gap-8 text-gray-700 text-base font-semibold">
          <a href="/client" className="relative group transition-colors">
            Accueil
            <span className="block h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200" />
          </a>
          {isAdmin && (
            <>
              <a href="/admin/categories" className="relative group transition-colors">
                Catégories
                <span className="block h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200" />
              </a>
              <a href="/admin/blogs" className="relative group transition-colors">
                Blog
                <span className="block h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200" />
              </a>
            </>
          )}
        </nav>
        <div className="flex items-center gap-2">
          {isAuth ? (
            <a href="/profile" title={user?.email} className="rounded-full w-9 h-9 flex items-center justify-center bg-green-500 text-white font-bold border-2 border-green-600 shadow hover:scale-105 transition-transform">
              <span>{user?.email?.[0]?.toUpperCase()}</span>
            </a>
          ) : (
            <a href="/admin/login" className="btn">Connecter</a>
          )}
        </div>
      </div>
    </header>
  );
}
