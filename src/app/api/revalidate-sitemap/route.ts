import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

/**
 * Route API pour forcer la regénération du sitemap
 * À appeler après la création ou modification d'un blog
 * 
 * Sécurisée par un token pour éviter les abus
 * 
 * Exemple d'utilisation:
 * fetch('/api/revalidate-sitemap', {
 *   method: 'POST',
 *   headers: { 'x-revalidate-token': process.env.REVALIDATE_TOKEN },
 * })
 */
export async function POST(request: Request) {
  try {
    // Vérifier le token de sécurité
    const token = request.headers.get('x-revalidate-token');
    const validToken = process.env.REVALIDATE_TOKEN;
    
    if (!token || token !== validToken) {
      return NextResponse.json(
        { success: false, message: 'Token de sécurité non valide' },
        { status: 401 }
      );
    }
    
    // Forcer la revalidation du sitemap
    revalidatePath('/sitemap.xml');
    
    return NextResponse.json({
      revalidated: true,
      date: new Date().toISOString(),
      message: 'Sitemap regénéré avec succès'
    });
  } catch (error) {
    console.error('Erreur lors de la revalidation du sitemap:', error);
    return NextResponse.json(
      { revalidated: false, message: 'Échec de la revalidation' },
      { status: 500 }
    );
  }
}
