import type { z } from "zod";
import type { orderSchema } from "../schemas/order.schema";

export type Order = z.infer<typeof orderSchema>
