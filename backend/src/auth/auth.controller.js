import { responseMessages } from "../langs/reponseMessages.js";
import {
  emailPassLogin,
  emailPassSignUp,
  regenerateToken,
} from "./auth.service.js";

export const registerUser = async (req, res) => {
  try {
    const user = await emailPassSignUp(req.body);
    res.cookie("user_jwt", user.token, { httpOnly: true, maxAge: 3600000 });
    return res.status(201).json({ ok: true, user_email: user.user_email });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ ok: false, message: responseMessages.internalServerError });
  }
};

export const loginUser = async (req, res) => {
  try {
    const user = await emailPassLogin(req.body);
    res.cookie("user_jwt", user.token, { httpOnly: true, maxAge: 3600000 });
    return res.status(200).json({ ok: true, user_email: user.user_email });
  } catch (error) {
    console.log(error);
    if (error.status) {
      return res.status(error.status).json({ ok: false, message: responseMessages.notValidCredentials });
    }
    return res
      .status(500)
      .json({ ok: false, message: responseMessages.internalServerError });
  }
};

export const logoutUser = async (req, res) => {
  res.cookie("user_jwt", "", { maxAge: 1 });
  return res.status(200).json({ ok: true });
};

export const renewToken = (req, res) => {
  try {
    const token = regenerateToken(req.user);
    res.cookie("user_jwt", token, { httpOnly: true, maxAge: 3600000 });
    return res.json({ ok: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ ok: false, message: responseMessages.internalServerError });
  }
};