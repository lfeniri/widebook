/**
 * Service pour gérer les opérations liées aux messages du chatbot des blogs
 */
export const chatMessageService = {
  /**
   * Récupère les messages pour un blog spécifique
   */
  getBlogMessages: async (blogId: string) => {
    try {
      const response = await fetch(`/api/blogs/${blogId}/messages`);
      if (!response.ok) {
        throw new Error('Failed to fetch blog messages');
      }
      const data = await response.json();
      return data.messages || [];
    } catch (error) {
      console.error("Error fetching blog messages:", error);
      throw error;
    }
  },

  /**
   * Envoie un message à l'API OpenRouter pour obtenir une réponse
   */
  sendMessage: async (message: string, blogId: string, currentContent: { html: string; css: string; js?: string }) => {
    try {
      const response = await fetch('/api/openrouter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          blogId,
          currentContent,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Network error');
      }
      
      return await response.json();
    } catch (error) {
      console.error("Error sending message:", error);
      throw error;
    }
  }
};
