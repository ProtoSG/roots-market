import type { z } from "zod";
import type { socialNetworkSchema, socialNetworkUpdateSchema } from "../schemas/socialNetwork.schema";

export type SocialNetwork = z.infer<typeof socialNetworkSchema>
export type SocialNetworkUpdate = z.infer<typeof socialNetworkUpdateSchema>
