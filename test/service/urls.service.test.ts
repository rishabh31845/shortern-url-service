jest.mock("../../src/server/dao/urls.dao");
jest.mock("../../src/server/dao/site_tracking_details.dao");

import { UrlsService } from './../../src/server/service/urls.service';

describe('UrlsService', () => {

    it(':: save() ::', async () => {
        const urlService = await UrlsService.createInstance();
        const url = 'http://long-url'
        const result = await urlService.save(url);
        expect(result).toBeDefined();
    })
    
    it(':: fetch() ::', async () => {
        const urlService = await UrlsService.createInstance();
        const url = 'qwerty'
        const result = await urlService.fetch(url);
        expect(result).toBeTruthy();
    })
});