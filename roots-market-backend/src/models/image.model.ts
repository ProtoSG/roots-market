/**
 * @swagger
 * components:
 *   schemas:
 *     ImageResponse:
 *       type: object
 *       properties:
 *         imageId:
 *           type: integer
 *           example: 1
 *           description: ID único de la imagen
 *         imageUrl:
 *           type: string
 *           format: uri
 *           example: "https://example.com/images/vaso-ceramica.jpg"
 *           description: URL de la imagen
 *       required:
 *         - imageId
 *         - imageUrl
 */
export interface ImageResponse {
  imageId: number
  imageUrl: string
}
