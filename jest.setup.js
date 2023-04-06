import 'whatwg-fetch';
import 'setimmediate';

// Crear variables de entorno de lado del testing
// se instalo el dotenv
import { getEnvironments } from './src/helpers/getEnvironments';

require('dotenv').config({
  path: '.env.test'
});

jest.mock('./src/helpers/getEnvironments', () => ({
  getEnvironments: () => ({ ...process.env })
}));
