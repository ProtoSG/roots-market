import { Router } from "express";
import { validateSchema } from "../middlewares/validator.middleware";
import { productCreateSchema, productSchema } from "../schemas/product.schema";
import { getProductById, getProducts, getProductsByArtisanId, getRankingProducts, getRankingProductsByArtisan, getRankingProductsById, putProduct, registerProduct, removeProduct } from "../controllers/product.controller";
import { auth } from "../middlewares/auth.middleware";

const router = Router()

router.get("/products", getProducts)
router.get("/products/ranking", getRankingProducts)
router.get("/products/ranking/:id", getRankingProductsByArtisan)
// router.get("/products/:id", getProductById)

export default router
