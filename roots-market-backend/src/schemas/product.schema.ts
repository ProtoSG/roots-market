import { z } from "zod";
import { imageUpdateSchema } from "./image.schema";

export const productBaseSchema = z.object({
  name: z.string({
    required_error: "Falta el campo 'name'"
  }),
  story: z.string({
    required_error: "Falta el campo 'story'"
  }).min(10, "La historia del producto debe tener al menos 10 caracteres"),
  price: z.number({
    required_error: "Falta el campo 'price'"
  }).positive("El precio debe ser mayor que 0"),
  stock: z.number({
    required_error: "Falta el campo 'stock'"
  }).int().min(0, "El stock debe ser un número entero mayor o igual a 0"),
  categoryId: z.number({
    required_error: "Falta el campo 'categoryId'"
  }).int()
})

export const productSchema = productBaseSchema.extend({
  productId: z.number().optional(),
  artisanId: z.number({
    required_error: "Falta el campo 'artisanId'"
  }).int(),
});

export const productCreateSchema = productBaseSchema.extend({
  artisanId: z.number({
    required_error: "Falta el campo 'artisanId'"
  }).int(),

  images: z.array(z.string(), {
    required_error: "Falta el campo 'images'",
    invalid_type_error: "El campo 'images' debe ser un arreglo de cadenas"
  }).min(1, { message: "Debe proporcionar al menos una imagen" }),

  tags: z.array(z.string(), {
    required_error: "Falta el campo 'tags'",
    invalid_type_error: "El campo 'tags' debe ser un arreglo de cadenas"
  }).min(1, { message: "Debe proporcionar al menos una etiqueta" })
})

export const productUpdateSchema = productBaseSchema.extend({
  images: z.array(imageUpdateSchema),
  imagesIdDelete: z.array(z.number().int()),
  tags: z.array(z.string(), {
    required_error: "Falta el campo 'tags'",
    invalid_type_error: "El campo 'tags' debe ser un arreglo de cadenas"
  }).min(1, { message: "Debe proporcionar al menos una etiqueta" }),
  tagsIdDelete: z.array(z.number().int())
})
