import { z } from "zod";

export const imageSchema = z.object({
  imageId: z.number().optional(),
  productId: z.number({
    required_error: "productId es requerido"
  }).int("Debe ser de tipo entero"),
  imageUrl: z.string({
    required_error: "imageUrl es requerido"
  }).url("La URL de la imagen debe ser válida"),
});
