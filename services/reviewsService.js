import BaseService from './baseService';

/**
 * Reviews Service Class
 * Handles all review-related API calls
 */
class ReviewsService extends BaseService {
  constructor() {
    super();
    this.endpoint = '/reviews';
  }

  /**
   * Create a review
   * @param {object} reviewData - Review data
   * @returns {Promise<any>} Review creation response
   */
  async createReview(reviewData) {
    return await this.post(this.endpoint, reviewData);
  }

  /**
   * Get review stats for a user
   * @param {string} userId - User ID
   * @returns {Promise<any>} Review stats data
   */
  async getReviewStats(userId) {
    return await this.get(`${this.endpoint}/stats/${userId}`);
  }

  /**
   * Get reviews for a user
   * @param {string} revieweeId - User ID to get reviews for
   * @param {string} itemId - Optional item ID filter
   * @returns {Promise<any>} Reviews data
   */
  async getReviewsForUser(revieweeId, itemId = null) {
    const params = {};
    if (itemId) {
      params.itemId = itemId;
    }
    return await this.get(`${this.endpoint}/user/${revieweeId}`, params);
  }
}

// Export singleton instance
export default new ReviewsService();
