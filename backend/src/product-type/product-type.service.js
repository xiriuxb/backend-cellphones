import ProductType from "../models/product-type.model.js";

export const bulkCreateProductTypes = async (data) => {
  try {
    await ProductType.bulkCreate(data, { ignoreDuplicates: true });
  } catch (error) {
    throw error;
  }
};

export const findAllProductTypes = async () => {
  try {
    return await ProductType.findAll({
      order: [["name", "ASC"]],
      attributes: ["name", "id"],
    });
  } catch (error) {
    throw error;
  }
};
