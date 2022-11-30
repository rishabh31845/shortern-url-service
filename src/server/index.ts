// import .env variables
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
require('dotenv').config();

import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { Server } from 'https';
import { startServer } from './config/app';
import { vars } from './config/vars';
const logger = require('../server/logger');

// Create database connection
createConnection()
  .then(async connection => {
    // Start Express server
    startServer(async (server: Server) => {
      process.on('SIGINT', () => {
        server.close(() => {
          logger.info('Tier Shorten URL Service: Finished all requests');
        });
      });
      if (vars.dbSync) {
        await connection.synchronize(true);
      }
    });
  })
  .catch(error => {
    logger.error('Error: [Typeorm-createConnection] ' + error);
  });
