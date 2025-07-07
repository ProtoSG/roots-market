import { z } from "zod";
import { SocialNetworkResponse, socialNetworkSchema } from "./socialNetwork.model";
import { MetaPaginationInfo } from "./product.model";

export const baseArtisanSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  profileImageURL: z.string().url("La URL de la imagen de perfil debe ser válida"),
});

export const artisanSchema = baseArtisanSchema.extend({
  id: z.number().int(),
  bio: z.string().min(1, "La bio es obligatorio"),
  location: z.string().min(1, "La locación es obligatorio"),
  email: z.string().email("El correo electrónico debe ser válido"),
  socialNetworks: z.array(socialNetworkSchema)
})

export const artisanTestimonySchema = baseArtisanSchema.extend({
  id: z.number().int(),
  testimony: z.string(),
})

export const artisanUpdateSchema = baseArtisanSchema.extend({
  bio: z.string().min(1, "La bio es obligatorio"),
  location: z.string().min(1, "La locación es obligatorio"),
  email: z.string().email("El correo electrónico debe ser válido"),
})

export type BaseArtisan = z.infer<typeof baseArtisanSchema>
export type Artisan = z.infer<typeof artisanSchema>
export type ArtisanLast = z.infer<typeof artisanTestimonySchema>

export type ArtisanResponse = {
  artisanId: number
  name: string
  username: string
  email: string
  bio: string
  location: string
  profileImageUrl: string
  socialNetworks: SocialNetworkResponse[]
}

export type ArtisanLastResponse = {
  artisanId: number,
  name: string,
  testimony: string,
  profileImageUrl: string
}

export type ArtisanPaginationResponse = {
  data: ArtisanResponse[]
  meta: MetaPaginationInfo
}

export type ArtisanPagination = {
  data: Artisan[]
  meta: MetaPaginationInfo
}

export type ArtisanUpdate = z.infer<typeof artisanUpdateSchema>
export type ArtisanUpdateRequest = {
  name: string
  bio: string
  location: string
  profileImageUrl: string
  email: string
}
