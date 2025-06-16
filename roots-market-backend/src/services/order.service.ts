import { connection } from "../connection";
import type { Order } from "../models/order.model";
import type { StatusOrder } from "../schemas/order.schema";

export const createOrder = async(order: Order) => {
  const transaction = await connection.transaction("write")
  try {
    const queryInsertOrder = `
      INSERT INTO Orders (status)
      VALUES (?)
    `;

    const {lastInsertRowid: orderInsertId} = await transaction.execute({
      sql: queryInsertOrder,
      args: [order.status],
    });
    
    const orderId = Number(orderInsertId)
    
    for (const orderD of order.ordersDetails) {
      const existing = await transaction.execute({
        sql: `SELECT price FROM Product WHERE productId = ?;`,
        args: [orderD.productId]
      }).then(r => r.rows?.[0] as { price: number } | undefined)
      
      if (!existing) {
        throw new Error(`No existe ningun Product con ID = ${orderD.productId}`)
      }
      
      const price = existing.price

     await transaction.execute({
        sql: `
          INSERT INTO OrderDetail (orderId, productId, quantity, price)
          VALUES (?, ?, ?, ?)
        `,
        args: [orderId, orderD.productId, orderD.quantity, price]
      })
    }

    const orderExisting = await transaction.execute({
      sql: `
        SELECT SUM(subTotal) as total 
        FROM OrderDetail 
        WHERE orderId = ?
      `,
      args: [orderId]
    }).then(r => r.rows?.[0] as { total: number | null} | undefined)

    if(!orderExisting) {
      throw new Error(`Order con ID ${orderId} no existe`)
    }

    const total = orderExisting.total || 0

    await transaction.execute({
      sql: `
        UPDATE Orders 
        SET total = ? 
        WHERE orderId = ?
      `, 
      args: [total, orderId]
    })

    await transaction.commit()

    return orderId
  } catch (error) {
    await transaction.rollback()
    throw new Error("Error en la base de datos");
  } finally {
    transaction.close()
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
