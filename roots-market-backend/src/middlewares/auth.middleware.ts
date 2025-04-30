import jwt from "jsonwebtoken"
import { TOKEN_SECRET } from "../config.ts"
import {type Request, type Response, type NextFunction} from "express"

export const auth = (req: Request, res:Response, next:NextFunction) => {
  try {
    const { token } = req.cookies;

    if (!token) 
      return res.status(401).json({message: "No token, authorzation denied"})

    jwt.verify(token, TOKEN_SECRET, (error: any , user: any) => {
      if (error) {
        return res.status(401).json({message: "Token is not valid"})
      }
      req.user = user;
      next()
    })

  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}
