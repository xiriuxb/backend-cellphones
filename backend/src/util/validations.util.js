import { validationErrorMessages } from "../langs/reponseMessages.js";

export const alphaNumericValidOptions = (min, max, required) => {
  return {
    in: "body",
    trim: true,
    optional: required ? false : { options: { values: "falsy" } },
    notEmpty: { errorMessage: validationErrorMessages.notEmpty },
    isLength: {
      options: { min: min, max: max },
      errorMessage: validationErrorMessages.lengthMinMax(min, max),
    },
    matches: {
      options: /^[a-zA-Z0-9,.:;-_()áéíóúÁÉÍÓÚñÑ ]+$/,
      errorMessage: validationErrorMessages.general,
    },
  };
};

export const intValidOptions = (required, whereIn, min, max) => {
  const _min = min ? min : 1;
  const _max = max ? max : 999;
  return {
    in: whereIn,
    optional: required ? false : { options: { values: "falsy" } },
    isInt: {
      options: { min: _min, max: _max },
      errorMessage: validationErrorMessages.mustBeInt(_min, max),
    },
    notEmpty: { errorMessage: validationErrorMessages.notEmpty },
  };
};
