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

export const updateSocialNetworkById = async (id: number, socialNetwork: SocialNetworkUpdate) => {
  try {
    const query = `
      UPDATE SocialNetwork
      SET type = ?, url = ?
      WHERE socialNetworkId = ?
    `;

    const result = await connection.execute({
      sql: query,
      args: [socialNetwork.type, socialNetwork.url, id],
    });

    if (result.rowsAffected === 0) {
      throw new Error(`Red social con ID ${id} no encontrada`);
    }

    return { message: "Red social actualizada exitosamente" };
  } catch (error) {
    throw new Error("Error al actualizar la red social");
  }
}
