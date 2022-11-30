import { UrlsDAO } from '../dao/urls.dao';
import { Urls } from '../dao/entity/urls.entity';
import { SiteTrackingService } from './site_tracking.service';
import { vars } from '../config/vars';

const crypto = require('crypto');
const logger = require('../logger');

export class UrlsService {
  static async createInstance() {
    return new UrlsService();
  }

  static CLASS_NAME = '[UrlsService]';
  private urlDAO = UrlsDAO.createInstance();

  async save(url: string) {
    const methodName = '[save]';
    logger.debug(
      UrlsService.CLASS_NAME +
        methodName +
        'start: Creating shortern url of original url :: ' +
        url
    );
    const urlObj = new Urls();
    urlObj.originalUrl = url;
    const currenDate = (new Date()).valueOf().toString();
    urlObj.shorternUrl = crypto
      .createHash('md5')
      .update(url + currenDate)
      .digest('hex')
      .substring(0, 8);
    const savedUrl = await this.urlDAO.save(urlObj);
    if (savedUrl) {
      const siteTrackingService = new SiteTrackingService();
      siteTrackingService.save(savedUrl.id);
    }
    savedUrl.shorternUrl = `${vars.baseUrl}/${savedUrl.shorternUrl}`;
    return savedUrl;
  }

  async fetch(url: string) {
    const methodName = '[fetch]';
    logger.debug(
      UrlsService.CLASS_NAME +
        methodName +
        'start: Fetch URLs for shortern urls :: ' +
        url
    );

    const urlObj = await this.urlDAO.find(url);
    if (urlObj) {
      const siteTrackingService = new SiteTrackingService();
      siteTrackingService.update(urlObj.id);
    }
    return urlObj;
  }
}
