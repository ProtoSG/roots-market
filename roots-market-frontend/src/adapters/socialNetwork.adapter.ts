import { SocialNetwork, SocialNetworkResponse, socialNetworkSchema } from "../models/socialNetwork.model";

export const socialNetworkAdapter = (sn: SocialNetworkResponse): SocialNetwork => {
  const parsed = socialNetworkSchema.parse({
    id:  sn.socialNetworkId,
    type: sn.type,
    url:  sn.URL,
  })

  return parsed
}
