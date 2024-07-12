import { Router } from "express";
import authRoutes from "./auth/auth.routes.js";

const apiRouter = Router();

apiRouter.use("/auth", authRoutes);

export default apiRouter;