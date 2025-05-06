import { z } from "zod";

export const tagSchema = z.object({
  tagId: z.number().optional(),
  artisanId: z.number().int(),
  name: z.string().min(1, "El nombre del tag es obligatorio"),
});
