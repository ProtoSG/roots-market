import { Router } from "express";
import { auth } from "../middlewares/auth.middleware";
import { validateSchema } from "../middlewares/validator.middleware";
import { tagSchema } from "../schemas/tag.schema";
import { registerTag, removeTag } from "../controllers/tag.controller";

const router = Router()

router.post("/tag", [auth, validateSchema(tagSchema)], registerTag)
router.delete("/tag/:id", auth, removeTag)

export default router

