import BaseService from './baseService';

/**
 * User Service Class
 * Handles all user profile, posts, and saved items API calls
 */
class UserService extends BaseService {
  constructor() {
    super();
  }

  /**
   * Get current user profile
   * @returns {Promise<any>} Current user data
   */
  async getCurrentUser() {
    return await this.get('/user/me');
  }

  /**
   * Upload KYC documents
   * @param {object} kycData - KYC document data
   * @returns {Promise<any>} Upload response
   */
  async uploadKycDocuments(kycData) {
    const formData = new FormData();
    
    // Add documents (files)
    if (kycData.documents && Array.isArray(kycData.documents)) {
      kycData.documents.forEach((file, index) => {
        formData.append(`documents`, file);
      });
    }

    // Add document types
    if (kycData.documentTypes && Array.isArray(kycData.documentTypes)) {
      kycData.documentTypes.forEach((type, index) => {
        formData.append(`documentTypes`, type);
      });
    }

    // Add document sides
    if (kycData.documentSides && Array.isArray(kycData.documentSides)) {
      kycData.documentSides.forEach((side, index) => {
        formData.append(`documentSides`, side);
      });
    }

    // Add document numbers
    if (kycData.documentNumbers && Array.isArray(kycData.documentNumbers)) {
      kycData.documentNumbers.forEach((number, index) => {
        formData.append(`documentNumbers`, number);
      });
    }

    return await this.postFormData('/user/kyc/upload', formData);
  }

  /**
   * Save an item
   * @param {string} articleId - Article/Item ID
   * @returns {Promise<any>} Save response
   */
  async saveItem(articleId) {
    return await this.put(`/save/${articleId}`, {});
  }

  /**
   * Remove a saved item
   * @param {string} articleId - Article/Item ID
   * @returns {Promise<any>} Remove response
   */
  async removeSavedItem(articleId) {
    return await this.delete(`/remove/${articleId}`);
  }

  /**
   * Check if item is saved
   * @param {string} articleId - Article/Item ID
   * @returns {Promise<any>} Saved status
   */
  async checkIfItemSaved(articleId) {
    return await this.get(`/saved/${articleId}`);
  }

  /**
   * Get all saved items
   * @returns {Promise<any>} All saved items
   */
  async getAllSavedItems() {
    return await this.get('/saved/');
  }

  /**
   * Get user's active posts
   * @param {object} params - Query parameters
   * @returns {Promise<any>} Active posts data
   */
  async getUserActivePosts(params = {}) {
    const defaultParams = {
      page: 1,
      limit: 20,
      ...params,
    };
    return await this.get('/data/user/active', defaultParams);
  }

  /**
   * Get user's pending posts
   * @param {object} params - Query parameters
   * @returns {Promise<any>} Pending posts data
   */
  async getUserPendingPosts(params = {}) {
    const defaultParams = {
      page: 1,
      limit: 20,
      ...params,
    };
    return await this.get('/data/user/pending', defaultParams);
  }

  /**
   * Get user's rejected posts
   * @param {object} params - Query parameters
   * @returns {Promise<any>} Rejected posts data
   */
  async getUserRejectedPosts(params = {}) {
    const defaultParams = {
      page: 1,
      limit: 20,
      ...params,
    };
    return await this.get('/data/user/rejected', defaultParams);
  }

  /**
   * Get user's expired posts
   * @param {object} params - Query parameters
   * @returns {Promise<any>} Expired posts data
   */
  async getUserExpiredPosts(params = {}) {
    const defaultParams = {
      page: 1,
      limit: 20,
      ...params,
    };
    return await this.get('/data/user/expired', defaultParams);
  }

  /**
   * Get user's closed posts
   * @param {object} params - Query parameters
   * @returns {Promise<any>} Closed posts data
   */
  async getUserClosedPosts(params = {}) {
    const defaultParams = {
      page: 1,
      limit: 20,
      ...params,
    };
    return await this.get('/data/user/closed', defaultParams);
  }

  /**
   * Get user's impressions
   * @param {object} params - Query parameters
   * @returns {Promise<any>} Impressions data
   */
  async getUserImpressions(params = {}) {
    const defaultParams = {
      page: 1,
      limit: 20,
      ...params,
    };
    return await this.get('/data/user/impressions', defaultParams);
  }
}

// Export singleton instance
export default new UserService();
