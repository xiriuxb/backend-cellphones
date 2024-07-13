import { responseMessages, validationErrorMessages } from "../langs/reponseMessages.js";

const authOkResponse = {
  title: "AuthOkResponse",
  type: "object",
  properties: {
    ok: {
      type: "boolean",
      description: "If request is ok",
    },
    user_email: {
      type: "string",
      description: "User's email",
    },
  },
};

const loginUserReq = {
  type: "object",
  properties: {
    email: {
      type: "string",
      description: "The user's email address",
      example: "sdasd@dasd.co",
    },
    password: {
      type: "string",
      description: "The user's password",
      minLength: 10,
      maxLength: 24,
      example: "asdasdsd",
    },
  },
  required: ["email", "password"],
};

const userRegisterReq = {
  type: "object",
  properties: {
    ...loginUserReq.properties,
  },
  required: ["email", "password"],
};

const forbiddenResponse = {
  type: "object",
  properties: {
    ok: {
      type: "boolean",
      example: false,
    },
    message: {
      type: "string",
      description: "Error message",
      examples: [
        responseMessages.noJwt,
        responseMessages.invalidJwt,
      ],
    },
  },
}

const validationErrorRes = {
  type: "object",
  properties: {
    ok: {
      type: "boolean",
      description: "Shows if the request was succesfull",
      example: false,
    },
    errors: {
      type: "object",
      description:
        "Object with validation errors",
      properties: {
        field_name: {
          type: "object",
          description: "Field 1 error description",
          properties: {
            msg: {
              type: "string",
              description: "Error message",
              example: validationErrorMessages.lengthMinMax(8, 24),
            },
            location: {
              type: "string",
              description: "Field location",
              example: "body",
            },
            path: {
              type: "string",
              description: "Field name",
              example: "password",
            },
          },
        },
      },
    },
  },
};

const internalServerErrorRes = {
  type: "object",
  properties: {
    ok: {
      type: "boolean",
      description: "Shows if request was ok",
      example: false,
    },
    message: {
      type: "string",
      description: "Error message",
    },
  },
};

const loginFailedLResponse = {
  type: "object",
  properties: {
    ok: {
      type: "boolean",
      description: "Shows if request was ok",
      example: false,
    },
    message: {
      type: "string",
      description: "Error reason",
      example: responseMessages.notValidCredentials,
    },
  },
};

const authSigninPath = {
  post: {
    tags: ["Auth"],
    summary: "Sign in a user with email and password",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/userRegisterReq" },
        },
      },
    },
    responses: {
      201: {
        description: "Sign-in successful, user data returned",
        content: {
          "application/json": {
            schema: authOkResponse,
          },
        },
      },
      400: {
        description: "Bad request, validation errors",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/validationErrorRes",
            },
          },
        },
      },
      500: {
        description: "Internal server error",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/internalServerErrorRes",
            },
          },
        },
      },
    },
  },
};

const authLoginPath = {
  post: {
    tags: ["Auth"],
    summary: "Login with email and password",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/loginUserReq" },
        },
      },
    },
    responses: {
      201: {
        description: "Sign-in successful, user data returned",
        content: {
          "application/json": {
            schema: authOkResponse,
          },
        },
      },
      400: {
        description: "Bad request, validation errors",
        content: {
          "application/json": {
            schema: loginFailedLResponse,
          },
        },
      },
      500: {
        description: "Internal server error",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/internalServerErrorRes",
            },
          },
        },
      },
    },
  },
};

const renewTokenPath = {
  get: {
    tags: ["Auth"],
    summary: "Renews JWT",
    security: [
      {
        cookieAuth: [],
      },
    ],
    responses: {
      200: {
        description: "Sets a new token in the auth cookie",
        content: {
          "application/json": {
            schema: authOkResponse,
          },
        },
      },
      401: {
        description: "Error when there is no token or it's invalid",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/forbiddenResponse"}
          },
        },
      },
    },
  },
};

const authLogoutPath = {
  post: {
    tags: ["Auth"],
    summary: "Sets cookie value as an empty string",
    responses: {
      200: {
        description: "Sets cookie value as ''",
        content: {
          "application/json": {
            schema: authOkResponse,
          },
        },
      },
    },
  },
};

export const authSchemas = {
  authLoginPath,
  loginUserReq,
  userRegisterReq,
  validationErrorRes,
  internalServerErrorRes,
  loginFailedLResponse,
  forbiddenResponse
};

export const authPaths = {
  "/api/auth/signup": authSigninPath,
  "/api/auth/login": authLoginPath,
  "/api/auth/renew-token": renewTokenPath,
  "/api/auth/logout": authLogoutPath
};
