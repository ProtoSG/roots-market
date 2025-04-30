import { z } from "zod";

export const productSchema = z.object({
  productId: z.number().optional(),
  name: z.string().min(1, "El nombre del producto es obligatorio"),
  story: z.string().min(10, "La historia del producto debe tener al menos 10 caracteres"),
  price: z.number().positive("El precio debe ser mayor que 0"),
  stock: z.number().int().min(0, "El stock debe ser un número entero mayor o igual a 0"),
  artisanId: z.number().int(),
  categoryId: z.number().int(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});
