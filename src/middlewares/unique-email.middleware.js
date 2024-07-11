import { User } from "../db/db.service.js";
import { validationErrorMessages } from "../langs/reponseMessages.js";

const uniqueEmailMiddleware = async (req, res, next) => {
  try {
    const { email } = req.body;
    const existingEmail = await User.findOne({ where: { email } });
    if (existingEmail) {
      return res.status(400).json({
        ok: false,
        errors: {
          email: {
            value: email,
            msg: validationErrorMessages.usedEmail,
            path: "email",
          },
        },
      });
    }
    next();
  } catch (error) {
    console.error("Error al verificar la unicidad del usuario:", error);
    res.status(500).json({
      ok: false,
      error:
        "Ocurrió un error al procesar la solicitud. Por favor, inténtelo de nuevo más tarde.",
    });
  }
};

export default uniqueEmailMiddleware;
