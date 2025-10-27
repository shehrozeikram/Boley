import BaseService from './baseService';

/**
 * Electronics Service Class
 * Handles all electronics-related API calls with enhanced error handling
 */
class ElectronicsService extends BaseService {
  constructor() {
    super();
    this.endpoint = '/api/get/all/electronics';
  }

  /**
   * Get featured electronics
   * @param {number} limit - Number of items to fetch
   * @returns {Promise<any>} Featured electronics data
   */
  async getFeaturedElectronics(limit = 5) {
    return await this.get(this.endpoint, {
      limit,
      featured: true,
      sort: 'lowest'
    });
  }

  /**
   * Get all electronics with optional filters
   * @param {object} params - Filter parameters
   * @returns {Promise<any>} Electronics data
   */
  async getAllElectronics(params = {}) {
    const defaultParams = {
      limit: 10,
      featured: false,
      sort: 'lowest',
      ...params
    };
    return await this.get(this.endpoint, defaultParams);
  }

  /**
   * Get electronics by category
   * @param {string} category - Electronics category
   * @param {number} limit - Number of items to fetch
   * @returns {Promise<any>} Electronics data
   */
  async getElectronicsByCategory(category, limit = 10) {
    return await this.get(this.endpoint, {
      category,
      limit,
      sort: 'lowest'
    });
  }

  /**
   * Get electronics by brand
   * @param {string} brand - Electronics brand
   * @param {number} limit - Number of items to fetch
   * @returns {Promise<any>} Electronics data
   */
  async getElectronicsByBrand(brand, limit = 10) {
    return await this.get(this.endpoint, {
      brand,
      limit,
      sort: 'lowest'
    });
  }

  /**
   * Get electronics by condition
   * @param {string} condition - Item condition (new, used, etc.)
   * @param {number} limit - Number of items to fetch
   * @returns {Promise<any>} Electronics data
   */
  async getElectronicsByCondition(condition, limit = 10) {
    return await this.get(this.endpoint, {
      condition,
      limit,
      sort: 'lowest'
    });
  }

  /**
   * Get electronics by price range
   * @param {number} minPrice - Minimum price
   * @param {number} maxPrice - Maximum price
   * @param {number} limit - Number of items to fetch
   * @returns {Promise<any>} Electronics data
   */
  async getElectronicsByPriceRange(minPrice, maxPrice, limit = 10) {
    return await this.get(this.endpoint, {
      minPrice,
      maxPrice,
      limit,
      sort: 'lowest'
    });
  }

  /**
   * Get electronics by location
   * @param {string} location - Location filter
   * @param {number} limit - Number of items to fetch
   * @returns {Promise<any>} Electronics data
   */
  async getElectronicsByLocation(location, limit = 10) {
    return await this.get(this.endpoint, {
      location,
      limit,
      sort: 'lowest'
    });
  }

  /**
   * Get electronics by subcategory
   * @param {string} subCategory - Electronics subcategory
   * @param {number} limit - Number of items to fetch
   * @returns {Promise<any>} Electronics data
   */
  async getElectronicsBySubCategory(subCategory, limit = 10) {
    return await this.get(this.endpoint, {
      subCategory,
      limit,
      sort: 'lowest'
    });
  }

  /**
   * Get electronics details by ID
   * @param {string} electronicsId - Electronics ID
   * @returns {Promise<any>} Electronics details
   */
  async getElectronicsById(electronicsId) {
    return await this.get(`${this.endpoint}/${electronicsId}`);
  }

  /**
   * Search electronics
   * @param {string} query - Search query
   * @param {number} limit - Number of results
   * @returns {Promise<any>} Search results
   */
  async searchElectronics(query, limit = 10) {
    return await this.get(this.endpoint, {
      search: query,
      limit,
      sort: 'lowest'
    });
  }

  /**
   * Get mobile phones
   * @param {number} limit - Number of items to fetch
   * @returns {Promise<any>} Mobile phones data
   */
  async getMobilePhones(limit = 10) {
    return await this.get(this.endpoint, {
      category: 'mobile',
      limit,
      sort: 'lowest'
    });
  }

  /**
   * Get laptops
   * @param {number} limit - Number of items to fetch
   * @returns {Promise<any>} Laptops data
   */
  async getLaptops(limit = 10) {
    return await this.get(this.endpoint, {
      category: 'laptop',
      limit,
      sort: 'lowest'
    });
  }

  /**
   * Get home appliances
   * @param {number} limit - Number of items to fetch
   * @returns {Promise<any>} Home appliances data
   */
  async getHomeAppliances(limit = 10) {
    return await this.get(this.endpoint, {
      category: 'home_appliances',
      limit,
      sort: 'lowest'
    });
  }

  /**
   * Create new electronics listing
   * @param {object} electronicsData - Electronics data
   * @returns {Promise<any>} Created electronics data
   */
  async createElectronics(electronicsData) {
    return await this.post('/api/create/electronics', electronicsData);
  }

  /**
   * Update electronics listing
   * @param {string} electronicsId - Electronics ID
   * @param {object} electronicsData - Updated electronics data
   * @returns {Promise<any>} Updated electronics data
   */
  async updateElectronics(electronicsId, electronicsData) {
    return await this.put(`/api/update/electronics/${electronicsId}`, electronicsData);
  }

  /**
   * Delete electronics listing
   * @param {string} electronicsId - Electronics ID
   * @returns {Promise<any>} Deletion confirmation
   */
  async deleteElectronics(electronicsId) {
    return await this.delete(`/api/delete/electronics/${electronicsId}`);
  }
}

// Export singleton instance
export default new ElectronicsService();
