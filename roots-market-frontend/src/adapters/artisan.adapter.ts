import { Artisan, ArtisanLast, ArtisanLastResponse, ArtisanResponse, ArtisanUpdate, ArtisanUpdateRequest } from "../models/artisan.model";
import { socialNetworkAdapter } from "./socialNetwork.adapter";

export const artisanTestimonyAdapter = (artisan: ArtisanLastResponse): ArtisanLast => ({
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
  email: artisan.email,
  profileImageURL: artisan.profileImageUrl,
  socialNetworks: artisan.socialNetworks
    .filter(
      (sn) =>
        sn.type != null &&
        sn.URL != null &&
        sn.socialNetworkId != null
    )
    .map(socialNetworkAdapter),
})

export const artisanUpdateAdapter = (artisan: ArtisanUpdate): ArtisanUpdateRequest => ({
  name: artisan.name,
  bio: artisan.bio,
  email: artisan.email,
  location: artisan.location,
  profileImageUrl: artisan.profileImageURL,
})
