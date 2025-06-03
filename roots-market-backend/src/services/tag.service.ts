import { connection } from "../connection";

export const deleteTag = async(id: number, artisanId: number) => {
   try {
    const query = `
      DELETE FROM Tag 
      WHERE tagId = ?
      AND artisanId = ?;
    `;

    const result = await connection.execute({
      sql: query,
      args: [id, artisanId],
    });

    if (result.rowsAffected === 0) return null

    return id
  } catch (error) {
    throw new Error("Error al eliminar la etiqueta");
  }
}
