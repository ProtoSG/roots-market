import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API for Roots Market',
      version: '1.0.0',
      description: 'Documento de la API con Swagger',
    },
    servers: [
      {
        url: 'http://localhost:4000/api',
      },
    ],
  },
  apis: ['./src/routes/*.ts']
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerUI, swaggerSpec}
