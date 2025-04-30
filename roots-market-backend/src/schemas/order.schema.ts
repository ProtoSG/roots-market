import { z } from "zod";

export const orderSchema = z.object({
  orderId: z.number().optional(),
  total: z.number().positive("El total debe ser mayor que 0"),
  status: z.enum(["pending", "paid", "shipped", "delivered", "cancelled"]).optional(),
  createdAt: z.date().optional(),
});

export const orderStatusSchema = z.object({
  status: z.enum(["pending", "paid", "shipped", "delivered", "cancelled"]),
})
