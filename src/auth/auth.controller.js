import { emailPassLogin, emailPassSignUp } from "./auth.service.js";

export const registerUser = async (req, res) => {
  try {
    const user = await emailPassSignUp(req.body);
    res.cookie("user_jwt", user.token, { httpOnly: true, maxAge: 3600000 });
    return res.status(201).json({ ok: true, user_email: user.user_email });
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
    res.cookie("user_jwt", user.token, { httpOnly: true, maxAge: 3600000 }); // 1 hora
    return res.status(200).json({ ok: true, user_email: user.user_email });
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

export const logoutUser = async (req, res) => {
  res.cookie("user_jwt", "", { maxAge: 1 });
  res.status(200).json({ ok: true });
};
