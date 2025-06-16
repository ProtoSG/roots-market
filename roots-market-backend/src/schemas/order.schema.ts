import { z } from "zod";
import { orderDetailSchema } from "./orderDetail.schema";

/**
 * @swagger
 * components:
 *  schemas:
 *   StatusOrder:
 *     type: string
 *     enum:
 *       - pending
 *       - paid
 *       - shipped
 *       - delivered
 *       - cancelled
 *     description: Estado de la orden
 */
export enum StatusOrder {
  PENDING = "pending",
  PAID = "paid",
  SHIPPED = "shipped",
  DELIVERED = "delivered",
  CANCELLED = "cancelled",
}

/**
 * @swagger
 * components:
 *  schemas:
 *    Order:
 *      type: object
 *      properties:
 *        status:
 *          $ref: '#/components/schemas/StatusOrder'
 *        ordersDetails:
 *          type: array
 *          items:
 *             $ref: '#/components/schemas/OrderDetail'
 *      required:
 *        - ordersDetails
 */
export const orderSchema = z.object({
  status: z.nativeEnum(StatusOrder).default(StatusOrder.PENDING),
  ordersDetails: z.array(orderDetailSchema),
});

/**
 * @swagger
 * components:
 *  schemas:
 *   OrderStatus:
 *     type: object
 *     properties:
 *       status:
 *         type: string
 *         enum:
 *           - pending
 *           - paid
 *           - shipped
 *           - delivered
 *           - cancelled
 *         description: Estado de la orden
 */
export const orderStatusSchema = z.object({
  status: z.nativeEnum(StatusOrder),
});
