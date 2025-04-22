"use client";
import React from "react";
import { useAuth } from "@/components/AuthContext";

export default function Header() {
  const { user, loading } = useAuth();

  const isAdmin = user && user.role === "admin";
  const isAuth = !!user;

  // Affiche le header même pendant le chargement, mais grise les boutons si loading
  return (
    <header className="sticky-header animate-fadeInUp">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <img src="/logo.svg" alt="Logo" className="h-10 w-10 drop-shadow-md" style={{ width: 'auto' }} />
          <span className="font-bold text-2xl tracking-tight text-primary">SoluMind</span>
        </div>
        <nav className="hidden md:flex gap-8 text-gray-700 text-base font-semibold">
          <a href="/" className="relative group transition-colors">
            Accueil
            <span className="block h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200" />
          </a>
          <a href="/blogs" className="relative group transition-colors">
            Recherche
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
            <a href="/profile" title={user?.email} className="rounded-full w-9 h-9 flex items-center justify-center bg-green-500 text-white font-bold border-2 border-green-600 shadow hover:scale-105 transition-transform opacity-100">
              <span>{user?.email?.[0]?.toUpperCase()}</span>
            </a>
          ) : (
            <a href="/admin/login" className={`btn${loading ? ' opacity-50 pointer-events-none' : ''}`}>Connecter</a>
          )}
        </div>
      </div>
    </header>
  );
}
