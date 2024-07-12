import { Router } from "express";
import authRoutes from "./auth/auth.routes.js";
import brandRoutes from "./brand/brand.routes.js";

const apiRouter = Router();

apiRouter.use("/auth", authRoutes);
apiRouter.use("/brands", brandRoutes);

export default apiRouter;