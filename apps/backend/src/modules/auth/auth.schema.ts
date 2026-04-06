import { z } from 'zod';

export const loginSchema = z.object({
  email: z.preprocess(
    (value) =>
      typeof value === 'string' ? value.trim().toLowerCase() : value,
    z.email({
      error: (iss) =>
        iss.input === undefined
          ? 'El email es obligatorio'
          : 'El email no es válido',
    })
  ),

  password: z
    .string({
      error: (iss) =>
        iss.input === undefined
          ? 'La contraseña es obligatoria'
          : 'La contraseña debe ser texto',
    })
    .min(6, {
      error: 'La contraseña debe tener al menos 6 caracteres',
    }),
});

export const registerSchema = z.object({
  name: z.string().trim().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.email().transform((value) => value.toLowerCase().trim()),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
  role: z.enum(['ADMIN', 'VISITOR', 'EDITOR']).optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;   
export type RegisterInput = z.infer<typeof registerSchema>;