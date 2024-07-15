export type ApiBasicResponse = {
  ok: boolean;
};

export type ApiOkResponse<T> = ApiBasicResponse & {
  data: T[];
};

export type ApiOkPaginatedResponse<T> = ApiOkResponse<T> & {
  totalResults: number;
  totalPages: number;
  currentPage: number;
};

export type ProductBase = {
  id: number;
  name: string;
  description: string;
  image_url?:string
  Brand: { name: string, id?:number };
  ProductType: { name: string, id?:number };
};
