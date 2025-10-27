import BaseService from './baseService';

/**
 * Location Service Class
 * Handles all location-related API calls
 */
class LocationService extends BaseService {
  constructor() {
    super();
    this.endpoint = '/region';
  }

  /**
   * Get location tree (regions)
   * @returns {Promise<any>} Location tree data
   */
  async getLocationTree() {
    return await this.get('/api/region/tree/all');
  }
}

// Export singleton instance
export default new LocationService();
