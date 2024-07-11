import { Router } from "express";
import { createNewProduct, getAllProducts } from "./product.controller.js";
import { productValidation } from "./product.validations.js";
import fieldValidator from "../middlewares/fields-validator.middleware.js";
import jwtMiddleware from "../middlewares/jwt.middleware.js";

const productRoutes = Router();

productRoutes.get("/", [], getAllProducts);
productRoutes.post("/", [jwtMiddleware, productValidation, fieldValidator], createNewProduct);

export default productRoutes;