import type { Request, Response } from "express";
import { Image } from "../models/image.model";
import { createImage, deleteIamgeById } from "../services/image.service";

export const registerImage = async (req: Request, res: Response) => {
  try {
    const {productId, imageUrl} = req.body

    const image = new Image(
      productId,
      imageUrl
    )

    const newImage = await createImage(image)
    
    res.json({
      id: newImage.imageId,
      message: newImage.message
    })
  } catch (error) {
    res.status(500).json({message: "Error al crear la imagen"})
  }
}

export const removeImage = async(req: Request, res: Response) => {
  try {
    const imageId = parseInt(req.params.id as string)
    if (isNaN(imageId)) {
      return res.status(400).json({message: "ID inválido"})
    }

    const {message} = await deleteIamgeById(imageId)
    res.json({ message })
  } catch (error) {
    res.status(500).json({message: "Error al eliminar la imagen"})
  }
}
