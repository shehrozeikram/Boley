import BaseService from './baseService';

/**
 * Reports Service Class
 * Handles all report-related API calls
 */
class ReportsService extends BaseService {
  constructor() {
    super();
  }

  /**
   * Report an item
   * @param {object} reportData - Report data
   * @returns {Promise<any>} Report response
   */
  async reportItem(reportData) {
    return await this.post('/report/item', reportData);
  }
}

// Export singleton instance
export default new ReportsService();
