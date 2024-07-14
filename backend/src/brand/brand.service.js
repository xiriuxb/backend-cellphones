import Brand from "../models/brand.model.js";

export const bulkCreateBrands = async (data) => {
  try {
    await Brand.bulkCreate(data, { ignoreDuplicates: true });
  } catch (error) {
    throw error;
  }
};

export const createBrand = async (brandData) => {
  try {
    const existingBrand = await Brand.findOne({
      where: { name: brandData.name },
    });
    if (existingBrand) {
      throw {
        status: 400,
        msg: "Brand already exists",
        at: "brand.service/createBrand",
      };
    }
    return await Brand.create(brandData);
  } catch (error) {
    throw error;
  }
};

export const findAllBrands = async () => {
  try {
    return await Brand.findAll({
      order: [["name", "ASC"]],
      attributes: ["name", "id"],
    });
  } catch (error) {
    throw error;
  }
};

export const findBrandById = async (brandId) => {
  try {
    return await Brand.findOne({ where: { id: brandId } });
  } catch (error) {
    throw error;
  }
};

export const editBrand = async (brandId, brandData) => {
  try {
    const updatedBrand = await Brand.update(
      { ...brandData },
      { where: { id: brandId } }
    );
    return updatedBrand;
  } catch (error) {
    throw error;
  }
};
