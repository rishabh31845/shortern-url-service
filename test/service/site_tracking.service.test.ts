jest.mock("../../src/server/dao/urls.dao");
jest.mock("../../src/server/dao/site_tracking_details.dao");

import { SiteTrackingService } from '../../src/server/service/site_tracking.service';

describe('SiteTrackingService', () => {
  it(':: save() ::', async () => {
    const siteTrackingService = await SiteTrackingService.createInstance();
    const result = await siteTrackingService.save(1);
    expect(result).toEqual({});
  });

  it(':: update() ::', async () => {
    // when edit all comments in internal comment box permission
    const siteTrackingService = await SiteTrackingService.createInstance();
    const result = await siteTrackingService.update(1);
    expect(result).toBeTruthy();
  });
});
