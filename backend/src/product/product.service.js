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

    await productRelationsValidations(
      newProductData.brand_id,
      newProductData.product_type_id
    );

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

export const findProductById = async (productId, role) => {
  const whereClause =
    role === "admin"
      ? { id: productId }
      : {
          id: productId,
          is_deleted: false,
        };
  try {
    return await Product.findOne({
      where: whereClause,
      attributes: ["id", "name", "description"],
      include: [
        { model: Brand, attributes: ["name", "id"] },
        { model: ProductType, attributes: ["name", "id"] },
      ],
    });
  } catch (error) {
    throw error;
  }
};

export const findAllProducts = async (page, perPage, getDeleted = false) => {
  const [_page, _perPage] = limitPaginationQuery(page, perPage);
  try {
    const productsList = await Product.findAndCountAll({
      offset: (_page - 1) * _perPage,
      limit: _perPage,
      order: [["createdAt", "DESC"]],
      where: { is_deleted: getDeleted },
      attributes: ["id", "name", "description", "image_url"],
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

export const updateProduct = async (productId, productData) => {
  try {
    if (productData.brand_id && productData.name) {
      const duplicateProduct = await Product.findOne({
        where: {
          name: {
            [Op.iLike]: `${productData.name}`,
          },
          id: {
            [Op.ne]: parseInt(productId),
          },
        },
        include: [
          {
            model: Brand,
            where: { id: productData.brand_id },
          },
        ],
      });
      if (duplicateProduct) {
        throw {
          status: 400,
          msg: "Duplicate product",
          at: "product.service/update",
        };
      }
    }
    if (productData.brand_id && productData.product_type_id) {
      await productRelationsValidations(
        productData.brand_id,
        productData.product_type_id
      );
    }
    const product = await findProductById(productId);
    if (!product) {
      throw {
        status: 400,
        msg: "Product not found",
        at: "product.service/create",
      };
    }
    await product.update(productData);
  } catch (error) {
    throw error;
  }
};

const productRelationsValidations = async (brandId, productTypeId) => {
  try {
    const brand = await findBrandById(brandId);
    if (!brand) {
      throw {
        status: 400,
        msg: "Brand not found",
        at: "product.service/create",
      };
    }
    const productType = await findProductTypeById(productTypeId);
    if (!productType) {
      throw {
        status: 400,
        msg: "Product type not found",
        at: "product.service/create",
      };
    }
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = async (productId) => {
  try {
    await updateProduct(productId, { is_deleted: true });
  } catch (error) {
    throw error;
  }
};

export const bulkCreateProducts = async (jsonContent) => {
  try {
    // const firstProd = await Product.findOne({where:{name:jsonContent[0]["name"]}});
    // if(firstProd){
    //   throw {status:400, msg:"You already done this", at:"product.service/bulkCreate"}
    // }
    await Product.bulkCreate(jsonContent, {
      ignoreDuplicates: true,
    });
  } catch (error) {
    throw error;
  }
};

export const softDeleteAllProducts = async () => {
  try {
    const [numberOfAffectedRows] = await Product.update(
      { is_deleted: true },
      {
        where: {is_deleted: false},
      }
    );
    return `Se actualizaron ${numberOfAffectedRows} productos.`;
  } catch (error) {
    throw(error);
  }
};

const limitPaginationQuery = (page, perPage) => {
  const _page = isNaN(page) || page < 1 ? 1 : page;
  const _perPage = isNaN(perPage) || perPage > 100 ? 100 : perPage;
  return [_page, _perPage];
};
