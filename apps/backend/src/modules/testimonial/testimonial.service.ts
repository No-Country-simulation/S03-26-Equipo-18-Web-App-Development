import { PrismaClient } from "@prisma/client";
import { ListTestimoniosQuery } from "./testimonials.schema";

const prisma = new PrismaClient();

export class TestimonialService {
    async list(query: ListTestimoniosQuery) {
        const {
            page,
            limit,
            q,
            status,
            type,
            categoryId,
            createdById,
            sortBy,
            sortOrder,
        } = query;

        const skip = (page - 1) * limit;

        const where: any = {
            ...(status ? { status } : {}),
            ...(type ? { type } : {}),
            ...(categoryId ? { categoryId } : {}),
            ...(createdById ? { createdById } : {}),
            ...(q
                ? {
                    OR: [
                        { title: { contains: q, mode: "insensitive" } },
                        { content: { contains: q, mode: "insensitive" } },
                        { authorName: { contains: q, mode: "insensitive" } },
                        { authorCompany: { contains: q, mode: "insensitive" } },
                    ],
                }
                : {}),
        };

        const [total, items] = await Promise.all([
            prisma.testimonial.count({ where }),
            prisma.testimonial.findMany({
                where,
                skip,
                take: limit,
                orderBy: {
                    [sortBy]: sortOrder,
                },
                include: {
                    category: true,
                    createdBy: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            role: true,
                        },
                    },
                    testimonialTags: {
                        include: {
                            tag: true,
                        },
                    },
                },
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
