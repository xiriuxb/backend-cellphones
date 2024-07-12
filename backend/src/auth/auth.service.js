import { responseMessages } from "../langs/reponseMessages.js";
import { createUser, findUserByEmail } from "../user/user.service.js";
import { compareHash } from "../util/hash.util.js";
import { signToken } from "../util/jwt-auth.util.js";

export const emailPassSignUp = async (registerData) => {
  try {
    const newUserData = await createUser(registerData);
    const signedToken = signToken({
      email: newUserData.email,
      id: newUserData.id,
    });
    return {
      token: signedToken,
      user_email: newUserData.email,
    };
  } catch (error) {
    throw error;
  }
};

export const emailPassLogin = async (loginData) => {
  try {
    const user = await findUserByEmail(loginData.email);
    await compareHash(
      loginData.password,
      user.password,
      responseMessages.notValidCredentials
    );
    const signedToken = signToken({ id: user.id, email: user.email });
    return {
      token: signedToken,
      user_email: user.email,
    };
  } catch (error) {
    throw error;
  }
};

export const regenerateToken = (userData) => {
  try {
    return signToken({ id: userData.id, user_email: userData.email });
  } catch (error) {
    throw error;
  }
};
