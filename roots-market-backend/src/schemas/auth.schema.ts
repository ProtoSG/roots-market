import { z } from "zod";

export const authLoginSchema = z.object({
  id: z.number().optional(),
  username: z.string({
    required_error: "username es requerido"
  }),
  password: z.string({
    required_error: "password es requerido"
  }).min(8, "la contraseña debe tener al menos 8 caracteres")
})
