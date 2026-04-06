"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateTestimonialAction(id: string, data: any) {
  const { status, categoryId, tagIds, newTagsRaw } = data;


  //PROCESAR NUEVOS TAGS (si es que hay)
  const newTagsArray = newTagsRaw 
    ? newTagsRaw.split(',').map((name: string) => name.trim().toUpperCase()) 
    : [];

  await prisma.testimonial.update({
    where: { id },
    data: {
      status,
      categoryId,
      tags: {
        // Primero desconectamos todos los tags actuales y conectamos los nuevos
        set: tagIds?.map((tagId: string) => ({ id: tagId })) ||[],

        // 'connectOrCreate' busca el tag por nombre; si no existe, lo crea
        connectOrCreate: newTagsArray.map((tagName: string) => ({
          where: { name: tagName },
          create: { name: tagName },
        })),
      }
    }
  });

  // Esto limpia la caché para que la lista se vea actualizada al instante
  revalidatePath("/dashboard/testimonials");
}