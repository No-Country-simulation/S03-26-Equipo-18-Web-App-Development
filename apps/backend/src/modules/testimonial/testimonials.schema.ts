import { z } from "zod";

export const listTestimoniosQuerySchema = z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(10),
    q: z.string().trim().optional(),
    status: z.string().trim().optional(),
    type: z.string().trim().optional(),
    categoryId: z.string().trim().optional(),
    createdById: z.string().trim().optional(),
    sortBy: z.enum(["createdAt", "publishedAt", "views"]).default("createdAt"),
    sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export type ListTestimoniosQuery = z.infer<typeof listTestimoniosQuerySchema>;
