// src/modules/users/users.schema.ts
import { z } from "zod";

export const listUsersQuerySchema = z.object({
  role: z.enum(["ADMIN", "EDITOR", "VISITOR"]).optional(),
  isActive: z
    .string()
    .transform((value) => value === "true")
    .optional(),
  search: z.string().trim().min(1).optional(),
});

export const updateUserParamsSchema = z.object({
  id: z.string().cuid("El id del usuario no es válido"),
});

export const updateUserBodySchema = z
  .object({
    name: z.string().trim().min(2, "El nombre debe tener al menos 2 caracteres").optional(),
    email: z.string().trim().email("El email no es válido").optional(),
    role: z.enum(["ADMIN", "EDITOR", "VISITOR"]).optional(),
    organization: z.string().trim().min(1).max(120).nullable().optional(),
    isActive: z.boolean().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "Debes enviar al menos un campo para actualizar",
  });

export const deleteUserParamsSchema = z.object({
  id: z.string().cuid("El id del usuario no es válido"),
});