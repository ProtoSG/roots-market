import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(1, {
    message: "Ingrese un usuario válido"
  }),
  password: z.string().min(8, {
    message: "la contraseña debe tener al menos 8 caracteres"
  })
})

export type Login = z.infer<typeof loginSchema>

type backResponse =  {
  "id": number,
  "username": string
} | {
  "message":string
}

export type LoginSuccess = {
  "id": number,
  "username": string
}

export type LoginError = {
  "message": string
}

export type LoginResponse = LoginSuccess | LoginError
export type RegisterResponse = backResponse
export type VerifyResponse = backResponse

export const registerSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  username: z.string().min(1, "El nombre de usuario es obligatorio").max(50),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
  confirmPassword: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
  bio: z.string().min(10, "La biografía debe tener al menos 10 caracteres"),
  location: z.string().min(1, "La ubicación es obligatoria"),
  profileImageURL: z.string().url("La URL de la imagen de perfil debe ser válida"),
  email: z.string().email("El correo electrónico debe ser válido"),
  testimony: z.string().optional()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"]
})

export type Register = z.infer<typeof registerSchema>
