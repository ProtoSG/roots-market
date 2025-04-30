import {type Request, type Response} from 'express'
import type { Artisan } from '../models/artisan.model.ts';
import { createArtisan, foundArtisanByEmail, readArtisanById } from '../services/artisan.service.ts';
import bcrypt from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.ts';

export const registerNewArtisan = async(req: Request, res: Response) => {
  try {
    const { name, username, password, bio, location, profileImageUrl, email } = req.body;

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
      profileImageUrl,
      email,
      createdAt: new Date()
    };

    const newArtisan = await createArtisan(artisanData);

    const token = await createAccessToken({
      id: newArtisan.id,
    });

    res.cookie("token", token, {
      httpOnly: process.env.NODE_ENV !== "development",
      secure: true,
      sameSite: "none",
    });

    res.json({
      id: newArtisan.id,
      username: username,
      email:email,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al crear el artesano" });
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
