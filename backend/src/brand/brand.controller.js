import { responseMessages } from "../langs/reponseMessages.js";
import { createBrand, findAllBrands } from "./brand.service.js";

export const getAllBrands = async (req, res) => {
  try {
    const data = await findAllBrands();
    return res.status(200).json(data);
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, message: responseMessages.internalServerError });
  }
};

export const createNewBrand = async (req, res) => {
  try {
    const newBrand = await createBrand(req.body);
    return res
      .status(201)
      .json({ ok: true, data: { name: newBrand.name, id: newBrand.id } });
  } catch (error) {
    console.log(error);
    if (error.status) {
      return res
        .status(error.status)
        .json({ ok: false, message: error.msg });
    }
    return res
      .status(500)
      .json({ ok: false, message: responseMessages.internalServerError });
  }
};
