import express = require('express');
import helmet from 'helmet'; // Security
import compression from 'compression'; // compresses requests
import { router } from '../route';
import { vars } from './vars';
import { reqId } from '../middleware/requestId';
import { responseInfoLogger } from '../middleware/resp.info.logger';

const logger = require('../logger');
const cors = require('cors');

// Create a new express application instance
const app: express.Application = express();
const className = '[App]';
app.use(helmet());
app.use(compression());

app.use(express.json());
app.use(express.urlencoded());

// Enable Cross Origin Resource Sharing
app.use(
  cors({
    origin: '*',
  })
);

// don't change the order of the middleware
// please keep requestId middleware before any middleware
// so same can be passed away
app.use((req, res, next) => {
  reqId(req, res, next);
});

app.use(responseInfoLogger);

// Mount API routes
app.use(`/${vars.baseUrl}`, router);

export const startServer = (cb: Function, port?: number) => {
  let server = null;
  const methodName = '[startServer]';
  logger.info(className + methodName + 'start');

  // start express server
  port = port ? port : Number(vars.port);
  server = (server || app).listen(port, () => {
    logger.info('Tier Shorten URL Service: Listening on port ' + port + '!');
  });
  cb(server);
};
