import BaseService from './baseService';

/**
 * Dynamic Items Service Class
 * Handles the unified /api/get/all/:category/:subcategory endpoint
 * Supports all categories and subcategories dynamically
 */
class DynamicItemsService extends BaseService {
  constructor() {
    super();
  }

  /**
   * Get items by category and subcategory with dynamic endpoint
   * @param {string} category - Category name (e.g., 'vehicles', 'animals', 'mobiles', 'jobs', 'bikes', 'kids')
   * @param {string} subcategory - Subcategory name (e.g., 'cars', 'boats', 'spare-parts', 'car-accessories')
   * @param {object} params - Query parameters
   * @param {number} params.page - Page number for pagination (default: 1)
   * @param {number} params.limit - Number of items per page (default: 10)
   * @param {boolean} params.featured - Filter by featured status (default: false)
   * @returns {Promise<any>} Items data with proper response structure
   */
  async getItemsByCategoryAndSubcategory(category, subcategory, params = {}) {
    const defaultParams = {
      page: 1,
      limit: 10,
      featured: false,
      ...params,
    };

    try {
      const response = await this.get(`/api/get/all/${category}/${subcategory}`, defaultParams);
      
      // Ensure consistent response structure
      return this.formatResponse(response, category, subcategory, defaultParams);
    } catch (error) {
      console.error(`Error fetching items for ${category}/${subcategory}:`, error);
      throw error;
    }
  }

  /**
   * Get items by category only (without subcategory)
   * @param {string} category - Category name
   * @param {object} params - Query parameters
   * @returns {Promise<any>} Items data
   */
  async getItemsByCategory(category, params = {}) {
    const defaultParams = {
      page: 1,
      limit: 10,
      featured: false,
      ...params,
    };

    try {
      const response = await this.get(`/api/get/all/${category}`, defaultParams);
      
      // Ensure consistent response structure
      return this.formatResponse(response, category, null, defaultParams);
    } catch (error) {
      console.error(`Error fetching items for ${category}:`, error);
      throw error;
    }
  }

  /**
   * Format API response to ensure consistent structure
   * @param {any} response - Raw API response
   * @param {string} category - Category name
   * @param {string|null} subcategory - Subcategory name
   * @param {object} params - Query parameters used
   * @returns {object} Formatted response
   */
  formatResponse(response, category, subcategory, params) {
    // If response is already properly formatted, return as is
    if (response && typeof response === 'object' && response.success !== undefined) {
      return response;
    }

    // Handle different response structures and format them consistently
    let data = [];
    let totalItems = 0;

    if (Array.isArray(response)) {
      // Direct array response
      data = response;
      totalItems = response.length;
    } else if (response && typeof response === 'object') {
      // Object response - extract data and total
      if (response.data && Array.isArray(response.data)) {
        data = response.data;
        totalItems = response.total || response.totalItems || response.data.length;
      } else if (response.items && Array.isArray(response.items)) {
        data = response.items;
        totalItems = response.total || response.totalItems || response.items.length;
      } else if (response.products && Array.isArray(response.products)) {
        data = response.products;
        totalItems = response.total || response.totalItems || response.products.length;
      } else {
        // Single item or other structure
        data = [response];
        totalItems = 1;
      }
    }

    // Return consistent response structure
    return {
      success: true,
      category: category,
      subcategory: subcategory,
      page: params.page,
      limit: params.limit,
      totalItems: totalItems,
      data: data,
      hasMore: totalItems > (params.page * params.limit),
      nextPage: totalItems > (params.page * params.limit) ? params.page + 1 : null,
      previousPage: params.page > 1 ? params.page - 1 : null
    };
  }

  /**
   * Get items with advanced filtering
   * @param {string} category - Category name
   * @param {string} subcategory - Subcategory name (optional)
   * @param {object} filters - Advanced filters
   * @param {number} filters.page - Page number
   * @param {number} filters.limit - Items per page
   * @param {boolean} filters.featured - Featured filter
   * @param {string} filters.location - Location filter
   * @param {number} filters.minPrice - Minimum price
   * @param {number} filters.maxPrice - Maximum price
   * @param {string} filters.sortBy - Sort field
   * @param {string} filters.sortOrder - Sort order (asc/desc)
   * @returns {Promise<any>} Filtered items data
   */
  async getItemsWithFilters(category, subcategory = null, filters = {}) {
    const {
      page = 1,
      limit = 10,
      featured = false,
      location,
      minPrice,
      maxPrice,
      sortBy,
      sortOrder = 'desc',
      ...otherFilters
    } = filters;

    const params = {
      page,
      limit,
      featured,
      ...otherFilters
    };

    // Add optional filters
    if (location) params.location = location;
    if (minPrice !== undefined) params.minPrice = minPrice;
    if (maxPrice !== undefined) params.maxPrice = maxPrice;
    if (sortBy) params.sortBy = sortBy;
    if (sortOrder) params.sortOrder = sortOrder;

    try {
      let response;
      if (subcategory) {
        response = await this.getItemsByCategoryAndSubcategory(category, subcategory, params);
      } else {
        response = await this.getItemsByCategory(category, params);
      }
      
      return response;
    } catch (error) {
      console.error(`Error fetching filtered items for ${category}/${subcategory}:`, error);
      throw error;
    }
  }

  /**
   * Search items within a category/subcategory
   * @param {string} category - Category name
   * @param {string} subcategory - Subcategory name (optional)
   * @param {string} searchQuery - Search query
   * @param {object} params - Additional parameters
   * @returns {Promise<any>} Search results
   */
  async searchItems(category, subcategory = null, searchQuery, params = {}) {
    const searchParams = {
      q: searchQuery,
      ...params
    };

    try {
      let response;
      if (subcategory) {
        response = await this.getItemsByCategoryAndSubcategory(category, subcategory, searchParams);
      } else {
        response = await this.getItemsByCategory(category, searchParams);
      }
      
      return response;
    } catch (error) {
      console.error(`Error searching items in ${category}/${subcategory}:`, error);
      throw error;
    }
  }

  /**
   * Get featured items for a category/subcategory
   * @param {string} category - Category name
   * @param {string} subcategory - Subcategory name (optional)
   * @param {number} limit - Number of featured items to fetch
   * @returns {Promise<any>} Featured items data
   */
  async getFeaturedItems(category, subcategory = null, limit = 10) {
    const params = {
      featured: true,
      limit,
      page: 1
    };

    try {
      let response;
      if (subcategory) {
        response = await this.getItemsByCategoryAndSubcategory(category, subcategory, params);
      } else {
        response = await this.getItemsByCategory(category, params);
      }
      
      return response;
    } catch (error) {
      console.error(`Error fetching featured items for ${category}/${subcategory}:`, error);
      throw error;
    }
  }

  /**
   * Get recent items for a category/subcategory
   * @param {string} category - Category name
   * @param {string} subcategory - Subcategory name (optional)
   * @param {number} limit - Number of recent items to fetch
   * @returns {Promise<any>} Recent items data
   */
  async getRecentItems(category, subcategory = null, limit = 10) {
    const params = {
      sortBy: 'createdAt',
      sortOrder: 'desc',
      limit,
      page: 1
    };

    try {
      let response;
      if (subcategory) {
        response = await this.getItemsByCategoryAndSubcategory(category, subcategory, params);
      } else {
        response = await this.getItemsByCategory(category, params);
      }
      
      return response;
    } catch (error) {
      console.error(`Error fetching recent items for ${category}/${subcategory}:`, error);
      throw error;
    }
  }
}

// Export singleton instance
export default new DynamicItemsService();
