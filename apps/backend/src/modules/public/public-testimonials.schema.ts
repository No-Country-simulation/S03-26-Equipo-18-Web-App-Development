import { z } from "zod";

export const createPublicTestimonioSchema = z.object({
    titulo: z.string().trim().min(1).max(200),
    contenido: z.string().trim().min(10),
    autorNombre: z.string().trim().min(1).max(120),
    autorPosition: z.string().trim().max(120).optional(),
    autorEmail: z.string().email().optional().or(z.literal("")),
    autorCompany: z.string().trim().max(160).optional(),
    type: z.enum(["TEXT", "IMAGE", "VIDEO"]),
    categoryId: z.string().optional(),
    tagIds: z.array(z.string()).optional(),
    youtubeUrl: z.string().url().optional().or(z.literal("")),
});

export const testimonialIdParamSchema = z.object({
    id: z.string().trim().min(1, "El id es obligatorio"),
});

export const listPublishedTestimonialsQuerySchema = z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(50).default(10),
    categoryId: z.string().trim().optional(),
    type: z.enum(["TEXT", "IMAGE", "VIDEO"]).optional(),
    featured: z.coerce.boolean().optional(),
    q: z.string().trim().optional(),
    sortBy: z.enum(["publishedAt", "createdAt", "views", "clicks"]).default("publishedAt"),
    sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export type CreatePublicTestimonioInput = z.infer<typeof createPublicTestimonioSchema>;
export type TestimonialIdParamInput = z.infer<typeof testimonialIdParamSchema>;
export type ListPublishedTestimonialsQuery = z.infer<typeof listPublishedTestimonialsQuerySchema>;