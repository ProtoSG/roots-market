import { Router } from "express";
import { validateSchema } from "../middlewares/validator.middleware";
import { productSchema } from "../schemas/product.schema";
import { getProductById, getProducts, getRankingProducts, getRankingProductsById, putProductById, registerProduct } from "../controllers/product.controller";

const router = Router()

router.post("/product", validateSchema(productSchema), registerProduct)
/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: array
 *         price:
 *           type: number
 */

/**
 * @swagger
 * /product:
 *    get:
 *      summary: Obtnere todos los productos 
 *      tags: [Productos]
 *      responses:
 *        200:
 *          description: Lista de productos 
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Product'
 */

router.get("/product", getProducts)
router.get("/product/ranking", getRankingProducts)
router.get("/product/ranking/:id", getRankingProductsById)
router.get("/product/:id", getProductById)
router.put("/product", validateSchema(productSchema), putProductById)

export default router
