import { ImageResponse } from 'next/og';
import { prisma } from '@/lib/prisma';
 
export const runtime = 'edge';
export const alt = 'Blog Editor';
export const size = {
  width: 1200,
  height: 630,
};
 
export default async function Image({ params }: { params: { id: string } }) {
  const blog = await prisma.blog.findUnique({
    where: { id: params.id },
    select: { title: true },
  });
 
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 32,
        }}
      >
        {blog?.title ? `Modifier: ${blog.title}` : 'Éditeur de blog'}
      </div>
    ),
    {
      ...size,
    }
  );
}
