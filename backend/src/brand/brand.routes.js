import { Router } from "express";
import { createNewBrand, getAllBrands, getBrandById } from "./brand.controller.js";
import { createBrandValidations } from "./brand.validations.js";
import fieldValidator from "../middlewares/fields-validator.middleware.js";

const brandRoutes = Router();

brandRoutes.get("/", [], getAllBrands);
brandRoutes.get("/:id", [], getBrandById);
brandRoutes.post("/", [createBrandValidations, fieldValidator], createNewBrand);

export default brandRoutes;