import type { z } from "zod";
import type { authLoginSchema } from "../schemas/auth.schema";

export type AuthLogin = z.infer<typeof authLoginSchema>
