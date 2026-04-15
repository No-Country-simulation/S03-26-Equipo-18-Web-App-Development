import { z } from "zod";

export const tagIdParamSchema = z.object({
    id: z.string().trim().min(1, "Id is required"),
});

export const listTagsQuerySchema = z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(10),
    q: z.string().trim().optional(),
    sortBy: z.enum(["name", "slug", "createdAt"]).default("createdAt"),
    sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export const createTagSchema = z.object({
    name: z.string().trim().min(2, "Name must have at least 2 characters").max(50, "Name is too long"),
    slug: z
        .string()
        .trim()
        .min(2, "Slug must have at least 2 characters")
        .max(60, "Slug is too long")
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase and use hyphens only"),
});

export const updateTagSchema = z
    .object({
        name: z.string().trim().min(2, "Name must have at least 2 characters").max(50, "Name is too long").optional(),
        slug: z
            .string()
            .trim()
            .min(2, "Slug must have at least 2 characters")
            .max(60, "Slug is too long")
            .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase and use hyphens only")
            .optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
        message: "At least one field must be provided",
    });

export type TagIdParamInput = z.infer<typeof tagIdParamSchema>;
export type ListTagsQuery = z.infer<typeof listTagsQuerySchema>;
export type CreateTagInput = z.infer<typeof createTagSchema>;
export type UpdateTagInput = z.infer<typeof updateTagSchema>;