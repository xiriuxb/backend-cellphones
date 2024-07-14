import { Router } from "express";
import { getAllSpecificationTypes } from "./specification-type.controller.js";

const specificationTypesRoutes = Router();

specificationTypesRoutes.get("/", [], getAllSpecificationTypes);

export default specificationTypesRoutes;