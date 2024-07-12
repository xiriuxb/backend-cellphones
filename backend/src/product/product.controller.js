import { responseMessages } from "../langs/reponseMessages.js";
import { createProduct, findAllProducts } from "./product.service.js";

export const getAllProducts = async (req, res) => {
  try {
    const productsData = await findAllProducts();
    return res.status(200).json(productsData);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ ok: false, message: responseMessages.internalServerError });
  }
};

export const createNewProduct = async (req, res) => {
  try {
    const newP = await createProduct(req.body);
    return res.status(201).json(newP);
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
