import swaggerJSDoc from 'swagger-jsdoc';

// swagger definition
const options = {
  // List of files to be processed.
  apis: [
    'src/**/*.js', // server side - compiled code
    'src/**/*.ts', // local development
  ],
  swaggerDefinition: {
    openapi: '3.0.1',
    servers: [
      {
        url: '{baseUrl}',
        variables: {
          baseUrl: {
            default: '/',
            description: 'Application Base URL',
          },
        },
      },
    ],
    info: {
      description: 'This service will help to shorten the long URLs and keep track of sites',
      swagger: '2.0',
      title: 'Tier Shorten URL Service API',
      version: '1.0.0',
    },
  },
};
// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

export { swaggerSpec };
