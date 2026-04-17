// Definimos cómo quiere tu Frontend que sean los datos (tus interfaces actuales)
import { TestimonialCardProps, Tag } from "@/types"; // Ajusta la ruta según tus tipos

export const testimonialAdapter = (backendData: any[]): TestimonialCardProps[] => {
  return backendData.map((item) => ({
    // Mapeamos: "Lo que el Front espera" : "Lo que el Back manda"
    id: item.id,
    userName: item.authorName, // Traducción clave
    content: item.content,
    rating: item.rating || 5, // Fallback porque no está en el Schema
    location: item.authorCompany || "Ubicación desconocida", // Usamos la empresa como ubicación
    category: item.category?.name || "General",
    status: item.status, 
    tags: Array.isArray(item.testimonialTags) 
      ? item.testimonialTags.map((t: any) => ({
          id: t.tag.id,
          name: t.tag.name
        }))
      : Array.isArray(item.tags) 
        ? item.tags.map((t: any) => t.tag ? { id: t.tag.id, name: t.tag.name } : t)
        : []
      }));
};