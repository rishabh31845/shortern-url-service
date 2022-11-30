import { responseInfoLogger } from './../../src/server/middleware/resp.info.logger';
import httpMocks from 'node-mocks-http';

describe('responseInfoLogger', () => {
  it('should log requestUrl, response statusCode and time', () => {
    var req = httpMocks.createRequest({});
    var res = httpMocks.createResponse({
      eventEmitter: require('events').EventEmitter
    });

    const next = jest.fn();
    responseInfoLogger(req, res, next);
    res.send('API Response');
    expect(next).toBeCalled();
  });
});
