import {type Request, type Response} from 'express'
import { readArtisanById, readArtisans, readLastedArtisan, updateArtisan } from '../services/artisan.service.ts';
import { ZodParsedType } from 'zod';
import { artisanSchema } from '../schemas/artisan.schema.ts';
import type { Artisan, ArtisanUpdate } from '../models/artisan.model.ts';

export const getArtisanById = async(req: Request, res: Response) => {
   try {
    const artisanId = req.user.id

    if (isNaN(artisanId)) {
      return res.status(400).json({ message: "ID de artesano inválido" });
    }

    const artisan = await readArtisanById(artisanId);

    if (!artisan) {
      return res.status(404).json({ message: `Artesano con ID ${artisanId} no encontrado` });
    }

    res.status(200).json(artisan);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el artesano" });
  }
}

export const putArtisan = async(req: Request, res: Response) => {
  try {
    const id = req.user.id
    console.log("ID: ", id)
    const { name, username, email, bio, location, profileImageURL } = req.body;
    
    const artisan: ArtisanUpdate = {
      name,
      username,
      email,
      bio,
      location,
      profileImageURL
    }
    const artisanId = await updateArtisan(id, artisan)
    console.log("ArtisanID: ", artisanId)
    if (!artisanId) return res.status(404).json({
      message: `Artesano con ID ${artisanId} no encontrado`
    })
    
    res.status(200).json({
      id: artisanId,
      message: `Artesano con ID ${artisanId} actualizado.`
    })
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el artesano" });
  }
}

export const getArtisans = async(req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 9
    const artisans = await readArtisans(page, limit)

    if (!artisans) return res.status(404).json({
      message: "No hay Artesanos"
    })

    res.json(artisans)
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener Artesanos" 
    })
  }
}

export const getLastedArtisan = async(_: Request, res: Response) => {
  try{
    const artisan = await readLastedArtisan()
 
    if (!artisan) return res.status(404).json({
      message: "No hay Artesanos"
    })
   
    res.json(artisan)
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener el artesano"
    })
  }
}
