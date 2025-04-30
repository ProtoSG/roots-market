import { Router } from "express";
import { validateSchema } from "../middlewares/validator.middleware";
import { orderSchema, orderStatusSchema } from "../schemas/order.schema";
import { putStatusOrder, registerOrder } from "../controllers/order.controller";

const router = Router()

router.post("/order", validateSchema(orderSchema), registerOrder)
router.put("/order/:id", validateSchema(orderStatusSchema), putStatusOrder)

export default router
