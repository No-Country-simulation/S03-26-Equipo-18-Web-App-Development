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

export type LoginInput = z.infer<typeof loginSchema>;   