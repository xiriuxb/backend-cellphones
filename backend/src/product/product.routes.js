import { Router } from "express";
import { createNewProduct, getAllProducts, getProductById, updateOldProduct } from "./product.controller.js";
import { createProductValidations, paginationValidations } from "./product.validations.js";
import fieldValidator from "../middlewares/fields-validator.middleware.js";
import jwtMiddleware from "../middlewares/jwt.middleware.js";

const productRoutes = Router();

productRoutes.post("/", [createProductValidations, fieldValidator], createNewProduct);
productRoutes.get("/", [paginationValidations, fieldValidator], getAllProducts);
productRoutes.get("/:id",[], getProductById);
productRoutes.patch("/:id", [jwtMiddleware, createProductValidations, fieldValidator], updateOldProduct);

export default productRoutes;

