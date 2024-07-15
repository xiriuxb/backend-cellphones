import { Brand } from "../types/api-brand";
import appApi from "./axios";
import axiosErrorHandler from "./axiosErrorHandler";

const BRANDS_URI = "brands";

export const apiGetBrands= async (): Promise<Brand[]|undefined> => {
  try {
    const brands= (await appApi.get(BRANDS_URI)).data as Brand[];
    return brands;
  } catch (error) {
    axiosErrorHandler(error);
  }
};