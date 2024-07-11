import { checkSchema } from "express-validator";
import { validationErrorMessages } from "../langs/reponseMessages.js";

export const passwordValidOptions = {
  in: "body",
  trim: true,
  notEmpty: { errorMessage: validationErrorMessages.notEmpty },
  isLength: {
    options: { min: 8, max: 24 },
    errorMessage: validationErrorMessages.lengthMinMax(8, 24),
  },
};

export const emailValidOptions = {
  in: "body",
  trim: true,
  notEmpty: { errorMessage: validationErrorMessages.notEmpty },
  isEmail: { errorMessage: validationErrorMessages.isEmail },
  toLowerCase: true,
};

export const userNameValidOptions = {
  in: "body",
  trim: true,
  notEmpty: { errorMessage: validationErrorMessages.notEmpty },
  isLength: {
    options: { min: 2, max: 24 },
    errorMessage: validationErrorMessages.lengthMinMax(2, 24),
  },
  matches: {
    options: /^[a-zA-Z0-9_]+$/,
    errorMessage: validationErrorMessages.general,
  },
};

export const signInValidations = checkSchema({
  email: emailValidOptions,
  password: passwordValidOptions,
});

export const emailPassValidations = checkSchema({
  email: emailValidOptions,
  password: passwordValidOptions,
});