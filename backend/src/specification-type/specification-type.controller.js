import { findAllSpecifictionTypes } from "./specification-type.service.js";

export const getAllSpecificationTypes = async (req, res) => {
  try {
    const data = await findAllSpecifictionTypes();
    return res.status(200).json(data);
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, message: responseMessages.internalServerError });
  }
};
