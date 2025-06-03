import type { Request, Response } from "express";
import { deleteTag } from "../services/tag.service";

export const removeTag = async(req: Request, res: Response) => {
  try{
    const artisanId = req.user.id 

    const tagId = Number(req.body.id)
    if(Number.isNaN(tagId)){
      return res.status(500).json({
        message: "ID inválido"
      })
    }

    const id = await deleteTag(tagId, artisanId)

    if(!id) return res
      .status(404)
      .json({message: `Tag con ID ${id} no existe`})

    res.json({
      message: "Tag eliminado exitosamente"
    })
  } catch(error) {
    res.status(500).json({
      message: "Error al remover Tag"
    })
  }
}
