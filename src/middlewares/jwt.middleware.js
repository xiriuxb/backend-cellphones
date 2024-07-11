import { responseMessages } from "../langs/reponseMessages.js";
import { verifyToken } from "../util/jwt-auth.util.js";

const jwtMiddleware = (req, res, next) => {
  const token = req.cookies["user_jwt"];

  if (!token) {
    return res.status(401).json({ ok: false, message: responseMessages.noJwt });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(403)
      .json({ ok: false, message: responseMessages.invalidJwt });
  }
};

export default jwtMiddleware;