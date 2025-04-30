import { Router } from "express";
import { validateSchema } from "../middlewares/validator.middleware";
import { productSchema } from "../schemas/product.schema";
import { getProductById, getProducts, putProductById, registerProduct } from "../controllers/product.controller";

const router = Router()

router.post("/product", validateSchema(productSchema), registerProduct)
router.get("/product", getProducts)
router.get("/product/:id", getProductById)
router.put("/product", validateSchema(productSchema), putProductById)

export default router
