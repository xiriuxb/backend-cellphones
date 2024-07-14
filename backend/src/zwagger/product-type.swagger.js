const productTypeResponseSchema = {
  type: "object",
  properties: {
    id: {
      type: "number",
      description: "productType id",
      example: 1,
    },
    name: {
      type: "string",
      description: "productType name",
      example: "smartphone",
    },
  },
};

const getAllProductTypesPath = {
  get: {
    tags: ["Product Type"],
    summary: "Get a list of all product types",
    responses: {
      200: {
        description: "An array of all product types",
        content: {
          "application/json": {
            schema: {
              type: "array",
              items: { $ref: "#/components/schemas/productTypeResponseSchema" },
            },
          },
        },
      },
      401: {
        description: "Error when there is no token or it's invalid",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/forbiddenResponse" },
          },
        },
      },
    },
  },
};

export const productTypeSchemas = {
  productTypeResponseSchema,
};

export const productTypePaths = {
  "/api/product-types": { ...getAllProductTypesPath },
};
