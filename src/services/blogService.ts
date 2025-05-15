import { fetchWithAuth } from '@/lib/fetchWithAuth';
import { API_PATHS } from '@/lib/constants';
import { Blog } from '@/types/blog';

/**
 * Service pour gérer les opérations liées aux blogs
 */
export const blogService = {
  /**
   * Récupère un blog par son ID pour l'admin
   */
  getAdminBlogById: async (id: string): Promise<Blog> => {
    const res = await fetchWithAuth(API_PATHS.ADMIN.BLOGS.DETAIL(id));
    if (!res.ok) {
      if (res.status === 404) {
        throw new Error('Blog not found');
      }
      throw new Error('Failed to fetch blog');
    }
    return await res.json();
  },

  /**
   * Récupère un blog par son ID pour l'affichage public
   */
  getPublicBlogById: async (id: string): Promise<Blog> => {
    const res = await fetch(API_PATHS.PUBLIC.BLOGS.DETAIL(id));
    if (!res.ok) {
      if (res.status === 404) {
        throw new Error('Blog not found');
      }
      throw new Error('Failed to fetch blog');
    }
    return await res.json();
  },

  /**
   * Récupère la liste de tous les blogs pour l'admin
   */
  getAdminBlogs: async (): Promise<Blog[]> => {
    const res = await fetchWithAuth(API_PATHS.ADMIN.BLOGS.BASE);
    if (!res.ok) {
      throw new Error('Failed to fetch blogs');
    }
    return await res.json();
  },

  /**
   * Récupère la liste de tous les blogs publics
   */
  getPublicBlogs: async (): Promise<Blog[]> => {
    const res = await fetch(API_PATHS.PUBLIC.BLOGS.BASE);
    if (!res.ok) {
      throw new Error('Failed to fetch blogs');
    }
    return await res.json();
  },

  /**
   * Crée un nouveau blog
   */
  createBlog: async (blogData: Partial<Blog>): Promise<Blog> => {
    const res = await fetchWithAuth(API_PATHS.ADMIN.BLOGS.BASE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(blogData)
    });
    if (!res.ok) {
      throw new Error('Failed to create blog');
    }
    return await res.json();
  },

  /**
   * Met à jour un blog existant
   */
  updateBlog: async (id: string, blogData: Partial<Blog>): Promise<Blog> => {
    const res = await fetchWithAuth(`${API_PATHS.ADMIN.BLOGS.BASE}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(blogData)
    });
    if (!res.ok) {
      throw new Error('Failed to update blog');
    }
    return await res.json();
  },

  /**
   * Supprime un blog
   */
  deleteBlog: async (id: string): Promise<void> => {
    const res = await fetchWithAuth(`${API_PATHS.ADMIN.BLOGS.BASE}/${id}`, {
      method: 'DELETE'
    });
    if (!res.ok) {
      throw new Error('Failed to delete blog');
    }
  },

  /**
   * Met à jour le contenu d'un blog
   */
  updateBlogContent: async (id: string, content: any): Promise<Blog> => {
    const res = await fetchWithAuth(API_PATHS.ADMIN.BLOGS.CONTENT(id), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ content })
    });
    if (!res.ok) {
      throw new Error('Failed to update blog content');
    }
    return await res.json();
  },

  /**
   * Récupère la liste paginée des blogs pour l'admin
   */
  getAdminBlogsPaginated: async (page: number = 1, pageSize: number = 10, search: string = ""): Promise<{blogs: Blog[], pageCount: number}> => {
    const params = new URLSearchParams({
      page: String(page),
      pageSize: String(pageSize),
      search
    });
    const res = await fetchWithAuth(`${API_PATHS.ADMIN.BLOGS.BASE}?${params.toString()}`);
    if (!res.ok) {
      throw new Error('Failed to fetch blogs');
    }
    return await res.json();
  },

  /**
   * Récupère la liste des blogs côté client avec possibilité de filtrer par catégorie
   */
  getClientBlogs: async (categoryId?: string): Promise<Blog[]> => {
    let url = '/client/api/blogs';
    if (categoryId) {
      url += `?categoryId=${categoryId}`;
    }
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error('Failed to fetch client blogs');
    }
    return await res.json();
  },
};
