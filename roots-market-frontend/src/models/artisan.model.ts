import { z } from "zod";

export const baseArtisanSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  profileImageURL: z.string().url("La URL de la imagen de perfil debe ser válida"),
});

export const artisanSchema = baseArtisanSchema.extend({
  id: z.number().int(),
})

export const artisanTestimonySchema = baseArtisanSchema.extend({
  id: z.number().int(),
  testimony: z.string(),
})

export type BaseArtisan = z.infer<typeof baseArtisanSchema>
export type Artisan = z.infer<typeof artisanSchema>
export type ArtisanTestimony = z.infer<typeof artisanTestimonySchema>

export type ArtisanTestimonyResponse = {
  artisanId: number,
  name: string,
  testimony: string,
  profileImageUrl: string
}
