import { Artisan, ArtisanResponse, ArtisanTestimony, ArtisanTestimonyResponse,  } from "../models/artisan.model";
import { socialNetworkAdapter } from "./socialNetwork.adapter";

export const artisanTestimonyAdapter = (artisan: ArtisanTestimonyResponse): ArtisanTestimony => ({
  id: artisan.artisanId,
  name: artisan.name,
  testimony: artisan.testimony,
  profileImageURL: artisan.profileImageUrl
})

export const artisanAdapter = (artisan: ArtisanResponse): Artisan => ({
  id: artisan.artisanId,
  name: artisan.name,
  bio: artisan.bio,
  location: artisan.location,
  profileImageURL: artisan.profileImageUrl,
  socialNetworks: artisan.socialNetworks.map((st) => socialNetworkAdapter(st))
})
