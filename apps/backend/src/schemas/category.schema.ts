import { z } from "zod";

export const CreateCategorySchema = z.object({
  name: z
    .string()
    .min(3, "El nombre de la categoría debe tener al menos 3 caracteres")
    .max(50, "El nombre es demasiado largo"),
  
  slug: z
    .string()
    .min(3, "El slug debe tener al menos 3 caracteres")
    .regex(/^[a-z0-9-]+$/, "El slug solo permite minúsculas, números y guiones (ej: saas-product)"),
  
  description: z
    .string()
    .max(200, "La descripción no puede superar los 200 caracteres")
    .optional(),
});

// Tipo para usar en el Service
export type CreateCategoryInput = z.infer<typeof CreateCategorySchema>;

// Esquema para actualizaciones (todo opcional)
export const UpdateCategorySchema = CreateCategorySchema.partial();