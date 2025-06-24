const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Reports Service API',
      version: '1.0.0',
      description: 'API documentation for the reports service',
    },
  },
  apis: [path.join(__dirname, '../routes/*.js')], // Path to routes
};

const swaggerSpec = swaggerJSDoc(options);

function swaggerDocs(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log('📄 Swagger UI available at http://localhost:8002/api-docs');
}

module.exports = swaggerDocs;
