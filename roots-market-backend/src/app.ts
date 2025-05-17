import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

import artisanRoutes from "./routes/artisan.routes.ts"
import categoryRoutes from "./routes/category.routes.ts"
import imageRoutes from "./routes/image.routes.ts"
import orderRoutes from "./routes/order.routes.ts"
import orderDetailRoutes from "./routes/orderDetail.routes.ts"
import productRoutes from "./routes/product.routes.ts"
import socialNetworkRoutes from "./routes/socialNetwork.routes.ts"
import tagRoutes from "./routes/tag.routes.ts"
import authRoutes from "./routes/auth.routes.ts"
import { FRONTEND_URL } from "./config.ts"
import { swaggerSpec, swaggerUI } from "./swagger.ts"

const app = express()

app.use(
  cors({
    credentials: true,
    origin: FRONTEND_URL
  })
)
app.use(express.json())
app.use(cookieParser())

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))

app.use("/api", artisanRoutes)
app.use("/api", imageRoutes)
app.use("/api", categoryRoutes)
app.use("/api", orderRoutes)
app.use("/api", orderDetailRoutes)
app.use("/api", productRoutes)
app.use("/api", socialNetworkRoutes)
app.use("/api", tagRoutes)
app.use("/api/auth", authRoutes)

export default app
