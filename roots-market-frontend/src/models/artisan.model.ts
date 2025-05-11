import { z } from "zod";
import { SocialNetworkResponse, socialNetworkSchema } from "./socialNetwork.model";

export const baseArtisanSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  profileImageURL: z.string().url("La URL de la imagen de perfil debe ser válida"),
});

export const artisanSchema = baseArtisanSchema.extend({
  id: z.number().int(),
  bio: z.string().min(1, "La bio es obligatorio"),
  location: z.string().min(1, "La locación es obligatorio"),
  socialNetworks: z.array(socialNetworkSchema)
})

export const artisanTestimonySchema = baseArtisanSchema.extend({
  id: z.number().int(),
  testimony: z.string(),
})

export type BaseArtisan = z.infer<typeof baseArtisanSchema>
export type Artisan = z.infer<typeof artisanSchema>
export type ArtisanTestimony = z.infer<typeof artisanTestimonySchema>

export type ArtisanResponse = {
  artisanId: number
  name: string
  bio: string
  location: string
  profileImageUrl: string
  socialNetworks: SocialNetworkResponse[]
}

export type ArtisanTestimonyResponse = {
  artisanId: number,
  name: string,
  testimony: string,
  profileImageUrl: string
}
