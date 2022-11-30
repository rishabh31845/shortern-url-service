export class UrlsService {
  static async createInstance() {
    return {
      save: jest.fn().mockReturnValue({}),
      fetch: jest.fn().mockReturnValue({}),
    };
  }
}
