import type { Request, Response } from "express";
import { createArtisan, foundArtisanByEmail, foundArtisanByUsername, readArtisanById } from "../services/artisan.service";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config";
import type { Artisan, ArtisanCreate } from "../models/artisan.model";

const isProduction = process.env.NODE_ENV === "production";

const cookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: "lax" as const,
};

export const register = async(req: Request, res: Response) => {
  try {
    const {
      name,
      username, 
      password,
      bio,
      location,
      profileImageUrl,
      email,
      testimony
    } = req.body;

    const artisanFoundByEmail = await foundArtisanByEmail(email);
    const artisanFoundByUsername = await foundArtisanByUsername(username)

    if (artisanFoundByEmail)
      return res.status(400).json({
        message: ["El email ya esta en uso"],
      });
    
    if (artisanFoundByUsername)
      return res.status(400).json({
        message: ["El username ya esta en uso"],
      });

    const passwordHash = await bcrypt.hash(password, 10);

    const artisanData: ArtisanCreate = {
      name,
      username,
      password: passwordHash,
      bio,
      location,
      profileImageUrl,
      email,
      testimony
    };

    const newArtisan = await createArtisan(artisanData);

    const token = await createAccessToken({
      id: newArtisan.id,
    });

    res.cookie("token", token, cookieOptions);

    res.json({
      id: newArtisan.id,
      username: username
    });
  } catch (error) {
    res.status(500).json({ message: "Error al T crear el artesano" });
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body
    
    const userFound = await foundArtisanByUsername(username)
    if (!userFound) {
      return res.status(404).json({
        message: "Nombre de usuario no encontrado"
      })
    }

    const isMatch = await bcrypt.compare(password, userFound.password)
    if (!isMatch) {
      return res.status(400).json({
        message: "La contraseña es incorrecta",
      });
    }

    const token = await createAccessToken({
      id: userFound.id,
    });

    res.cookie("token", token, cookieOptions);

    res.json({
      id: userFound.id,
      username: userFound.username,
    });
  } catch (error: any) {
    return res.status(500).json({ message: error?.message });
  }
}

export const verifyToken = async (req: Request, res: Response) => {
  const { token } = req.cookies
  if(!token) return res.send(false)

  jwt.verify(token, TOKEN_SECRET, async (error: any, user: any) => {
    if (error) return res.sendStatus(401)

    const userFound = await readArtisanById(user.id)
    if (!userFound) return res.sendStatus(401)

    return res.json({
      id: userFound.artisanId,
      username: userFound.username,
    });
  })
}

export const logout = async (_: Request, res: Response) => {
  res.clearCookie("token")
  return res.sendStatus(200);
};