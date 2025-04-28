"use client";
import React from "react";
import { useAuth } from "@/components/AuthContext";
import AdminLogoutButton from "@/components/AdminLogoutButton";
import ProfileMenu from "@/components/ProfileMenu";
import { useState, useRef, useEffect } from "react";

export default function Header() {
  const { user, loading } = useAuth();

  const isAdmin = user?.role === "admin" || false;
  const isAuth = !!user || false;

  // Ensure consistent aria-labels and class names
  const navAriaLabel = "Navigation principale";
  const loginAriaLabel = "Se connecter";

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  return (
    <header className="sticky-header animate-fadeInUp">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <img
            src="/logo.svg"
            alt="Logo de SoluMind"
            className="h-10 w-10 drop-shadow-md"
            style={{ width: 'auto' }}
          />
          <span className="font-bold text-2xl tracking-tight text-primary">
            SoluMind
          </span>
        </div>
        <nav
          className="hidden md:flex gap-8 text-gray-700 text-base font-semibold"
          aria-label={navAriaLabel}
        >
          <a
            href="/"
            className="relative group transition-colors"
            aria-label="Aller à l'accueil"
          >
            Accueil
            <span
              className="block h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200"
            />
          </a>
          <a
            href="/blogs"
            className="relative group transition-colors"
            aria-label="Rechercher des blogs"
          >
            Recherche
            <span
              className="block h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200"
            />
          </a>
          {isAuth && (
            <a
              href="/admin/blogs"
              className="relative group transition-colors"
              aria-label="Afficher la liste des blogs administratifs"
            >
              Blogs
              <span
                className="block h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200"
              />
            </a>
          )}
        </nav>
        <div className="flex items-center gap-4">
          {isAuth ? (
            <>
              <div
                className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center cursor-pointer"
                onClick={() => window.location.href = '/profile'}
                title="Profil"
              >
                <span className="sr-only">Profil</span>
              </div>
            </>
          ) : (
            <a
              href="/login"
              className="px-4 py-2 bg-primary text-white rounded-md shadow-md hover:bg-primary-dark transition"
              aria-label={loginAriaLabel}
            >
              Connexion
            </a>
          )}
        </div>
      </div>
    </header>
  );
}
