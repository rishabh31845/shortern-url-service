import { Urls } from '../dao/entity/urls.entity';
import { SiteTrackingDAO } from '../dao/site_tracking_details.dao';
import { SiteTracking } from '../dao/entity/site_tracking_details.entity';
const logger = require('../logger');

export class SiteTrackingService {
  static async createInstance() {
    return new SiteTrackingService();
  }

  static CLASS_NAME = '[SiteTrackingService]';
  private siteTrackingDAO = SiteTrackingDAO.createInstance();

  async save(urlId: number) {
    const methodName = '[save]';
    logger.debug(
      SiteTrackingService.CLASS_NAME +
        methodName +
        'start: save site tracking stats for url :: ' +
        urlId
    );
    const siteTrackingObj = new SiteTracking();
    siteTrackingObj.clicks = 0;
    siteTrackingObj.url = {
      id: urlId,
    } as Urls;
    return this.siteTrackingDAO.save(siteTrackingObj);
  }

  async update(urlId: number) {
    const methodName = '[update]';
    logger.debug(
      SiteTrackingService.CLASS_NAME +
        methodName +
        'start: update site tracking stats for url :: ' +
        urlId
    );
    const siteTrackingObj = new SiteTracking();
    siteTrackingObj.url = {
      id: urlId,
    } as Urls;
    return this.siteTrackingDAO.update(siteTrackingObj);
  }
}
