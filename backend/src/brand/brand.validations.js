import { checkSchema } from "express-validator";
import { alphaNumericValidOptions } from "../util/validations.util.js";


export const createBrandValidations = checkSchema({
  name: alphaNumericValidOptions(2, 24, true),
  description: alphaNumericValidOptions(2, 128),
});
