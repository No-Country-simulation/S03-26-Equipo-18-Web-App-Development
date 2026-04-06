import { PrismaClient } from '@prisma/client';
import { prisma } from '../lib/prisma';



async function main() {

    const firstUser = await prisma.user.findFirst();
    
  // 1. Buscamos las categorías existentes en tu DB
  const catProducto = await prisma.category.findFirst({ where: { name: 'PRODUCTO' }, });
  const catCliente = await prisma.category.findFirst({ where: { name: 'CLIENTE' } });
  const catIndustria = await prisma.category.findFirst({ where: { name: 'INDUSTRIA' } });
  const catEvento = await prisma.category.findFirst({ where: { name: 'EVENTO' } });

  // Verificamos que existan para no tener errores
  if (!catProducto || !catCliente || !catIndustria || !catEvento) {
    console.error("❌ Error: No se encontraron las categorías en la DB. Asegúrate de haberlas creado antes.");
    return;
  }

  // 2. Ahora creamoslos testimonios entre ellas
    const testimonialsData = [
        // --- CATEGORÍA: PRODUCTO (Cursos / Plataforma) ---
        { name: "Enzo Ferrero", catId: catProducto.id, rating: 5, views: 45, clicks: 88, status: "APROBADO", date: "2026-01-10", content: "La ruta de aprendizaje de Fullstack está muy bien estructurada. El simulador de código es genial." },
        { name: "Lucía Méndez", catId: catProducto.id, rating: 4, views: 21, clicks: 15, status: "APROBADO", date: "2026-02-15", content: "Me encanta que las clases sean grabadas, pero a veces la app móvil se cierra sola." },

        // --- CATEGORÍA: CLIENTE (Experiencia del Alumno) ---
        { name: "Marcos Galperin", catId: catCliente.id, rating: 5, views: 120, clicks: 45, status: "APROBADO", date: "2026-03-05", content: "Gracias al programa de mentorías conseguí mi primer trabajo como Junior Dev en 3 meses." },
        { name: "Sofía Ritter", catId: catCliente.id, rating: 5, views: 54, clicks: 9, status: "APROBADO", date: "2026-04-02", content: "El soporte de la comunidad en Discord es lo que marca la diferencia en esta academia." },

        // --- CATEGORÍA: INDUSTRIA (Alianzas / Empresas) ---
        { name: "Globant Hiring", catId: catIndustria.id, rating: 5, views: 250, clicks: 70, status: "APROBADO", date: "2026-02-28", content: "Los graduados de esta EdTech vienen con un nivel técnico superior al promedio del mercado." },
        { name: "Recruiter Senior", catId: catIndustria.id, rating: 4, views: 180, clicks: 12, status: "APROBADO", date: "2026-03-20", content: "Valoramos mucho las habilidades blandas que enseñan junto con la programación." },

        // --- CATEGORÍA: EVENTO (Webinars / Bootcamps en vivo) ---
        { name: "Mateo Salvatto", catId: catEvento.id, rating: 5, views: 320, clicks: 110, status: "APROBADO", date: "2026-03-28", content: "El Demo Day fue increíble. Ver los proyectos finales de los alumnos me dejó sin palabras." },
        { name: "Alumna Becada", catId: catEvento.id, rating: 3, views: 40, clicks: 4, status: "PENDIENTE", date: "2026-04-05", content: "El taller de Git estuvo bueno, pero faltó tiempo para preguntas al final." },
    ];

  for (const t of testimonialsData) {
    await prisma.testimonial.create({
      data: {
        userName: t.name,
        content: t.content,
        rating: t.rating,
        views: t.views,
        clicks: t.clicks,
        status: t.status,
        createdAt: new Date(t.date),
        userId: "1", 
        categoryId: t.catId, // Aquí inyectamos el ID de PRODUCTO, CLIENTE, etc.
      }
    });
  }

  console.log('✅ Testimonios vinculados a las categorías del cliente con éxito.');
}

main();