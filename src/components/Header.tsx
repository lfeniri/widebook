"use client";
import React from "react";
import { useAuth } from "@/components/AuthContext";
import AdminLogoutButton from "@/components/AdminLogoutButton";
import ProfileMenu from "@/components/ProfileMenu";
import { useState, useRef, useEffect } from "react";

export default function Header() {
  const { user, loading } = useAuth();

  const isAdmin = user && user.role === "admin";
  const isAuth = !!user;
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  // Affiche le header même pendant le chargement, mais grise les boutons si loading
  const userName = user?.name || user?.email || "Utilisateur";

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
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="rounded-full w-10 h-10 flex items-center justify-center bg-gray-100 border border-gray-300 shadow hover:ring-2 hover:ring-primary/40 transition-all focus:outline-none"
                title={user?.email}
              >
                {userName[0]?.toUpperCase()}
              </button>
              <ProfileMenu user={user} open={menuOpen} anchorRef={menuRef} onClose={() => setMenuOpen(false)} />
            </div>
          ) : (
            <a href="/admin/login" className={`btn${loading ? ' opacity-50 pointer-events-none' : ''}`}>Connecter</a>
          )}
        </div>
      </div>
    </header>
  );
}
