import path from 'path';
import swaggerJSDoc from 'swagger-jsdoc';
import { authPaths, authSchemas } from './auth.swagger.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerDefinition = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Cellphones API',
      version: '1.0.0'
    },
    tags: [],
    paths: {
      ...authPaths
    },
    definitions: {},
    components: {
      securitySchemes: {
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'user_jwt',
          description: 'JWT Auth'
        }
      },
      schemas: {
        ...authSchemas
      }
    }
  },
  apis: [`${path.join(__dirname, './*/*.routes.js')}`]
};

export const swaggerSpecs = swaggerJSDoc(swaggerDefinition);