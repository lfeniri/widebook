import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/AuthContext";
import { generateSeoMetadata } from "@/lib/seo";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = generateSeoMetadata({
  title: "Accueil",
  description: "Widebook - Votre plateforme de blogs et de contenu avec une expérience utilisateur inspirée d'Airbnb",
  canonical: "/",
  ogImage: "/og-image-home.jpg",
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="fr">
      <head>
        <link rel="preload" href="/logo.svg" as="image" type="image/svg+xml" />
        <link rel="icon" href="/favicons/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="icon" href="/favicons/favicon-16x16.png" type="image/png" sizes="16x16" />
        <link rel="apple-touch-icon" href="/favicons/favicon-128x128.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />

      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-[#f8fafc] to-[#e0e7ef] min-h-screen flex flex-col`}>
        <AuthProvider>
          <Header />
          <main className="flex-1 w-full px-4 animate-fadeInUp">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
