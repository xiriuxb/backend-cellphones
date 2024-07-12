import { checkSchema } from "express-validator";
import { validationErrorMessages } from "../langs/reponseMessages.js";

export const alphaNumericValidOptions = (min, max, required) => {
  return {
    in: "body",
    trim: true,
    optional: required ? false : { options: { values:"falsy" } },
    notEmpty: { errorMessage: validationErrorMessages.notEmpty },
    isLength: {
      options: { min: min, max: max },
      errorMessage: validationErrorMessages.lengthMinMax(min, max),
    },
    matches: {
      options: /^[a-zA-Z0-9_ ]+$/,
      errorMessage: validationErrorMessages.general,
    },
  };
};

export const createProductValidations = checkSchema({
  name: alphaNumericValidOptions(2, 24, true),
  description: alphaNumericValidOptions(2, 128),
});
