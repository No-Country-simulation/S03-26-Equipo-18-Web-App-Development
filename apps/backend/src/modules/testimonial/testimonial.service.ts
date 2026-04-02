import { AppError } from './../../shared/utils/app-error';
import { PrismaClient } from "@prisma/client";
import { ListTestimoniosQuery, UpdateTestimonioBody } from "./testimonials.schema";

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

    async getById(id: string) {
        const testimonial = await prisma.testimonial.findUnique({
            where: { id },
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
                engagementEvents: {
                    orderBy: {
                        createdAt: "desc",
                    },
                    take: 20,
                },
            },
        });

        return testimonial;
    }

    async updateStatus(id: string, data: { estado: string; motivoRechazo?: string }) {
        const testimonial = await prisma.testimonial.findUnique({
            where: { id },
        });

        if (!testimonial) {
            throw new AppError(404, "TESTIMONIO_NOT_FOUND", "Testimonio no encontrado");
        }

        const updateData: any = {
            estado: data.estado,
        };

        if (data.motivoRechazo !== undefined) {
            updateData.motivoRechazo = data.motivoRechazo;
        }

        if (data.estado === "PUBLICADO") {
            updateData.publicadoAt = new Date();
        } else {
            updateData.publicadoAt = null;
        }

        const updated = await prisma.testimonial.update({
            where: { id },
            data: updateData,
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
        });

        return updated;
    }

    async update(id: string, data: UpdateTestimonioBody) {
        const testimonial = await prisma.testimonial.findUnique({
            where: { id },
        });

        if (!testimonial) {
            throw new AppError(404, "TESTIMONIO_NOT_FOUND", "Testimonio no encontrado");
        }

        // Si cambian las URLs de imagen/video, limpiar youtubeId y viceversa
        let cleanData = { ...data };

        if (data.urlImagen || data.urlVideo) {
            cleanData.youtubeId = undefined;
        } else if (data.youtubeId) {
            cleanData.urlImagen = undefined;
            cleanData.urlVideo = undefined;
        }

        const updated = await prisma.testimonial.update({
            where: { id },
            data: cleanData,
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
        });

        return updated;
    }

    async remove(id: string): Promise<void> {
        const testimonial = await prisma.testimonial.findUnique({
            where: { id },
            select: { id: true },
        });

        if (!testimonial) {
            throw new AppError(404, "TESTIMONIO_NOT_FOUND", "Testimonio no encontrado");
        }

        await prisma.testimonial.delete({
            where: { id },
        });
    }

}
