import { ArtisanTestimony, ArtisanTestimonyResponse,  } from "../models/artisan.model";

export const artisanAdapter = (artisan: ArtisanTestimonyResponse): ArtisanTestimony => ({
  id: artisan.artisanId,
  name: artisan.name,
  testimony: artisan.testimony,
  profileImageURL: artisan.profileImageUrl
})
