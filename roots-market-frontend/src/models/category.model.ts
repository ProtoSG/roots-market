import { z } from "zod";

export const categorySchema = z.object({
  categoryId: z.number().optional(),
  name: z.string({
    required_error: "name es requerido"
  })
});
