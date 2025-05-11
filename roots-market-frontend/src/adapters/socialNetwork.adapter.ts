import { SocialNetwork, SocialNetworkResponse } from "../models/socialNetwork.model";

export const socialNetworkAdapter = (socialNetwork: SocialNetworkResponse): SocialNetwork => ({
  id: socialNetwork.socialNetworkId,
  type: socialNetwork.type,
  url: socialNetwork.URL
})
