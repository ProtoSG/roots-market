import { z } from "zod";

export enum listSocialNetworks {
  YOUTUBE = "youtube",
  FACEBOOK = "facebook",
  INSTAGRAM = "instagram",
  TIKTOK = "tiktok"
}

const socialNetworkTypeSchema = z.preprocess(
  (val) => {
    if (typeof val === "string") {
      return val.trim().toLowerCase();
    }
    return val;
  },

  z.nativeEnum(listSocialNetworks, {
    errorMap: () => ({ message: "El tipo de red social debe ser uno de: youtube, facebook, instagram, tiktok" })
  })
);

export const baseSocialNetworkSchema = z.object({
  type: socialNetworkTypeSchema,
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
