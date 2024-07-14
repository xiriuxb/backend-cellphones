import { Router } from "express";
import authRoutes from "./auth/auth.routes.js";
import brandRoutes from "./brand/brand.routes.js";
import productTypesRoutes from "./product-type/product-type.routes.js";
import specificationTypesRoutes from "./specification-type/specification-type.routes.js";

const apiRouter = Router();

apiRouter.use("/auth", authRoutes);
apiRouter.use("/brands", brandRoutes);
apiRouter.use("/product-types", productTypesRoutes);
apiRouter.use("/specification-types", specificationTypesRoutes);

export default apiRouter;
