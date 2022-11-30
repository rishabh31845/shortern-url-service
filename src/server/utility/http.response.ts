import { Response } from 'express';
import httpStatusCodes from 'http-status-codes';
const logger = require('../logger');
const className = '[HttpResponse]';
export class HttpResponse {
  static setResponse(
    response: Response,
    successStatus: boolean,
    status: number,
    message: string,
    callerClassName: string,
    // tslint:disable-next-line: no-any
    result: any
  ) {
    const methodName = '[setResponse]';
    logger.debug(
      callerClassName +
        className +
        methodName +
        'start: set response with message as ' +
        message
    );
    const sendResponse = {
      status: successStatus,
      message,
      result: null,
    };
    // response.set('Access-Control-Allow-Origin', '*');
    response.statusMessage = message;
    if (result instanceof Promise) {
      result
        .then(resp => {
          if (resp !== null && resp !== undefined) {
            sendResponse.result = resp;
          } else {
            sendResponse.status = false;
            status = httpStatusCodes.BAD_REQUEST;
          }
          if (sendResponse.status) {
            logger.debug(
              callerClassName +
                className +
                methodName +
                'Success (promise): ' +
                JSON.stringify(sendResponse)
            );
          } else {
            logger.error(
              callerClassName +
                className +
                methodName +
                'Failed (promise): ' +
                JSON.stringify(sendResponse)
            );
          }

          response.status(status).send(sendResponse);
        })
        .catch(error => {
          sendResponse.status = false;
          sendResponse.message = error.message;
          sendResponse.result = error;
          logger.error(
            callerClassName +
              className +
              methodName +
              'Error: ' +
              JSON.stringify(sendResponse)
          );
          response.status(httpStatusCodes.CONFLICT).send(sendResponse);
        });
    } else {
      if (result !== null && result !== undefined) {
        sendResponse.result = result;
      }
      if (status) {
        logger.debug(
          callerClassName +
            className +
            methodName +
            'Success: ' +
            JSON.stringify(sendResponse)
        );
      } else {
        logger.error(
          callerClassName +
            className +
            methodName +
            'Failed: ' +
            JSON.stringify(sendResponse)
        );
      }
      response.status(status).json(sendResponse);
    }
  }
}
