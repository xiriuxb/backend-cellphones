import { Router } from "express";
import { loginUser, registerUser } from "./auth.controller.js";
import { emailPassValidations, signInValidations } from "./auth.validations.js";
import fieldValidator from "../middlewares/fields-validator.middleware.js";
import uniqueEmailMiddleware from "../middlewares/unique-email.middleware.js";

const authRoutes = Router();

authRoutes.post(
  "/signup",
  [signInValidations, fieldValidator, uniqueEmailMiddleware],
  registerUser
);

authRoutes.post(
    "/login",
    [emailPassValidations, fieldValidator],
    loginUser
)

export default authRoutes;
