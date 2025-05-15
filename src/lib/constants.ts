/**
 * API endpoints constants
 * Centralizing API paths to make them easier to maintain
 */

export const API_PATHS = {
  // Admin API paths
  ADMIN: {
    BLOGS: {
      BASE: '/admin/api/blogs',
      DETAIL: (id: string) => `/admin/api/blogs/${id}`,
      CONTENT: (id: string) => `/admin/api/blogs/${id}/content`,
    },
    CATEGORIES: '/admin/api/categories',
    UPLOAD_IMAGE: '/admin/api/upload-image',
  },
  // Public API paths
  PUBLIC: {
    BLOGS: {
      BASE: '/api/blogs',
      DETAIL: (id: string) => `/api/blogs/${id}`,
    },
    OPENROUTER: '/api/openrouter',
  },
};
