import type { z } from "zod";
import type { productCreateSchema, productSchema, productUpdateSchema } from "../schemas/product.schema";

export type Product = z.infer<typeof productSchema>
export type ProductCreate = z.infer<typeof productCreateSchema>
export type ProductUpdate = z.infer<typeof productUpdateSchema>

export interface ProductFilter {
  categoryId: number | null 
  rangePrice: [number | null, number | null]
  artisanId: number | null
}
