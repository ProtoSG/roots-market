import { Router } from "express";
import { validateSchema } from "../middlewares/validator.middleware";
import { orderDetailSchema } from "../schemas/orderDetail.schema";
import { registerOrderDetail } from "../controllers/orderDetail.controller";

const router = Router()

router.post("/orderDetail", validateSchema(orderDetailSchema), registerOrderDetail)

export default router
