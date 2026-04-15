import { Prisma, PrismaClient } from "@prisma/client";
import { AppError } from "../../shared/utils/AppError";
import type { CreateTagInput, ListTagsQuery, UpdateTagInput } from "./tag.schema";

const prisma = new PrismaClient();

export class TagService {
    async list(query: ListTagsQuery) {
        const { page, limit, q, sortBy, sortOrder } = query;
        const skip = (page - 1) * limit;

        const where: Prisma.TagWhereInput = {};

        if (q) {
            where.OR = [
                { name: { contains: q, mode: "insensitive" } },
                { slug: { contains: q, mode: "insensitive" } },
            ];
        }

        const [total, items] = await Promise.all([
            prisma.tag.count({ where }),
            prisma.tag.findMany({
                where,
                skip,
                take: limit,
                orderBy: {
                    [sortBy]: sortOrder,
                },
                include: {
                    testimonialTags: {
                        select: {
                            testimonialId: true,
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
        return prisma.tag.findUnique({
            where: { id },
            include: {
                testimonialTags: {
                    include: {
                        testimonial: {
                            select: {
                                id: true,
                                title: true,
                                status: true,
                                type: true,
                            },
                        },
                    },
                },
            },
        });
    }

    async create(data: CreateTagInput) {
        try {
            return await prisma.tag.create({
                data: {
                    name: data.name,
                    slug: data.slug,
                },
            });
        } catch (error: any) {
            if (error?.code === "P2002") {
                throw new AppError(409, "TAG_ALREADY_EXISTS", "A tag with the same name or slug already exists");
            }

            throw error;
        }
    }

    async update(id: string, data: UpdateTagInput) {
        const existingTag = await prisma.tag.findUnique({
            where: { id },
            select: { id: true },
        });

        if (!existingTag) {
            throw new AppError(404, "TAG_NOT_FOUND", "Tag not found");
        }

        try {
            return await prisma.tag.update({
                where: { id },
                data: {
                    ...(data.name !== undefined ? { name: data.name } : {}),
                    ...(data.slug !== undefined ? { slug: data.slug } : {}),
                },
            });
        } catch (error: any) {
            if (error?.code === "P2002") {
                throw new AppError(409, "TAG_ALREADY_EXISTS", "A tag with the same name or slug already exists");
            }

            throw error;
        }
    }

    async remove(id: string): Promise<void> {
        const existingTag = await prisma.tag.findUnique({
            where: { id },
            include: {
                testimonialTags: {
                    select: {
                        testimonialId: true,
                    },
                },
            },
        });

        if (!existingTag) {
            throw new AppError(404, "TAG_NOT_FOUND", "Tag not found");
        }

        if (existingTag.testimonialTags.length > 0) {
            throw new AppError(
                409,
                "TAG_IN_USE",
                "Tag cannot be deleted because it is assigned to one or more testimonials"
            );
        }

        await prisma.tag.delete({
            where: { id },
        });
    }
}