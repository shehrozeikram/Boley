import BaseService from './baseService';

/**
 * Bids Service Class
 * Handles all bid and buy request API calls
 */
class BidsService extends BaseService {
  constructor() {
    super();
    this.endpoint = '/bid';
  }

  /**
   * Get bids for an item
   * @param {string} itemId - Item ID
   * @returns {Promise<any>} Bids data
   */
  async getBidsForItem(itemId) {
    return await this.get(`${this.endpoint}/get/${itemId}`);
  }

  /**
   * Create a bid for an item
   * @param {string} itemId - Item ID
   * @param {object} bidData - Bid data
   * @returns {Promise<any>} Bid creation response
   */
  async createBid(itemId, bidData) {
    return await this.post(`${this.endpoint}/create/${itemId}`, bidData);
  }

  /**
   * Get buy requests for an item
   * @param {string} itemId - Item ID
   * @returns {Promise<any>} Buy requests data
   */
  async getBuyRequestsForItem(itemId) {
    return await this.get(`/buy/get/${itemId}`);
  }

  /**
   * Create a buy/purchase request for an item
   * @param {string} itemId - Item ID
   * @param {object} buyData - Buy request data
   * @returns {Promise<any>} Buy request creation response
   */
  async createBuyRequest(itemId, buyData) {
    return await this.post(`/buy/create/${itemId}`, buyData);
  }
}

// Export singleton instance
export default new BidsService();
