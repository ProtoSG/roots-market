import { Router } from "express";
import { getCategories, registerCategory } from "../controllers/category.controller";
import { validateSchema } from "../middlewares/validator.middleware";
import { categorySchema } from "../schemas/category.schema";

const router = Router()

/**
 * @swagger
 * /category:
 *   post:
 *     summary: Crear una nueva categoría
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: Categoría creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 message:
 *                   type: string
 *       400:
 *         description: La categoría ya existe
 *       500:
 *         description: Error al crear la categoría
 */
router.post("/category", validateSchema(categorySchema), registerCategory)

/**
 * @swagger
 * /category:
 *   get:
 *     summary: Obtener todas las categorías
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Lista de categorías obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *       500:
 *         description: Error al obtener las categorías
 */
router.get("/category", getCategories)

export default router
