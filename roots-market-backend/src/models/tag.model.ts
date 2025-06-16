import type { z } from "zod";
import type { tagSchema } from "../schemas/tag.schema";

export type Tag = z.infer<typeof tagSchema>

/**
 * @swagger
 * components:
 *   schemas:
 *     TagResponse:
 *       type: object
 *       properties:
 *         tagId:
 *           type: integer
 *           example: 1
 *           description: ID único del tag
 *         name:
 *           type: string
 *           example: "Cerámica"
 *           description: Nombre del tag
 *           maxLength: 50
 *       required:
 *         - tagId
 *         - name
*/
export interface TagResponse {
  tagId: number
  name: string
}
