import { z } from "zod";

export const baseImageSchema = z.object({
  imageUrl: z.string({
    required_error: "imageUrl es requerido"
  }).url("La URL de la imagen debe ser válida"),
})

export const imageSchema = baseImageSchema.extend({
  productId: z.number({
    required_error: "productId es requerido"
  }).int("Debe ser de tipo entero"),
  imageId: z.number()
});

/**
 * @swagger
 * components:
 *   schemas:
 *     ImageUpdate:
 *       type: object
 *       properties:
 *         imageUrl:
 *           type: string
 *           format: uri
 *           description: URL de la imagen
 *         imageId:
 *           type: integer
 *           description: ID de la imagen
 *       required:
 *         - imageUrl
 */
export const imageUpdateSchema = baseImageSchema.extend({
  imageId: z.number()
})
