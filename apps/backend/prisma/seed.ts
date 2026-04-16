import {
  PrismaClient,
  Role,
  TestimonialStatus,
  TestimonialType,
} from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const ADMIN_NAME = process.env.SEED_ADMIN_NAME || "Admin Inicial";
const ADMIN_EMAIL =
  process.env.SEED_ADMIN_EMAIL || "admin@testimonialcms.local";
const ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD || "Admin123*";
const ADMIN_API_KEY =
  process.env.SEED_ADMIN_API_KEY || "admin-api-key-inicial";

const BASE_CATEGORIES = [
  {
    name: "Producto",
    slug: "producto",
    description: "Testimonios relacionados con productos",
    isSystem: true,
  },
  {
    name: "Evento",
    slug: "evento",
    description: "Testimonios relacionados con eventos",
    isSystem: true,
  },
  {
    name: "Cliente",
    slug: "cliente",
    description: "Testimonios relacionados con clientes",
    isSystem: true,
  },
  {
    name: "Industria",
    slug: "industria",
    description: "Testimonios relacionados con industrias",
    isSystem: true,
  },
];

const BASE_TAGS = [
  { name: "Innovación", slug: "innovacion" },
  { name: "Calidad", slug: "calidad" },
  { name: "Soporte", slug: "soporte" },
  { name: "Experiencia", slug: "experiencia" },
  { name: "Resultados", slug: "resultados" },
  { name: "Confianza", slug: "confianza" },
  { name: "Transformación", slug: "transformacion" },
  { name: "Productividad", slug: "productividad" },
  { name: "Tecnología", slug: "tecnologia" },
  { name: "Servicio", slug: "servicio" },
];

