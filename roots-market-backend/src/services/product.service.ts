import type { Product } from "../models/product.model";
import { connection } from "../connection"
import { toInt } from "../utils/toInt.utils";

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
    const query = "SELECT * FROM Product";

    const { rows } = await connection.execute({
      sql: query,
    });

    return rows;
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
