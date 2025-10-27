import BaseService from './baseService';
import authService from './authService';
import categoryService from './categoryService';
import itemsService from './itemsService';
import dynamicItemsService from './dynamicItemsService';
import userService from './userService';
import chatService from './chatService';
import bidsService from './bidsService';
import notificationsService from './notificationsService';
import reviewsService from './reviewsService';
import locationService from './locationService';
import listingService from './listingService';
import manufacturersService from './manufacturersService';
import reportsService from './reportsService';
import packagesService from './packagesService';

// Initialize base service instance
const baseService = new BaseService();

/**
 * Cars API functions
 */
export const carsApi = {
  /**
   * Fetch featured cars
   * @param {number} limit - Number of cars to fetch
   * @returns {Promise<any>} Featured cars data
   */
  getFeaturedCars: async (limit = 5) => {
    return await baseService.get('/api/get/all/cars', {
      limit,
      featured: true,
    });
  },

  /**
   * Fetch all cars with optional parameters
   * @param {number} limit - Number of cars to fetch
   * @param {boolean} featured - Filter by featured status
   * @param {string} category - Filter by category
   * @param {string} brand - Filter by brand
   * @returns {Promise<any>} Cars data
   */
  getAllCars: async (limit = 10, featured = false, category = null, brand = null) => {
    const params = { limit };
    if (featured) params.featured = featured;
    if (category) params.category = category;
    if (brand) params.brand = brand;

    return await baseService.get('/api/get/all/cars', params);
  },

  /**
   * Get car by ID
   * @param {string} carId - Car ID
   * @returns {Promise<any>} Car details
   */
  getCarById: async (carId) => {
    return await baseService.get(`/api/get/car/${carId}`);
  },

  /**
   * Create new car listing
   * @param {object} carData - Car data
   * @returns {Promise<any>} Created car data
   */
  createCar: async (carData) => {
    return await baseService.post('/api/create/car', carData);
  },

  /**
   * Update car listing
   * @param {string} carId - Car ID
   * @param {object} carData - Updated car data
   * @returns {Promise<any>} Updated car data
   */
  updateCar: async (carId, carData) => {
    return await baseService.put(`/api/update/car/${carId}`, carData);
  },

  /**
   * Delete car listing
   * @param {string} carId - Car ID
   * @returns {Promise<any>} Deletion confirmation
   */
  deleteCar: async (carId) => {
    return await baseService.delete(`/api/delete/car/${carId}`);
  },
};

/**
 * Categories API functions - Hierarchical Structure
 * Categories → Subcategories → Items
 */
export const categoriesApi = {
  // CATEGORIES LEVEL (Top Level)
  getAllCategories: categoryService.getAllCategories.bind(categoryService),
  getCategoryById: categoryService.getCategoryById.bind(categoryService),

  // SUBCATEGORIES LEVEL (Second Level)
  getSubCategoriesByCategoryId: categoryService.getSubCategoriesByCategoryId.bind(categoryService),
  getAllSubCategories: categoryService.getAllSubCategories.bind(categoryService),
  getSubCategoryById: categoryService.getSubCategoryById.bind(categoryService),

  // ITEMS LEVEL (Third Level)
  getItemsByCategory: categoryService.getItemsByCategory.bind(categoryService),
  getItemsByCategoryAndSubcategory: categoryService.getItemsByCategoryAndSubcategory.bind(categoryService),
  getPropertyByType: categoryService.getPropertyByType.bind(categoryService),
  getPropertyByTypeAndSubcategory: categoryService.getPropertyByTypeAndSubcategory.bind(categoryService),

  // SPECIFIC CATEGORY ITEMS
  getAllVehicles: categoryService.getAllVehicles.bind(categoryService),
  getAllMobiles: categoryService.getAllMobiles.bind(categoryService),
  getAllBikes: categoryService.getAllBikes.bind(categoryService),
  getAllComputers: categoryService.getAllComputers.bind(categoryService),
  getAllProperties: categoryService.getAllProperties.bind(categoryService),

  // SEARCH & UTILITY
  getSearchHints: categoryService.getSearchHints.bind(categoryService),
  getRecentItems: categoryService.getRecentItems.bind(categoryService),
  getProductById: categoryService.getProductById.bind(categoryService),
  searchCategories: categoryService.searchCategories.bind(categoryService),
};

