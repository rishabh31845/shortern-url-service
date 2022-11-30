import { Request, Response } from 'express';
import { UrlsService } from '../service/urls.service';
import { HttpResponse } from '../utility/http.response';
import httpStatusCodes from 'http-status-codes';
import { CreateShortUrlRequest } from '../type/requests/create.shorturl.type';

const logger = require('../logger');
const className = '[UrlsController]';
export class UrlsController {
  static createInstance() {
    return new UrlsController();
  }

  async create(request: Request, response: Response) {
    const input: CreateShortUrlRequest = request.body;
    const methodName = '[create]';
    logger.info(className + methodName + 'start');
    logger.debug(
      className + methodName + ' URL to be shortern :: ' + input.url
    );
    const urlService = await UrlsService.createInstance();
    const result = await urlService.save(input.url);
    HttpResponse.setResponse(
      response,
      true,
      httpStatusCodes.OK,
      '',
      '',
      result
    );
  }

  async fetch(request: Request, response: Response) {
    const methodName = '[fetch]';
    const shortUrl = request.params.shortUrl;
    logger.info(className + methodName + 'start');
    logger.debug(
      className + methodName + ' Original URL for short url :: ' + shortUrl
    );
    const urlService = await UrlsService.createInstance();

    const result = await urlService.fetch(shortUrl);
    if (result && result.originalUrl) {
      return response.redirect(result.originalUrl);
    } else {
      return response.sendStatus(404);
    }
  }
}
