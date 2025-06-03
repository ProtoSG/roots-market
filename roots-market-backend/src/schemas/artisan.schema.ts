import { z } from "zod";

export const artisanBaseSchema = z.object({
  name: z.string({
    required_error: "El campo 'name' es requerido"
  }).min(1, "El nombre es obligatorio"),
  bio: z.string({
    required_error: "El campo 'bio' es requerido"
  }).min(10, "La biografía debe tener al menos 10 caracteres"),
  location: z.string({
    required_error: "El campo 'location' es requerido"
  }).min(1, "La ubicación es obligatoria"),
  profileImageURL: z.string({
    required_error: "El campo 'profileImageURL' es requerido"
  }).url("La URL de la imagen de perfil debe ser válida"),
  email: z.string({
    required_error: "El campo 'email' es requerido"
  }).email("El correo electrónico debe ser válido"),
})

export const artisanSchema = artisanBaseSchema.extend({
  artisanId: z.number().optional(),
})

export const artisanCreateSchema = artisanBaseSchema.extend({
  username: z.string({
    required_error: "El campo 'username' es requerido"
  }).min(1, "El nombre de usuario es obligatorio").max(50),
  password: z.string({
    required_error: "El campo 'password' es requerido"
  }).min(8, "La contraseña debe tener al menos 8 caracteres"),
  testimony: z.string({
    required_error: "El campo 'testimony' es requerido" 
  })
});

export const artisanUpdateSchema =  artisanBaseSchema.extend({
  username: z.string({
    required_error: "El campo 'username' es requerido"
  }).min(1, "El nombre de usuario es obligatorio").max(50),
})
