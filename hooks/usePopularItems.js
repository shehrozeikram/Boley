import { useState, useEffect } from 'react';
import { dynamicItemsService } from '../services';

/**
 * Custom hook to fetch popular items from different categories
 * @param {number} limitPerCategory - Number of items per category (default: 1)
 * @param {number} totalItems - Total number of items to fetch (default: 5)
 * @returns {object} Popular items data with loading and error states
 */
export const usePopularItems = (limitPerCategory = 1, totalItems = 5) => {
  const [popularItems, setPopularItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Define categories to fetch popular items from
  const categories = [
    { category: 'vehicles', subcategory: 'cars' },
    { category: 'mobiles', subcategory: null },
    { category: 'bikes', subcategory: null },
    { category: 'electronics', subcategory: null },
    { category: 'property', subcategory: 'sale' }
  ];

  useEffect(() => {
    fetchPopularItems();
  }, []);

  const fetchPopularItems = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch items from different categories in parallel
      const promises = categories.slice(0, totalItems).map(async ({ category, subcategory }) => {
        try {
          const response = await dynamicItemsService.getRecentItems(
            category, 
            subcategory, 
            limitPerCategory
          );
          
          // Extract items from response
          const items = response?.data || response?.items || [];
          
          // Add category info to each item
          return items.map(item => ({
            ...item,
            categoryName: category,
            subcategoryName: subcategory
          }));
        } catch (err) {
          return []; // Return empty array for failed requests
        }
      });

      const results = await Promise.all(promises);
      
      // Flatten and limit results
      const allItems = results.flat().slice(0, totalItems);
      
      // Filter out items without proper titles
      const validItems = allItems.filter(item => 
        item.title || item.name || item.model || item.brand
      );

      setPopularItems(validItems);
    } catch (err) {
      setError('Failed to load popular items');
      setPopularItems([]);
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    fetchPopularItems();
  };

  return {
    popularItems,
    loading,
    error,
    refetch
  };
};

export default usePopularItems;
