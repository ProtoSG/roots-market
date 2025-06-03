import { z } from "zod";
import { orderDetailSchema } from "./orderDetail.schema";

export enum StatusOrder {
  PENDING   = "pending",
  PAID      = "paid",
  SHIPPED   = "shipped",
  DELIVERED = "delivered",
  CANCELLED = "cancelled",
}

export const orderSchema = z.object({
  status: z.nativeEnum(StatusOrder).default(StatusOrder.PENDING),
  ordersDetails: z.array(orderDetailSchema)
})

export const orderStatusSchema = z.object({
  status: z.nativeEnum(StatusOrder)
})
