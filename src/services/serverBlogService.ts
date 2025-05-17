import { Blog } from '@/types/blog';
import { prisma } from '@/lib/prisma';

/**
 * Service pour gérer les opérations liées aux blogs côté serveur
 * Ces fonctions sont utilisées exclusivement dans des composants serveur
 */
export const serverBlogService = {
  /**
   * Récupère la liste de tous les blogs publics (côté serveur)
   */
  getPublicBlogs: async (): Promise<Blog[]> => {
    try {
      const blogs = await prisma.blog.findMany({
        include: {
          category: true,
          author: {
            select: {
              id: true, 
              name: true,
              email: true
            }
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      return blogs as unknown as Blog[];
    } catch (error) {
      console.error('Error fetching blogs:', error);
      return [];
    }
  },

  /**
   * Récupère un blog par son ID pour l'affichage public (côté serveur)
   */
  getPublicBlogById: async (blogId: string): Promise<Blog | null> => {
    try {
      const blog = await prisma.blog.findUnique({
        where: {
          id: blogId
        },
        include: {
          category: true,
          author: {
            select: {
              id: true,
              name: true,
              email: true
            }
          },
          comments: {
            orderBy: {
              createdAt: 'desc',
            },
            include: {
              author: true
            }
          }
        },
      });

      return blog as unknown as Blog;
    } catch (error) {
      console.error('Error fetching blog:', error);
      return null;
    }
  },
  
  /**
   * Récupère un blog par son slug pour l'affichage public (côté serveur)
   */
  getPublicBlogBySlug: async (slug: string): Promise<Blog | null> => {
    try {
      const blog = await prisma.blog.findUnique({
        where: {
          slug
        },
        include: {
          category: true,
          author: {
            select: {
              id: true,
              name: true,
              email: true
            }
          },
          comments: {
            orderBy: {
              createdAt: 'desc',
            },
            include: {
              author: true
            }
          }
        },
      });

      return blog as unknown as Blog;
    } catch (error) {
      console.error('Error fetching blog by slug:', error);
      return null;
    }
  },
};
