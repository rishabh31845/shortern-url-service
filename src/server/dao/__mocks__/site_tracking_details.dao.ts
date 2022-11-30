export class SiteTrackingDAO {
  static createInstance() {
    return {
      save: jest.fn().mockReturnValue({}),
      update: jest.fn().mockReturnValue({}),
    };
  }
}
