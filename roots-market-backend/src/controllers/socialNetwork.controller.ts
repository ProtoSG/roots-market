import type { Request, Response } from "express";
import { createSocialNetwork, deleteSocialNetwork, updateSocialNetworkById } from "../services/socialNetwork.service";
import type { SocialNetwork, SocialNetworkUpdate } from "../models/socialNetwork.model";

export const registerSocialNetwork = async(req: Request, res: Response) => {
  try {
    const artisanId = req.user.id
    const {type, url} = req.body

    const newSocialNetwork: SocialNetwork = {
      artisanId,
      type,
      url,
    }
    
    const socialNetworkCreated = await createSocialNetwork(newSocialNetwork)

    res.json({
      id: socialNetworkCreated.socialNetworkId,
      message: socialNetworkCreated.message
    })
  } catch (error) {
    res.status(500).json({
      message: "Error al registrar Red Social"
    })   
  }
}

export const putSocialNetwork = async(req: Request, res: Response) => {
  try{
    const artisanId = req.user.id 

    const socialNetworkId = parseInt(req.params.id as string)
    if(isNaN(socialNetworkId)){
      return res.status(500).json({
        message: "ID inválido"
      })
    }

    const { type, url } = req.body
    
    const newSocialNetwork: SocialNetworkUpdate = {type, url}

    const id = await updateSocialNetworkById(socialNetworkId, artisanId, newSocialNetwork)
    if (!id) return res.status(404).json({
      message: `Red Social con ID ${id} no existe`
    })

    res.json({
      id,
      message: `Red Social con ID ${id} se actualizó correctamente`
    })
  } catch(error){
    res.status(500).json({
      message: "Error al actualizar Red Social",
    })
  }
}

export const removeSocialNetwork = async(req: Request, res:Response) => {
  try {
    const artisanId = req.user.id 
    const snId = parseInt(req.params.id as string)
    if(isNaN(snId)) return res.status(500).json({
      message: "ID inválido"
    })

    const id = await deleteSocialNetwork(snId, artisanId)
    if (!id) return res.status(404).json({
      message: `Red Social con ID ${id} no existe`
    })

    res.json({
      id,
      message: `Red Social con ID ${id} se eliminó correctamente`
    })
  } catch (error) {
    res.status(500).json({
      message: "Error en el servidor al remover Red Social"
    })   
  }
}
