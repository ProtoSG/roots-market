import { z } from "zod";

export const orderDetailSchema = z.object({
  orderDetailId: z.number().optional(),
  orderId: z.number().int(),
  productId: z.number().int(),
  quantity: z.number().int().min(1, "La cantidad debe ser al menos 1"),
  price: z.number().positive("El precio debe ser mayor que 0"),
});
