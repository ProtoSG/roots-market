import { Router } from "express";
import { validateSchema } from "../middlewares/validator.middleware";
import { orderSchema, orderStatusSchema } from "../schemas/order.schema";
import { putStatusOrder, registerOrder } from "../controllers/order.controller";

const router = Router();

/**
 * @swagger
 * /order:
 *   post:
 *     summary: Crea una nueva orden
 *     tags:
 *       - Orders
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       201:
 *         description: Orden creada exitosamente
 *       400:
 *         description: Datos inválidos
 */
router.post("/order", validateSchema(orderSchema), registerOrder);

/**
 * @swagger
 * /order/{id}:
 *   put:
 *     summary: Actualiza el estado de una orden
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la orden
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderStatus'
 *     responses:
 *       200:
 *         description: Estado de la orden actualizado exitosamente
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Orden no encontrada
 */
router.put("/order/:id", validateSchema(orderStatusSchema), putStatusOrder);

export default router;
