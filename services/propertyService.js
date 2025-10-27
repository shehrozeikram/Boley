import BaseService from './baseService';

/**
 * Property Service Class
 * Handles all property-related API calls with enhanced error handling
 */
class PropertyService extends BaseService {
  constructor() {
    super();
    this.endpoint = '/api/get/all/properties';
  }

  /**
   * Get featured properties
   * @param {number} limit - Number of items to fetch
   * @returns {Promise<any>} Featured properties data
   */
  async getFeaturedProperties(limit = 5) {
    return await this.get(this.endpoint, {
      limit,
      featured: true,
      sort: 'lowest'
    });
  }

  /**
   * Get all properties with optional filters
   * @param {object} params - Filter parameters
   * @returns {Promise<any>} Properties data
   */
  async getAllProperties(params = {}) {
    const defaultParams = {
      limit: 10,
      featured: false,
      sort: 'lowest',
      ...params
    };
    return await this.get(this.endpoint, defaultParams);
  }

  /**
   * Get properties for sale
   * @param {number} limit - Number of items to fetch
   * @returns {Promise<any>} Properties for sale data
   */
  async getPropertiesForSale(limit = 10) {
    return await this.get(this.endpoint, {
      type: 'sale',
      limit,
      sort: 'lowest'
    });
  }

  /**
   * Get properties for rent
   * @param {number} limit - Number of items to fetch
   * @returns {Promise<any>} Properties for rent data
   */
  async getPropertiesForRent(limit = 10) {
    return await this.get(this.endpoint, {
      type: 'rent',
      limit,
      sort: 'lowest'
    });
  }

  /**
   * Get properties by location
   * @param {string} location - Location filter
   * @param {number} limit - Number of items to fetch
   * @returns {Promise<any>} Properties data
   */
  async getPropertiesByLocation(location, limit = 10) {
    return await this.get(this.endpoint, {
      location,
      limit,
      sort: 'lowest'
    });
  }

  /**
   * Get properties by price range
   * @param {number} minPrice - Minimum price
   * @param {number} maxPrice - Maximum price
   * @param {number} limit - Number of items to fetch
   * @returns {Promise<any>} Properties data
   */
  async getPropertiesByPriceRange(minPrice, maxPrice, limit = 10) {
    return await this.get(this.endpoint, {
      minPrice,
      maxPrice,
      limit,
      sort: 'lowest'
    });
  }

  /**
   * Get properties by bedrooms
   * @param {number} bedrooms - Number of bedrooms
   * @param {number} limit - Number of items to fetch
   * @returns {Promise<any>} Properties data
   */
  async getPropertiesByBedrooms(bedrooms, limit = 10) {
    return await this.get(this.endpoint, {
      bedrooms,
      limit,
      sort: 'lowest'
    });
  }

  /**
   * Get properties by property type
   * @param {string} propertyType - Property type (house, apartment, etc.)
   * @param {number} limit - Number of items to fetch
   * @returns {Promise<any>} Properties data
   */
  async getPropertiesByType(propertyType, limit = 10) {
    return await this.get(this.endpoint, {
      propertyType,
      limit,
      sort: 'lowest'
    });
  }

  /**
   * Get property details by ID
   * @param {string} propertyId - Property ID
   * @returns {Promise<any>} Property details
   */
  async getPropertyById(propertyId) {
    return await this.get(`${this.endpoint}/${propertyId}`);
  }

  /**
   * Search properties
   * @param {string} query - Search query
   * @param {number} limit - Number of results
   * @returns {Promise<any>} Search results
   */
  async searchProperties(query, limit = 10) {
    return await this.get(this.endpoint, {
      search: query,
      limit,
      sort: 'lowest'
    });
  }

  /**
   * Get properties by area (square feet)
   * @param {number} minArea - Minimum area
   * @param {number} maxArea - Maximum area
   * @param {number} limit - Number of items to fetch
   * @returns {Promise<any>} Properties data
   */
  async getPropertiesByArea(minArea, maxArea, limit = 10) {
    return await this.get(this.endpoint, {
      minArea,
      maxArea,
      limit,
      sort: 'lowest'
    });
  }

  /**
   * Create new property listing
   * @param {object} propertyData - Property data
   * @returns {Promise<any>} Created property data
   */
  async createProperty(propertyData) {
    return await this.post('/api/create/property', propertyData);
  }

  /**
   * Update property listing
   * @param {string} propertyId - Property ID
   * @param {object} propertyData - Updated property data
   * @returns {Promise<any>} Updated property data
   */
  async updateProperty(propertyId, propertyData) {
    return await this.put(`/api/update/property/${propertyId}`, propertyData);
  }

  /**
   * Delete property listing
   * @param {string} propertyId - Property ID
   * @returns {Promise<any>} Deletion confirmation
   */
  async deleteProperty(propertyId) {
    return await this.delete(`/api/delete/property/${propertyId}`);
  }
}

// Export singleton instance
export default new PropertyService();
