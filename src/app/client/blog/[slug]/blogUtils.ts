import { Blog } from '@/types/blog';

// Interface temporaire pour contourner les problèmes de typage entre Prisma et notre application
export function serializeFromPrisma(blog: any): Blog {
  // Fonction pour sérialiser l'auteur
  const serializeAuthor = (authorData: any) => {
    if (!authorData) return undefined;
    return {
      id: authorData.id || '',
      email: typeof authorData.email === 'string' ? authorData.email : '',
      name: typeof authorData.name === 'string' ? authorData.name : 
            typeof authorData.full_name === 'string' ? authorData.full_name :
            typeof authorData.first_name === 'string' ? authorData.first_name : '',
      image: typeof authorData.image === 'string' ? authorData.image : 
             typeof authorData.avatar_url === 'string' ? authorData.avatar_url : 
             typeof authorData.picture === 'string' ? authorData.picture : undefined
    };
  };

  return {
    id: blog.id || '',
    title: blog.title || '',
    content: blog.content || {},
    slug: blog.slug || '',
    image: blog.image || undefined,
    createdAt: blog.createdAt ? blog.createdAt.toString() : new Date().toString(),
    updatedAt: blog.updatedAt ? blog.updatedAt.toString() : new Date().toString(),
    seoTitle: blog.seoTitle || undefined,
    seoDesc: blog.seoDesc || undefined,
    authorId: blog.authorId || '',
    categoryId: blog.categoryId || '',
    category: blog.category ? {
      id: blog.category.id || '',
      name: blog.category.name || '',
      description: blog.category.description || undefined
    } : undefined,
    author: serializeAuthor(blog.author),
    comments: (blog.comments || []).map((comment: any) => ({
      id: comment.id || '',
      content: comment.content || '',
      createdAt: comment.createdAt ? comment.createdAt.toString() : new Date().toString(),
      authorId: comment.authorId || '',
      blogId: comment.blogId || '',
      author: serializeAuthor(comment.author)
    }))
  };
}
