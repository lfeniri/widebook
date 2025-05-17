/**
 * Utilitaire pour forcer la revalidation du sitemap
 */
export const revalidateSitemap = async (): Promise<boolean> => {
  try {
    // Récupérer le token depuis les variables d'environnement côté client
    const token = process.env.NEXT_PUBLIC_REVALIDATE_TOKEN;
    
    // Si pas de token, ne pas faire la revalidation en silencieux
    if (!token) {
      console.warn('Token de revalidation non configuré. Revalidation du sitemap ignorée.');
      return false;
    }
    
    // Appel à l'API de revalidation
    const response = await fetch('/api/revalidate-sitemap', {
      method: 'POST',
      headers: {
        'x-revalidate-token': token
      }
    });
    
    if (!response.ok) {
      const error = await response.text();
      console.error('Erreur lors de la revalidation du sitemap:', error);
      return false;
    }
    
    const result = await response.json();
    console.log('Sitemap revalidé:', result);
    return result.revalidated;
  } catch (error) {
    console.error('Exception lors de la tentative de revalidation du sitemap:', error);
    return false;
  }
};
