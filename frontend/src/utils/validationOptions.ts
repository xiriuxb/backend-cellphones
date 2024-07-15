import { messages, regex } from "./constants";

export const passwordValidaion = {
  required: { value: true, message: messages.notEmpty },
  maxLength: {
    value: 24,
    message: messages.passwordValidation,
  },
  minLength: {
    value: 6,
    message: messages.passwordValidation,
  },
};

export const emailValidation = {
  required: { value: true, message: messages.notEmpty },
  pattern: { value: regex.EMAIL_REGEX, message: messages.invalidEmail },
};

export const alphaValidation = (min:number, max:number) => {
  return {
    required: { value: true, message: messages.notEmpty },
    maxLength: { value: max, message: messages.tooLong(max) },
    minLength: { value: min, message: messages.tooShort(min) },
    pattern: {
      value: regex.ALPHA,
      message: messages.invalidFormat,
    },
  };
};
