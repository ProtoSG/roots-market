import { Router } from "express" 
import { validateSchema } from "../middlewares/validator.middleware.ts"
import { artisanUpdateSchema } from "../schemas/artisan.schema.ts"
import { getArtisanById, getArtisans, getLastedArtisan, putArtisan } from "../controllers/artisan.controller.ts"
import { auth } from "../middlewares/auth.middleware.ts"
import { socialNetworkSchema, socialNetworkUpdateSchema } from "../schemas/socialNetwork.schema.ts"
import { putSocialNetwork, registerSocialNetwork, removeSocialNetwork } from "../controllers/socialNetwork.controller.ts"
import { getProductsByArtisan, putProduct, registerProduct, removeProduct } from "../controllers/product.controller.ts"
import { productCreateSchema, productUpdateSchema } from "../schemas/product.schema.ts"
import { removeTag } from "../controllers/tag.controller.ts"

const router = Router()

/**
 * @swagger
 * /artisans:
 *   get:
 *     summary: Obtener lista de artesanos
 *     tags: [Artisans]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número de página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 9
 *         description: Cantidad de artesanos por página
 *     responses:
 *       200:
 *         description: Lista de artesanos obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 artisans:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ArtisanResponse'
 *                 total:
 *                   type: integer
 *                 page:
 *                   type: integer
 *                 limit:
 *                   type: integer
 *       500:
 *         description: Error al obtener los artesanos
 */
router.get("/artisans", getArtisans)

/**
 * @swagger
 * /artisans/last:
 *   get:
 *     summary: Obtener el último artesano registrado
 *     tags: [Artisans]
 *     responses:
 *       200:
 *         description: Último artesano obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ArtisanResponse'
 *       404:
 *         description: No hay artesanos registrados
 *       500:
 *         description: Error al obtener el artesano
 */
router.get("/artisans/last", getLastedArtisan)

/**
 * @swagger
 * /artisans/me:
 *   get:
 *     summary: Obtener información del artesano autenticado
 *     tags: [Artisans]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Información del artesano obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ArtisanResponse'
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Artesano no encontrado
 *       500:
 *         description: Error al obtener el artesano
 */
router.get("/artisans/me", auth, getArtisanById)

/**
 * @swagger
 * /artisans/me:
 *   put:
 *     summary: Actualizar información del artesano autenticado
 *     tags: [Artisans]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ArtisanUpdate'
 *     responses:
 *       200:
 *         description: Artesano actualizado exitosamente
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
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Artesano no encontrado
 *       500:
 *         description: Error al actualizar el artesano
 */
router.put("/artisans/me", auth, validateSchema(artisanUpdateSchema), putArtisan)

// Social Network
/**
 * @swagger
 * /artisans/me/socialNetworks:
 *   post:
 *     summary: Registrar nueva red social
 *     tags: [Artisans]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SocialNetworkUpdate'
 *     responses:
 *       200:
 *         description: Red social registrada exitosamente
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
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error al registrar la red social
 */
router.post("/artisans/me/socialNetworks", auth, validateSchema(socialNetworkUpdateSchema), registerSocialNetwork)

/**
 * @swagger
 * /artisans/me/socialNetworks/{id}:
 *   put:
 *     summary: Actualizar red social
 *     tags: [Artisans]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la red social
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SocialNetworkUpdate'
 *     responses:
 *       200:
 *         description: Red social actualizada exitosamente
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
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Red social no encontrada
 *       500:
 *         description: Error al actualizar la red social
 */
router.put("/artisans/me/socialNetworks/:id", auth, validateSchema(socialNetworkUpdateSchema), putSocialNetwork)

/**
 * @swagger
 * /artisans/me/socialNetworks/{id}:
 *   delete:
 *     summary: Eliminar red social
 *     tags: [Artisans]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la red social
 *     responses:
 *       200:
 *         description: Red social eliminada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 message:
 *                   type: string
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Red social no encontrada
 *       500:
 *         description: Error al eliminar la red social
 */
router.delete("/artisans/me/socialNetworks/:id", auth, removeSocialNetwork)

// Products 
/**
 * @swagger
 * /artisans/me/products:
 *   get:
 *     summary: Obtener productos del artesano
 *     tags: [Artisans]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número de página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Cantidad de productos por página
 *     responses:
 *       200:
 *         description: Lista de productos obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ProductResponse'
 *                 total:
 *                   type: integer
 *                 page:
 *                   type: integer
 *                 limit:
 *                   type: integer
 *       401:
 *         description: No autorizado
 *       404:
 *         description: No se encontraron productos
 *       500:
 *         description: Error al obtener los productos
 */
router.get("/artisans/me/products", auth, getProductsByArtisan)

/**
 * @swagger
 * /artisans/me/products:
 *   post:
 *     summary: Registrar nuevo producto
 *     tags: [Artisans]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductCreate'
 *     responses:
 *       200:
 *         description: Producto registrado exitosamente
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
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error al registrar el producto
 */
router.post("/artisans/me/products", auth, validateSchema(productCreateSchema), registerProduct)

/**
 * @swagger
 * /artisans/me/products/{id}:
 *   put:
 *     summary: Actualizar producto
 *     tags: [Artisans]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductUpdate'
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente
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
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error al actualizar el producto
 */
router.put("/artisans/me/products/:id", auth, validateSchema(productUpdateSchema), putProduct)

/**
 * @swagger
 * /artisans/me/products/{id}:
 *   delete:
 *     summary: Eliminar producto
 *     tags: [Artisans]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 message:
 *                   type: string
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error al eliminar el producto
 */
router.delete("/artisans/me/products/:id", auth, removeProduct)

// Tag
/**
 * @swagger
 * /artisans/me/tag/{id}:
 *   delete:
 *     summary: Eliminar tag
 *     tags: [Artisans]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del tag
 *     responses:
 *       200:
 *         description: Tag eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Tag no encontrado
 *       500:
 *         description: Error al eliminar el tag
 */
router.delete("/artisans/me/tag/:id", auth, removeTag)

export default router
