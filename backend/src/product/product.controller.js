import { responseMessages } from "../langs/reponseMessages.js";
import {
  createProduct,
  deleteProduct,
  findAllProducts,
  findProductById,
  updateProduct,
} from "./product.service.js";

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
    const { page, perPage } = req.query;
    const data = await findAllProducts(page, perPage);
    return res.status(200).json({ ok: true, ...data });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ ok: false, message: responseMessages.internalServerError });
  }
};

export const getAllProductsAdmin = async (req, res) => {
  try {
    const { page, perPage, del } = req.query;
    const getDel = del === "true";
    const data = await findAllProducts(page, perPage, getDel);
    return res.status(200).json({ ok: true, ...data });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ ok: false, message: responseMessages.internalServerError });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await findProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ ok: false });
    }
    return res.status(200).json({ ok: true, data: product });
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

export const updateOldProduct = async (req, res) => {
  try {
    await updateProduct(req.params.id, req.body);
    return res.status(200).json({ ok: true });
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

export const deleteExistingProduct = async (req, res) => {
  try {
    await deleteProduct(req.params.id);
    return res.status(200).json({ ok: true });
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
