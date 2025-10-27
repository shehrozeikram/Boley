import BaseService from './baseService';

/**
 * Category Service Class
 * Handles the Categories → Subcategories → Items hierarchy
 * Follows the proper API structure from the documentation
 */
class CategoryService extends BaseService {
  constructor() {
    super();
  }

  // ============================================
  // CATEGORIES LEVEL (Top Level)
  // ============================================

  /**
   * Get all categories
   * @returns {Promise<any>} All categories data
   */
  async getAllCategories() {
    return await this.get('/api/category/all');
  }

  /**
   * Get category by ID
   * @param {string} categoryId - Category ID
   * @returns {Promise<any>} Category details
   */
  async getCategoryById(categoryId) {
    return await this.get(`/category/${categoryId}`);
  }

  // ============================================
  // SUBCATEGORIES LEVEL (Second Level)
  // ============================================

  /**
   * Get subcategories by category ID
   * @param {string} categoryId - Category ID
   * @returns {Promise<any>} Subcategories data
   */
  async getSubCategoriesByCategoryId(categoryId) {
    return await this.get(`/api/category/subCat/${categoryId}`);
  }

  /**
   * Get all subcategories
   * @returns {Promise<any>} All subcategories data
   */
  async getAllSubCategories() {
    return await this.get('/category/subcategories/all');
  }

  /**
   * Get subcategory by ID
   * @param {string} subCategoryId - Subcategory ID
   * @returns {Promise<any>} Subcategory details
   */
  async getSubCategoryById(subCategoryId) {
    return await this.get(`/category/subcategory/${subCategoryId}`);
  }

  // ============================================
  // ITEMS LEVEL (Third Level)
  // ============================================

  /**
   * Get items by category (Pattern A)
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
   * Get items by category with subcategory (Pattern D)
   * @param {string} category - Category name (e.g., 'mobiles', 'bikes')
   * @param {string} subcategory - Subcategory name (e.g., 'samsung', 'sports-bikes')
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
   * Get property items by type (Pattern B)
   * @param {string} type - Property type ('rent' or 'sale')
   * @param {object} params - Query parameters
   * @returns {Promise<any>} Property items data
   */
  async getPropertyByType(type, params = {}) {
    const defaultParams = {
      featured: false,
      limit: 10,
      ...params,
    };
    return await this.get(`/get/all/property/${type}`, defaultParams);
  }

  /**
   * Get property items by type and subcategory (Pattern C)
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

  // ============================================
  // SPECIFIC CATEGORY ITEMS
  // ============================================

  /**
   * Get all vehicles
   * @param {object} params - Query parameters
   * @returns {Promise<any>} Vehicles data
   */
  async getAllVehicles(params = {}) {
    const defaultParams = {
      limit: 20,
      featured: false,
      ...params,
    };
    return await this.get('/api/get/all/vehicles', defaultParams);
  }

  /**
   * Get all mobiles
   * @param {object} params - Query parameters
   * @returns {Promise<any>} Mobiles data
   */
  async getAllMobiles(params = {}) {
    const defaultParams = {
      limit: 20,
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
      limit: 20,
      featured: false,
      ...params,
    };
    return await this.get('/api/get/all/bikes', defaultParams);
  }

  /**
   * Get all computers
   * @param {object} params - Query parameters
   * @returns {Promise<any>} Computers data
   */
  async getAllComputers(params = {}) {
    const defaultParams = {
      limit: 20,
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
      limit: 20,
      featured: false,
      ...params,
    };
    return await this.get('/get/all/property', defaultParams);
  }

  // ============================================
  // SEARCH & UTILITY
  // ============================================

  /**
   * Get search hints/suggestions
   * @param {string} query - Search query (minimum 2 characters)
   * @returns {Promise<any>} Search hints data
   */
  async getSearchHints(query) {
    if (query.length < 2) {
      throw new Error('Search query must be at least 2 characters long');
    }
    return await this.get('/search/hints', { query });
  }

  /**
   * Get recent items
   * @param {number} limit - Number of items to fetch (default: 5)
   * @returns {Promise<any>} Recent items data
   */
  async getRecentItems(limit = 5) {
    return await this.get(`/api/get/items/${limit}`);
  }

  /**
   * Get product by ID
   * @param {string} productId - Product ID
   * @returns {Promise<any>} Product details
   */
  async getProductById(productId) {
    return await this.get(`/get/product/${productId}`);
  }

  /**
   * Search categories
   * @param {string} query - Search query
   * @returns {Promise<any>} Search results
   */
  async searchCategories(query) {
    return await this.get('/category/search', {
      q: query,
    });
  }
}

// Export singleton instance
export default new CategoryService();
