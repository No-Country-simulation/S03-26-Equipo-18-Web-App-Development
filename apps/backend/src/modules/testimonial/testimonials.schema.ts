import { z } from "zod";
import { TestimonialStatus, TestimonialType } from "@prisma/client";

export const listTestimonialsQuerySchema = z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(10),
    q: z.string().trim().optional(),
    status: z.nativeEnum(TestimonialStatus).optional(),
    type: z.nativeEnum(TestimonialType).optional(),
    categoryId: z.string().trim().optional(),
    createdById: z.string().trim().optional(),
    sortBy: z
        .enum(["createdAt", "updatedAt", "publishedAt", "views", "clicks"])
        .default("createdAt"),
    sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export const getTestimonioByIdParamsSchema = z.object({
    id: z.string().trim().min(1, "Id is required"),
});

export const updateStatusParamsSchema = z.object({
    id: z.string().trim().min(1, "Id is required"),
});

export const updateTestimonialSchema = z
    .object({
        title: z.string().trim().min(2, "Title must have at least 2 characters").optional(),
        content: z.string().trim().min(10, "Content must have at least 10 characters").optional(),
        authorName: z.string().trim().min(2, "Author name must have at least 2 characters").optional(),
        authorPosition: z.string().trim().optional().nullable(),
        authorEmail: z.string().trim().email("Invalid email").optional().nullable(),
        authorCompany: z.string().trim().optional().nullable(),
        type: z.enum(["TEXT", "IMAGE", "VIDEO"]).optional(),
        status: z.enum(["PENDING", "DRAFT", "IN_REVIEW", "PUBLISHED", "REJECTED"]).optional(),
        imageUrl: z.string().trim().url("Invalid image URL").optional().nullable(),
        videoUrl: z.string().trim().url("Invalid video URL").optional().nullable(),
        youtubeId: z.string().trim().optional().nullable(),
        rejectionReason: z.string().trim().optional().nullable(),
        isFeatured: z.boolean().optional(),
        categoryId: z.string().trim().optional().nullable(),
        tagIds: z.array(z.string().trim().min(1)).optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
        message: "At least one field must be provided",
    });

export type UpdateTestimonialStatusInput = z.infer<
    typeof updateTestimonialStatusSchema
>;

export const updateTestimonialStatusSchema = z.object({
    status: z.enum(["PENDING", "DRAFT", "IN_REVIEW", "PUBLISHED", "REJECTED"]),
    rejectionReason: z.string().trim().optional(),
});

export const updateTestimonialParamsSchema = z.object({
    id: z.string().min(1, "El id es obligatorio"),
});

export const testimonialIdParamSchema = z.object({
    id: z.string().trim().min(1, "Id is required"),
});

export type ListTestimoniosQuery = z.infer<typeof listTestimonialsQuerySchema>;
export type GetTestimonioByIdParams = z.infer<typeof getTestimonioByIdParamsSchema>;
export type UpdateEstadoParams = z.infer<typeof updateStatusParamsSchema>;
export type UpdateTestimonialInput = z.infer<typeof updateTestimonialSchema>;
export type TestimonialIdParamInput = z.infer<typeof testimonialIdParamSchema>;
export type UpdateTestimonioParams = z.infer<typeof updateTestimonialParamsSchema>;