const TESTIMONIAL_SEED = [
  {
    slug: "producto-optimizacion-operativa",
    title: "La plataforma nos ayudó a optimizar la operación",
    content:
      "Desde que implementamos la plataforma, redujimos tiempos de seguimiento y centralizamos la información del equipo comercial. Ahora el proceso es más claro, más rápido y mucho más confiable para todos.",
    authorName: "Laura Gómez",
    authorPosition: "Coordinadora Comercial",
    authorEmail: "laura.gomez@empresa-demo.com",
    authorCompany: "Comercializadora Andina",
    type: TestimonialType.TEXT,
    status: TestimonialStatus.PUBLISHED,
    isFeatured: true,
    views: 128,
    clicks: 24,
    categorySlug: "producto",
    tagSlugs: ["productividad", "resultados", "tecnologia"],
    publishedAt: new Date("2026-03-10T10:00:00.000Z"),
  },
  {
    slug: "cliente-soporte-rapido-y-claro",
    title: "El soporte fue rápido, claro y muy cercano",
    content:
      "Teníamos dudas sobre la configuración inicial y el equipo nos acompañó durante todo el proceso. La respuesta fue ágil y siempre sentimos que entendían nuestro contexto y nuestras necesidades.",
    authorName: "Carlos Ramírez",
    authorPosition: "Líder de Implementación",
    authorEmail: "carlos.ramirez@empresa-demo.com",
    authorCompany: "Grupo Soluciones SAS",
    type: TestimonialType.TEXT,
    status: TestimonialStatus.PUBLISHED,
    isFeatured: false,
    views: 96,
    clicks: 12,
    categorySlug: "cliente",
    tagSlugs: ["soporte", "servicio", "confianza"],
    publishedAt: new Date("2026-03-12T14:30:00.000Z"),
  },
  {
    slug: "evento-conexion-con-clientes",
    title: "El evento nos permitió conectar con clientes reales",
    content:
      "Participar en el evento fue una experiencia muy valiosa para nuestra marca. Pudimos conversar con clientes potenciales, entender mejor sus retos y mostrar de forma práctica el valor de nuestra solución.",
    authorName: "Natalia Herrera",
    authorPosition: "Gerente de Marca",
    authorEmail: "natalia.herrera@empresa-demo.com",
    authorCompany: "Impulso Digital",
    type: TestimonialType.TEXT,
    status: TestimonialStatus.PUBLISHED,
    isFeatured: true,
    views: 143,
    clicks: 31,
    categorySlug: "evento",
    tagSlugs: ["experiencia", "innovacion", "resultados"],
    publishedAt: new Date("2026-03-15T09:15:00.000Z"),
  },
  {
    slug: "industria-solucion-flexible",
    title: "Una solución flexible para nuestra industria",
    content:
      "Veníamos de usar herramientas poco adaptadas a nuestro sector y el cambio fue notorio. Esta solución se ajustó muy bien a nuestra operación y nos permitió tener un mejor control de la información crítica.",
    authorName: "Jorge Castaño",
    authorPosition: "Director de Operaciones",
    authorEmail: "jorge.castano@empresa-demo.com",
    authorCompany: "Logística Integral del Café",
    type: TestimonialType.TEXT,
    status: TestimonialStatus.PUBLISHED,
    isFeatured: false,
    views: 84,
    clicks: 10,
    categorySlug: "industria",
    tagSlugs: ["transformacion", "tecnologia", "calidad"],
    publishedAt: new Date("2026-03-18T11:45:00.000Z"),
  },
  {
    slug: "producto-mejora-en-seguimiento",
    title: "Mejoramos el seguimiento de cada oportunidad",
    content:
      "Antes dependíamos de hojas de cálculo y mensajes dispersos. Hoy tenemos trazabilidad completa, responsables definidos y una visión mucho más ordenada del avance de cada oportunidad comercial.",
    authorName: "Paula Martínez",
    authorPosition: "Ejecutiva de Cuenta",
    authorEmail: "paula.martinez@empresa-demo.com",
    authorCompany: "Ventas Estratégicas LATAM",
    type: TestimonialType.TEXT,
    status: TestimonialStatus.PUBLISHED,
    isFeatured: false,
    views: 77,
    clicks: 8,
    categorySlug: "producto",
    tagSlugs: ["productividad", "calidad"],
    publishedAt: new Date("2026-03-20T16:20:00.000Z"),
  },
  {
    slug: "cliente-confianza-en-el-proceso",
    title: "Ahora tenemos más confianza en todo el proceso",
    content:
      "Uno de los mayores beneficios ha sido la tranquilidad de saber que la información está centralizada y actualizada. Eso nos ayudó a tomar decisiones con mayor seguridad y menos reprocesos.",
    authorName: "Mónica Salazar",
    authorPosition: "Jefe Administrativa",
    authorEmail: "monica.salazar@empresa-demo.com",
    authorCompany: "Aliados Empresariales",
    type: TestimonialType.TEXT,
    status: TestimonialStatus.PUBLISHED,
    isFeatured: true,
    views: 111,
    clicks: 19,
    categorySlug: "cliente",
    tagSlugs: ["confianza", "resultados", "servicio"],
    publishedAt: new Date("2026-03-22T08:00:00.000Z"),
  },
  {
    slug: "evento-experiencia-muy-bien-organizada",
    title: "Una experiencia muy bien organizada",
    content:
      "El evento estuvo muy bien ejecutado de principio a fin. La agenda fue clara, los espacios fueron útiles y el equipo mantuvo un acompañamiento constante durante toda la jornada.",
    authorName: "Andrés Vélez",
    authorPosition: "Consultor Senior",
    authorEmail: "andres.velez@empresa-demo.com",
    authorCompany: "Consultoría Ágil",
    type: TestimonialType.TEXT,
    status: TestimonialStatus.PUBLISHED,
    isFeatured: false,
    views: 69,
    clicks: 7,
    categorySlug: "evento",
    tagSlugs: ["experiencia", "servicio"],
    publishedAt: new Date("2026-03-24T13:10:00.000Z"),
  },
  {
    slug: "industria-impacto-en-productividad",
    title: "El impacto en productividad fue evidente",
    content:
      "En pocas semanas notamos una mejora importante en la coordinación interna. Las tareas dejaron de depender de seguimientos manuales y el equipo pudo enfocarse en actividades de mayor valor.",
    authorName: "Sandra Pineda",
    authorPosition: "Gerente de Proyectos",
    authorEmail: "sandra.pineda@empresa-demo.com",
    authorCompany: "Manufacturas del Eje",
    type: TestimonialType.TEXT,
    status: TestimonialStatus.PUBLISHED,
    isFeatured: false,
    views: 91,
    clicks: 15,
    categorySlug: "industria",
    tagSlugs: ["productividad", "transformacion", "resultados"],
    publishedAt: new Date("2026-03-26T17:40:00.000Z"),
  },
  {
    slug: "producto-mejor-vision-del-cliente",
    title: "Ahora tenemos una mejor visión del cliente",
    content:
      "La información dejó de estar fragmentada y pasamos a tener un panorama mucho más completo del cliente. Eso mejoró la atención, la personalización y el seguimiento posterior.",
    authorName: "Felipe Torres",
    authorPosition: "Analista CRM",
    authorEmail: "felipe.torres@empresa-demo.com",
    authorCompany: "Relaciones Inteligentes",
    type: TestimonialType.TEXT,
    status: TestimonialStatus.PUBLISHED,
    isFeatured: false,
    views: 73,
    clicks: 9,
    categorySlug: "producto",
    tagSlugs: ["tecnologia", "calidad", "experiencia"],
    publishedAt: new Date("2026-03-28T10:50:00.000Z"),
  },
  {
    slug: "cliente-servicio-que-genera-confianza",
    title: "Un servicio que realmente genera confianza",
    content:
      "Lo que más valoramos fue la consistencia del servicio. Cada interacción fue clara, respetuosa y enfocada en resolver. Eso fortaleció mucho la relación con nuestro equipo.",
    authorName: "Diana Ríos",
    authorPosition: "Directora de Servicio al Cliente",
    authorEmail: "diana.rios@empresa-demo.com",
    authorCompany: "Conecta BPO",
    type: TestimonialType.TEXT,
    status: TestimonialStatus.PUBLISHED,
    isFeatured: true,
    views: 134,
    clicks: 28,
    categorySlug: "cliente",
    tagSlugs: ["servicio", "confianza", "soporte"],
    publishedAt: new Date("2026-03-30T15:25:00.000Z"),
  },
  {
    slug: "borrador-mejora-interna-del-proceso",
    title: "Identificamos oportunidades de mejora interna",
    content:
      "Aunque todavía estamos ajustando el proceso, ya vemos beneficios importantes en organización, visibilidad y tiempos de respuesta. El siguiente paso será ampliar el uso a otras áreas.",
    authorName: "Ricardo Mejía",
    authorPosition: "Coordinador de Calidad",
    authorEmail: "ricardo.mejia@empresa-demo.com",
    authorCompany: "Procesos Integrados",
    type: TestimonialType.TEXT,
    status: TestimonialStatus.DRAFT,
    isFeatured: false,
    views: 12,
    clicks: 2,
    categorySlug: "industria",
    tagSlugs: ["calidad", "transformacion"],
    publishedAt: null,
  },
  {
    slug: "pendiente-testimonio-sobre-evento",
    title: "Queremos compartir nuestra experiencia del evento",
    content:
      "La participación en el evento fue muy positiva y estamos recopilando comentarios del equipo para consolidar un testimonio final con más detalles sobre los resultados alcanzados.",
    authorName: "Mariana Ospina",
    authorPosition: "Coordinadora de Comunicaciones",
    authorEmail: "mariana.ospina@empresa-demo.com",
    authorCompany: "Red Creativa",
    type: TestimonialType.TEXT,
    status: TestimonialStatus.PENDING,
    isFeatured: false,
    views: 5,
    clicks: 0,
    categorySlug: "evento",
    tagSlugs: ["experiencia", "innovacion"],
    publishedAt: null,
  },
];

