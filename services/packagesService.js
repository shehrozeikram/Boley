import BaseService from './baseService';

/**
 * Packages Service Class
 * Handles all package-related API calls
 */
class PackagesService extends BaseService {
  constructor() {
    super();
  }

  /**
   * Get public packages
   * @returns {Promise<any>} Public packages data
   */
  async getPublicPackages() {
    return await this.get('/admin/packages/public');
  }
}

// Export singleton instance
export default new PackagesService();
