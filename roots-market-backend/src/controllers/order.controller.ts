import type { Request, Response } from "express";
import { createOrder, updateStatusOrder } from "../services/order.service";
import type { Order } from "../models/order.model";
import { StatusOrder } from "../schemas/order.schema";

export const registerOrder = async(req: Request, res: Response) => {
  try {
    const {ordersDetails, status}:Order = req.body

    const newOrder: Order = {
      status,
      ordersDetails
    } 

    const idOrderCreated = await createOrder(newOrder)
    
    res.json({
      id: idOrderCreated,
      message: `Order creada`
    })
  } catch (error) {
    res.status(500).json({
      message: "Error al crear la orden"
    })
  }
}

export const putStatusOrder = async(req: Request, res: Response) => {
  try {
    const orderId = parseInt(req.params.id as string)
    if (isNaN(orderId)){
      return res.status(400).json({
        message: "ID inválido"
      })
    }

    const {status} = req.body
    if (!Object.values(StatusOrder).includes(status)){
      return res.status(400).json({
        message: "Status invádlido"
      })
    }
    
    const {message} = await updateStatusOrder(orderId, status)
    res.json({message})
  } catch(error) {
    res.status(500).json({
      message: "Error al actualizar el estado"
    })
  }
}
