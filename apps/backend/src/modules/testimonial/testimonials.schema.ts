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

export const getTestimonioByIdParamsSchema = z.object({
    id: z.string().min(1, "El id es obligatorio"),
});

export const updateStatusBodySchema = z.object({
    estado: z.enum([
        "PENDIENTE",
        "BORRADOR",
        "EN_REVISION",
        "PUBLICADO",
        "RECHAZADO",
    ]),
    motivoRechazo: z
        .string()
        .trim()
        .optional()
        .refine((val) => !val || val.length >= 10, "El motivo debe tener al menos 10 caracteres"),
});

export const updateStatusParamsSchema = z.object({
    id: z.string().min(1, "El id es obligatorio"),
});

export const updateTestimonialBodySchema = z.object({
    titulo: z.string().trim().min(1, "Título es obligatorio").max(200),
    contenido: z.string().trim().min(10, "Contenido debe tener al menos 10 caracteres"),
    autorNombre: z.string().trim().min(1, "Nombre del autor es obligatorio"),
    autorCargo: z.string().trim().optional(),
    autorEmail: z.string().email().optional(),
    autorEmpresa: z.string().trim().optional(),
    tipo: z.enum(["TEXTO", "IMAGEN", "VIDEO"]),
    urlImagen: z.string().url().optional(),
    urlVideo: z.string().url().optional(),
    youtubeId: z.string().optional(),
    categoriaId: z.string().optional(),
});

export const updateTestimonialParamsSchema = z.object({
    id: z.string().min(1, "El id es obligatorio"),
});

export const testimonioIdParamsSchema = z.object({
    id: z.string().min(1, "El id es obligatorio"),
});

export type ListTestimoniosQuery = z.infer<typeof listTestimoniosQuerySchema>;
export type GetTestimonioByIdParams = z.infer<typeof getTestimonioByIdParamsSchema>;
export type UpdateEstadoBody = z.infer<typeof updateStatusBodySchema>;
export type UpdateEstadoParams = z.infer<typeof updateStatusParamsSchema>;
export type UpdateTestimonioBody = z.infer<typeof updateTestimonialBodySchema>;
export type UpdateTestimonioParams = z.infer<typeof updateTestimonialParamsSchema>;