import type { Request, Response } from "express";
import { foundArtisanByUsername, readArtisanById } from "../services/artisan.service";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config";

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

    res.cookie("token", token, {
      httpOnly: process.env.NODE_ENV !== "development",
      secure: true,
      sameSite: "none",
    });

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
      id: userFound._id,
      username: userFound.username,
    });
  })
}


export const logout = async (_: Request, res: Response) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: true,
    expires: new Date(0),
  });
  return res.sendStatus(200);
};
