import { validationResult } from "express-validator";

const errorFormatter = ({ location, msg, path }) => {
  return { msg, location, path };
};

const fieldValidator = (req, res, next) => {
  const errors = validationResult(req).formatWith(errorFormatter);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: req.url != "/auth/login" ? errors.mapped() : undefined,
      message:  req.url == "/auth/login" ? "Email o contraseña no válidos" : undefined,
    });
  }
  next();
};

export default fieldValidator;