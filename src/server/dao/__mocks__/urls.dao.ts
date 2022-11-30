export class UrlsDAO {
  static createInstance() {
    return {
      save: jest.fn().mockReturnValue({}),
      find: jest.fn().mockReturnValue({}),
    };
  }
}
