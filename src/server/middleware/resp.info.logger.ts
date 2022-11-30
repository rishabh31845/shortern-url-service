import { NextFunction, Request, Response } from 'express';

const logger = require('../logger');
export const responseInfoLogger = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { baseUrl, body, method, originalUrl, params, path, query } = request;
  const start = Date.now();

  response.on('finish', () => {
    const responsTime = Date.now() - start;
    logger.info({
      request: { baseUrl, body, method, originalUrl, params, path, query },
      response: {
        statusCode: response.statusCode,
        time: responsTime,
      },
    });
  });
  next();
};
