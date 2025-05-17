import type { z } from "zod";
import type { artisanSchema } from "../schemas/artisan.schema";

export type Artisan = z.infer<typeof artisanSchema>
