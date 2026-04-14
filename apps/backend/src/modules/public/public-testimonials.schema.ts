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

export type CreatePublicTestimonioInput = z.infer<typeof createPublicTestimonioSchema>;
export type TestimonialIdParamInput = z.infer<typeof testimonialIdParamSchema>;