import { Router } from "express" 
import { validateSchema } from "../middlewares/validator.middleware.ts"
import { artisanUpdateSchema } from "../schemas/artisan.schema.ts"
import { getArtisanById, getArtisans, getLastedArtisan, putArtisan } from "../controllers/artisan.controller.ts"
import { auth } from "../middlewares/auth.middleware.ts"
import { socialNetworkSchema, socialNetworkUpdateSchema } from "../schemas/socialNetwork.schema.ts"
import { putSocialNetwork, registerSocialNetwork, removeSocialNetwork } from "../controllers/socialNetwork.controller.ts"
import { getProductsByArtisan, putProduct, registerProduct, removeProduct } from "../controllers/product.controller.ts"
import { productCreateSchema, productUpdateSchema } from "../schemas/product.schema.ts"
import { removeTag } from "../controllers/tag.controller.ts"

const router = Router()

router.get("/artisans", getArtisans)
router.get("/artisans/last", getLastedArtisan)
router.get("/artisans/me", auth, getArtisanById)
router.put("/artisans/me", auth, validateSchema(artisanUpdateSchema), putArtisan)

// Social Network
router.post("/artisans/me/socialNetworks", auth, validateSchema(socialNetworkSchema), registerSocialNetwork)
router.put("/artisans/me/socialNetworks/:id", auth, validateSchema(socialNetworkUpdateSchema), putSocialNetwork)
router.delete("/artisans/me/socialNetworks/:id", auth, removeSocialNetwork)

// Products 
router.get("/artisans/me/products", auth, getProductsByArtisan)
router.post("/artisans/me/products", auth, validateSchema(productCreateSchema), registerProduct)
router.put("/artisans/me/products/:id", auth, validateSchema(productUpdateSchema), putProduct)
router.delete("/artisans/me/products/:id", auth, removeProduct)

// Tag
router.delete("/artisans/me/tag/:id", auth, removeTag)

export default router
