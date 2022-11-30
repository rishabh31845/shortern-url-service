export class SiteTrackingService {
  static async createInstance() {
    return {
      save: jest.fn().mockReturnValue({}),
      update: jest.fn().mockReturnValue({}),
    };
  }
}
