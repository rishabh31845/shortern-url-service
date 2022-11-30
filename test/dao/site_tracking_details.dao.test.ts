import { SiteTracking } from '../../src/server/dao/entity/site_tracking_details.entity';
import { SiteTrackingDAO } from '../../src/server/dao/site_tracking_details.dao';

import * as typeorm_functions from 'typeorm/globals';
import { Urls } from '../../src/server/dao/entity/urls.entity';

describe('SiteTracking DAO', () => {
  it(':: save site tracking stats ::', async () => {
    jest.spyOn(typeorm_functions, 'getRepository').mockImplementation(() => {
      const original = jest.requireActual('typeorm');
      return { ...original, save: jest.fn().mockReturnValue({}) };
    });
    const siteTrackingDao = SiteTrackingDAO.createInstance();
    const siteTracking = new SiteTracking();

    const result = await siteTrackingDao.save(siteTracking);

    expect(result).toEqual({});
    expect(typeorm_functions.getRepository).toHaveBeenNthCalledWith(
      1,
      SiteTracking
    );
  });

  it(':: update site tracking method passed ::', async () => {
    jest.spyOn(typeorm_functions, 'getRepository').mockImplementation(() => {
      const original = jest.requireActual('typeorm');
      return {
        ...original,
        createQueryBuilder: jest.fn().mockReturnValue({
          update: jest.fn().mockReturnThis(),
          set: jest.fn().mockReturnThis(),
          execute: jest.fn().mockResolvedValue({
            raw: [{}],
          }),
          where: jest.fn().mockReturnThis(),
          returning: jest.fn().mockReturnThis(),
        }),
      };
    });
    const siteTrackingDao = SiteTrackingDAO.createInstance();
    const siteTracking = new SiteTracking();
    siteTracking.url = {
      id: 1
    } as Urls
    const result = await siteTrackingDao.update(siteTracking);

    expect(result).toBeDefined();
    expect(typeorm_functions.getRepository).toHaveBeenCalled();
  });
});
