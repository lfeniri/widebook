import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { blogId: string } }
) {
  const { blogId } = await params;
  
  if (!blogId) {
    return NextResponse.json({ error: 'blogId est requis' }, { status: 400 });
  }

  try {
    const messages = await prisma.blogChatMessage.findMany({
      where: { blogId },
      orderBy: { createdAt: 'asc' },      select: {
        id: true,
        content: true,
        role: true,
        createdAt: true,
        isJsonContent: true,
      },
    });

    return NextResponse.json({ messages }, { status: 200 });
  } catch (error) {
    console.error('Erreur lors de la récupération des messages:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des messages', details: String(error) },
      { status: 500 }
    );
  }
}
