import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  TextInput,
  Image,
  Platform,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { categoryService, dynamicItemsService } from '../services';

// Custom Back Arrow Component
const BackArrow = () => (
  <View style={backArrowStyles.container}>
    <View style={backArrowStyles.arrowHead} />
    <View style={backArrowStyles.arrowLine} />
  </View>
);

const backArrowStyles = StyleSheet.create({
  container: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowLine: {
    width: 12,
    height: 2,
    backgroundColor: '#333',
    position: 'absolute',
    left: 6,
  },
  arrowHead: {
    width: 8,
    height: 8,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#333',
    transform: [{ rotate: '45deg' }],
    position: 'absolute',
    left: 6,
  },
});

// Skeleton Loading Component
const SkeletonLoader = ({ delay = 0 }) => {
  const shimmerAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const shimmer = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnimation, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    
    // Add delay for staggered animation
    const timer = setTimeout(() => {
      shimmer.start();
    }, delay);
    
    return () => {
      clearTimeout(timer);
      shimmer.stop();
    };
  }, [delay, shimmerAnimation]);

  const shimmerStyle = {
    opacity: shimmerAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0.3, 0.7],
    }),
  };

  return (
    <View style={styles.skeletonCard}>
      <Animated.View style={[styles.skeletonImage, shimmerStyle]} />
      <View style={styles.skeletonContent}>
        <Animated.View style={[styles.skeletonTitle, shimmerStyle]} />
        <Animated.View style={[styles.skeletonPrice, shimmerStyle]} />
        <Animated.View style={[styles.skeletonCondition, shimmerStyle]} />
        <View style={styles.skeletonFooter}>
          <Animated.View style={[styles.skeletonLocation, shimmerStyle]} />
          <Animated.View style={[styles.skeletonTime, shimmerStyle]} />
        </View>
      </View>
    </View>
  );
};

