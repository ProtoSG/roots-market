import { Router } from "express";
import { getProducts, getRankingProducts, getRankingProductsByArtisan } from "../controllers/product.controller";

const router = Router()

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Obtiene una lista paginada de productos con filtros opcionales
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Número de página (por defecto 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 9
 *         description: Cantidad de productos por página (por defecto 9)
 *       - in: query
 *         name: categoryId
 *         schema:
 *           type: integer
 *           example: 2
 *         description: ID de la categoría a filtrar
 *       - in: query
 *         name: artisanId
 *         schema:
 *           type: integer
 *           example: 5
 *         description: ID del artesano a filtrar
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *           format: float
 *           example: 10.0
 *         description: Precio mínimo del producto
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *           format: float
 *           example: 50.0
 *         description: Precio máximo del producto
 *     responses:
 *       200:
 *         description: Lista de productos obtenidos exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProductResponse'
 *       400:
 *         description: Parámetros inválidos en la consulta
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Parámetros inválidos"
 *       500:
 *         description: Error interno al obtener los productos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error al obtener los Productos"
 */
router.get("/products", getProducts)

/**
  * @swagger
  * /products/ranking:
  *   get:
  *     summary: Obtiene los productos con mayor venta 
  *     tags: [Products]
  *     responses:
  *       200:
  *         description: Lista el ranking de los productos
  *         content:
  *           application/json:
  *             schema:
  *               type: array 
  *               items:
  *                 $ref: '#/components/schemas/ProductResponse'
 *       400:
 *         description: Parámetros inválidos en la consulta
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Parámetros inválidos"
 *       500:
 *         description: Error interno al obtener los productos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error al obtener los Productos"
  */
router.get("/products/ranking", getRankingProducts)

/**
  * @swagger
  * /products/ranking/artisan/{id}:
  *   get:
  *     summary: Obtiene los productos más vendidos de un artesano específico
  *     tags: [Products]
  *     parameters:
  *       - in: path
  *         name: id
  *         required: true
  *         schema:
  *           type: integer
  *           example: 5
  *         description: ID del artesano
  *     responses:
  *       200:
  *         description: Lista de productos ordenados por cantidad de ventas
  *         content:
  *           application/json:
  *             schema:
  *               type: array
  *               items:
  *                 $ref: '#/components/schemas/ProductResponse'
  *       404:
  *         description: Artesano no encontrado o sin productos
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 message:
  *                   type: string
  *                   example: "Artisan not found"
  */
router.get("/products/ranking/artisan/:id", getRankingProductsByArtisan)
// router.get("/products/:id", getProductById)

export default router
