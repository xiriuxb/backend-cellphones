import { ProductType } from "../types/api-product-types";
import appApi from "./axios";
import axiosErrorHandler from "./axiosErrorHandler";

const PRODUCT_TYPES_URI = "product-types";

export const apiGetProductTypes = async (): Promise<ProductType[]|undefined> => {
  try {
    const productTypes = (await appApi.get(PRODUCT_TYPES_URI)).data as ProductType[];
    return productTypes;
  } catch (error) {
    axiosErrorHandler(error);
  }
};