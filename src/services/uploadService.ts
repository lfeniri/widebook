import { API_PATHS } from '@/lib/constants';

/**
 * Service pour gérer les opérations liées à l'upload de fichiers
 */
export const uploadService = {
  /**
   * Upload une image
   * @param file Fichier image à uploader
   * @returns URL de l'image uploadée
   */
  uploadImage: async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    const uploadRes = await fetch(API_PATHS.ADMIN.UPLOAD_IMAGE, {
      method: 'POST',
      body: formData
    });
    const uploadData = await uploadRes.json();
    if (!uploadRes.ok) {
      throw new Error(uploadData.error || 'Erreur upload image');
    }
    return uploadData.url;
  }
};
