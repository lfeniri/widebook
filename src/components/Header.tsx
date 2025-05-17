"use client";
import React from "react";
import { useAuth } from "@/components/AuthContext";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { UserCircleIcon } from "@heroicons/react/24/outline";

export default function Header() {
  const { user, loading } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAdmin = user?.role === "admin" || false;
  const isAuth = !!user || false;

  // Ensure consistent aria-labels and class names
  const navAriaLabel = "Navigation principale";
  const loginAriaLabel = "Se connecter";

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  // Navigation items for reuse
  const navItems = [
    { href: "/", label: "Accueil", ariaLabel: "Aller à l'accueil" },
    ...(isAuth ? [{ href: "/admin/blogs", label: "Blogs", ariaLabel: "Afficher la liste des blogs administratifs" }] : [])
  ];
  
  return (
    <header      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-sm shadow-md py-2" : "bg-white py-4"
      }`}
    >
      <div className="w-full flex items-center justify-between px-6">
        <motion.div 
          className="flex items-center gap-3"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.img
            src="/logo.svg"
            className="h-16 w-16 drop-shadow-md"
            alt="Widebook Logo"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          />
        </motion.div>
        
        {/* Desktop Navigation */}
        <nav
          className="hidden md:flex gap-8 text-gray-700 text-base font-semibold"
          aria-label={navAriaLabel}
        >
          {navItems.map((item, index) => (
            <motion.a
              key={item.href}
              href={item.href}
              className="relative group transition-colors"
              aria-label={item.ariaLabel}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ y: -2 }}
            >
              {item.label}
              <motion.span
                className="absolute -bottom-1 left-0 h-0.5 bg-primary w-full"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          ))}
        </nav>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            <motion.div
              className="flex flex-col gap-1.5 w-6"
              initial={false}
              animate={mobileMenuOpen ? "open" : "closed"}
            >
              <motion.span 
                className="h-0.5 bg-gray-700 rounded-full w-full block"
                variants={{
                  closed: { rotate: 0, translateY: 0 },
                  open: { rotate: 45, translateY: 7 }
                }}
              />
              <motion.span 
                className="h-0.5 bg-gray-700 rounded-full w-full block"
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 }
                }}
              />
              <motion.span 
                className="h-0.5 bg-gray-700 rounded-full w-full block"
                variants={{
                  closed: { rotate: 0, translateY: 0 },
                  open: { rotate: -45, translateY: -7 }
                }}
              />
            </motion.div>
          </button>
        </div>

        {/* Auth Actions */}
        <motion.div 
          className="flex items-center gap-4"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >          {isAuth ? (
            <>
              <motion.div
                className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center cursor-pointer text-white font-bold shadow-lg border-2 border-white"
                onClick={() => window.location.href = '/profile'}
                title="Profil"
                whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)" }}
                whileTap={{ scale: 0.95 }}
              >
                {user?.name?.charAt(0).toUpperCase() || 'U'}
                <span className="sr-only">Profil</span>
              </motion.div>
            </>          ) : (
            /*
            <motion.a
              href="/admin/login"
              className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full shadow-md flex items-center justify-center h-10 w-10 hover:shadow-lg"
              aria-label={loginAriaLabel}
              whileHover={{ 
                scale: 1.1, 
                boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)",
                rotate: [0, -5, 5, -5, 0],
                transition: { duration: 0.5 }
              }}
              whileTap={{ scale: 0.95 }}
              title="Connexion"
            >
              <UserCircleIcon className="h-6 w-6" />
              <span className="sr-only">Connexion</span>
            </motion.a>
            */
           <div></div>
          )}
        </motion.div>
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <motion.div 
          className="md:hidden bg-white border-t border-gray-100 absolute left-0 right-0 shadow-lg"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-6 py-4 flex flex-col gap-4">
            {navItems.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                className="py-2 px-3 hover:bg-gray-50 rounded-md text-gray-700 font-medium transition-colors"
                aria-label={item.ariaLabel}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {item.label}
              </motion.a>
            ))}
          </div>
        </motion.div>
      )}
    </header>
  );
}
