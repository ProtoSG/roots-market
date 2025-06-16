import { z } from "zod";

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         categoryId:
 *           type: integer
 *           description: ID único de la categoría
 *         name:
 *           type: string
 *           description: Nombre de la categoría
 *       required:
 *         - name
 */
export const categorySchema = z.object({
  categoryId: z.number().optional(),
  name: z.string({
    required_error: "name es requerido"
  })
});