/**
 * Electronics API functions
 */
export const electronicsApi = {
  /**
   * Get all electronics
   * @param {number} limit - Number of items to fetch
   * @param {boolean} featured - Filter by featured status
   * @returns {Promise<any>} Electronics data
   */
  getAllElectronics: async (limit = 10, featured = false) => {
    const params = { limit };
    if (featured) params.featured = featured;

    return await baseService.get('/api/get/all/electronics', params);
  },

  /**
   * Get electronics by category
   * @param {string} category - Electronics category
   * @param {number} limit - Number of items to fetch
   * @returns {Promise<any>} Electronics data
   */
  getElectronicsByCategory: async (category, limit = 10) => {
    return await baseService.get('/api/get/electronics/category', {
      category,
      limit,
    });
  },
};

/**
 * Properties API functions
 */
export const propertiesApi = {
  /**
   * Get all properties
   * @param {number} limit - Number of items to fetch
   * @param {string} type - Property type (house, apartment, etc.)
   * @returns {Promise<any>} Properties data
   */
  getAllProperties: async (limit = 10, type = null) => {
    const params = { limit };
    if (type) params.type = type;

    return await baseService.get('/api/get/all/properties', params);
  },

  /**
   * Get properties by location
   * @param {string} location - Location filter
   * @param {number} limit - Number of items to fetch
   * @returns {Promise<any>} Properties data
   */
  getPropertiesByLocation: async (location, limit = 10) => {
    return await baseService.get('/api/get/properties/location', {
      location,
      limit,
    });
  },
};

/**
 * Search API functions
 */
export const searchApi = {
  /**
   * Search across all items
   * @param {string} query - Search query
   * @param {string} category - Category filter
   * @param {number} limit - Number of results
   * @returns {Promise<any>} Search results
   */
  searchAll: async (query, category = null, limit = 20) => {
    const params = { q: query, limit };
    if (category) params.category = category;

    return await baseService.get('/api/search', params);
  },

  /**
   * Get search suggestions
   * @param {string} query - Partial search query
   * @returns {Promise<any>} Search suggestions
   */
  getSearchSuggestions: async (query) => {
    return await baseService.get('/api/search/suggestions', { q: query });
  },
};


/**
 * Authentication API functions
 */
export const authApi = {
  register: authService.register.bind(authService),
  login: authService.login.bind(authService),
  logout: authService.logout.bind(authService),
  verifyOtp: authService.verifyOtp.bind(authService),
  resendOtp: authService.resendOtp.bind(authService),
  forgotPassword: authService.forgotPassword.bind(authService),
  resetPassword: authService.resetPassword.bind(authService),
};

/**
 * Items API functions
 */
export const itemsApi = {
  getRecentItems: itemsService.getRecentItems.bind(itemsService),
  getRecentlyViewedItems: itemsService.getRecentlyViewedItems.bind(itemsService),
  getRecentlyViewedItemsPaginated: itemsService.getRecentlyViewedItemsPaginated.bind(itemsService),
  getProductById: itemsService.getProductById.bind(itemsService),
  getAllVehicles: itemsService.getAllVehicles.bind(itemsService),
  getAllMobiles: itemsService.getAllMobiles.bind(itemsService),
  getAllBikes: itemsService.getAllBikes.bind(itemsService),
  getAllComputers: itemsService.getAllComputers.bind(itemsService),
  getAllProperties: itemsService.getAllProperties.bind(itemsService),
  getItemsByCategory: itemsService.getItemsByCategory.bind(itemsService),
  getPropertyByType: itemsService.getPropertyByType.bind(itemsService),
  getPropertyByTypeAndSubcategory: itemsService.getPropertyByTypeAndSubcategory.bind(itemsService),
  getItemsByCategoryAndSubcategory: itemsService.getItemsByCategoryAndSubcategory.bind(itemsService),
  closeAd: itemsService.closeAd.bind(itemsService),
  reactivateAd: itemsService.reactivateAd.bind(itemsService),
  validateRecentlyViewedItems: itemsService.validateRecentlyViewedItems.bind(itemsService),
  getAllBids: itemsService.getAllBids.bind(itemsService),
};

