jest.mock('../../src/server/service/urls.service');

import { Response, Request } from 'express';
import httpMocks from 'node-mocks-http';

import { UrlsController } from '../../src/server/controller/urls.controller';

describe('UrlsController', () => {
  it('createInstance', async () => {
    const urlControllerInstance = UrlsController.createInstance();
    expect(urlControllerInstance).toBeTruthy();
  });

  it(':: create short url :: ', async () => {
    const request = {} as Request;
    const response = {} as Response;
    response.status = jest.fn().mockReturnThis();
    response.json = jest.fn().mockReturnThis();

    request.body = {
      url: 'http://demo.com',
    };
    const urlController = await UrlsController.createInstance();
    await urlController.create(request, response);

    expect(response.status).toBeCalled();
    expect(response.json).toBeCalled();
  });

  it(':: fetch original url ::', async () => {
    const response = {} as Response;

    response.json = jest.fn().mockReturnThis();
    response.sendStatus = jest.fn().mockReturnThis();

    const request = httpMocks.createRequest({
      params: {
        shortUrl: 'qwerty',
      },
    });

    let urlController = await UrlsController.createInstance();
    await urlController.fetch(request, response);

    const request1 = httpMocks.createRequest({
      params: {
        shortUrl: 'qwerty',
      },
    });

    await urlController.fetch(request1, response);

    expect(response.sendStatus).toBeCalled();
  });
});
