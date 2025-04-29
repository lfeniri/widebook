import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Récupérer le slug depuis l'URL pour les pages de blog
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
  matcher: '/client/blog/:slug*',
};
