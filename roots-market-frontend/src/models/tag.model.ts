import { z } from "zod";

export const baseTagSchema = z.object({
  tagId: z.number().int(),
  name: z.string().min(1, "El nombre del tag es obligatorio"),
})

export const tagSchema = z.object({
  tagId: z.number().optional(),
  artisanId: z.number().int(),
  name: z.string().min(1, "El nombre del tag es obligatorio"),
});

export interface TagResponse {
  tagId: number 
  name: string
}
