import jwt from "jsonwebtoken";
import configJwt from "../config/jwt.config.js";

const signOptions = {
  expiresIn: configJwt.expires_in,
  issuer: configJwt.issuer,
};

export const verifyToken = (token) => {
  try {
    const data = jwt.verify(token, configJwt.secret, {
      maxAge: signOptions.expiresIn,
    });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const signToken = (payload) => {
  try {
    return jwt.sign(payload, configJwt.secret, signOptions);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
