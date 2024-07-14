import { findAllProductTypes } from "./product-type.service.js";

export const getAllProductTypes = async (req, res) => {
  try {
    const data = await findAllProductTypes();
    return res.status(200).json(data);
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, message: responseMessages.internalServerError });
  }
};
