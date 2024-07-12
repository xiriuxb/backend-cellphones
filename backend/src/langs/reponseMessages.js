export const responseMessages = {
  userNotRegistered: "User not registered.",
  notValidCredentials: "Email or password not valid",
  noJwt: "Access token not found",
  invalidJwt: "Access token not valid",
  invalidPassword: "Wrong password",
  updatedPassword: "Password updated successfully",
  internalServerError: "Internal server error",
  updatedEmail: "Email updated successfully",
  notFoundOrBanned: "User not found",
};

export const validationErrorMessages = {
  general: "Not valid value",
  notEmpty: "Mandatory field",
  isEmail: "Not valid email",
  usedEmail: "Email already in use.",
  lengthMinMax: (min, max) => `Must have between ${min} and ${max} characters`,
  imageMimes: "Only JPG, PNG, SVG and WEBP files are allowed.",
  fileSize: (size) =>
    `File size exceeds the limit${size ? " of " + size + "Mb" : undefined}`,
  passwordMismatch: "Passwords does not match",
  samePassword: "New password must not be same as old",
  mustBeInt: (min, max) =>
    `Must be an integer. ${min ? "Minimum: " + min : undefined} ${
      max ? "Maximum: " + max : ""
    }`,
  notUUID: "Not valid UUID",
};
