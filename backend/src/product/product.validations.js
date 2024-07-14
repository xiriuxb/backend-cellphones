import { checkSchema } from "express-validator";
import { alphaNumericValidOptions, intValidOptions } from "../util/validations.util.js";

export const createProductValidations = checkSchema({
  name: alphaNumericValidOptions(2, 24, true),
  description: alphaNumericValidOptions(2, 128),
  brand_id: intValidOptions(true, "body"),
  product_type_id: intValidOptions(true, "body"),
});

export const paginationValidations = checkSchema({
  page:intValidOptions(false, "query", 1, 100),
  perPage:intValidOptions(false, "query", 1, 100),
})