/**
 * Dynamic Items API functions - Unified endpoint for all categories/subcategories
 * Uses the /api/get/all/:category/:subcategory pattern
 */
export const dynamicItemsApi = {
  /**
   * Get items by category and subcategory with dynamic endpoint
   * @param {string} category - Category name (e.g., 'vehicles', 'animals', 'mobiles', 'jobs', 'bikes', 'kids')
   * @param {string} subcategory - Subcategory name (e.g., 'cars', 'boats', 'spare-parts', 'car-accessories')
   * @param {object} params - Query parameters (page, limit, featured)
   * @returns {Promise<any>} Items data with consistent response structure
   */
  getItemsByCategoryAndSubcategory: dynamicItemsService.getItemsByCategoryAndSubcategory.bind(dynamicItemsService),
  
  /**
   * Get items by category only (without subcategory)
   * @param {string} category - Category name
   * @param {object} params - Query parameters (page, limit, featured)
   * @returns {Promise<any>} Items data
   */
  getItemsByCategory: dynamicItemsService.getItemsByCategory.bind(dynamicItemsService),
  
  /**
   * Get items with advanced filtering
   * @param {string} category - Category name
   * @param {string} subcategory - Subcategory name (optional)
   * @param {object} filters - Advanced filters (location, price range, sorting, etc.)
   * @returns {Promise<any>} Filtered items data
   */
  getItemsWithFilters: dynamicItemsService.getItemsWithFilters.bind(dynamicItemsService),
  
  /**
   * Search items within a category/subcategory
   * @param {string} category - Category name
   * @param {string} subcategory - Subcategory name (optional)
   * @param {string} searchQuery - Search query
   * @param {object} params - Additional parameters
   * @returns {Promise<any>} Search results
   */
  searchItems: dynamicItemsService.searchItems.bind(dynamicItemsService),
  
  /**
   * Get featured items for a category/subcategory
   * @param {string} category - Category name
   * @param {string} subcategory - Subcategory name (optional)
   * @param {number} limit - Number of featured items to fetch
   * @returns {Promise<any>} Featured items data
   */
  getFeaturedItems: dynamicItemsService.getFeaturedItems.bind(dynamicItemsService),
  
  /**
   * Get recent items for a category/subcategory
   * @param {string} category - Category name
   * @param {string} subcategory - Subcategory name (optional)
   * @param {number} limit - Number of recent items to fetch
   * @returns {Promise<any>} Recent items data
   */
  getRecentItems: dynamicItemsService.getRecentItems.bind(dynamicItemsService),
};

/**
 * User API functions
 */
export const userApi = {
  getCurrentUser: userService.getCurrentUser.bind(userService),
  uploadKycDocuments: userService.uploadKycDocuments.bind(userService),
  saveItem: userService.saveItem.bind(userService),
  removeSavedItem: userService.removeSavedItem.bind(userService),
  checkIfItemSaved: userService.checkIfItemSaved.bind(userService),
  getAllSavedItems: userService.getAllSavedItems.bind(userService),
  getUserActivePosts: userService.getUserActivePosts.bind(userService),
  getUserPendingPosts: userService.getUserPendingPosts.bind(userService),
  getUserRejectedPosts: userService.getUserRejectedPosts.bind(userService),
  getUserExpiredPosts: userService.getUserExpiredPosts.bind(userService),
  getUserClosedPosts: userService.getUserClosedPosts.bind(userService),
  getUserImpressions: userService.getUserImpressions.bind(userService),
};

