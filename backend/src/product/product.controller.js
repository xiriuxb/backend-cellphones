import { responseMessages } from "../langs/reponseMessages.js";
import { createProduct, findAllProducts } from "./product.service.js";

export const createNewProduct = async (req, res) => {
  try {
    const newProduct = await createProduct(req.body);
    return res.status(201).json(newProduct);
  } catch (error) {
    console.log(error);
    if (error.status) {
      return res.status(error.status).json({ ok: false, message: error.msg });
    }
    return res
      .status(500)
      .json({ ok: false, message: responseMessages.internalServerError });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const {page, perPage} = req.query;
    const data = await findAllProducts(page, perPage);
    return res.status(200).json({ ok: true, ...data });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ ok: false, message: responseMessages.internalServerError });
  }
};
