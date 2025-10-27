import BaseService from './baseService';

/**
 * Listing Service Class
 * Handles all listing creation API calls
 */
class ListingService extends BaseService {
  constructor() {
    super();
  }

  /**
   * Create a car listing
   * @param {object} carData - Car listing data
   * @returns {Promise<any>} Car creation response
   */
  async createCarListing(carData) {
    const formData = this.buildFormData(carData);
    return await this.postFormData('/create/cars', formData);
  }

  /**
   * Create a mobile listing
   * @param {object} mobileData - Mobile listing data
   * @returns {Promise<any>} Mobile creation response
   */
  async createMobileListing(mobileData) {
    const formData = this.buildFormData(mobileData);
    return await this.postFormData('/create/mobiles', formData);
  }

  /**
   * Create a property listing
   * @param {object} propertyData - Property listing data
   * @returns {Promise<any>} Property creation response
   */
  async createPropertyListing(propertyData) {
    const formData = this.buildFormData(propertyData);
    return await this.postFormData('/create/property', formData);
  }

  /**
   * Create a service listing
   * @param {object} serviceData - Service listing data
   * @returns {Promise<any>} Service creation response
   */
  async createServiceListing(serviceData) {
    const formData = this.buildFormData(serviceData);
    return await this.postFormData('/create/others', formData);
  }

  /**
   * Create a listing for any category
   * @param {string} category - Category name (e.g., 'bikes', 'furniture', 'fashion')
   * @param {object} listingData - Listing data
   * @returns {Promise<any>} Listing creation response
   */
  async createListing(category, listingData) {
    const formData = this.buildFormData(listingData);
    return await this.postFormData(`/create/${category}`, formData);
  }

  /**
   * Build FormData from object data
   * @param {object} data - Data object
   * @returns {FormData} FormData object
   */
  buildFormData(data) {
    const formData = new FormData();

    // Add all properties to FormData
    Object.keys(data).forEach(key => {
      const value = data[key];
      
      if (value instanceof File) {
        // Handle single file
        formData.append(key, value);
      } else if (Array.isArray(value) && value.length > 0 && value[0] instanceof File) {
        // Handle array of files
        value.forEach(file => {
          formData.append(key, file);
        });
      } else if (value !== null && value !== undefined) {
        // Handle other values
        formData.append(key, String(value));
      }
    });

    return formData;
  }
}

// Export singleton instance
export default new ListingService();
