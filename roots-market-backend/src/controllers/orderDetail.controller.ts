import type { Request, Response } from "express"
import { OrderDetail } from "../models/orderDetail.model"
import { createOrderDetail } from "../services/orderDetail.service"

export const registerOrderDetail = async(req: Request, res: Response) => {
  try {
    const {quantity, productId, price, orderId} = req.body
    
    const newOrderDetail = new OrderDetail(
      orderId,
      productId,
      quantity,
      price,
    )

    const orderDetailCreated = await createOrderDetail(newOrderDetail)

    res.json({
      id: orderDetailCreated.orderDetailId,
      message: orderDetailCreated.message
    })
  } catch (error) {
    res.status(500).json({
      message: "Error al crear orderDetail"
    })
  }
}
