import { Router } from "express";
import { getCategories, registerCategory } from "../controllers/category.controller";
import { validateSchema } from "../middlewares/validator.middleware";
import { categorySchema } from "../schemas/category.schema";

const router = Router()

router.post("/category", validateSchema(categorySchema), registerCategory)
router.get("/category", getCategories)

export default router
