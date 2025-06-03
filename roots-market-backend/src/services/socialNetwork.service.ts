import type { SocialNetwork, SocialNetworkUpdate } from "../models/socialNetwork.model";
import { connection } from "../connection";
import { toInt } from "../utils/toInt.utils";

export const createSocialNetwork = async (socialNetwork: SocialNetwork) => {
  try {
    const query = `
      INSERT INTO SocialNetwork (artisanId, type, URL)
      VALUES (?, ?, ?)
    `;

    const { lastInsertRowid } = await connection.execute({
      sql: query,
      args: [socialNetwork.artisanId, socialNetwork.type, socialNetwork.url],
    });

    return { 
      socialNetworkId: toInt(lastInsertRowid),
      message: "Red social creada exitosamente"
    };
  } catch (error) {
    console.error("Error al crear la red social:", error);
    throw new Error("Error al crear la red social");
  }
}

export const updateSocialNetworkById = async (id: number, artisanId: number, socialNetwork: SocialNetworkUpdate) => {
  try {
    const query = `
      UPDATE SocialNetwork
      SET type = ?, url = ?
      WHERE 
        socialNetworkId = ? 
        AND artisanId = ?
    `;

    const result = await connection.execute({
      sql: query,
      args: [socialNetwork.type, socialNetwork.url, id, artisanId],
    });

    if (result.rowsAffected === 0) return null

    return id
  } catch (error) {
    throw new Error("Error al actualizar la red social");
  }
}

export const deleteSocialNetwork = async(snId: number, artisanId: number) => {
  try {
    const query = `
      DELETE FROM SocialNetwork
      WHERE 
        socialNetworkId = ?
        AND artisanId = ?
    `
    const { rowsAffected } = await connection.execute({
      sql: query,
      args: [snId, artisanId]
    })

    if (rowsAffected === 0) return null

    return snId
  } catch (error) {
    console.error("Error en la base de datos: ", error.message)
    throw new Error("Error en la base de datos al eliminar la red social")
  }
}
