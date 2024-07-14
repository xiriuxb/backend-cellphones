const specificationTypeSchema = {
    type: "object",
    properties: {
      id: {
        type: "number",
        description: "specificationType id",
        example: 1,
      },
      name: {
        type: "string",
        description: "specificationType name",
        example: "Cammera",
      },
      description: {
        type: "string",
        description: "specificationType name",
        example: "No description provided",
      },
    },
  };
  
  const getAllSpecificationTypesPath = {
    get: {
      tags: ["Specification Type"],
      summary: "Get a list of all specification types",
      responses: {
        200: {
          description: "An array of all specification types",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/specificationTypeSchema" },
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
  
  export const specificationTypeSchemas = {
    specificationTypeSchema,
  };
  
  export const specificationTypePaths = {
    "/api/specification-types": { ...getAllSpecificationTypesPath },
  };
  