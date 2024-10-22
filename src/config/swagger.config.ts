import swaggerJSDoc, { Options } from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Application, Response } from 'express';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Autenticação API',
    version: '1.0.0',
    description: 'API para gerenciamento de autenticação e autorização',
    contact: {
      name: 'Sarah de Almeida Ferreira',
    },
  },
  servers: [
    {
      url: 'http://localhost:5000',
      description: 'Servidor de desenvolvimento',
    },
  ],
};

const options: Options = {
  swaggerDefinition,
  apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

const setupSwagger = (app: Application): void => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.get('/api-docs.json', (_, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
};

export default setupSwagger;
