import type { Request, Response } from "express";
import { SocialNetwork, SocialNetworkUpdate } from "../models/socialNetwork.model";
import { createSocialNetwork, updateSocialNetworkById } from "../services/socialNetwork.service";

export const registerSocialNetwork = async(req: Request, res: Response) => {
  try {
    const {artisanId, type, url} = req.body

    const newSocialNetwork = new SocialNetwork(
      artisanId,
      type,
      url,
    )
    
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

export const putSocialNetworkById = async(req: Request, res: Response) => {
  try{
    const socialNetworkId = parseInt(req.params.id as string)
    if(isNaN(socialNetworkId)){
      return res.status(500).json({
        message: "ID inválido"
      })
    }

    const { type, url } = req.body
    
    const newSocialNetwork = new SocialNetworkUpdate(type, url)

    const socialNetworkUpdate = await updateSocialNetworkById(socialNetworkId, newSocialNetwork)

    res.json({
      message: socialNetworkUpdate.message
    })
  } catch(error){
    res.status(500).json({
      message: "Error al actualizar Red Social",
    })
  }
}
