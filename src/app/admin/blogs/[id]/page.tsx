import BlogEditPageClient from '@/components/blog/EditBlogPageClient';

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  return <BlogEditPageClient id={id} />;
}
