import { Op } from "sequelize";
import Product from "../models/product.model.js";

export const createProduct = async (productData) => {
  try {
    const existingProduct = await Product.findOne({
      where: {
        name: {
          [Op.iLike]: `${productData.name}`,
        },
      },
    });
    if (existingProduct) {
      throw {
        status: 400,
        msg: "Product with same name already exists",
        at: "product.service",
      };
    }
    const newProduct = await Product.create({ ...productData });
    return newProduct;
  } catch (error) {
    throw error;
  }
};

export const findAllProducts = async (page, perPage) => {
  const [_page, _perPage] = limitPaginationQuery(page, perPage);
  try {
    const productsList = await Product.findAndCountAll({
      offset: (_page - 1) * _perPage,
      limit: _perPage,
      order: [["createdAt", "DESC"]],
      where: { is_deleted: false }
    });
    return {
      data: productsList.rows,
      totalResults: productsList.count,
      totalPages: Math.ceil(productsList.count / _perPage),
      currentPage: _page,
    };
  } catch (error) {
    throw error;
  }
};

const limitPaginationQuery = (page, perPage) => {
  const _page = isNaN(page) || page < 1 ? 1 : page;
  const _perPage = isNaN(perPage) || perPage > 10 ? 10 : perPage;
  return [_page, _perPage];
};
