import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

import { FRONTEND_URL } from "./config.ts"
import { swaggerSpec, swaggerUI } from "./swagger.ts"

import artisanRoutes from "./routes/artisan.routes.ts"
import categoryRoutes from "./routes/category.routes.ts"
import orderRoutes from "./routes/order.routes.ts"
import productRoutes from "./routes/product.routes.ts"
import authRoutes from "./routes/auth.routes.ts"

const app = express()

app.use(
  cors({
    credentials: true,
    origin: FRONTEND_URL
  })
)
app.use(express.json())
app.use(cookieParser())

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec, {
  swaggerOptions: {
    withCredentials: true,
      requestInterceptor: (req) => {
      req.credentials = "include";
      return req;
    },
  }
}))

app.use("/api", artisanRoutes)
app.use("/api", categoryRoutes)
app.use("/api", orderRoutes)
app.use("/api", productRoutes)
app.use("/api/auth", authRoutes)

export default app
