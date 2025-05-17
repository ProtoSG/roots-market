import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.ts";

export async function createAccessToken(payload: { id: number | undefined }): Promise<string> {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, TOKEN_SECRET, { expiresIn: "1d" }, (err: Error | null, token?: string) => {
      if (err || !token) return reject(err);
      resolve(token);
    });
  });
}
