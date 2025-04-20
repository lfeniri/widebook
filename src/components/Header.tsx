import React from "react";

export default function Header() {
  return (
    <header className="w-full border-b bg-white/80 backdrop-blur sticky top-0 z-30 transition-shadow shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-2">
          <img src="/logo.svg" alt="Logo" className="h-8 w-8" />
          <span className="font-bold text-xl tracking-tight">SoluMind</span>
        </div>
        <nav className="hidden md:flex gap-6 text-gray-700 text-base font-medium">
          <a href="/client" className="hover:text-primary transition-colors">Accueil</a>
          <a href="/client/categories" className="hover:text-primary transition-colors">Catégories</a>
          <a href="/client/about" className="hover:text-primary transition-colors">À propos</a>
        </nav>
        <div className="flex items-center gap-2">
          {/* Place for future user menu or theme switcher */}
        </div>
      </div>
    </header>
  );
}
