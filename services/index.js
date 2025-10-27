// Export all services from a single entry point
export { default as carsService } from './carsService';
export { default as propertyService } from './propertyService';
export { default as electronicsService } from './electronicsService';
export { default as categoryService } from './categoryService';
export { default as BaseService } from './baseService';
export { default as ErrorHandler } from './errorHandler';

// Export new comprehensive services
export { default as authService } from './authService';
export { default as itemsService } from './itemsService';
export { default as dynamicItemsService } from './dynamicItemsService';
export { default as userService } from './userService';
export { default as chatService } from './chatService';
export { default as bidsService } from './bidsService';
export { default as notificationsService } from './notificationsService';
export { default as reviewsService } from './reviewsService';
export { default as locationService } from './locationService';
export { default as listingService } from './listingService';
export { default as manufacturersService } from './manufacturersService';
export { default as reportsService } from './reportsService';
export { default as packagesService } from './packagesService';

// Export enhanced API functions
export { 
  authApi,
  carsApi, 
  categoriesApi, 
  electronicsApi, 
  propertiesApi, 
  searchApi, 
  userApi,
  itemsApi,
  dynamicItemsApi,
  chatApi,
  bidsApi,
  notificationsApi,
  reviewsApi,
  locationApi,
  listingApi,
  manufacturersApi,
  reportsApi,
  packagesApi,
  api as default 
} from './api';

// Legacy exports for backward compatibility
export { getFeaturedCars, getAllCars } from './api';
