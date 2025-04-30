import { z } from "zod";

export const socialNetworkSchema = z.object({
  socialNetworkId: z.number().optional(),
  artisanId: z.number().int(),
  type: z.string().min(1, "El tipo de red social es obligatorio"),
  url: z.string().url("La URL de la red social debe ser válida"),
});

export const socialNetworkUpdateSchema = z.object({
  type: z.string().min(1, "El tipo de red social es obligatorio"),
  url: z.string().url("La URL de la red social debe ser válida"),
})
