import { fetchWithAuth } from '@/lib/fetchWithAuth';
import { API_PATHS } from '@/lib/constants';
import { Category } from '@/types/blog';

/**
 * Service pour gérer les opérations liées aux catégories
 */
export const categoryService = {
  /**
   * Récupère toutes les catégories
   */
  getCategories: async (): Promise<Category[]> => {
    const res = await fetch(API_PATHS.ADMIN.CATEGORIES);
    if (!res.ok) {
      throw new Error('Failed to fetch categories');
    }
    return await res.json();
  },

  /**
   * Crée une nouvelle catégorie
   */
  createCategory: async (categoryData: Partial<Category>): Promise<Category> => {
    const res = await fetchWithAuth(API_PATHS.ADMIN.CATEGORIES, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(categoryData)
    });
    if (!res.ok) {
      throw new Error('Failed to create category');
    }
    return await res.json();
  },

  /**
   * Met à jour une catégorie existante
   */
  updateCategory: async (id: string, categoryData: Partial<Category>): Promise<Category> => {
    const res = await fetchWithAuth(`${API_PATHS.ADMIN.CATEGORIES}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(categoryData)
    });
    if (!res.ok) {
      throw new Error('Failed to update category');
    }
    return await res.json();
  },

  /**
   * Supprime une catégorie
   */
  deleteCategory: async (id: string): Promise<void> => {
    const res = await fetchWithAuth(`${API_PATHS.ADMIN.CATEGORIES}/${id}`, {
      method: 'DELETE'
    });
    if (!res.ok) {
      throw new Error('Failed to delete category');
    }
  },

  /**
   * Récupère toutes les catégories pour le client
   */
  getClientCategories: async (): Promise<Category[]> => {
    const res = await fetch('/client/api/categories');
    if (!res.ok) {
      throw new Error('Failed to fetch client categories');
    }
    return await res.json();
  },
};
