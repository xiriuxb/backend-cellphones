import { Op } from "sequelize";
import { findProductTypeById } from "../product-type/product-type.service.js";
import { findBrandById } from "../brand/brand.service.js";
import ProductType from "../models/product-type.model.js";
import Product from "../models/product.model.js";
import Brand from "../models/brand.model.js";

export const createProduct = async (newProductData) => {
  try {
    const product = await findProductByName(newProductData.name);
    if (product) {
      throw {
        status: 400,
        msg: "Product with same name already exists",
        at: "product.service/create",
      };
    }
    const brand = await findBrandById(newProductData.brand_id);
    if (!brand) {
      throw {
        status: 400,
        msg: "Brand not found",
        at: "product.service/create",
      };
    }
    const productType = await findProductTypeById(
      newProductData.product_type_id
    );
    if (!productType) {
      throw {
        status: 400,
        msg: "Product type not found",
        at: "product.service/create",
      };
    }
    return await Product.create(newProductData);
  } catch (error) {
    throw error;
  }
};

const findProductByName = async (productName) => {
  try {
    return await Product.findOne({
      where: {
        name: {
          [Op.iLike]: `${productName}`,
        },
      },
    });
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
      where: { is_deleted: false },
      attributes: ["id", "name", "description"],
      include: [
        { model: Brand, attributes: ["name"] },
        { model: ProductType, attributes: ["name"] },
      ],
    });
    return {
      data: productsList.rows,
      totalResults: productsList.count,
      totalPages: Math.ceil(productsList.count / _perPage),
      currentPage: parseInt(_page),
    };
  } catch (error) {
    throw error;
  }
};

const limitPaginationQuery = (page, perPage) => {
  const _page = isNaN(page) || page < 1 ? 1 : page;
  const _perPage = isNaN(perPage) || perPage > 100 ? 100 : perPage;
  return [_page, _perPage];
};
