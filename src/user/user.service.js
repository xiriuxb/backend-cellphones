import { User } from "../db/db.service.js";
import { passwordHash } from "../util/hash.util.js";

export const createUser = async (userData) => {
  try {
    const hashPassword = await passwordHash(userData.password);
    return await User.create({ ...userData, password: hashPassword });
  } catch (error) {
    throw error;
  }
};

export const findUserByEmail = async (userEmail) => {
  try {
    const user = await User.findOne();
    if(!user){
      throw {status:400, msg:"User not found"}
    }
    return user;
  } catch (error) {
    throw error;
  }
}