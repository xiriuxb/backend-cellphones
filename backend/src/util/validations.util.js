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
      options: /^[a-zA-Z0-9,.:;-_ ]+$/,
      errorMessage: validationErrorMessages.general,
    },
  };
};

export const intValidOptions = (required, whereIn, min, max) => {
  const _min = min ? min : 1;
  return {
    in: whereIn,
    optional: required ? false : { options: { values: "falsy" } },
    notEmpty: { errorMessage: validationErrorMessages.notEmpty },
    isInt: {
      options: { min: _min, max: max },
      errorMessage: validationErrorMessages.mustBeInt(_min, max),
    },
  };
};
