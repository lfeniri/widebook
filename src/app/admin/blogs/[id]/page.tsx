import { EditBlogContent } from '@/components/blog/EditBlogContent';
import { prisma } from '@/lib/prisma';

export default async function EditBlogPage({ params }: { params: { id: string } }) {
  const blog = await prisma.blog.findUnique({
    where: { id: params.id },
    include: { category: true }
  });

  if (!blog) {
    return <div>Blog introuvable</div>;
  }

  return <EditBlogContent blog={blog} />;
}
