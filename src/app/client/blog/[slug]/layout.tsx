import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';

interface LayoutProps {
  children: React.ReactNode;
  params: { slug: string };
}

export default async function Layout({ children, params }: LayoutProps) {
  const { slug } = await params;
  const blog = await prisma.blog.findUnique({
    where: { slug },
    include: {
      category: true,
      author: true
    }
  });

  if (!blog) {
    notFound();
  }
  return (
    <div className="w-full">
      {children}
    </div>
  );
}
