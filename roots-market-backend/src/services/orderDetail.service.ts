import { connection } from "../connection";
import type { OrderDetail } from "../models/orderDetail.model";
import { toInt } from "../utils/toInt.utils";

export const createOrderDetail = async (orderDetail: OrderDetail) => {
   try {
    const query = `
      INSERT INTO OrderDetail (orderId, productId, quantity, price)
      VALUES (?, ?, ?, ?)
    `;

    const { lastInsertRowid } = await connection.execute({
      sql: query,
      args: [orderDetail.orderId, orderDetail.productId, orderDetail.quantity, orderDetail.price],
    });

    return { orderDetailId: toInt(lastInsertRowid), message: "Detalle de pedido creado exitosamente" };
  } catch (error) {
    throw new Error("Error al crear el detalle del pedido");
  }
}
