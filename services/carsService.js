import BaseService from './baseService';

class CarsService extends BaseService {
  constructor() {
    super();
    this.endpoint = '/api/get/all/vehicles';
  }

  // Get featured vehicles
  async getFeaturedVehicles(limit = 5) {
    return await this.get(this.endpoint, {
      limit,
      featured: true,
      sort: 'lowest'
    });
  }

  // Get all vehicles with optional filters
  async getAllVehicles(params = {}) {
    const defaultParams = {
      limit: 10,
      featured: false,
      sort: 'lowest',
      ...params
    };
    return await this.get(this.endpoint, defaultParams);
  }

  // Get vehicles by category
  async getVehiclesByCategory(categoryId, limit = 10) {
    return await this.get(this.endpoint, {
      categoryId,
      limit,
      sort: 'lowest'
    });
  }

  // Get vehicles by location
  async getVehiclesByLocation(location, limit = 10) {
    return await this.get(this.endpoint, {
      location,
      limit,
      sort: 'lowest'
    });
  }

  // Get vehicles by price range
  async getVehiclesByPriceRange(minPrice, maxPrice, limit = 10) {
    return await this.get(this.endpoint, {
      minPrice,
      maxPrice,
      limit,
      sort: 'lowest'
    });
  }

  // Get vehicle details by ID
  async getVehicleById(vehicleId) {
    return await this.get(`${this.endpoint}/${vehicleId}`);
  }

  // Search vehicles
  async searchVehicles(query, limit = 10) {
    return await this.get(this.endpoint, {
      search: query,
      limit,
      sort: 'lowest'
    });
  }

  // Get vehicles by manufacturer
  async getVehiclesByManufacturer(manufacturer, limit = 10) {
    return await this.get(this.endpoint, {
      manufacturer,
      limit,
      sort: 'lowest'
    });
  }

  // Get vehicles by year range
  async getVehiclesByYearRange(minYear, maxYear, limit = 10) {
    return await this.get(this.endpoint, {
      minYear,
      maxYear,
      limit,
      sort: 'lowest'
    });
  }

  // Get vehicles by fuel type
  async getVehiclesByFuelType(fuelType, limit = 10) {
    return await this.get(this.endpoint, {
      fuelType,
      limit,
      sort: 'lowest'
    });
  }

  // Get vehicles by transmission type
  async getVehiclesByTransmission(transmission, limit = 10) {
    return await this.get(this.endpoint, {
      transmission,
      limit,
      sort: 'lowest'
    });
  }
}

// Export singleton instance
export default new CarsService();
