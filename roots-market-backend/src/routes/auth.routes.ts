import { Router } from "express";
import { login, logout, register, verifyToken } from "../controllers/auth.controller";
import { validateSchema } from "../middlewares/validator.middleware";
import { authLoginSchema } from "../schemas/auth.schema";
import { artisanCreateSchema } from "../schemas/artisan.schema";

const router = Router()

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *               description: Token de autenticación en cookie
 *       400:
 *         description: Credenciales inválidas
 *       500:
 *         description: Error del servidor
 */
router.post("/login",  validateSchema(authLoginSchema), login)

/**
 * @swagger
 * /auth/verify:
 *   get:
 *     summary: Verificar token de autenticación
 *     tags: [Auth]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Token válido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/VerifyResponse'
 *       401:
 *         description: Token inválido o expirado
 */
router.get("/verify", verifyToken)

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Cerrar sesión
 *     tags: [Auth]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Sesión cerrada exitosamente
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *               description: Cookie de token eliminada
 */
router.post("/logout", logout)

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registrar nuevo artesano
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       200:
 *         description: Registro exitoso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegisterResponse'
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *               description: Token de autenticación en cookie
 *       400:
 *         description: Datos inválidos o usuario/email ya existe
 *       500:
 *         description: Error del servidor
 */
router.post("/register", validateSchema(artisanCreateSchema), register)

export default router
