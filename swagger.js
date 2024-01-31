const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Songs API',
    description: 'Songs API',
    version: '1.0.0',
  },
  host: 'jserrao24-jserrao24-cse341-project02-main.onrender.com', 
  schemes: ['http', 'https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js']; 

swaggerAutogen(outputFile, endpointsFiles, doc);