/**
 * Chat API functions
 */
export const chatApi = {
  getConversations: chatService.getConversations.bind(chatService),
  getMessagesWithUser: chatService.getMessagesWithUser.bind(chatService),
  sendMessage: chatService.sendMessage.bind(chatService),
  getUnreadMessageCount: chatService.getUnreadMessageCount.bind(chatService),
};

/**
 * Bids API functions
 */
export const bidsApi = {
  getBidsForItem: bidsService.getBidsForItem.bind(bidsService),
  createBid: bidsService.createBid.bind(bidsService),
  getBuyRequestsForItem: bidsService.getBuyRequestsForItem.bind(bidsService),
  createBuyRequest: bidsService.createBuyRequest.bind(bidsService),
};

/**
 * Notifications API functions
 */
export const notificationsApi = {
  getAllNotifications: notificationsService.getAllNotifications.bind(notificationsService),
  getUnreadNotificationsCount: notificationsService.getUnreadNotificationsCount.bind(notificationsService),
  markNotificationAsRead: notificationsService.markNotificationAsRead.bind(notificationsService),
  acceptOrRejectNotification: notificationsService.acceptOrRejectNotification.bind(notificationsService),
  completeNotification: notificationsService.completeNotification.bind(notificationsService),
};

/**
 * Reviews API functions
 */
export const reviewsApi = {
  createReview: reviewsService.createReview.bind(reviewsService),
  getReviewStats: reviewsService.getReviewStats.bind(reviewsService),
  getReviewsForUser: reviewsService.getReviewsForUser.bind(reviewsService),
};

/**
 * Location API functions
 */
export const locationApi = {
  getLocationTree: locationService.getLocationTree.bind(locationService),
};

/**
 * Listing API functions
 */
export const listingApi = {
  createCarListing: listingService.createCarListing.bind(listingService),
  createMobileListing: listingService.createMobileListing.bind(listingService),
  createPropertyListing: listingService.createPropertyListing.bind(listingService),
  createServiceListing: listingService.createServiceListing.bind(listingService),
  createListing: listingService.createListing.bind(listingService),
};

/**
 * Manufacturers API functions
 */
export const manufacturersApi = {
  getCarManufacturers: manufacturersService.getCarManufacturers.bind(manufacturersService),
  getMobileManufacturers: manufacturersService.getMobileManufacturers.bind(manufacturersService),
  getBikeManufacturers: manufacturersService.getBikeManufacturers.bind(manufacturersService),
  getComputerManufacturers: manufacturersService.getComputerManufacturers.bind(manufacturersService),
  getManufacturersByCategory: manufacturersService.getManufacturersByCategory.bind(manufacturersService),
};

/**
 * Reports API functions
 */
export const reportsApi = {
  reportItem: reportsService.reportItem.bind(reportsService),
};

/**
 * Packages API functions
 */
export const packagesApi = {
  getPublicPackages: packagesService.getPublicPackages.bind(packagesService),
};

// Export all APIs as a single object for convenience
export const api = {
  auth: authApi,
  cars: carsApi,
  categories: categoriesApi,
  electronics: electronicsApi,
  properties: propertiesApi,
  search: searchApi,
  user: userApi,
  items: itemsApi,
  dynamicItems: dynamicItemsApi,
  chat: chatApi,
  bids: bidsApi,
  notifications: notificationsApi,
  reviews: reviewsApi,
  location: locationApi,
  listing: listingApi,
  manufacturers: manufacturersApi,
  reports: reportsApi,
  packages: packagesApi,
};

export default api;
