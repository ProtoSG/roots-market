import type { Category } from "../models/category.model";
import { connection } from "../connection"
import { toInt } from "../utils/toInt.utils";

export const createCategory = async(category: Category) => {
  try{
    const query = "INSERT INTO Category (name) VALUES (?)";

    const {lastInsertRowid} = await connection.execute({
      sql: query,
      args: [category.name]
    });

    return { 
      categoryId: toInt(lastInsertRowid), 
      message: "Categoría creada exitosamente" 
    };
  } catch (error){ 
    console.error(error)
    throw new Error("Error al crear la categoría");
  }
}

export const readCategories = async() => {
  try{
    const query = "SELECT * FROM Category";

    const { rows } = await connection.execute({
      sql: query,
    });

    return rows;
    } catch (error){ 
    throw new Error("Error al leer la categoría");
  }
}

export const readCategoryById = async(id: number) => {
  try{
    const query = "SELECT * FROM Category WHERE categoryId = ?";

    const { rows } = await connection.execute({
      sql: query,
      args: [id],
    });

    if (rows.length === 0) {
      throw new Error(`Categoría con ID ${id} no encontrada`);
    }

    return rows[0];
   } catch (error) {
    throw new Error("Error al leer la categoría");
  }
}

export const foundCategoryByName = async(name: string) => {
  try {
    const query = `
      SELECT * FROM Category WHERE name = ?;
    `
    const {rows} = await connection.execute({
      sql: query,
      args: [name]
    })
    
    if (rows.length !== 0) {
      return true
    }
    
    return false
  } catch (error) {
    throw new Error("Error al leer la categoría");
  }
}
