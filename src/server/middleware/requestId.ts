import { NextFunction, Request, Response } from 'express';
const uuidv4 = require('uuid/v4');
const httpContext = require('express-http-context');
import { vars } from '../config/vars';

export const reqId = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const reqId = uuidv4();
  httpContext.set(vars.requestIdHeader, reqId);
  response.set(vars.requestIdHeader, reqId);
  next();
};
