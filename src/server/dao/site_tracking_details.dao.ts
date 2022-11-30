import { getRepository, SelectQueryBuilder } from 'typeorm';
import { SiteTracking } from './entity/site_tracking_details.entity';

const logger = require('../logger');

const className = '[SiteTrackingDAO]';

export class SiteTrackingDAO {
  static createInstance() {
    return new SiteTrackingDAO();
  }

  private siteTrackingRepository = getRepository(SiteTracking);

  async save(siteTracking: SiteTracking) {
    const methodName = '[save]';
    logger.debug(
      className + methodName + 'start: save site tracking stats :: ' + JSON.stringify(siteTracking)
    );

    return this.siteTrackingRepository.save(siteTracking);
  }

  async update(siteTracking: SiteTracking) {
    const methodName = '[update]';
    logger.debug(
      className +
        methodName +
        'start: update site stats :: ' +
        JSON.stringify(siteTracking)
    );

    return this.siteTrackingRepository
      .createQueryBuilder('site_tracking_details')
      .update(SiteTracking)
      .set({ clicks: () => `clicks + ${1}` })
      .where('url_id = :id', { id: siteTracking.url.id })
      .returning('*')
      .execute();
  }
}
