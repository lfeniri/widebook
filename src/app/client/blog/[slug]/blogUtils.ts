import { Blog } from '@/types/blog';

// Interface temporaire pour contourner les problèmes de typage entre Prisma et notre application
export function serializeFromPrisma(blog: any): Blog {
  return {
    id: blog.id,
    title: blog.title,
    content: blog.content || {},
    slug: blog.slug,
    image: blog.image || undefined,
    createdAt: blog.createdAt.toString(),
    updatedAt: blog.updatedAt.toString(),
    seoTitle: blog.seoTitle || undefined,
    seoDesc: blog.seoDesc || undefined,
    authorId: blog.authorId,
    categoryId: blog.categoryId,
    category: blog.category || undefined,
    author: blog.author || undefined,
    comments: (blog.comments || []).map((comment: any) => ({
      id: comment.id,
      content: comment.content,
      createdAt: comment.createdAt.toString(),
      authorId: comment.authorId,
      blogId: comment.blogId,
      author: comment.author || undefined
    }))
  };
}
