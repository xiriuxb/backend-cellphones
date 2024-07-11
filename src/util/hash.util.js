import * as bcrypt from "bcrypt";

export const passwordHash = async (password) => {
  const salt = bcrypt.genSaltSync();
  return await bcrypt.hash(password, salt);
};

export const compareHash = async (data, hash, resMessage) => {
  const isValid = await bcrypt.compare(data, hash);
  if (!isValid) {
    throw { status: 400, msg: resMessage || "Invalid Password", at:"compareHash"};
  }
};
