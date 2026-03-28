import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


export async function GET(request: Request) {

  // 1. Extraemos la API Key de los headers de la petición
  const { searchParams } = new URL(request.url);
  const apiKey = searchParams.get("apiKey");

  if (!apiKey) {
    return NextResponse.json({ error: "Falta la API Key" }, { status: 401 });
  }

  try {
    // 2. Buscamos los testimonios que pertenecen a la EdTech con esa API Key
    const testimonials = await prisma.testimonial.findMany({
      where: {
        user: {
          apiKey: apiKey, // Solo trae los que coincidan con la llave
          role: "ADMIN"
        },
        //Filtro: sólo se van a mostrar los testimonios aprobados
        status: "APROBADO",
      },
      select: {
        id: true,
        userName: true,
        content: true,
        rating: true,
        location: true,
        category: true,
        tags: true,
        videoUrl: true,
        videoProvider: true,
        createdAt: true,
        // Traemos la EdTech, pero SOLO su nombre
        user: {
          select: {
            instituto: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    // 3. Si no encuentra nada, avisamos
    if (testimonials.length === 0) {
      return NextResponse.json({ message: "No hay testimonios o API Key inválida" }, { status: 200 });
    }
    return NextResponse.json(testimonials);
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener datos" }, { status: 500 });
  }
}