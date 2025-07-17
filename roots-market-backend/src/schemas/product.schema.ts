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


/**
 * @swagger
 * components:
 *   schemas:
 *     ProductCreate:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Nombre del producto
 *         story:
 *           type: string
 *           description: Historia o descripción del producto
 *         price:
 *           type: number
 *           description: Precio del producto
 *         stock:
 *           type: integer
 *           description: Stock disponible
 *         categoryId:
 *           type: integer
 *           description: ID de la categoría
 *         artisanId:
 *           type: integer
 *           description: ID del artesano
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           description: URLs de imágenes del producto
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           description: Etiquetas del producto
 *       required:
 *         - name
 *         - story
 *         - price
 *         - stock
 *         - categoryId
 *         - artisanId
 *         - images
 *         - tags
 */
export const productCreateSchema = productBaseSchema.extend({
  images: z.array(z.string(), {
    required_error: "Falta el campo 'images'",
    invalid_type_error: "El campo 'images' debe ser un arreglo de cadenas"
  }).min(1, { message: "Debe proporcionar al menos una imagen" }),

  tags: z.array(z.string(), {
    required_error: "Falta el campo 'tags'",
    invalid_type_error: "El campo 'tags' debe ser un arreglo de cadenas"
  }).min(1, { message: "Debe proporcionar al menos una etiqueta" })
})

/**
 * @swagger
 * components:
 *   schemas:
 *     ProductUpdate:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Nombre del producto
 *         story:
 *           type: string
 *           description: Historia o descripción del producto
 *         price:
 *           type: number
 *           description: Precio del producto
 *         stock:
 *           type: integer
 *           description: Stock disponible
 *         categoryId:
 *           type: integer
 *           description: ID de la categoría
 *         images:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ImageUpdate'
 *           description: Imágenes a actualizar
 *         imagesIdDelete:
 *           type: array
 *           items:
 *             type: integer
 *           description: IDs de las imágenes a eliminar
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           description: Etiquetas del producto
 *         tagsIdDelete:
 *           type: array
 *           items:
 *             type: integer
 *           description: IDs de las etiquetas a eliminar
 */
export const productUpdateSchema = productBaseSchema.extend({
  images: z.array(imageUpdateSchema),
  imagesIdDelete: z.array(z.number().int()),
  tags: z.array(z.string(), {
    required_error: "Falta el campo 'tags'",
    invalid_type_error: "El campo 'tags' debe ser un arreglo de cadenas"
  }).min(1, { message: "Debe proporcionar al menos una etiqueta" }),
  tagsIdDelete: z.array(z.number().int())
})
