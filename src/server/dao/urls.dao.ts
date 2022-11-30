import { getRepository, SelectQueryBuilder } from 'typeorm';
import { Urls } from './entity/urls.entity';

const logger = require('../logger');

const className = '[UrlsDAO]';

export class UrlsDAO {
  static createInstance() {
    return new UrlsDAO();
  }

  private urlRepository = getRepository(Urls);

  async save(url: Urls) {
    const methodName = '[save]';
    logger.debug(
      className + methodName + 'start: save shortern url :: ' + JSON.stringify(url)
    );

    return this.urlRepository.save(url);
  }

  async find(url: string): Promise<Urls | undefined> {
    const methodName = '[find]';
    logger.debug(
      className + methodName + 'start: find urls with shortern url :: ' + url
    );

    const sqb: SelectQueryBuilder<Urls> = this.urlRepository
      .createQueryBuilder('urls')
      .select(['urls.id', 'urls.originalUrl', 'urls.shorternUrl'])
      .where('urls.shorternUrl = :shorternUrl', { shorternUrl: url });

    return sqb.getOne();
  }
}
