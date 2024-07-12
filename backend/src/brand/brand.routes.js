import { Router } from "express";
import { createNewBrand, getAllBrands } from "./brand.controller.js";
import { createProductValidations } from "./brand.validations.js";
import fieldValidator from "../middlewares/fields-validator.middleware.js";

const brandRoutes = Router();

brandRoutes.get("/", [], getAllBrands);
brandRoutes.post("/", [createProductValidations, fieldValidator], createNewBrand);

export default brandRoutes;