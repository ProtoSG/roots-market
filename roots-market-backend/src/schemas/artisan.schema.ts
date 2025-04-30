import { z } from "zod";

export const artisanSchema = z.object({
  artisanId: z.number().optional(),
  name: z.string().min(1, "El nombre es obligatorio"),
  username: z.string().min(1, "El nombre de usuario es obligatorio").max(50),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
  bio: z.string().min(10, "La biografía debe tener al menos 10 caracteres"),
  location: z.string().min(1, "La ubicación es obligatoria"),
  profileImageURL: z.string().url("La URL de la imagen de perfil debe ser válida"),
  email: z.string().email("El correo electrónico debe ser válido"),
  createdAt: z.date().optional(),
});
