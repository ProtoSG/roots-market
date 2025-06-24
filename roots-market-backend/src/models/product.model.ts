import type { z } from "zod";
import type { productCreateSchema, productSchema, productUpdateSchema } from "../schemas/product.schema";
import type { TagResponse } from "./tag.model";
import type { ImageResponse } from "./image.model";

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         productId:
 *           type: integer
 *           example: 1
 *           description: ID único del producto (autogenerado)
 *           readOnly: true
 *         name:
 *           type: string
 *           example: "Vaso de Cerámica"
 *           description: Nombre del producto
 *           maxLength: 100
 *         story:
 *           type: string
 *           example: "Hecho a mano con técnicas tradicionales"
 *           description: Historia o descripción detallada del producto
 *         price:
 *           type: number
 *           format: float
 *           minimum: 0
 *           example: 25.99
 *           description: Precio del producto en USD
 *         stock:
 *           type: integer
 *           minimum: 0
 *           example: 10
 *           description: Cantidad disponible en inventario
 *         categoryId:
 *           type: integer
 *           example: 3
 *           description: ID de la categoría a la que pertenece
 *         artisanId:
 *           type: integer
 *           example: 5
 *           description: ID del artesano creador
 *       required:
 *         - name
 *         - story
 *         - price
 *         - stock
 *         - categoryId
 *         - artisanId
 */
export type Product = z.infer<typeof productSchema>
export type ProductCreate = z.infer<typeof productCreateSchema>
export type ProductUpdate = z.infer<typeof productUpdateSchema>

export interface ProductFilter {
  categoryId: number | null 
  rangePrice: [number | null, number | null]
  artisanId: number | null
}

/**
 * @swagger
 * components:
 *   schemas:
 *     ProductResponseInfo:
 *       type: object
 *       allOf:
 *         - $ref: '#/components/schemas/Product'
 *       properties:
 *         soldCount:
 *           type: integer
 *           example: 15
 *           description: Cantidad de unidades vendidas
 *         artisanName:
 *           type: string
 *           example: "María López"
 *           description: Nombre del artesano que creó el producto
 *         tags:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/TagResponse'
 *           description: Lista de tags asociados al producto
 *         images:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ImageResponse'
 *           description: Lista de imágenes del producto
 */
export interface ProductResponseInfo extends Product{
  soldCount: number
  artisanName: string 
  tags: TagResponse[]
  images: ImageResponse[] 
}

/**
 * @swagger
 * components:
 *   schemas:
 *     MetaProductPagination:
 *       type: object
 *       properties:
 *         page:
 *           type: integer
 *           example: 1
 *           description: Número de página (por defecto 1)
 *         limit:
 *           type: integer
 *           example: 9
 *           description: Cantidad de productos por página (por defecto 9)
 *         totalItems:
 *           type: integer
 *           example: 9
 *           description: Número de productos
 *         totalPages:
 *           type: integer
 *           example: 3
 *           description: Número de páginas
 */
export interface MetaProductPagination {
  page: number 
  limit: number 
  totalItems: number 
  totalPages: number
}

/**
 * @swagger
 * components:
 *   schemas:
 *     ProductResponse:
 *       type: object
 *       properties:
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ProductResponseInfo'
 *         meta:
 *           $ref: '#/components/schemas/MetaProductPagination'
 *       required:
 *         - data
 *         - meta
 */
export interface ProductResponse{
  data: ProductResponseInfo[]
  meta: MetaProductPagination
}

/**
 * @swagger
 * components:
 *   schemas:
 *     ProductCreate:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Nombre del producto
 *         story:
 *           type: string
 *           description: Historia o descripción del producto
 *         price:
 *           type: number
 *           description: Precio del producto
 *         stock:
 *           type: integer
 *           description: Stock disponible
 *         categoryId:
 *           type: integer
 *           description: ID de la categoría
 *         artisanId:
 *           type: integer
 *           description: ID del artesano
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           description: URLs de imágenes del producto
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           description: Etiquetas del producto
 *       required:
 *         - name
 *         - story
 *         - price
 *         - stock
 *         - categoryId
 *         - artisanId
 *         - images
 *         - tags
 */
