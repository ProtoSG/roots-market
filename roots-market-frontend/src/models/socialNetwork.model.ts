import { z } from "zod";

export const baseSocialNetworkSchema = z.object({
  type: z.string().min(1, "El tipo de red social es obligatorio"),
  url: z.string().url("La URL de la red social debe ser válida"),
});

export const socialNetworkSchema = baseSocialNetworkSchema.extend({
  id: z.number().int() 
})

export type BaseSocialNetwork = z.infer<typeof baseSocialNetworkSchema>
export type SocialNetwork = z.infer<typeof socialNetworkSchema>

export type SocialNetworkResponse = {
  socialNetworkId: number
  type: string
  URL: string
}
