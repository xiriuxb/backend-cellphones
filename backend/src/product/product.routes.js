import { Router } from "express";
import { createNewProduct, getAllProducts } from "./product.controller.js";
import { createProductValidations, paginationValidations } from "./product.validations.js";
import fieldValidator from "../middlewares/fields-validator.middleware.js";

const productRoutes = Router();

productRoutes.post("/", [createProductValidations, fieldValidator], createNewProduct);
productRoutes.get("/", [paginationValidations, fieldValidator], getAllProducts);

export default productRoutes;

