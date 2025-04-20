import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/utils';


export async function GET() {
  // Récupère toutes les catégories avec le nombre de blogs associés
  const categories = await prisma.category.findMany({
    include: {
      blogs: true,
    },
    orderBy: { name: 'asc' },
  });
  return NextResponse.json(categories);
}

export async function POST(request: Request) {
  const user = await getUserFromRequest(request);
  if (!user) {
    return NextResponse.json({ error: 'Non autorisé.' }, { status: 401 });
  }
  const body = await request.json();
  const { name, description } = body;
  if (!name) {
    return NextResponse.json({ error: 'Le nom est requis.' }, { status: 400 });
  }
  const category = await prisma.category.create({
    data: { name, description },
  });
  return NextResponse.json(category);
}
