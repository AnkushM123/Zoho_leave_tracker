const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Zoho App',
      version: '1.0.0'
    },
    servers: [
      {
        url: 'http://localhost:3000'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          name: 'Authorization', 
          in: 'header',
          description: 'Enter your API token in the format `Bearer YOUR_TOKEN_HERE`',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      }
    },
  },

  apis: ['./apis/*.js'],

};

let swaggerSpecs = swaggerJSDoc(options)

module.exports = swaggerSpecs;