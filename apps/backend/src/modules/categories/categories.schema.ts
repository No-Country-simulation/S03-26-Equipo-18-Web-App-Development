import z from 'zod';
import { sl } from 'zod/locales';

export const categoryParamsSchema = z.object({
    id: z.string().trim().min(1, 'El ID de la categoría es obligatorio'),
});

export const createCategorySchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, 'El nombre de la categoría debe ser obligatorio')
        .max(100, 'El nombre de la categoría no puede exceder los 100 caracteres'),

    slug: z
        .string()
        .trim()
        .min(1, 'El slug de la categoría es obligatorio')
        .max(120, 'El slug de la categoría no puede exceder los 120 caracteres')
        .optional(),

    
    description: z
        .string()
        .trim()
        .max(500, 'La descripción de la categoría no puede exceder los 500 caracteres')
        .optional()
        .nullable(),
});

export const updateCategorySchema = z
    .object({
        name: z
            .string()
            .trim()
            .min(1, 'El nombre de la categoría debe ser obligatorio')
            .max(100, 'El nombre de la categoría no puede exceder los 100 caracteres')
            .optional(),
        slug: z
            .string()
            .trim()
            .min(1, 'El slug de la categoría es obligatorio')
            .max(120, 'El slug de la categoría no puede exceder los 120 caracteres')
            .optional(),
        description: z
            .string()
            .trim()
            .max(500, 'La descripción de la categoría no puede exceder los 500 caracteres')
            .optional()
            .nullable(),
    })
    .refine((data => Object.keys(data).length > 0), {
        message: 'Al menos un campo debe ser proporcionado para actualizar',
    });

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>; 
export type CategoryParamsInput = z.infer<typeof categoryParamsSchema>;