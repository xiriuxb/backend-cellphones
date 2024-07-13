const brandResponseSchema = {
  type: "object",
  properties: {
    id: {
      type: "number",
      description: "Brand id",
      example: 1,
    },
    name: {
      type: "string",
      description: "Brand name",
      example: "Apple",
    },
  },
};

const brandCreateSchema = {
  type: "object",
  required: ["name"],
  properties: {
    name: {
      type: "string",
      description: "Brand name",
      example: "Apple",
    },
    description: {
      type: "string",
      description: "Brand description",
      example: "A description",
    },
  },
};

const getAllBrandsPath = {
  get: {
    tags: ["Brand"],
    summary: "Get a list of all brands",
    responses: {
      200: {
        description: "An array of all brands",
        content: {
          "application/json": {
            schema: {
              type: "array",
              items: { $ref: "#/components/schemas/brandResponseSchema" },
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

const createBrandPath = {
  post: {
    tags: ["Brand"],
    summary: "Create a new brand",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/brandCreateSchema" },
        },
      },
    },
    responses: {
      201: {
        description: "New brand data",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                ok: {
                  type: "boolean",
                },
                data: {
                  type: "object",
                  schema: { $ref: "#/components/schemas/brandResponseSchema" },
                },
              },
            },
          },
        },
      },
      400: {
        description: "Bad request, validation errors",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                ok: {
                  type: "boolean",
                },
                message: {
                  type: "string",
                  example: "Brand already exists (this message is only showed in that case)",
                },
                schema:{$ref:"#/components/schemas/validationErrorRes"}
              },
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

export const brandSchemas = {
  brandResponseSchema,
  brandCreateSchema,
};

export const brandPaths = {
  "/api/brands": { ...getAllBrandsPath, ...createBrandPath },
};
