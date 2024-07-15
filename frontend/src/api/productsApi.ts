import { CreateProductBasic } from "../types/api-product";
import { ApiOkPaginatedResponse, ProductBase } from "../types/api-response";
import appApi from "./axios";
import axiosErrorHandler from "./axiosErrorHandler";

const PRODUCTS_URI = "product";

export const apiGetProducts = async (): Promise<ApiOkPaginatedResponse<ProductBase> | undefined> => {
  try {
    const productsData = (await appApi.get(PRODUCTS_URI)).data as ApiOkPaginatedResponse<ProductBase>;
    return productsData;
  } catch (error) {
    axiosErrorHandler(error);
  }
};

export const apiCreateProduct = async (prodData:CreateProductBasic) => {
  try {
    const response = (await appApi.post(PRODUCTS_URI,prodData)).data;
    return response;
  } catch (error) {
    axiosErrorHandler(error);
  }
}
