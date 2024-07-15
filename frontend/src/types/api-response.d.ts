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
  Brand: { name: string };
  ProductType: { name: string };
};
