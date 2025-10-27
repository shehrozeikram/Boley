import BaseService from './baseService';

/**
 * Items Service Class
 * Handles all item listing and retrieval API calls
 */
class ItemsService extends BaseService {
  constructor() {
    super();
  }

  /**
   * Get recent items
   * @returns {Promise<any>} Recent items data
   */
  async getRecentItems() {
    return await this.get('/get/items/4');
  }

  /**
   * Get recently viewed items (10 items)
   * @returns {Promise<any>} Recently viewed items data
   */
  async getRecentlyViewedItems() {
    return await this.get('/api/get/items/10');
  }

  /**
   * Get recently viewed items (5 items)
   * @returns {Promise<any>} Recently viewed items data
   */
  async getRecentlyViewedItemsPaginated() {
    return await this.get('/api/get/items/5');
  }

  /**
   * Get product by ID
   * @param {string} productId - Product ID
   * @returns {Promise<any>} Product details
   */
  async getProductById(productId) {
    return await this.get(`/api/get/product/${productId}`);
  }

  /**
   * Get all vehicles
   * @param {object} params - Query parameters
   * @returns {Promise<any>} Vehicles data
   */
  async getAllVehicles(params = {}) {
    const defaultParams = {
      limit: 10,
      featured: false,
      ...params,
    };
    return await this.get('/get/all/vehicles', defaultParams);
  }

  /**
   * Get all mobiles
   * @param {object} params - Query parameters
   * @returns {Promise<any>} Mobiles data
   */
  async getAllMobiles(params = {}) {
    const defaultParams = {
      limit: 10,
      featured: false,
      ...params,
    };
    return await this.get('/get/all/mobiles', defaultParams);
  }

  /**
   * Get all bikes
   * @param {object} params - Query parameters
   * @returns {Promise<any>} Bikes data
   */
  async getAllBikes(params = {}) {
    const defaultParams = {
      limit: 10,
      featured: false,
      ...params,
    };
    return await this.get('/get/all/bikes', defaultParams);
  }

  /**
   * Get all computers
   * @param {object} params - Query parameters
   * @returns {Promise<any>} Computers data
   */
  async getAllComputers(params = {}) {
    const defaultParams = {
      limit: 10,
      featured: false,
      ...params,
    };
    return await this.get('/get/all/computers', defaultParams);
  }

  /**
   * Get all properties
   * @param {object} params - Query parameters
   * @returns {Promise<any>} Properties data
   */
  async getAllProperties(params = {}) {
    const defaultParams = {
      limit: 10,
      featured: false,
      ...params,
    };
    return await this.get('/get/all/property', defaultParams);
  }

  /**
   * Get items by category with dynamic filtering
   * @param {string} category - Category name (e.g., 'mobiles', 'bikes', 'furniture')
   * @param {object} params - Query parameters
   * @returns {Promise<any>} Items data
   */
  async getItemsByCategory(category, params = {}) {
    const defaultParams = {
      page: 1,
      limit: 20,
      ...params,
    };
    return await this.get(`/get/all/${category}`, defaultParams);
  }

  /**
   * Get property items by type (rent/sale)
   * @param {string} type - Property type ('rent' or 'sale')
   * @param {object} params - Query parameters
   * @returns {Promise<any>} Property items data
   */
  async getPropertyByType(type, params = {}) {
    const defaultParams = {
      featured: false,
      limit: 10,
      sort: 'newest',
      ...params,
    };
    return await this.get(`/get/all/property/${type}`, defaultParams);
  }

  /**
   * Get property items by type and subcategory
   * @param {string} type - Property type ('rent' or 'sale')
   * @param {string} subcategory - Property subcategory (e.g., 'houses', 'apartments')
   * @param {object} params - Query parameters
   * @returns {Promise<any>} Property items data
   */
  async getPropertyByTypeAndSubcategory(type, subcategory, params = {}) {
    const defaultParams = {
      featured: false,
      page: 1,
      limit: 10,
      ...params,
    };
    return await this.get(`/get/all/property-${type}/${subcategory}`, defaultParams);
  }

  /**
   * Get items by category and subcategory
   * @param {string} category - Category name
   * @param {string} subcategory - Subcategory name
   * @param {object} params - Query parameters
   * @returns {Promise<any>} Items data
   */
  async getItemsByCategoryAndSubcategory(category, subcategory, params = {}) {
    const defaultParams = {
      page: 1,
      limit: 20,
      ...params,
    };
    return await this.get(`/get/all/${category}/${subcategory}`, defaultParams);
  }

  /**
   * Close an ad
   * @param {string} adId - Ad ID
   * @returns {Promise<any>} Close response
   */
  async closeAd(adId) {
    return await this.patch(`/data/close-ad/${adId}`, {});
  }

  /**
   * Reactivate an ad
   * @param {string} adId - Ad ID
   * @returns {Promise<any>} Reactivate response
   */
  async reactivateAd(adId) {
    return await this.patch(`/data/reactivate-ad/${adId}`, {});
  }

  /**
   * Validate recently viewed items
   * @param {Array<string>} itemIds - Array of item IDs
   * @returns {Promise<any>} Validation response
   */
  async validateRecentlyViewedItems(itemIds) {
    return await this.post('/get/validate-recently-viewed', {
      itemIds,
    });
  }

  /**
   * Get all bids (auction items)
   * @param {object} params - Query parameters
   * @returns {Promise<any>} Bids data
   */
  async getAllBids(params = {}) {
    const defaultParams = {
      limit: 10,
      ...params,
    };
    return await this.get('/get/all/bids', defaultParams);
  }
}

// Export singleton instance
export default new ItemsService();
