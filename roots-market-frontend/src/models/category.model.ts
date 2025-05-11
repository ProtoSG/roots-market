import { z } from "zod";

export const baseCategorySchema = z.object({
  name: z.string().min(1, "Nombre es obligatorio")
});

export const categorySchema = baseCategorySchema.extend({
  id: z.number().int()
})

export type BaseCategory = z.infer<typeof baseCategorySchema>
export type Category = z.infer<typeof categorySchema>

export type CategoryResponse = {
  categoryId: number,
  name: string
}
