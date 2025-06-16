import type { z } from "zod";
import type { socialNetworkSchema, socialNetworkUpdateSchema } from "../schemas/socialNetwork.schema";

/**
 * @swagger
 * components:
 *   schemas:
 *     SocialNetwork:
 *       type: object
 *       properties:
 *         socialNetworkId:
 *           type: integer
 *           description: ID único de la red social
 *         artisanId:
 *           type: integer
 *           description: ID del artesano propietario
 *         type:
 *           type: string
 *           description: Tipo de red social ej. Instagram, Facebook
 *         url:
 *           type: string
 *           format: uri
 *           description: URL de la red social
 *       required:
 *         - artisanId
 *         - type
 *         - url
 *     SocialNetworkUpdate:
 *       type: object
 *       properties:
 *         type:
 *           type: string
 *           description: Tipo de red social
 *         url:
 *           type: string
 *           format: uri
 *           description: URL de la red social
 *       required:
 *         - type
 *         - url
 */

export type SocialNetwork = z.infer<typeof socialNetworkSchema>
export type SocialNetworkUpdate = z.infer<typeof socialNetworkUpdateSchema>
