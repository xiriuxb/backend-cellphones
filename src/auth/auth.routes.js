import { Router } from "express";
import { loginUser, logoutUser, registerUser, renewToken } from "./auth.controller.js";
import { emailPassValidations, signInValidations } from "./auth.validations.js";
import fieldValidator from "../middlewares/fields-validator.middleware.js";
import uniqueEmailMiddleware from "../middlewares/unique-email.middleware.js";
import jwtMiddleware from "../middlewares/jwt.middleware.js";

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
);

authRoutes.post("/logout", [], logoutUser);

authRoutes.get("/renew-token", [jwtMiddleware],renewToken);

export default authRoutes;