const CategoryListingScreen = ({ route, navigation }) => {
  const { 
    category, 
    subcategory, 
    parentCategory,
    categoryData,
    subcategoryId,
    subcategorySlug,
    categoryId,
    searchQuery: initialSearchQuery 
  } = route.params || { category: 'Category' };
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery || '');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [apiItems, setApiItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [searchTimeout, setSearchTimeout] = useState(null);
  
  // Convert display name to API slug
  const convertToApiSlug = (displayName) => {
    const slugMap = {
      'Animals': 'animals',
      'Bikes': 'bikes',
      'Books, Sports & Hobbies': 'books',
      'Business, Industrial & Agriculture': 'business',
      'Electronics & Home Appliances': 'electronics',
      'Fashion & Beauty': 'fashion',
      'Furniture & Home Decor': 'furniture',
      'Jobs': 'jobs',
      'Kids': 'kids',
      'Mobiles': 'mobiles',
      'Property for Rent': 'property-rent',
      'Property for Sale': 'property-sale',
      'Services': 'services',
      'Vehicles': 'vehicles'
    };
    
    return slugMap[displayName] || displayName.toLowerCase().replace(/\s+/g, '-');
  };
  
  // Get category and subcategory names for display
  const getCategoryNames = () => {
    let categoryName = category || 'vehicles';
    let subcategoryName = subcategory || subcategorySlug;
    
    // If we have parentCategory, use it as the main category
    if (parentCategory) {
      // Convert parentCategory display name to API slug
      categoryName = convertToApiSlug(parentCategory);
      // Always use subcategorySlug if available, otherwise fall back to subcategory or category
      subcategoryName = subcategorySlug || subcategory || category;
    }
    // Fix the case where category and subcategory are the same (navigation issue)
    else if (category && subcategory && category.toLowerCase() === subcategory.toLowerCase()) {
      if (subcategorySlug) {
        subcategoryName = subcategorySlug;
        // Map subcategories to their parent categories using actual API slugs
        if (subcategorySlug === 'cars' || subcategorySlug === 'boats' || subcategorySlug === 'bikes' || subcategorySlug === 'spare-parts' || subcategorySlug === 'car-accessories' || subcategorySlug === 'buses-vans-trucks') {
          categoryName = 'vehicles';
        } else if (subcategorySlug === 'samsung' || subcategorySlug === 'iphone' || subcategorySlug === 'huawei' || subcategorySlug === 'xiaomi' || subcategorySlug === 'oppo') {
          categoryName = 'mobiles';
        } else if (subcategorySlug === 'houses' || subcategorySlug === 'apartments' || subcategorySlug === 'plots' || subcategorySlug === 'commercial') {
          categoryName = 'property-sale'; // Use actual API slug
        } else if (subcategorySlug === 'hens' || subcategorySlug === 'cats' || subcategorySlug === 'parrots' || subcategorySlug === 'dogs' || subcategorySlug === 'cows') {
          categoryName = 'animals';
        } else if (subcategorySlug === 'jobs' || subcategorySlug === 'freelance' || subcategorySlug === 'part-time') {
          categoryName = 'jobs';
        } else if (subcategorySlug === 'kids' || subcategorySlug === 'toys' || subcategorySlug === 'clothes') {
          categoryName = 'kids';
        } else if (subcategorySlug === 'books' || subcategorySlug === 'sports' || subcategorySlug === 'hobbies') {
          categoryName = 'books';
        } else if (subcategorySlug === 'business' || subcategorySlug === 'industrial' || subcategorySlug === 'agriculture') {
          categoryName = 'business';
        } else if (subcategorySlug === 'electronics' || subcategorySlug === 'home-appliances') {
          categoryName = 'electronics';
        } else if (subcategorySlug === 'fashion' || subcategorySlug === 'beauty') {
          categoryName = 'fashion';
        } else if (subcategorySlug === 'furniture' || subcategorySlug === 'home-decor') {
          categoryName = 'furniture';
        } else if (subcategorySlug === 'property-rent') {
          categoryName = 'property-rent';
        } else if (subcategorySlug === 'services') {
          categoryName = 'services';
        } else {
          // Default fallback - try to infer from the original category
          categoryName = category || 'vehicles';
        }
      }
    }
    
    return { categoryName, subcategoryName };
  };
  
  const { categoryName, subcategoryName } = getCategoryNames();
  
  // Debug logging for route parameters
  console.log('🔍 Route Parameters Debug:', {
    category,
    subcategory,
    subcategorySlug,
    parentCategory,
    categoryData,
    resolvedCategoryName: categoryName,
    resolvedSubcategoryName: subcategoryName,
    convertedFromParent: parentCategory ? convertToApiSlug(parentCategory) : null
  });
  
  // Mock data for category listings
  const getCategoryItems = (categoryName) => {
    const category = categoryName.toLowerCase();
    
    if (category.includes('vehicle')) {
      return [
        {
          id: '1',
          title: 'Honda Civic 2020',
          price: 'Rs 4,500,000',
          location: 'F-7 Markaz, Islamabad',
          image: require('../assets/images/honda-civic-2020.png'),
          time: '1 day ago'
        },
        {
          id: '2',
          title: 'Toyota Corolla 2019',
          price: 'Rs 3,800,000',
          location: 'DHA, Lahore',
          image: require('../assets/images/toyota-corolla-2019.png'),
          time: '3 days ago'
        },
        {
          id: '3',
          title: 'Suzuki Swift 2021',
          price: 'Rs 2,200,000',
          location: 'Gulberg, Lahore',
          image: require('../assets/images/suzuki-swift-2021.png'),
          time: '1 week ago'
        },
        {
          id: '4',
          title: 'Toyota Hiace Van 2020',
          price: 'Rs 3,500,000',
          location: 'Industrial Area, Karachi',
          image: '🚐',
          time: '2 days ago'
        },
        {
          id: '5',
          title: 'Isuzu Truck 2019',
          price: 'Rs 4,200,000',
          location: 'Port Area, Karachi',
          image: '🚛',
          time: '1 week ago'
        },
        {
          id: '6',
          title: 'Hino Bus 2021',
          price: 'Rs 6,800,000',
          location: 'Transport Hub, Lahore',
          image: '🚌',
          time: '3 days ago'
        }
      ];
    } else if (category.includes('property')) {
      return [
        {
          id: '1',
          title: '3 Bedroom Apartment',
          price: 'Rs 25,000/month',
          location: 'DHA, Lahore',
          image: '🏠',
          time: '3 days ago'
        },
        {
          id: '2',
          title: '2 Bedroom Flat',
          price: 'Rs 20,000/month',
          location: 'Gulberg, Lahore',
          image: '🏠',
          time: '1 week ago'
        },
        {
          id: '3',
          title: 'Studio Apartment',
          price: 'Rs 15,000/month',
          location: 'Clifton, Karachi',
          image: '🏠',
          time: '2 weeks ago'
        }
      ];
    } else if (category.includes('electronics')) {
      return [
        {
          id: '1',
          title: 'Samsung 55" Smart TV',
          price: 'Rs 180,000',
          location: 'Gulberg, Lahore',
          image: '📺',
          time: '1 week ago'
        },
        {
          id: '2',
          title: 'Dell Laptop Inspiron 15',
          price: 'Rs 120,000',
          location: 'Blue Area, Islamabad',
          image: '💻',
          time: '2 weeks ago'
        },
        {
          id: '3',
          title: 'Sony PlayStation 5',
          price: 'Rs 150,000',
          location: 'Defence, Karachi',
          image: '🎮',
          time: '1 month ago'
        }
      ];
    } else if (category.includes('bikes') || category.includes('bike')) {
      return [
        {
          id: '1',
          title: 'Honda CB150F 2023',
          price: 'Rs 450,000',
          location: 'F-7 Markaz, Islamabad',
          image: require('../assets/images/honda-CB150F.jpeg'),
          time: '1 day ago'
        },
        {
          id: '2',
          title: 'Yamaha YBR125 2022',
          price: 'Rs 380,000',
          location: 'DHA, Lahore',
          image: '🏍️',
          time: '3 days ago'
        },
        {
          id: '3',
          title: 'Suzuki GS150 2021',
          price: 'Rs 320,000',
          location: 'Gulberg, Lahore',
          image: require('../assets/images/suzuki-gs150.png'),
          time: '1 week ago'
        },
        {
          id: '4',
          title: 'Kawasaki Ninja 300 2020',
          price: 'Rs 850,000',
          location: 'Blue Area, Islamabad',
          image: require('../assets/images/kawasaki-ninja-300.png'),
          time: '2 weeks ago'
        },
        {
          id: '5',
          title: 'Honda CD70 2023',
          price: 'Rs 180,000',
          location: 'Defence, Karachi',
          image: require('../assets/images/honda-70.png'),
          time: '3 weeks ago'
        }
      ];
    } else if (category.includes('animal')) {
      return [
        {
          id: '1',
          title: 'Healthy Hens for Sale',
          price: 'Rs 2,500 each',
          location: 'Rural Area, Lahore',
          image: '🐔',
          time: '1 day ago'
        },
        {
          id: '2',
          title: 'Persian Cat Kitten',
          price: 'Rs 15,000',
          location: 'DHA, Karachi',
          image: '🐱',
          time: '3 days ago'
        },
        {
          id: '3',
          title: 'Colorful Parrots Pair',
          price: 'Rs 8,000',
          location: 'Gulberg, Lahore',
          image: '🦜',
          time: '1 week ago'
        },
        {
          id: '4',
          title: 'German Shepherd Puppy',
          price: 'Rs 25,000',
          location: 'Blue Area, Islamabad',
          image: '🐕',
          time: '2 weeks ago'
        },
        {
          id: '5',
          title: 'Dairy Cow for Sale',
          price: 'Rs 80,000',
          location: 'Rural Area, Faisalabad',
          image: '🐄',
          time: '1 month ago'
        }
      ];
    } else if (category.includes('books')) {
      return [
        {
          id: '1',
          title: 'Programming Books Collection',
          price: 'Rs 5,000',
          location: 'Blue Area, Islamabad',
          image: '📚',
          time: '2 days ago'
        },
        {
          id: '2',
          title: 'Cricket Bat & Ball Set',
          price: 'Rs 3,500',
          location: 'Gulberg, Lahore',
          image: '🏏',
          time: '1 week ago'
        }
      ];
    } else if (category.includes('business')) {
      return [
        {
          id: '1',
          title: 'Industrial Equipment',
          price: 'Rs 150,000',
          location: 'Industrial Area, Karachi',
          image: '🏭',
          time: '3 days ago'
        }
      ];
    } else if (category.includes('fashion')) {
      return [
        {
          id: '1',
          title: 'Designer Clothes',
          price: 'Rs 8,000',
          location: 'DHA, Lahore',
          image: '👗',
          time: '1 day ago'
        }
      ];
    } else if (category.includes('furniture')) {
      return [
        {
          id: '1',
          title: 'Modern Sofa Set',
          price: 'Rs 45,000',
          location: 'Gulberg, Lahore',
          image: '🛋️',
          time: '2 days ago'
        }
      ];
    } else if (category.includes('property-rent')) {
      return [
        {
          id: '1',
          title: '2 Bedroom Apartment for Rent',
          price: 'Rs 25,000/month',
          location: 'DHA, Lahore',
          image: '🏠',
          time: '1 week ago'
        }
      ];
    } else if (category.includes('services')) {
      return [
        {
          id: '1',
          title: 'Home Cleaning Service',
          price: 'Rs 2,000',
          location: 'Islamabad',
          image: '🧹',
          time: '2 days ago'
        }
      ];
    } else {
      return [
        {
          id: '1',
          title: 'Sample Item 1',
          price: 'Rs 50,000',
          location: 'Sample Location',
          image: '📦',
          time: '1 day ago'
        },
        {
          id: '2',
          title: 'Sample Item 2',
          price: 'Rs 75,000',
          location: 'Sample Location',
          image: '📦',
          time: '2 days ago'
        }
      ];
    }
  };

  // Fetch items from API when component mounts
  useEffect(() => {
    fetchItems();
  }, [categoryId, subcategoryId]);

  // Cleanup search timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };
  }, [searchTimeout]);

  // Fetch items from API using the new dynamic API structure
  const fetchItems = async () => {
    setLoading(true);
    setError(null);
    
    // Use the already defined category names
    const categorySlug = categoryName.toLowerCase().replace(/\s+/g, '-');
    
    try {
      let response;
      
      console.log('🔍 Testing Dynamic API with:', { 
        category, 
        subcategory, 
        subcategorySlug,
        categoryName,
        subcategoryName,
        categorySlug 
      });
      
      // Use the new dynamic API service
      if (subcategoryName && subcategoryName.trim()) {
        // Pattern: /api/get/all/:category/:subcategory
        const subcategorySlugFormatted = subcategoryName.toLowerCase().replace(/\s+/g, '-');
        console.log('📡 Calling API:', `/api/get/all/${categorySlug}/${subcategorySlugFormatted}`);
        
        response = await dynamicItemsService.getItemsByCategoryAndSubcategory(
          categorySlug, 
          subcategorySlugFormatted,
          {
            page: 1,
            limit: 20,
            featured: false
          }
        );
      } else {
        // Pattern: /api/get/all/:category
        console.log('📡 Calling API:', `/api/get/all/${categorySlug}`);
        
        response = await dynamicItemsService.getItemsByCategory(
          categorySlug,
          {
            page: 1,
            limit: 20,
            featured: false
          }
        );
      }
      
      console.log('📦 API Response:', response);

      // Handle the consistent response structure from dynamic API
      if (response && response.success && response.data && Array.isArray(response.data)) {
        console.log('📦 API Data Items:', response.data);
        console.log('📦 First Item Structure:', response.data[0]);
        setApiItems(response.data);
        setCurrentPage(response.page || 1);
        setHasMore(response.hasMore || false);
        setTotalItems(response.totalItems || response.data.length);
      } else if (response && Array.isArray(response)) {
        // Fallback for direct array response
        setApiItems(response);
        setTotalItems(response.length);
        setHasMore(false);
      } else {
        console.log('⚠️ Dynamic API returned no data, trying existing categoryService...');
        
        // Try existing categoryService as fallback
        try {
          let fallbackResponse;
          if (subcategoryName && subcategoryName.trim()) {
            const subcategorySlugFormatted = subcategoryName.toLowerCase().replace(/\s+/g, '-');
            console.log('🔄 Fallback API:', `/get/all/${categorySlug}/${subcategorySlugFormatted}`);
            fallbackResponse = await categoryService.getItemsByCategoryAndSubcategory(
              categorySlug, 
              subcategorySlugFormatted,
              { page: 1, limit: 20 }
            );
          } else {
            console.log('🔄 Fallback API:', `/get/all/${categorySlug}`);
            fallbackResponse = await categoryService.getItemsByCategory(
              categorySlug,
              { page: 1, limit: 20 }
            );
          }
          
          console.log('🔄 Fallback API Response:', fallbackResponse);
          
          if (Array.isArray(fallbackResponse) && fallbackResponse.length > 0) {
            setApiItems(fallbackResponse);
            setTotalItems(fallbackResponse.length);
            setHasMore(false);
          } else {
            // Final fallback to static data
            setApiItems(getCategoryItems(category));
            setTotalItems(getCategoryItems(category).length);
            setHasMore(false);
          }
        } catch (fallbackErr) {
          console.error('Fallback API also failed:', fallbackErr);
          // Use static data as final fallback
          setApiItems(getCategoryItems(category));
          setTotalItems(getCategoryItems(category).length);
          setHasMore(false);
        }
      }
    } catch (err) {
      console.error('❌ Error fetching items:', err);
      setError('Failed to load items');
      
      // Try existing categoryService as fallback
      try {
        console.log('🔄 Trying fallback with existing categoryService...');
        let fallbackResponse;
        if (subcategoryName && subcategoryName.trim()) {
          const subcategorySlugFormatted = subcategoryName.toLowerCase().replace(/\s+/g, '-');
          console.log('🔄 Fallback API:', `/get/all/${categorySlug}/${subcategorySlugFormatted}`);
          fallbackResponse = await categoryService.getItemsByCategoryAndSubcategory(
            categorySlug, 
            subcategorySlugFormatted,
            { page: 1, limit: 20 }
          );
        } else {
          console.log('🔄 Fallback API:', `/get/all/${categorySlug}`);
          fallbackResponse = await categoryService.getItemsByCategory(
            categorySlug,
            { page: 1, limit: 20 }
          );
        }
        
        if (Array.isArray(fallbackResponse) && fallbackResponse.length > 0) {
          setApiItems(fallbackResponse);
          setTotalItems(fallbackResponse.length);
          setHasMore(false);
        } else {
          // Use static data as final fallback
          setApiItems(getCategoryItems(category));
        }
      } catch (fallbackErr) {
        console.error('Fallback also failed:', fallbackErr);
        // Use static data as final fallback
        setApiItems(getCategoryItems(category));
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle filter changes with dynamic API
  const handleFilterChange = async (filter) => {
    setActiveFilter(filter);
    setLoading(true);
    setError(null);
    
    // Use the already defined category names
    const categorySlug = categoryName.toLowerCase().replace(/\s+/g, '-');
    
    try {
      let response;
      
      const params = {
        page: 1,
        limit: 20,
        featured: filter === 'Featured'
      };

      if (subcategoryName && subcategoryName.trim()) {
        const subcategorySlugFormatted = subcategoryName.toLowerCase().replace(/\s+/g, '-');
        response = await dynamicItemsService.getItemsByCategoryAndSubcategory(
          categorySlug, 
          subcategorySlugFormatted,
          params
        );
      } else {
        response = await dynamicItemsService.getItemsByCategory(categorySlug, params);
      }

      if (response && response.success && response.data && Array.isArray(response.data)) {
        setApiItems(response.data);
        setCurrentPage(response.page || 1);
        setHasMore(response.hasMore || false);
        setTotalItems(response.totalItems || response.data.length);
      } else {
        // Fallback to static data with filter
        const filteredItems = getCategoryItems(category).filter(item => {
          if (filter === 'Featured') {
            return item.featured || Math.random() > 0.7; // Mock featured filter
          }
          return true;
        });
        setApiItems(filteredItems);
        setTotalItems(filteredItems.length);
        setHasMore(false);
      }
    } catch (err) {
      console.error('Error filtering items:', err);
      setError('Failed to filter items');
      // Fallback to static data
      setApiItems(getCategoryItems(category));
    } finally {
      setLoading(false);
    }
  };

  // Handle search with dynamic API
  const handleSearch = async (query) => {
    if (!query.trim()) {
      fetchItems();
      return;
    }

    setLoading(true);
    setError(null);
    
    // Use the already defined category names
    const categorySlug = categoryName.toLowerCase().replace(/\s+/g, '-');
    
    try {
      let response;
      
      const params = {
        page: 1,
        limit: 20,
        q: query.trim()
      };

      if (subcategoryName && subcategoryName.trim()) {
        const subcategorySlugFormatted = subcategoryName.toLowerCase().replace(/\s+/g, '-');
        response = await dynamicItemsService.searchItems(
          categorySlug, 
          subcategorySlugFormatted,
          query.trim(),
          params
        );
      } else {
        response = await dynamicItemsService.searchItems(categorySlug, null, query.trim(), params);
      }

      if (response && response.success && response.data && Array.isArray(response.data)) {
        setApiItems(response.data);
        setCurrentPage(response.page || 1);
        setHasMore(response.hasMore || false);
        setTotalItems(response.totalItems || response.data.length);
      } else {
        // Fallback to static data with search
        const searchResults = getCategoryItems(category).filter(item =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.location.toLowerCase().includes(query.toLowerCase())
        );
        setApiItems(searchResults);
        setTotalItems(searchResults.length);
        setHasMore(false);
      }
    } catch (err) {
      console.error('Error searching items:', err);
      setError('Failed to search items');
      // Fallback to static data
      setApiItems(getCategoryItems(category));
    } finally {
      setLoading(false);
    }
  };

  // Load more items (pagination)
  const loadMoreItems = async () => {
    if (!hasMore || loading) return;

    setLoading(true);
    
    // Use the already defined category names
    const categorySlug = categoryName.toLowerCase().replace(/\s+/g, '-');
    
    try {
      let response;
      
      const params = {
        page: currentPage + 1,
        limit: 20,
        featured: activeFilter === 'Featured'
      };

      if (subcategoryName && subcategoryName.trim()) {
        const subcategorySlugFormatted = subcategoryName.toLowerCase().replace(/\s+/g, '-');
        response = await dynamicItemsService.getItemsByCategoryAndSubcategory(
          categorySlug, 
          subcategorySlugFormatted,
          params
        );
      } else {
        response = await dynamicItemsService.getItemsByCategory(categorySlug, params);
      }

      if (response && response.success && response.data && Array.isArray(response.data)) {
        setApiItems(prevItems => [...prevItems, ...response.data]);
        setCurrentPage(response.page || currentPage + 1);
        setHasMore(response.hasMore || false);
        setTotalItems(response.totalItems || totalItems);
      }
    } catch (err) {
      console.error('Error loading more items:', err);
      setError('Failed to load more items');
    } finally {
      setLoading(false);
    }
  };

  // Use API items if available, otherwise show empty array (no fallback to sample data)
  const categoryItems = Array.isArray(apiItems) ? apiItems : [];

  // Helper function to format API item data for display
  const formatApiItem = (item) => {
    if (!item) return null;
    
    // Handle real API response format
    if (item._id || item.id) {
      console.log('🖼️ Formatting item:', item.title, 'Images:', item.images);
      
      const formattedItem = {
        id: item._id || item.id,
        title: item.title || 'No Title',
        price: item.price ? `Rs ${item.price.toLocaleString()}` : 'Price not available',
        location: item.neighborhoodId?.name && item.cityId?.name 
          ? `${item.neighborhoodId.name}, ${item.cityId.name}`
          : item.cityId?.name || item.regionId?.name || 'Location not available',
        image: item.images && item.images.length > 0 
          ? { uri: item.images[0].imageUrl }
          : require('../assets/images/honda-civic-2020.png'), // Fallback image
        time: item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Unknown date',
        condition: item.condition || 'Unknown',
        description: item.description || '',
        isFeatured: item.isFeatured || false,
        viewCount: item.viewCount || 0,
        available: item.available !== false,
        // Keep original data for reference
        originalData: item
      };
      
      console.log('🖼️ Formatted item image:', formattedItem.image);
      return formattedItem;
    }
    
    // Handle static/mock data format (fallback)
    return item;
  };

  // Helper function to convert time string to hours for sorting
  const getTimeInHours = (timeStr) => {
    if (timeStr.includes('hour')) {
      return parseInt(timeStr.match(/\d+/)[0]);
    } else if (timeStr.includes('day')) {
      return parseInt(timeStr.match(/\d+/)[0]) * 24;
    } else if (timeStr.includes('week')) {
      return parseInt(timeStr.match(/\d+/)[0]) * 168;
    } else if (timeStr.includes('month')) {
      return parseInt(timeStr.match(/\d+/)[0]) * 720;
    }
    return 999; // Default for unknown time formats
  };

  // Filter and sort items based on search query and active filter
  const filteredItems = useMemo(() => {
    // Ensure we have a valid array to work with
    let items = Array.isArray(categoryItems) ? categoryItems : [];
    
    // Format API items to consistent structure
    items = items.map(formatApiItem).filter(Boolean);
    
    // Apply search filter
    if (searchQuery.trim()) {
      items = items.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.price.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply sorting filter
    switch (activeFilter) {
      case 'Price: Low to High':
        items = [...items].sort((a, b) => {
          // For API data, use original price number
          if (a.originalData?.price && b.originalData?.price) {
            return a.originalData.price - b.originalData.price;
          }
          // For static data, parse formatted price
          const priceA = parseInt(a.price.replace(/[^\d]/g, ''));
          const priceB = parseInt(b.price.replace(/[^\d]/g, ''));
          return priceA - priceB;
        });
        break;
      case 'Price: High to Low':
        items = [...items].sort((a, b) => {
          // For API data, use original price number
          if (a.originalData?.price && b.originalData?.price) {
            return b.originalData.price - a.originalData.price;
          }
          // For static data, parse formatted price
          const priceA = parseInt(a.price.replace(/[^\d]/g, ''));
          const priceB = parseInt(b.price.replace(/[^\d]/g, ''));
          return priceB - priceA;
        });
        break;
      case 'Newest First':
        items = [...items].sort((a, b) => {
          // For API data, sort by creation date
          if (a.originalData?.createdAt && b.originalData?.createdAt) {
            return new Date(b.originalData.createdAt) - new Date(a.originalData.createdAt);
          }
          // For static data, use time string
          const timeA = getTimeInHours(a.time);
          const timeB = getTimeInHours(b.time);
          return timeA - timeB;
        });
        break;
      case 'Featured':
        items = items.filter(item => item.isFeatured);
        break;
      default: // 'All' - no sorting
        break;
    }
    
    return items;
  }, [categoryItems, searchQuery, activeFilter]);

  const handleItemPress = (item) => {
    // Navigate to detail screen with product ID
    const productId = item.originalData?._id || item.originalData?.id || item._id || item.id;
    console.log('🔍 CategoryListingScreen - Item pressed:');
    console.log('  - item:', item);
    console.log('  - item.originalData:', item.originalData);
    console.log('  - extracted productId:', productId);
    
    if (productId) {
      console.log('✅ Navigating to Detail with productId:', productId);
      navigation.navigate('Detail', { 
        productId: productId
      });
    } else {
      console.log('❌ No productId found');
      Alert.alert('Error', 'Product ID not found');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => {
            if (navigation.canGoBack()) {
              navigation.goBack();
            } else {
              navigation.navigate('Home');
            }
          }}
          activeOpacity={0.7}
        >
          <BackArrow />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>{category}</Text>
          {parentCategory && (
            <Text style={styles.headerSubtitle}>in {parentCategory}</Text>
          )}
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterIcon}>🔍</Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={[styles.searchBar, isSearchFocused && styles.searchBarFocused]}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder={`Search in ${parentCategory ? `${category} (${parentCategory})` : category}...`}
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={(text) => {
              setSearchQuery(text);
              // Clear previous timeout
              if (searchTimeout) {
                clearTimeout(searchTimeout);
              }
              // Set new timeout for debounced search
              const timeoutId = setTimeout(() => {
                handleSearch(text);
              }, 500);
              setSearchTimeout(timeoutId);
            }}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity 
              style={styles.clearButton}
              onPress={() => setSearchQuery('')}
            >
              <Text style={styles.clearButtonText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Filters */}
      <View style={styles.filtersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity 
            style={[styles.filterChip, activeFilter === 'All' && styles.activeFilterChip]}
            onPress={() => handleFilterChange('All')}
          >
            <Text style={[styles.filterChipText, activeFilter === 'All' && styles.activeFilterChipText]}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterChip, activeFilter === 'Featured' && styles.activeFilterChip]}
            onPress={() => handleFilterChange('Featured')}
          >
            <Text style={[styles.filterChipText, activeFilter === 'Featured' && styles.activeFilterChipText]}>Featured</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterChip, activeFilter === 'Price: Low to High' && styles.activeFilterChip]}
            onPress={() => handleFilterChange('Price: Low to High')}
          >
            <Text style={[styles.filterChipText, activeFilter === 'Price: Low to High' && styles.activeFilterChipText]}>Price: Low to High</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterChip, activeFilter === 'Price: High to Low' && styles.activeFilterChip]}
            onPress={() => handleFilterChange('Price: High to Low')}
          >
            <Text style={[styles.filterChipText, activeFilter === 'Price: High to Low' && styles.activeFilterChipText]}>Price: High to Low</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterChip, activeFilter === 'Newest First' && styles.activeFilterChip]}
            onPress={() => handleFilterChange('Newest First')}
          >
            <Text style={[styles.filterChipText, activeFilter === 'Newest First' && styles.activeFilterChipText]}>Newest First</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Items List */}
      {loading ? (
        <ScrollView style={styles.itemsList} showsVerticalScrollIndicator={false}>
          <SkeletonLoader delay={0} />
          <SkeletonLoader delay={100} />
          <SkeletonLoader delay={200} />
          <SkeletonLoader delay={300} />
          <SkeletonLoader delay={400} />
        </ScrollView>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={fetchItems}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView style={styles.itemsList} showsVerticalScrollIndicator={false}>
          {Array.isArray(filteredItems) && filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <TouchableOpacity 
                key={item.id} 
                style={styles.itemCard}
                onPress={() => handleItemPress(item)}
              >
                <View style={styles.itemImage}>
                  {typeof item.image === 'string' ? (
                    <Text style={styles.itemEmoji}>{item.image}</Text>
                  ) : item.image?.uri ? (
                    <Image 
                      source={{ uri: item.image.uri }} 
                      style={styles.itemImageTag} 
                      resizeMode="cover"
                    />
                  ) : (
                    <Image 
                      source={item.image} 
                      style={styles.itemImageTag} 
                      resizeMode="contain"
                    />
                  )}
                </View>
                <View style={styles.itemContent}>
                  <Text style={styles.itemTitle} numberOfLines={2}>
                    {item.title}
                  </Text>
                  <Text style={styles.itemPrice}>{item.price}</Text>
                  
                  {/* Show condition and view count for API data */}
                  {item.condition && item.condition !== 'Unknown' && (
                    <Text style={styles.itemCondition}>
                      {item.condition} • {item.viewCount} views
                    </Text>
                  )}
                  
                  <View style={styles.itemFooter}>
                    <Text style={styles.itemLocation} numberOfLines={1}>
                      📍 {item.location}
                    </Text>
                    <Text style={styles.itemTime}>{item.time}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.noResultsContainer}>
              <View style={styles.noResultsIcon}>
                <Text style={styles.noResultsEmoji}>🔍</Text>
              </View>
              <Text style={styles.noResultsText}>
                {searchQuery.trim() ? 'No items found for your search' : `No ${categoryName} found`}
              </Text>
              <Text style={styles.noResultsSubtext}>
                {searchQuery.trim() 
                  ? 'Try different keywords or browse all items'
                  : `No ${subcategoryName ? subcategoryName : categoryName} items available at the moment`
                }
              </Text>
              <View style={styles.noResultsActions}>
                {searchQuery.trim() && (
                  <TouchableOpacity 
                    style={styles.clearSearchButton}
                    onPress={() => setSearchQuery('')}
                  >
                    <Text style={styles.clearSearchButtonText}>Clear Search</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity 
                  style={styles.retryButton}
                  onPress={fetchItems}
                >
                  <Text style={styles.retryButtonText}>Refresh</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </ScrollView>
      )}


    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? 10 : 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 20,
    color: '#333',
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterIcon: {
    fontSize: 18,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 1,
    borderColor: '#e8e8e8',
  },
  searchBarFocused: {
    borderColor: '#4ecdc4',
    shadowColor: '#4ecdc4',
    shadowOpacity: 0.3,
  },
  searchIcon: {
    fontSize: 22,
    marginRight: 15,
    opacity: 0.7,
  },
  searchInput: {
    color: '#333',
    fontSize: 16,
    fontWeight: '400',
    flex: 1,
    marginLeft: 10,
  },
  clearButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  clearButtonText: {
    color: '#666',
    fontSize: 12,
    fontWeight: 'bold',
  },
  filtersContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  filterChip: {
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  filterChipText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  activeFilterChip: {
    backgroundColor: '#4ecdc4',
    borderColor: '#4ecdc4',
  },
  activeFilterChipText: {
    color: '#fff',
    fontWeight: '600',
  },
  itemsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  itemCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
    minHeight: 120,
    alignItems: 'stretch',
  },
  itemImage: {
    width: 120,
    height: 120,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    borderRightWidth: 1,
    borderRightColor: '#e9ecef',
  },
  itemEmoji: {
    fontSize: 40,
  },
  itemImageTag: {
    width: 120,
    height: 120,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  itemContent: {
    flex: 1,
    padding: 15,
    justifyContent: 'space-between',
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
    lineHeight: 20,
    flex: 1,
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2ecc71',
    marginBottom: 4,
  },
  itemCondition: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
    fontStyle: 'italic',
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 'auto',
  },
  itemLocation: {
    fontSize: 12,
    color: '#666',
    flex: 1,
    marginRight: 8,
  },
  itemTime: {
    fontSize: 11,
    color: '#999',
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 80,
    paddingHorizontal: 40,
  },
  noResultsIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#e9ecef',
  },
  noResultsEmoji: {
    fontSize: 32,
  },
  noResultsText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  noResultsSubtext: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
  },
  noResultsActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 10,
  },
  clearSearchButton: {
    backgroundColor: '#4ecdc4',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  clearSearchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  retryButton: {
    backgroundColor: '#6c757d',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  // Skeleton Loading Styles
  skeletonCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
    minHeight: 120,
    alignItems: 'stretch',
  },
  skeletonImage: {
    width: 120,
    height: 120,
    backgroundColor: '#e1e9ee',
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  skeletonContent: {
    flex: 1,
    padding: 15,
    justifyContent: 'space-between',
  },
  skeletonTitle: {
    height: 20,
    backgroundColor: '#e1e9ee',
    borderRadius: 4,
    marginBottom: 8,
    width: '80%',
  },
  skeletonPrice: {
    height: 18,
    backgroundColor: '#e1e9ee',
    borderRadius: 4,
    marginBottom: 8,
    width: '40%',
  },
  skeletonCondition: {
    height: 14,
    backgroundColor: '#e1e9ee',
    borderRadius: 4,
    marginBottom: 8,
    width: '60%',
  },
  skeletonFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 'auto',
  },
  skeletonLocation: {
    height: 12,
    backgroundColor: '#e1e9ee',
    borderRadius: 4,
    flex: 1,
    marginRight: 8,
  },
  skeletonTime: {
    height: 12,
    backgroundColor: '#e1e9ee',
    borderRadius: 4,
    width: 60,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    marginTop: 15,
    fontWeight: '500',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#e74c3c',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '500',
  },
  retryButton: {
    backgroundColor: '#4ecdc4',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CategoryListingScreen; 