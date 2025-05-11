import { Router } from "express" 
import { validateSchema } from "../middlewares/validator.middleware.ts"
import { artisanSchema } from "../schemas/artisan.schema.ts"
import { getArtisanById, getArtisans, getLastedArtisan, registerNewArtisan } from "../controllers/artisan.controller.ts"
import { auth } from "../middlewares/auth.middleware.ts"

const router = Router()

router.get("/artisan", getArtisans)
router.get("/artisan/last", getLastedArtisan)
router.get("/artisan/:id", getArtisanById)
router.post("/artisan/register", validateSchema(artisanSchema), registerNewArtisan)

export default router
