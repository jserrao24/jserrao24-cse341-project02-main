const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Songs API',
    description: 'Songs API',
    version: '1.0.0',
  },
  host: 'localhost:5000', 
  schemes: ['http', 'https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js']; 

swaggerAutogen(outputFile, endpointsFiles, doc);
