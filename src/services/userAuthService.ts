import { supabase } from "@/lib/supabaseClient";
import { Session, User } from "@supabase/supabase-js";

export interface UserProfile {
  email: string;
  role: string;
  name?: string;
  phone?: string;
  userId?: string;
}

export class UserAuthService {
  /**
   * Récupère la session utilisateur actuelle
   */
  async getSession(): Promise<{ session: Session | null }> {
    const { data } = await supabase.auth.getSession();
    return { session: data.session };
  }

  /**
   * Vérifie si l'utilisateur est connecté
   */
  async isLoggedIn(): Promise<boolean> {
    const { session } = await this.getSession();
    return session !== null;
  }

  /**
   * Se connecter avec email et mot de passe
   */
  async signInWithPassword(email: string, password: string) {
    return await supabase.auth.signInWithPassword({ email, password });
  }

  /**
   * Se connecter avec OAuth (Google, Facebook, etc.)
   */
  async signInWithOAuth(provider: 'google' | 'facebook') {
    return await supabase.auth.signInWithOAuth({ provider });
  }

  /**
   * S'inscrire avec email et mot de passe
   */
  async signUp(email: string, password: string, metadata?: { first_name?: string; last_name?: string; phone?: string }) {
    return await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata
      }
    });
  }

  /**
   * Déconnexion
   */
  async signOut() {
    return await supabase.auth.signOut();
  }

  /**
   * Récupère le profil utilisateur complet
   */
  async getUserProfile(): Promise<UserProfile | null> {
    const { session } = await this.getSession();

    if (!session?.user) {
      return null;
    }

    const user = session.user;
    const name = `${user.user_metadata?.first_name || ''} ${user.user_metadata?.last_name || ''}`.trim() || null;
    const phone = user.phone || '';
    const role = user.role || '';

    return {
      userId: user.id,
      email: user.email ?? '',
      role,
      name: name || undefined,
      phone: phone || undefined
    };
  }

  /**
   * Mise à jour du profil utilisateur
   */
  async updateProfile(updates: Partial<UserProfile>) {
    const { session } = await this.getSession();
    
    if (!session?.user) {
      throw new Error('Utilisateur non connecté');
    }

    // Séparer les metadata des autres champs
    const metadata: Record<string, any> = {};
    
    // Si le nom est fourni, on le divise en prénom et nom
    if (updates.name) {
      const nameParts = updates.name.split(' ');
      metadata.first_name = nameParts[0] || '';
      metadata.last_name = nameParts.slice(1).join(' ') || '';
    }

    // Mise à jour des données utilisateur
    return await supabase.auth.updateUser({
      email: updates.email,
      phone: updates.phone,
      data: Object.keys(metadata).length > 0 ? metadata : undefined
    });
  }
  /**
   * Réinitialisation du mot de passe
   */
  async resetPassword(email: string) {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const redirectUrl = `${origin}/reset-password`;
    console.log("URL de redirection pour réinitialisation:", redirectUrl);
      return await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectUrl
    });
  }
  /**
   * Mettre à jour le mot de passe
   */
  async updatePassword(newPassword: string) {
    return await supabase.auth.updateUser({ password: newPassword });
  }
  /**
   * Écouter les changements d'état d'authentification
   * @param callback Fonction à exécuter lorsque l'état d'authentification change
   * @returns Objet avec une méthode subscription.unsubscribe() pour arrêter d'écouter
   */
  onAuthStateChange(callback: () => void) {
    return supabase.auth.onAuthStateChange(() => callback());
  }
  /**
   * Sauvegarde une session à partir d'un hash ou de l'URL complète
   * @param hashOrUrl Le hash ou l'URL complète contenant les informations de session
   */
  async saveOAuthSession(hashOrUrl: string) {
    try {
      // Suppabase v2 a changé la façon dont les sessions sont gérées      // Cette partie n'est plus nécessaire car l'API interne a changé
      // Nous nous appuyons uniquement sur l'analyse manuelle des tokens
      
      // Sinon, on analyse manuellement l'URL pour extraire les tokens
      const url = new URL(hashOrUrl.startsWith('http') ? hashOrUrl : `http://example.com${hashOrUrl}`);
      const params = new URLSearchParams(url.hash.substring(1) || url.search);
      
      const accessToken = params.get('access_token');
      const refreshToken = params.get('refresh_token');
      const expiresIn = params.get('expires_in');
      
      if (accessToken) {
        console.log("Tokens trouvés manuellement dans l'URL, tentative de connexion directe");
        // Si on a un access_token, on peut essayer de l'utiliser directement
        await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken || ''
        });
        return { error: null, data: { session: true } };
      }
      
      return { error: { message: "Impossible de sauvegarder la session" }, data: null };
    } catch (err) {
      console.error("Erreur lors de la sauvegarde de session:", err);
      return { error: err, data: null };
    }
  }
}

// Export une instance singleton du service
const userAuthService = new UserAuthService();
export default userAuthService;
