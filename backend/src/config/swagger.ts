import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Notificações',
      version: '1.0.0',
      description: 'API RESTful para gerenciamento de notificações (Processo Seletivo)',
      contact: {
        name: 'Leonardo Chagas',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Servidor Local',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts'], // Onde ele vai procurar as anotações
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;