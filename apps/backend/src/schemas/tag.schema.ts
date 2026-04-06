import { z } from "zod";


export const CreateTagSchema = z.object({
  name: z.string().min(2, "El nombre es muy corto").max(30),
 slug: z.string().min(2).regex(/^[a-z0-9-]+$/, "El slug solo permite minúsculas, números y guiones"),
});

export type CreateTagInput = z.infer<typeof CreateTagSchema>;