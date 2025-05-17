import { Router } from "express";
import { login, logout, verifyToken } from "../controllers/auth.controller";
import { validateSchema } from "../middlewares/validator.middleware";
import { authLoginSchema } from "../schemas/auth.schema";

const router = Router()

router.post("/login",  validateSchema(authLoginSchema), login)
router.get("/verify", verifyToken)
router.post("/logout", verifyToken, logout)

export default router
