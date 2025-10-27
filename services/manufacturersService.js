import BaseService from './baseService';

/**
 * Manufacturers Service Class
 * Handles all manufacturer/brand API calls
 */
class ManufacturersService extends BaseService {
  constructor() {
    super();
  }

  /**
   * Get all car manufacturers
   * @returns {Promise<any>} Car manufacturers data
   */
  async getCarManufacturers() {
    return await this.get('/car/all');
  }

  /**
   * Get all mobile manufacturers
   * @returns {Promise<any>} Mobile manufacturers data
   */
  async getMobileManufacturers() {
    return await this.get('/mobile/all');
  }

  /**
   * Get all bike manufacturers
   * @returns {Promise<any>} Bike manufacturers data
   */
  async getBikeManufacturers() {
    return await this.get('/bike/all');
  }

  /**
   * Get all computer manufacturers
   * @returns {Promise<any>} Computer manufacturers data
   */
  async getComputerManufacturers() {
    return await this.get('/computer/all');
  }

  /**
   * Get manufacturers by category
   * @param {string} category - Category name
   * @returns {Promise<any>} Manufacturers data
   */
  async getManufacturersByCategory(category) {
    return await this.get(`/${category}/all`);
  }
}

// Export singleton instance
export default new ManufacturersService();
