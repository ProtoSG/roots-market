import type { z } from "zod";
import type { artisanBaseSchema, artisanCreateSchema, artisanSchema, artisanUpdateSchema } from "../schemas/artisan.schema";

export type ArtisanBase = z.infer<typeof artisanBaseSchema>
export type Artisan = z.infer<typeof artisanSchema>
export type ArtisanCreate = z.infer<typeof artisanCreateSchema>
export type ArtisanUpdate = z.infer<typeof artisanUpdateSchema>