async function main() {
  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10);

  const admin = await prisma.user.upsert({
    where: { email: ADMIN_EMAIL },
    update: {
      name: ADMIN_NAME,
      passwordHash,
      role: Role.ADMIN,
      isActive: true,
      organization: null,
      apiKey: ADMIN_API_KEY,
      adminId: null,
    },
    create: {
      name: ADMIN_NAME,
      email: ADMIN_EMAIL,
      passwordHash,
      role: Role.ADMIN,
      isActive: true,
      organization: null,
      apiKey: ADMIN_API_KEY,
      adminId: null,
    },
  });

  for (const category of BASE_CATEGORIES) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {
        name: category.name,
        description: category.description,
        isSystem: true,
      },
      create: {
        name: category.name,
        slug: category.slug,
        description: category.description,
        isSystem: true,
      },
    });
  }

  for (const tag of BASE_TAGS) {
    await prisma.tag.upsert({
      where: { slug: tag.slug },
      update: {
        name: tag.name,
      },
      create: {
        name: tag.name,
        slug: tag.slug,
      },
    });
  }

  const categories = await prisma.category.findMany({
    where: {
      slug: {
        in: BASE_CATEGORIES.map((category) => category.slug),
      },
    },
  });

  const categoryMap = new Map(categories.map((category) => [category.slug, category.id]));

  const tags = await prisma.tag.findMany({
    where: {
      slug: {
        in: BASE_TAGS.map((tag) => tag.slug),
      },
    },
  });

  const tagMap = new Map(tags.map((tag) => [tag.slug, tag.id]));

  for (const testimonial of TESTIMONIAL_SEED) {
    const categoryId = categoryMap.get(testimonial.categorySlug);

    if (!categoryId) {
      throw new Error(`Category not found for slug: ${testimonial.categorySlug}`);
    }

    const existingTestimonial = await prisma.testimonial.findFirst({
      where: {
        title: testimonial.title,
        authorEmail: testimonial.authorEmail,
      },
      select: {
        id: true,
      },
    });

    const savedTestimonial = existingTestimonial
      ? await prisma.testimonial.update({
        where: { id: existingTestimonial.id },
        data: {
          title: testimonial.title,
          content: testimonial.content,
          authorName: testimonial.authorName,
          authorPosition: testimonial.authorPosition,
          authorEmail: testimonial.authorEmail,
          authorCompany: testimonial.authorCompany,
          type: testimonial.type,
          status: testimonial.status,
          imageUrl: null,
          videoUrl: null,
          youtubeId: null,
          rejectionReason: null,
          views: testimonial.views,
          clicks: testimonial.clicks,
          isFeatured: testimonial.isFeatured,
          categoryId,
          createdById: admin.id,
          adminId: admin.id,
          publishedAt: testimonial.publishedAt,
        },
      })
      : await prisma.testimonial.create({
        data: {
          title: testimonial.title,
          content: testimonial.content,
          authorName: testimonial.authorName,
          authorPosition: testimonial.authorPosition,
          authorEmail: testimonial.authorEmail,
          authorCompany: testimonial.authorCompany,
          type: testimonial.type,
          status: testimonial.status,
          imageUrl: null,
          videoUrl: null,
          youtubeId: null,
          rejectionReason: null,
          views: testimonial.views,
          clicks: testimonial.clicks,
          isFeatured: testimonial.isFeatured,
          categoryId,
          createdById: admin.id,
          adminId: admin.id,
          publishedAt: testimonial.publishedAt,
        },
      });

    await prisma.testimonialTag.deleteMany({
      where: {
        testimonialId: savedTestimonial.id,
      },
    });

    for (const tagSlug of testimonial.tagSlugs) {
      const tagId = tagMap.get(tagSlug);

      if (!tagId) {
        throw new Error(`Tag not found for slug: ${tagSlug}`);
      }

      await prisma.testimonialTag.create({
        data: {
          testimonialId: savedTestimonial.id,
          tagId,
        },
      });
    }
  }

  console.log("✅ Admin seed executed successfully");
  console.log({
    id: admin.id,
    name: admin.name,
    email: admin.email,
    role: admin.role,
    isActive: admin.isActive,
  });

  console.log("✅ Base categories created/updated successfully");
  console.log("✅ Base tags created/updated successfully");
  console.log(`✅ ${TESTIMONIAL_SEED.length} testimonials created/updated successfully`);
}

main()
  .catch((error) => {
    console.error("❌ Error running seed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });