import { z } from "zod";

export const orderDetailSchema = z.object({
  productId: z.number().int(),
  quantity: z.number().int().min(1, "La cantidad debe ser al menos 1"),
});
