import { Router } from "express";
import { validateSchema } from "../middlewares/validator.middleware";
import { auth } from "../middlewares/auth.middleware";
import { socialNetworkSchema, socialNetworkUpdateSchema } from "../schemas/socialNetwork.schema";
import { putSocialNetworkById, registerSocialNetwork } from "../controllers/socialNetwork.controller";

const router = Router()

router.post("/socialNetwork", [auth, validateSchema(socialNetworkSchema)], registerSocialNetwork)
router.put("/socialNetwork", [auth, validateSchema(socialNetworkUpdateSchema)], putSocialNetworkById)

export default router
