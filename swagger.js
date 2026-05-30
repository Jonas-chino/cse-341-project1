const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API',
    description: 'API to manage contacts - byui week 2'
  },
  // OJO: Aquí pondremos tu enlace de Render más adelante, por ahora déjalo así:
  host: 'localhost:3000',
  schemes: ['http', 'https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js']; // Aquí le decimos que lea tus rutas desde server.js

// Esto generará el archivo swagger.json automáticamente
swaggerAutogen(outputFile, endpointsFiles, doc);