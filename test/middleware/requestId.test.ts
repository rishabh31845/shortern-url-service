import { reqId } from './../../src/server/middleware/requestId';
import httpMocks from 'node-mocks-http';

describe('reqId', () => {
  it('should assign requestId', () => {
    const req = httpMocks.createRequest({});
    const res = httpMocks.createResponse();
    const next = jest.fn();
    reqId(req, res, next);
    expect(next).toBeCalled();
  });
});
