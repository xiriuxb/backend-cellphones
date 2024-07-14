import ProductSpecification from "../models/product-specification.model";

export const createProductSpecification = async (productSpecificationData) => {
  try {
    const prodSpecificationExists = await ProductSpecification.findOne({
      where: {
        product_id: productSpecificationData.product_id,
        specification_type_id: productSpecificationData.specification_type_id,
      },
    });
    if (prodSpecificationExists) {
      throw {
        status: 400,
        msg: "Product already has this data",
        at: "product-specification.service/create",
      };
    }
    const newProdSpecification = await ProductSpecification.create(
      productSpecificationData
    );
    return newProdSpecification;
  } catch (error) {
    throw error;
  }
};
