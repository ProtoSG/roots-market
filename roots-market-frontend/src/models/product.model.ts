import { z } from "zod";

export const baseProductSchema = z.object({
  name: z.string().min(1, "El nombre del producto es obligatorio"),
  story: z.string().min(10, "La historia del producto debe tener al menos 10 caracteres"),
  price: z.number().positive("El precio debe ser mayor que 0"),
  stock: z.number().int().min(0, "El stock debe ser un número entero mayor o igual a 0"),
  artisanId: z.number().int(),
  souldCount: z.number().int(),
  categoryId: z.number().int(),
});

export const productSchema = baseProductSchema.extend({
  id: z.number().int(),
  artisanName: z.string().min(1, "El nombre del artesano es obligatorio"),
  tags: z.array(z.string()),
  images: z.array(z.string())
})

export type BaseProduct = z.infer<typeof baseProductSchema>
export type Product = z.infer<typeof productSchema>


export type ProductBack = {
  productId: number
  name: string
  story: string 
  price: number
  stock: number
  categoryId: number
  soldCount: number
  artisanId: number
  artisanName: string
  tags: string[]
  images: string[]
}
