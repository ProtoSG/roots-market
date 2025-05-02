import { connection } from "../connection";
import type { Order, StatusOrder } from "../models/order.model";
import { toInt } from "../utils/toInt.utils";

export const createOrder = async(order: Order) => {
 try {
    const query = `
      INSERT INTO Orders (total, status, createdAt)
      VALUES (?, ?, ?)
    `;

    const {lastInsertRowid} = await connection.execute({
      sql: query,
      args: [order.total, order.status, order.createdAt],
    });

    return { orderId: toInt(lastInsertRowid), message: "Pedido creado exitosamente" };
  } catch (error) {
    throw new Error("Error al crear el pedido");
  }
}

export const updateStatusOrder = async(orderId: number, status:  StatusOrder) => {
  try {
    const query = `
      UPDATE Order
      SET status = ?
      WHERE orderId = ?
    `;

    const result = await connection.execute({
      sql: query,
      args: [status, orderId],
    });

    if (result.rowsAffected === 0) {
      throw new Error(`Pedido con ID ${orderId} no encontrado`);
    }

    return { message: "Estado del pedido actualizado exitosamente" };
  } catch (error) {
    throw new Error("Error al actualizar el estado del pedido");
  }
}
