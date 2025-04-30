import type { Tag } from "../models/tag.model";
import { connection } from "../connection";
import { toInt } from "../utils/toInt.utils";

export const createTag = async (tag: Tag) => {
  try {
    const query = `
      INSERT INTO Tag (artisanId, name)
      VALUES (?, ?)
    `;

    const { lastInsertRowid } = await connection.execute({
      sql: query,
      args: [tag.artisanId, tag.name],
    });

    return { 
      tagId: toInt(lastInsertRowid),
      message: "Etiqueta creada exitosamente"
    };
  } catch (error) {
    throw new Error("Error al crear la etiqueta");
  }
}

export const deleteTag = async(id: number) => {
   try {
    const query = `
      DELETE FROM Tag WHERE tagId = ?
    `;

    const result = await connection.execute({
      sql: query,
      args: [id],
    });

    if (result.rowsAffected === 0) {
      throw new Error(`Etiqueta con ID ${id} no encontrada`);
    }

    return { message: "Etiqueta eliminada exitosamente" };
  } catch (error) {
    throw new Error("Error al eliminar la etiqueta");
  }
}
