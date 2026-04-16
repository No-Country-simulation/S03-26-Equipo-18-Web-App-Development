import { Prisma, TestimonialStatus, TestimonialType } from "@prisma/client";
import { prisma } from "../../config/prisma";
import cloudinary from "../../config/cloudinary";
import { AppError } from "../../shared/utils/AppError";
import { extractYoutubeId } from "../../shared/utils/youtube";
import type { CreatePublicTestimonioInput } from "./public-testimonials.schema";
import type { ListPublishedTestimonialsQuery } from "./public-testimonials.schema";

function bufferToBase64(file: Express.Multer.File) {
  return `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
}

function getSelect() {
  return {
    id: true,
    title: true,
    content: true,
    authorName: true,
    authorPosition: true,
    authorCompany: true,
    type: true,
    imageUrl: true,
    videoUrl: true,
    youtubeId: true,
    views: true,
    clicks: true,
    isFeatured: true,
    publishedAt: true,
    createdAt: true,
    category: {
      select: {
        id: true,
        name: true,
        slug: true,
      },
    },
    testimonialTags: {
      select: {
        tag: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    },
  };
}

async function getSeedAdmin() {
  const adminEmail =
    process.env.SEED_ADMIN_EMAIL || "admin@testimonialcms.local";

  const admin = await prisma.user.findUnique({
    where: {
      email: adminEmail,
    },
  });

  if (!admin) {
    throw new AppError(
      500,
      "SEED_ADMIN_NOT_FOUND",
      "No se encontró el admin semilla para asociar el testimonio",
    );
  }

  return admin;
}

export class PublicTestimonialsService {
  async create(data: CreatePublicTestimonioInput, file?: Express.Multer.File) {
    const seedAdmin = await getSeedAdmin();

    let imageUrl: string | null = null;
    let videoUrl: string | null = null;
    let youtubeId: string | null = null;

    if (data.type === "IMAGE") {
      if (!file) {
        throw new AppError(400, "IMAGE_REQUIRED", "Se requiere una imagen");
      }

      const uploaded = await cloudinary.uploader.upload(bufferToBase64(file), {
        folder: "testimonial-cms/images",
        resource_type: "image",
      });

      imageUrl = uploaded.secure_url;
    }

    if (data.type === "VIDEO") {
      if (file) {
        const uploaded = await cloudinary.uploader.upload(
          bufferToBase64(file),
          {
            folder: "testimonial-cms/videos",
            resource_type: "video",
          },
        );

        videoUrl = uploaded.secure_url;
      } else if (data.youtubeUrl) {
        const extractedId = extractYoutubeId(data.youtubeUrl);

        if (!extractedId) {
          throw new AppError(
            400,
            "INVALID_YOUTUBE_URL",
            "La URL de YouTube no es válida",
          );
        }

        youtubeId = extractedId;
      } else {
        throw new AppError(
          400,
          "VIDEO_REQUIRED",
          "Debes enviar un archivo de video o una URL de YouTube",
        );
      }
    }

    const testimonial = await prisma.testimonial.create({
      data: {
        title: data.titulo,
        content: data.contenido,
        authorName: data.autorNombre,
        authorPosition: data.autorPosition || null,
        authorEmail: data.autorEmail || null,
        authorCompany: data.autorCompany || null,
        type: data.type,
        status: "PENDING",
        imageUrl,
        videoUrl,
        youtubeId,
        categoryId: data.categoryId || null,
        createdById: seedAdmin.id,
        adminId: seedAdmin.id,
      },
    });

    if (data.tagIds && data.tagIds.length > 0) {
      await prisma.testimonialTag.createMany({
        data: data.tagIds.map((tagId) => ({
          testimonialId: testimonial.id,
          tagId,
        })),
        skipDuplicates: true,
      });
    }

    return testimonial;
  }

  async incrementViews(id: string) {
    try {
      const testimonial = await prisma.testimonial.update({
        where: { id },
        data: {
          views: {
            increment: 1,
          },
        },
        select: {
          id: true,
          views: true,
        },
      });

      return testimonial;
    } catch {
      throw new AppError(
        404,
        "TESTIMONIAL_NOT_FOUND",
        "Testimonio no encontrado",
      );
    }
  }

  async incrementClicks(id: string) {
    try {
      const testimonial = await prisma.testimonial.update({
        where: { id },
        data: {
          clicks: {
            increment: 1,
          },
        },
        select: {
          id: true,
          clicks: true,
        },
      });

      return testimonial;
    } catch {
      throw new AppError(
        404,
        "TESTIMONIAL_NOT_FOUND",
        "Testimonio no encontrado",
      );
    }
  }

async listPublished(query: ListPublishedTestimonialsQuery) {
  const { page, limit, categoryId, type, q, sortBy, sortOrder } = query;

  const skip = (page - 1) * limit;

  const where: Prisma.TestimonialWhereInput = {
    status: TestimonialStatus.PUBLISHED,
  };

  if (categoryId) where.categoryId = categoryId;
  if (type) where.type = type as TestimonialType;

  if (q) {
    where.OR = [
      { title: { contains: q, mode: "insensitive" } },
      { content: { contains: q, mode: "insensitive" } },
      { authorName: { contains: q, mode: "insensitive" } },
      { authorCompany: { contains: q, mode: "insensitive" } },
    ];
  }

 
  const [total, items] = await Promise.all([
    prisma.testimonial.count({ where }),
    prisma.testimonial.findMany({
      where,
      skip,
      take: limit,
      orderBy: [
        { isFeatured: 'desc' },  
        { publishedAt: 'desc' }    
      ],
      select: getSelect(),
    }),
  ]);

  return {
    items,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}
}
