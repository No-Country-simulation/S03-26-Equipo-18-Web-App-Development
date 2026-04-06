import { z } from "zod";

export const CreateTestimonialSchema = z.object({
  title: z.string().min(5, "El título debe tener al menos 5 caracteres").max(100),
  content: z.string().min(10, "El contenido es muy corto"),
  authorName: z.string().min(2, "El nombre del autor es obligatorio"),
  authorPosition: z.string().optional(),
  authorEmail: z.string().email("Email inválido").optional().or(z.literal("")),
  authorCompany: z.string().optional(),
  userId: z.string().cuid("ID de usuario inválido").optional().nullable(),
  categoryIds: z.array(z.string().cuid()).optional().default([]),
  tagIds: z.array(z.string().cuid()).optional().default([]),
});

export type CreateTestimonialInput = z.infer<typeof CreateTestimonialSchema>;