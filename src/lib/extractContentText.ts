/**
 * Extrait le texte brut du contenu HTML
 * Utile pour créer des descriptions à partir du contenu du blog
 * 
 * @param htmlContent Contenu HTML
 * @param maxLength Longueur maximale du texte extrait
 * @returns Texte nettoyé et tronqué
 */
export function extractContentText(htmlContent: string, maxLength = 200): string {
  if (!htmlContent) return '';
  
  // Supprimer les balises HTML
  const textWithoutTags = htmlContent.replace(/<[^>]*>/g, ' ');
  
  // Supprimer les espaces multiples et nettoyer
  const cleanText = textWithoutTags.replace(/\s+/g, ' ').trim();
  
  // Tronquer à la longueur maximale
  if (cleanText.length <= maxLength) {
    return cleanText;
  }
  
  // Tronquer sans couper un mot
  const truncatedText = cleanText.substring(0, maxLength);
  return truncatedText.substring(0, truncatedText.lastIndexOf(' ')) + '...';
}

/**
 * Vérifie si un objet contient du HTML
 * @param content Objet à vérifier
 * @returns Contenu HTML ou chaîne vide
 */
export function getHtmlContent(content: any): string {
  if (typeof content !== 'object' || !content) return '';
  
  if ('html' in content && typeof content.html === 'string') {
    return content.html;
  }
  
  return '';
}
