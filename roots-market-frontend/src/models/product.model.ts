import { z } from "zod";
import { baseImageSchema, ImageResponse } from "./image.model";
import { baseTagSchema, TagResponse } from "./tag.model";

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
  tags: z.array(baseTagSchema),
  images: z.array(baseImageSchema)
})

export type BaseProduct = z.infer<typeof baseProductSchema>
export type Product = z.infer<typeof productSchema>

export type ProductResponseInfo = {
  productId: number
  name: string
  story: string 
  price: number
  stock: number
  categoryId: number
  soldCount: number
  artisanId: number
  artisanName: string
  tags: TagResponse[]
  images: ImageResponse[]
}

export type MetaPaginationInfo = {
  page: number 
  limit: number 
  totalItems: number 
  totalPages: number
}

export type ProductFilter = {
  data: Product[]
  meta: MetaPaginationInfo
}

export type ProductResponse = {
  data: ProductResponseInfo[]
  meta: MetaPaginationInfo
}

export const productCreateSchema = z.object({
  name: z.string().min(1, "El nombre del producto es obligatorio"),
  story: z.string().min(10, "La historia del producto debe tener al menos 10 caracteres"),
  price: z.number().positive("El precio debe ser mayor que 0"),
  stock: z.number().int().min(0, "El stock debe ser un número entero mayor o igual a 0"),
  categoryId: z.number().int(),
  images: z.array(z.string(), {
    required_error: "Falta el campo 'images'",
    invalid_type_error: "El campo 'images' debe ser un arreglo de cadenas"
  }).min(1, { message: "Debe proporcionar al menos una imagen" }),
  tags: z.array(z.string(), {
    required_error: "Falta el campo 'tags'",
    invalid_type_error: "El campo 'tags' debe ser un arreglo de cadenas"
  }).min(1, { message: "Debe proporcionar al menos una etiqueta" })
})

export type ProductCreate = z.infer<typeof productCreateSchema>