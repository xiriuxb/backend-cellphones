import { Router } from "express";
import { getAllProductTypes } from "./product-type.controller.js";

const productTypesRoutes = Router();

productTypesRoutes.get("/", [], getAllProductTypes);

export default productTypesRoutes;