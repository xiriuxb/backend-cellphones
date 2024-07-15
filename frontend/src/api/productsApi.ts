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
