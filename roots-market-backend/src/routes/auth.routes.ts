import { Router } from "express";
import { login, logout, register, verifyToken } from "../controllers/auth.controller";
import { validateSchema } from "../middlewares/validator.middleware";
import { authLoginSchema } from "../schemas/auth.schema";
import { artisanCreateSchema, artisanSchema } from "../schemas/artisan.schema";

const router = Router()

router.post("/login",  validateSchema(authLoginSchema), login)
router.get("/verify", verifyToken)
router.post("/logout", verifyToken, logout)
router.post("/register", validateSchema(artisanCreateSchema), register)

export default router
