import jwt from "jsonwebtoken"
import { TOKEN_SECRET } from "../config.ts"

export async function createAccessToken(payload: {id: bigint | undefined}) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, TOKEN_SECRET, {expiresIn: "1d"}, (err: Error, token: string) => {
      if (err) reject(err);
      resolve(token)
    })
  })
}
