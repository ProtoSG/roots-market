import { Router } from "express" 
import { validateSchema } from "../middlewares/validator.middleware.ts"
import { artisanSchema } from "../schemas/artisan.schema.ts"
import { getArtisanById, registerNewArtisan } from "../controllers/artisan.controller.ts"
import { auth } from "../middlewares/auth.middleware.ts"

const router = Router()

router.post("/artisan/register", validateSchema(artisanSchema), registerNewArtisan)
router.get("/artisan/:id", getArtisanById)

export default router
