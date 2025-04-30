import { Router } from "express";
import { validateSchema } from "../middlewares/validator.middleware";
import { imageSchema } from "../schemas/image.schema";
import { registerImage, removeImage } from "../controllers/image.controller";
import { auth } from "../middlewares/auth.middleware";

const router = Router()

router.post("/image", [auth, validateSchema(imageSchema)], registerImage)
router.delete("/image/:id", auth, removeImage)

export default router
