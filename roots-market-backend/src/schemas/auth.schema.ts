import { z } from "zod";

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginRequest:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: Nombre de usuario
 *         password:
 *           type: string
 *           description: Contraseña (mínimo 8 caracteres)
 *       required:
 *         - username
 *         - password
 *     LoginResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID del usuario
 *         username:
 *           type: string
 *           description: Nombre de usuario
 *     RegisterRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Nombre completo del artesano
 *         username:
 *           type: string
 *           description: Nombre de usuario
 *         password:
 *           type: string
 *           description: Contraseña (mínimo 8 caracteres)
 *         bio:
 *           type: string
 *           description: Biografía del artesano
 *         location:
 *           type: string
 *           description: Ubicación del artesano
 *         profileImageURL:
 *           type: string
 *           format: uri
 *           description: URL de la imagen de perfil
 *         email:
 *           type: string
 *           format: email
 *           description: Correo electrónico
 *         testimony:
 *           type: string
 *           description: Testimonio del artesano
 *       required:
 *         - name
 *         - username
 *         - password
 *         - bio
 *         - location
 *         - profileImageURL
 *         - email
 *         - testimony
 *     RegisterResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID del artesano registrado
 *         username:
 *           type: string
 *           description: Nombre de usuario
 *     VerifyResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID del usuario
 *         username:
 *           type: string
 *           description: Nombre de usuario
 */

export const authLoginSchema = z.object({
  id: z.number().optional(),
  username: z.string({
    required_error: "username es requerido"
  }),
  password: z.string({
    required_error: "password es requerido"
  }).min(8, "la contraseña debe tener al menos 8 caracteres")
})
