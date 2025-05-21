import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Traiter les demandes dirigées vers le nouveau chemin /client/book-page/
  if (request.nextUrl.pathname.startsWith('/client/book-page/')) {
    const slug = request.nextUrl.pathname.split('/').pop();
    
    // Valider le slug
    if (!slug) {
      return NextResponse.redirect(new URL('/404', request.url));
    }
    
    // Interne: Réécrit l'URL pour pointer vers la structure de dossier actuelle (/client/blog/)
    // tout en gardant l'URL visible comme /client/book-page/ pour l'utilisateur
    const url = request.nextUrl.clone();
    url.pathname = `/client/blog/${slug}`;
    
    // Ajouter le slug validé aux headers
    const headers = new Headers(request.headers);
    headers.set('x-validated-slug', slug);
    
    return NextResponse.rewrite(url);
  }
  
  // Traiter les demandes dirigées vers l'ancien chemin /client/blog/ (pour compatibilité)
  if (request.nextUrl.pathname.startsWith('/client/blog/')) {
    const slug = request.nextUrl.pathname.split('/').pop();
    
    // Valider le slug
    if (!slug) {
      return NextResponse.redirect(new URL('/404', request.url));
    }

    // Ajouter le slug validé aux headers
    const headers = new Headers(request.headers);
    headers.set('x-validated-slug', slug);

    return NextResponse.next({
      request: {
        headers,
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/client/blog/:slug*', '/client/book-page/:slug*'],
};
