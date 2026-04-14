import { PrismaClient, Prisma, TestimonialStatus, TestimonialType } from "@prisma/client";
import { AppError } from "../../shared/utils/AppError";
import { ListTestimoniosQuery } from "./testimonials.schema";
import type { UpdateTestimonialInput } from "./testimonials.schema";

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

        const where: Prisma.TestimonialWhereInput = {};

        if (status) {
            where.status = status;
        }

        if (type) {
            where.type = type;
        }

        if (categoryId) {
            where.categoryId = categoryId;
        }

        if (createdById) {
            where.createdById = createdById;
        }

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

    async updateStatus(
        id: string,
        data: { status: TestimonialStatus; rejectionReason?: string }
    ) {
        const testimonial = await prisma.testimonial.findUnique({
            where: { id },
        });

        if (!testimonial) {
            throw new AppError(404, "TESTIMONIAL_NOT_FOUND", "Testimonial not found");
        }

        const updateData: Prisma.TestimonialUpdateInput = {
            status: data.status,
        };

        if (data.rejectionReason !== undefined) {
            updateData.rejectionReason = data.rejectionReason;
        }

        if (data.status === "PUBLISHED") {
            updateData.publishedAt = new Date();
        } else {
            updateData.publishedAt = null;
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

    async update(id: string, data: UpdateTestimonialInput) {
        const existingTestimonial = await prisma.testimonial.findUnique({
            where: { id },
            include: {
                testimonialTags: true,
            },
        });

        if (!existingTestimonial) {
            throw new AppError(404, "TESTIMONIAL_NOT_FOUND", "Testimonial not found");
        }

        const updateData: Prisma.TestimonialUpdateInput = {};

        if (data.title !== undefined) {
            updateData.title = data.title;
        }

        if (data.content !== undefined) {
            updateData.content = data.content;
        }

        if (data.authorName !== undefined) {
            updateData.authorName = data.authorName;
        }

        if (data.authorPosition !== undefined) {
            updateData.authorPosition = data.authorPosition;
        }

        if (data.authorEmail !== undefined) {
            updateData.authorEmail = data.authorEmail;
        }

        if (data.authorCompany !== undefined) {
            updateData.authorCompany = data.authorCompany;
        }

        if (data.type !== undefined) {
            updateData.type = data.type as TestimonialType;
        }

        if (data.status !== undefined) {
            updateData.status = data.status as TestimonialStatus;
            updateData.publishedAt = data.status === "PUBLISHED" ? new Date() : null;
        }

        if (data.imageUrl !== undefined) {
            updateData.imageUrl = data.imageUrl;
        }

        if (data.videoUrl !== undefined) {
            updateData.videoUrl = data.videoUrl;
        }

        if (data.youtubeId !== undefined) {
            updateData.youtubeId = data.youtubeId;
        }

        if (data.rejectionReason !== undefined) {
            updateData.rejectionReason = data.rejectionReason;
        }

        if (data.isFeatured !== undefined) {
            updateData.isFeatured = data.isFeatured;
        }

        if (data.categoryId !== undefined) {
            if (data.categoryId === null || data.categoryId === "") {
                updateData.category = {
                    disconnect: true,
                };
            } else {
                updateData.category = {
                    connect: {
                        id: data.categoryId,
                    },
                };
            }
        }

        const updated = await prisma.$transaction(async (tx) => {
            await tx.testimonial.update({
                where: { id },
                data: updateData,
            });

            if (data.tagIds !== undefined) {
                await tx.testimonialTag.deleteMany({
                    where: {
                        testimonialId: id,
                    },
                });

                if (data.tagIds.length > 0) {
                    await tx.testimonialTag.createMany({
                        data: data.tagIds.map((tagId) => ({
                            testimonialId: id,
                            tagId,
                        })),
                        skipDuplicates: true,
                    });
                }
            }

            return tx.testimonial.findUnique({
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
                    admin: {
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
        });

        if (!updated) {
            throw new AppError(404, "TESTIMONIAL_NOT_FOUND", "Testimonial not found");
        }

        return updated;
    }

    async remove(id: string): Promise<void> {
        const testimonial = await prisma.testimonial.findUnique({
            where: { id },
            select: { id: true },
        });

        if (!testimonial) {
            throw new AppError(404, "TESTIMONIAL_NOT_FOUND", "Testimonial not found");
        }

        await prisma.testimonial.delete({
            where: { id },
        });
    }
}