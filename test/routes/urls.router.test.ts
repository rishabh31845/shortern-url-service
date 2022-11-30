require('dotenv').config()

import { startServer } from '../../src/server/config/app'
import { Server } from 'https';

let appServer: Server;

beforeAll(async () => {
    startServer((server: Server) => {
        appServer = server
    }, 4003);

});
afterAll(async () => {
    appServer.close();
});

describe('Route :: /tier.app/short-url', () => {

    it('dummy test ', async () => {
        const jsonResponse = { status: true }
        expect(jsonResponse.status).toBeTruthy();
    });
});