export const regex = {
  EMAIL_REGEX: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
  ALPHA: /^[a-zA-Z0-9,.:;-_()áéíóúÁÉÍÓÚñÑ ]+$/,
  ALPHA_ONLY: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/,
};

export const messages = {
  passwordValidation: "Password must have between 6 and 24 characters",
  selectOption: "Select an option",
  notEmpty: "Cannot be empty",
  tooShort: (min:number) => `Too short, min ${min}`,
  tooLong: (max:number) => `Too short, min ${max}`,
  invalidFormat: "Not valid format",
  invalidEmail: "Not valide email",
  productCreated: "Product created"
};

