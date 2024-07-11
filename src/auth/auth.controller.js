import { emailPassLogin, emailPassSignUp } from "./auth.service.js";

export const registerUser = async (req, res) => {
  try {
    const user = await emailPassSignUp(req.body);
    return res.status(201).json({ ok: true, ...user });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ ok: false, message: "Server Error, please try again later." });
  }
};

export const loginUser = async (req, res) => {
  try {
    const user = await emailPassLogin(req.body);
    return res.status(200).json({ ok: true, ...user });
  } catch (error) {
    console.log(error);
    if (error.status) {
      return res.status(error.status).json({ ok: false, message: error.msg });
    }
    return res
      .status(500)
      .json({ ok: false, message: "Server Error, please try again later." });
  }
};
