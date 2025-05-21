import { revalidatePath } from 'next/cache';

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

/**
 * Utilitaire pour revalider toutes les routes concernées après modification d'un blog
 * 
 * @param slug - Le slug du blog modifié
 * @param action - Le type d'action effectuée (création, mise à jour, suppression)
 * @param entityId - L'identifiant du blog (optionnel)
 */
export async function revalidateBlogRoutes(
  slug: string | undefined, 
  action: 'create' | 'update' | 'delete', 
  entityId?: string
): Promise<void> {
  try {
    // Toujours revalider le sitemap et la page d'accueil
    revalidatePath('/sitemap');
    revalidatePath('/'); // Page d'accueil qui affiche la liste des blogs
    
    // Si nous avons un slug, revalider aussi les pages spécifiques au blog
    if (slug) {
      revalidatePath(`/client/book-page/${slug}`); // Nouveau chemin
      revalidatePath(`/client/blog/${slug}`);      // Ancien chemin (compatibilité)
      
      const actionText = {
        create: 'création',
        update: 'mise à jour',
        delete: 'suppression'
      }[action];
      
      const idText = entityId ? `ID: ${entityId}` : '';
      console.log(`Sitemap, page d'accueil et page du blog ${slug} revalidés après ${actionText} du blog ${idText}`.trim());
    } else {
      console.log(`Sitemap et page d'accueil revalidés`);
    }
  } catch (revalidateError) {
    console.error('Erreur lors de la revalidation:', revalidateError);
    // Ne pas bloquer l'exécution en cas d'erreur de revalidation
  }
}
