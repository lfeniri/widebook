"use server";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    
    // Validation d'email simple
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 });
    }

    // Vérifier si l'email existe déjà
    const existingSubscriber = await prisma.newsletterSubscriber.findUnique({
      where: { email },
    });

    if (existingSubscriber) {
      return NextResponse.json({ message: "Email déjà inscrit" }, { status: 200 });
    }

    // Créer un nouvel abonné
    await prisma.newsletterSubscriber.create({
      data: {
        email,
        subscribedAt: new Date(),
      },
    });

    return NextResponse.json({ success: true, message: "Inscription réussie" }, { status: 201 });
  } catch (error) {
    console.error("Erreur d'inscription newsletter:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
