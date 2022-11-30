import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger';

import { vars } from '../config/vars';

export const router = express.Router();

router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

import('./' + vars.appVersion + '/urls.router').then(route =>
  router.use(route.urlRoutes)
);