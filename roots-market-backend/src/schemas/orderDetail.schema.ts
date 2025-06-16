import { z } from "zod";

/**
 * @swagger
 * components:
 *  schemas:
 *   OrderDetail:
 *     type: object
 *     properties:
 *       productId:
 *         type: integer
 *         description: ID del producto
 *       quantity:
 *         type: integer
 *         minimum: 1
 *         description: Cantidad del producto
 */
export const orderDetailSchema = z.object({
  productId: z.number().int(),
  quantity: z.number().int().min(1, "La cantidad debe ser al menos 1"),
});
