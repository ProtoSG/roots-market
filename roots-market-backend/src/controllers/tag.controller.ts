import type { Request, Response } from "express";
import { Tag } from "../models/tag.model";
import { createTag, deleteTag } from "../services/tag.service";

export const registerTag = async(req: Request, res: Response) => {
  try {
    const {artisanId, name}: Tag = req.body
    
    const newTag = new Tag(artisanId, name)

    const tagCraeted = await createTag(newTag)

    res.json({
      id: tagCraeted.tagId,
      message: tagCraeted.message
    })
  } catch (error) {
    res.status(500).json({
      message: "Error al registrar Tag"
    })
  }
}

export const removeTag = async(req: Request, res: Response) => {
  try{
    const tagId = parseInt(req.body.id as string)
    if(isNaN(tagId)){
      return res.status(500).json({
        message: "ID inválido"
      })
    }

    const {message} = await deleteTag(tagId)

    res.json({message})
  } catch(error) {
    res.status(500).json({
      message: "Error al remover Tag"
    })
  }
}
