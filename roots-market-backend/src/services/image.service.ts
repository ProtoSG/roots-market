import { connection } from "../connection";
import type { Image } from "../models/image.model";
import { toInt } from "../utils/toInt.utils";

export const createImage = async(image: Image) => {
  try {
    const query = "INSERT INTO Image (productId, imageUrl) VALUES (?, ?)";

    const {lastInsertRowid} = await connection.execute({
      sql: query,
      args: [image.productId, image.imageUrl], 
    });

    return { imageId: toInt(lastInsertRowid), message: "Imagen creada exitosamente" };
  } catch (error) {
    throw new Error("Error al crear la imagen"); 
  }
}

export const deleteIamgeById = async(id: number) => {
  try{
    const query = "DELETE FROM Image WHERE imageId = ?";

    const result = await connection.execute({
      sql: query,
      args: [id], 
    });

    if (result.rowsAffected === 0) {
      throw new Error(`Imagen con ID ${id} no encontrada`);
    }

    return { message: "Imagen eliminada exitosamente" };
  } catch (error) {
    throw new Error("Error al eliminar la imagen");
  }
}
