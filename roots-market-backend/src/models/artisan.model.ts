import type { z } from "zod";
import type { artisanBaseSchema, artisanCreateSchema, artisanSchema, artisanUpdateSchema } from "../schemas/artisan.schema";
import type { SocialNetwork } from "./socialNetwork.model";
import type { ProductResponse } from "./product.model";

/**
 * @swagger
 * components:
 *   schemas:
 *     ArtisanBase:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Nombre completo del artesano
 *         bio:
 *           type: string
 *           description: Biografía del artesano
 *           minLength: 10
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
 *       required:
 *         - name
 *         - bio
 *         - location
 *         - profileImageURL
 *         - email
 *     Artisan:
 *       allOf:
 *         - $ref: '#/components/schemas/ArtisanBase'
 *         - type: object
 *           properties:
 *             artisanId:
 *               type: integer
 *               description: ID único del artesano
 *     ArtisanCreate:
 *       allOf:
 *         - $ref: '#/components/schemas/ArtisanBase'
 *         - type: object
 *           properties:
 *             username:
 *               type: string
 *               description: Nombre de usuario
 *               maxLength: 50
 *             password:
 *               type: string
 *               description: Contraseña
 *               minLength: 8
 *             testimony:
 *               type: string
 *               description: Testimonio del artesano
 *           required:
 *             - username
 *             - password
 *             - testimony
 *     ArtisanUpdate:
 *       allOf:
 *         - $ref: '#/components/schemas/ArtisanBase'
 *         - type: object
 *           properties:
 *             username:
 *               type: string
 *               description: Nombre de usuario
 *               maxLength: 50
 *           required:
 *             - username
 *     ArtisanResponse:
 *       allOf:
 *         - $ref: '#/components/schemas/Artisan'
 *         - type: object
 *           properties:
 *             socialNetworks:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SocialNetwork'
 *               description: Redes sociales del artesano
 *             products:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProductResponse'
 *               description: Productos del artesano
 */

export type ArtisanBase = z.infer<typeof artisanBaseSchema>
export type Artisan = z.infer<typeof artisanSchema>
export type ArtisanCreate = z.infer<typeof artisanCreateSchema>
export type ArtisanUpdate = z.infer<typeof artisanUpdateSchema>

export interface ArtisanResponse extends Artisan {
  socialNetworks: SocialNetwork[]
  products: ProductResponse[]
}
