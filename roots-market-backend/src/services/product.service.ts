import type { Product } from "../models/product.model";
import { connection } from "../connection"
import { toInt } from "../utils/toInt.utils";
import { parseJsonArray } from "../utils/parseJsonArray.utils";

export const createProduct = async(product: Product)=> {
  try {
    const query = `
      INSERT INTO Product (name, story, price, stock, artisanId, categoryId, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const { lastInsertRowid } = await connection.execute({
      sql: query,
      args: [
        product.name,
        product.story,
        product.price,
        product.stock,
        product.artisanId,
        product.categoryId,
        product.createdAt,
        product.updatedAt
      ],
    });

    return { 
      productId: toInt(lastInsertRowid),
      message: "Producto creado exitosamente"
    };
  } catch (error) {
    throw new Error("Error al crear el producto");
  }
}

export const readProducts = async() => {
  try {
    const query = `
      SELECT 
          p.productId,
          p.name,
          p.story,
          p.price,
          p.stock,
          p.categoryId,
          a.artisanId,
          a.name AS artisanName,
          (
              SELECT json_group_array(DISTINCT t.name)
              FROM ProductTag pt
              JOIN Tag t ON t.tagId = pt.tagId
              WHERE pt.productId = p.productId
          ) AS tags,
          (
              SELECT json_group_array(DISTINCT i.imageUrl)
              FROM Image i
              WHERE i.productId = p.productId
          ) AS images
      FROM Product p
      JOIN Artisan a ON a.artisanId = p.artisanId;
    `;

    const { rows } = await connection.execute({
      sql: query,
    });

    const parsedRows = rows.map((row) => ({
      ...row, 
      tags: parseJsonArray(row.tags),
      images: parseJsonArray(row.images),
    }));

    return parsedRows;
  } catch (error) {
    throw new Error("Error al leer los productos");
  }
} 

export const readProductById = async(id: number) => {
  try {
    const query = "SELECT * FROM Product WHERE productId = ?";

    const { rows } = await connection.execute({
      sql: query,
      args: [id],
    });

    return rows[0];
  } catch (error) {
    throw new Error("Error al leer el producto");
  }
}

export const readRankingProduct = async() => {
  try{
    const query = `
      SELECT 
          p.productId,
          p.name,
          p.price,
          p.story,
          p.categoryId,
          p.soldCount,
          a.artisanId,
          a.name AS artisanName,
          (
              SELECT json_group_array(DISTINCT t.name)
              FROM ProductTag pt
              JOIN Tag t ON t.tagId = pt.tagId
              WHERE pt.productId = p.productId
          ) AS tags,
          (
              SELECT json_group_array(DISTINCT i.imageUrl)
              FROM Image i
              WHERE i.productId = p.productId
          ) AS images
      FROM Product p
      JOIN Artisan a ON a.artisanId = p.artisanId
      ORDER BY p.soldCount DESC 
      LIMIT 4;
    `
    
    const { rows } = await connection.execute({
      sql: query
    })

   const parsedRows = rows.map((row) => ({
      ...row, 
      tags: parseJsonArray(row.tags),
      images: parseJsonArray(row.images),
    }));

    return parsedRows;
  } catch (error) {
    throw new Error("Error al leer el producto")
  }
}

export const readRankingProductById = async(id: number) => {
  try {
    const query = `
      SELECT 
          p.productId,
          p.name,
          p.price,
          p.story,
          p.categoryId,
          p.soldCount,
          a.artisanId,
          a.name AS artisanName,
          (
              SELECT json_group_array(DISTINCT t.name)
              FROM ProductTag pt
              JOIN Tag t ON t.tagId = pt.tagId
              WHERE pt.productId = p.productId
          ) AS tags,
          (
              SELECT json_group_array(DISTINCT i.imageUrl)
              FROM Image i
              WHERE i.productId = p.productId
          ) AS images
      FROM Product p
      JOIN Artisan a ON a.artisanId = p.artisanId
      WHERE a.artisanId = ?
      ORDER BY p.soldCount DESC 
      LIMIT 4;
    `

    const { rows } = await connection.execute({
      sql: query,
      args: [id],
    })

    const parsedRows = rows.map((row) => ({
      ...row,
      tags: parseJsonArray(row.tags),
      images: parseJsonArray(row.images),
    }))
  
    return parsedRows
  } catch (error) {
    throw new Error("Error al leer el producto")
  }
}

export const updateProductById = async(id: number, product: Product) => {
try {
    const query = `
      UPDATE Product
      SET name = ?, story = ?, price = ?, stock = ?, artisanId = ?, categoryId = ?, updatedAt = ?
      WHERE productId = ?
    `;

    const result = await connection.execute({
      sql: query,
      args: [
        product.name,
        product.story,
        product.price,
        product.stock,
        product.artisanId,
        product.categoryId,
        product.updatedAt,
        id,
      ],
    });

    if (result.rowsAffected === 0) {
      throw new Error(`Producto con ID ${id} no encontrado`);
    }

    return { message: "Producto actualizado exitosamente" };
  } catch (error) {
    throw new Error("Error al actualizar el producto");
  }
}
