import { Urls } from '../../src/server/dao/entity/urls.entity';
import { UrlsDAO } from '../../src/server/dao/urls.dao';

import * as typeorm_functions from 'typeorm/globals';

describe('URLs DAO', () => {
  it(':: save shortern url ::', async () => {
    jest.spyOn(typeorm_functions, 'getRepository').mockImplementation(() => {
      const original = jest.requireActual('typeorm');
      return { ...original, save: jest.fn().mockReturnValue({}) };
    });
    const urlDao = UrlsDAO.createInstance();
    const url = new Urls();

    const result = await urlDao.save(url);

    expect(result).toEqual({});
    expect(typeorm_functions.getRepository).toHaveBeenNthCalledWith(1, Urls);
  });

  it(':: find orginal url method passed ::', async () => {
    jest.spyOn(typeorm_functions, 'getRepository').mockImplementation(() => {
      const original = jest.requireActual('typeorm');
      return {
        ...original,
        createQueryBuilder: jest.fn().mockReturnValue({
          select: jest.fn().mockReturnThis(),
          where: jest.fn().mockReturnThis(),
          getOne: jest.fn().mockResolvedValue({}),
        }),
      };
    });
    const urlDao = UrlsDAO.createInstance();
    const result = await urlDao.find('qwerty');

    expect(result).toEqual({});
    expect(typeorm_functions.getRepository).toHaveBeenCalled();
  });
});
