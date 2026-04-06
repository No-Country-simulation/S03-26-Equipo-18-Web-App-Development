import { PrismaClient, TestimonialStatus } from "@prisma/client";

const prisma = new PrismaClient();

export class TestimoniosService {
  
  static async crear(data: any) {
    const { categoryIds, tagIds, userId, ...rest } = data;

    return await prisma.testimonial.create({
      data: {
        ...rest,
        user: userId ? { connect: { id: userId } } : undefined,
        categories: {
          create: categoryIds?.map((id: string) => ({
            category: { connect: { id } }
          }))
        },
        tags: {
          create: tagIds?.map((id: string) => ({
            tag: { connect: { id } }
          }))
        }
      },
      include: {
        categories: { include: { category: true } },
        tags: { include: { tag: true } },
        user: { select: { name: true, email: true } }
      }
    });
  }

  static async obtenerTodos(status?: TestimonialStatus) {
    return await prisma.testimonial.findMany({
      where: status ? { status } : {},
      include: {
        categories: { select: { category: { select: { name: true, slug: true } } } },
        tags: { select: { tag: { select: { name: true } } } }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

static async actualizar(id: string, data: { tagIds?: string[], categoryId?: string, status?: string }) {
    return await prisma.testimonial.update({
      where: { id },
      data: {
        ...(data.status && { status: data.status as TestimonialStatus }),

        ...(data.categoryId && {
          categories: {
            deleteMany: {}, 
            create: [
              {
                category: { connect: { id: data.categoryId } }
              }
            ]
          }
        }),

        ...(data.tagIds && {
          tags: {
            deleteMany: {},
            create: data.tagIds.map((tagId: string) => ({
              tag: { connect: { id: tagId } }
            }))
          }
        })
      },
      include: {
        categories: {
          include: { category: true }
        },
        tags: {
          include: { tag: true }
        }
      }
    });
  }
}