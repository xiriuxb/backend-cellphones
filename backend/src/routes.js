import { Router } from "express";
import authRoutes from "./auth/auth.routes.js";
import productRoutes from "./product/product.routes.js";

const apiRouter = Router();

apiRouter.use("/auth", authRoutes);
apiRouter.use("/product", productRoutes);

export default apiRouter;