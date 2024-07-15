import { ApiBasicResponse, ProductBase } from "./api-response";

export type CreateProductBasic = {
  name: string;
  brand_id: number;
  product_type_id: number;
  description: string;
};


export type ApiProductRes = ApiBasicResponse & {
  data: ProductBase
}