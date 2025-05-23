import {type Request, type Response} from 'express'
import type { Artisan } from '../models/artisan.model.ts';
import { createArtisan, foundArtisanByEmail, readArtisanById, readArtisans, readLastedArtisan } from '../services/artisan.service.ts';
import bcrypt from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.ts';

export const registerNewArtisan = async(req: Request, res: Response) => {
  try {
    const {
      name,
      username, 
      password,
      bio,
      location,
      profileImageURL,
      email,
    } = req.body;

    const artisanFound = await foundArtisanByEmail(email);

    if (artisanFound)
      return res.status(400).json({
        message: ["The email is already in use"],
      });
    
    const passwordHash = await bcrypt.hash(password, 10);

    const artisanData: Artisan = {
      name,
      username,
      password: passwordHash,
      bio,
      location,
      profileImageURL,
      email
    };

    const newArtisan = await createArtisan(artisanData);

    const token = await createAccessToken({
      id: newArtisan.id,
    });

    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("token", token, {
      httpOnly: isProduction,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
    });

    res.json({
      id: newArtisan.id,
      username: username,
      email:email,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al T crear el artesano" });
  }
}

export const getArtisans = async(_: Request, res: Response) => {
  try {
    const artisans = await readArtisans()

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

export const getArtisanById = async(req: Request, res: Response) => {
   try {
    const artisanId = parseInt(req.params.id as string, 10);

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
