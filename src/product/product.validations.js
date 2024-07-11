import { checkSchema } from "express-validator";
import { validationErrorMessages } from "../langs/reponseMessages.js";

const productNameValidOptions = {
  in: "body",
  trim: true,
  notEmpty: { errorMessage: validationErrorMessages.notEmpty },
  isLength: {
    options: { min: 8, max: 128 },
    errorMessage: validationErrorMessages.lengthMinMax(8, 128),
  },
};

const productDescValidOptions = {
  in: "body",
  trim: true,
  notEmpty: { errorMessage: validationErrorMessages.notEmpty },
  isLength: {
    options: { min: 8, max: 512 },
    errorMessage: validationErrorMessages.lengthMinMax(8, 512),
  },
};

export const productValidation = checkSchema({
  name: productNameValidOptions,
  description: productDescValidOptions,
});
