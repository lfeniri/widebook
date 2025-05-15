import { fetchWithAuth } from '@/lib/fetchWithAuth';
import { Comment } from '@/types/blog';

/**
 * Service pour gérer les opérations liées aux commentaires
 */
export const commentService = {
  /**
   * Ajoute un nouveau commentaire à un blog
   */
  addComment: async (blogId: string, content: string): Promise<Comment> => {
    const res = await fetchWithAuth("/client/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content, blogId }),
    });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || "Erreur lors de l'envoi du commentaire.");
    }
    return await res.json();
  },

  /**
   * Récupère les commentaires d'un blog
   */
  getBlogComments: async (blogId: string): Promise<Comment[]> => {
    const res = await fetch(`/client/api/comments?blogId=${blogId}`);
    if (!res.ok) {
      throw new Error('Failed to fetch comments');
    }
    return await res.json();
  },

  /**
   * Supprime un commentaire
   */
  deleteComment: async (commentId: string): Promise<void> => {
    const res = await fetchWithAuth(`/client/api/comments/${commentId}`, {
      method: 'DELETE'
    });
    if (!res.ok) {
      throw new Error('Failed to delete comment');
    }
  }
};
