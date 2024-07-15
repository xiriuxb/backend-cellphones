import { ApiBasicResponse } from "./api-response";

export type BackFieldValidationError = {
  msg: string;
  path: string;
  value: string;
};

export type BackInternalServerError = ApiBasicResponse & {
  message: string;
};

export type BackValidationErrors = ApiBasicResponse & {
  errors: { [field: string]: BackFieldValidationError };
};
