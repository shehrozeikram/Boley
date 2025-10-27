import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  useColorScheme,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  TextInput,
  PermissionsAndroid,
  Platform,
  ActivityIndicator,
  Image,
  Animated,
} from 'react-native';
import LocationPickerModal from '../modals/LocationPickerModal';
import HorizontalItemsSection from '../components/HorizontalItemsSection';
import { categoryService } from '../services';
import carsService from '../services/carsService';
import { useLoading } from '../contexts/LoadingContext';

// Skeleton Loading Components
const SkeletonCategoryItem = ({ delay = 0 }) => {
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
    <View style={styles.skeletonCategoryItem}>
      <Animated.View style={[styles.skeletonCategoryIcon, shimmerStyle]} />
      <Animated.View style={[styles.skeletonCategoryText, shimmerStyle]} />
    </View>
  );
};

const SkeletonSectionHeader = ({ delay = 0 }) => {
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
    <View style={styles.skeletonSectionHeader}>
      <Animated.View style={[styles.skeletonSectionTitle, shimmerStyle]} />
      <Animated.View style={[styles.skeletonSeeAllButton, shimmerStyle]} />
    </View>
  );
};

const SkeletonHorizontalItem = ({ delay = 0 }) => {
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
    <View style={styles.skeletonHorizontalItem}>
      <Animated.View style={[styles.skeletonItemImage, shimmerStyle]} />
      <View style={styles.skeletonItemContent}>
        <Animated.View style={[styles.skeletonItemTitle, shimmerStyle]} />
        <Animated.View style={[styles.skeletonItemPrice, shimmerStyle]} />
        <Animated.View style={[styles.skeletonItemLocation, shimmerStyle]} />
      </View>
    </View>
  );
};

const SkeletonSearchBar = ({ delay = 0 }) => {
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
    <View style={styles.skeletonSearchContainer}>
      <Animated.View style={[styles.skeletonSearchBar, shimmerStyle]} />
    </View>
  );
};

const SkeletonLocationSelector = ({ delay = 0 }) => {
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
    <View style={styles.skeletonLocationContainer}>
      <Animated.View style={[styles.skeletonLocationText, shimmerStyle]} />
    </View>
  );
};

const SkeletonPromoBanner = ({ delay = 0 }) => {
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
    <View style={styles.skeletonPromoBanner}>
      <View style={styles.skeletonPromoContent}>
        <View style={styles.skeletonPromoLeft}>
          <Animated.View style={[styles.skeletonPromoTitle, shimmerStyle]} />
          <Animated.View style={[styles.skeletonPromoSubtitle, shimmerStyle]} />
          <Animated.View style={[styles.skeletonPromoDescription, shimmerStyle]} />
        </View>
        <View style={styles.skeletonPromoRight}>
          <Animated.View style={[styles.skeletonPhoneMockup, shimmerStyle]} />
        </View>
      </View>
    </View>
  );
};

const HomeScreen = ({ navigation = null }) => {
  const isDarkMode = useColorScheme() === 'dark';
  const { setHomeLoading } = useLoading();
  const [selectedLocation, setSelectedLocation] = useState('Blue Area, Islamabad');
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [locationPermission, setLocationPermission] = useState(null);
  const [categories, setCategories] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fallback static data
  const staticCategories = [
    { _id: '1', name: 'Vehicles', icon: '🚗', slug: 'vehicles' },
    { _id: '2', name: 'Electronics', icon: '📱', slug: 'electronics' },
    { _id: '3', name: 'Bikes', icon: '🏍️', slug: 'bikes' },
  ];


  const staticRecentlyViewed = [
    {
      id: '1',
      title: 'Honda CB150F 2023',
      price: 'Rs 450,000',
      location: 'F-7 Markaz, Islamabad',
      image: require('../assets/images/honda-CB150F.jpeg'),
      category: 'Bikes',
      time: '1 day ago'
    },
    {
      id: '2',
      title: 'Samsung 55" Smart TV',
      price: 'Rs 180,000',
      location: 'Gulberg, Lahore',
      image: '📺',
      category: 'Electronics',
      time: '2 days ago'
    },
    {
      id: '3',
      title: 'Kawasaki Ninja 300',
      price: 'Rs 850,000',
      location: 'Blue Area, Islamabad',
      image: require('../assets/images/kawasaki-ninja-300.png'),
      category: 'Bikes',
      time: '3 days ago'
    },
    {
      id: '4',
      title: 'Dell Laptop Inspiron 15',
      price: 'Rs 120,000',
      location: 'Blue Area, Islamabad',
      image: '💻',
      category: 'Electronics',
      time: '1 week ago'
    }
  ];

  const staticVehicles = [
    {
      id: '1',
      title: 'Honda Civic 2020',
      price: 'Rs 4,500,000',
      location: 'F-7 Markaz, Islamabad',
      image: require('../assets/images/honda-civic-2020.png'),
      category: 'Vehicles',
      time: '2 hours ago'
    },
    {
      id: '2',
      title: 'Toyota Corolla 2019',
      price: 'Rs 3,800,000',
      location: 'DHA, Lahore',
      image: require('../assets/images/toyota-corolla-2019.png'),
      category: 'Vehicles',
      time: '5 hours ago'
    },
    {
      id: '3',
      title: 'Suzuki Swift 2021',
      price: 'Rs 2,200,000',
      location: 'Gulberg, Lahore',
      image: require('../assets/images/suzuki-swift-2021.png'),
      category: 'Vehicles',
      time: '1 day ago'
    },
    {
      id: '4',
      title: 'Honda City 2022',
      price: 'Rs 3,200,000',
      location: 'Blue Area, Islamabad',
      image: '🚗',
      category: 'Vehicles',
      time: '2 days ago'
    }
  ];

  const staticBikes = [
    {
      id: '1',
      title: 'Honda CB150F 2023',
      price: 'Rs 450,000',
      location: 'F-7 Markaz, Islamabad',
      image: require('../assets/images/honda-CB150F.jpeg'),
      category: 'Bikes',
      time: '1 hour ago'
    },
    {
      id: '2',
      title: 'Yamaha YBR125 2022',
      price: 'Rs 380,000',
      location: 'DHA, Lahore',
      image: require('../assets/images/yamahaybr125.png'),
      category: 'Bikes',
      time: '3 hours ago'
    },
    {
      id: '3',
      title: 'Suzuki GS150 2021',
      price: 'Rs 320,000',
      location: 'Gulberg, Lahore',
      image: require('../assets/images/suzuki-gs150.png'),
      category: 'Bikes',
      time: '6 hours ago'
    },
    {
      id: '4',
      title: 'Kawasaki Ninja 300',
      price: 'Rs 850,000',
      location: 'Blue Area, Islamabad',
      image: require('../assets/images/kawasaki-ninja-300.png'),
      category: 'Bikes',
      time: '1 day ago'
    },
    {
      id: '5',
      title: 'Honda 70cc 2023',
      price: 'Rs 180,000',
      location: 'F-8 Markaz, Islamabad',
      image: require('../assets/images/honda-70.png'),
      category: 'Bikes',
      time: '2 days ago'
    }
  ];

  // Request location permission and fetch data when component mounts
  useEffect(() => {
    requestLocationPermission();
    fetchData();
  }, []);

  // Fetch categories and featured items from API
  const fetchData = async () => {
    setLoading(true);
    setHomeLoading(true);
    setError(null);
    
    try {
      // Fetch categories from the specific API endpoint
      const categoriesResponse = await categoryService.getAllCategories();
      
      if (categoriesResponse && categoriesResponse.data && categoriesResponse.data.length > 0) {
        // Handle API response structure - assuming it returns { data: [...] }
        setCategories(categoriesResponse.data); // Show all categories from API
      } else if (categoriesResponse && Array.isArray(categoriesResponse) && categoriesResponse.length > 0) {
        // Handle direct array response
        setCategories(categoriesResponse); // Show all categories from API
      } else {
        // Use static data as fallback
        setCategories(staticCategories);
      }

      
      // Fetch recently viewed items from API
      try {
        const recentItemsResponse = await categoryService.getRecentItems(5);
        
        if (recentItemsResponse && Array.isArray(recentItemsResponse) && recentItemsResponse.length > 0) {
          // Format the API response data
          const formattedRecentItems = recentItemsResponse.map(item => formatRecentItemData(item));
          setRecentlyViewed(formattedRecentItems);
        } else {
          // Use static data as fallback
          setRecentlyViewed(staticRecentlyViewed);
        }
      } catch (recentError) {
        // Use static data as fallback
        setRecentlyViewed(staticRecentlyViewed);
      }
      
      // Fetch featured vehicles from API
      try {
        const vehiclesResponse = await categoryService.getAllVehicles({ limit: 5, featured: true });
        
        if (vehiclesResponse && Array.isArray(vehiclesResponse) && vehiclesResponse.length > 0) {
          // Format the API response data
          const formattedVehicles = vehiclesResponse.map(vehicle => formatVehicleData(vehicle));
          setVehicles(formattedVehicles);
        } else {
          // Use static data as fallback
          setVehicles(staticVehicles);
        }
      } catch (vehiclesError) {
        // Use static data as fallback
        setVehicles(staticVehicles);
      }
      
      // Fetch featured bikes from API
      try {
        const bikesResponse = await categoryService.getAllBikes({ limit: 5, featured: true });
        
        if (bikesResponse && Array.isArray(bikesResponse) && bikesResponse.length > 0) {
          // Format the API response data
          const formattedBikes = bikesResponse.map(bike => formatBikeData(bike));
          setBikes(formattedBikes);
        } else {
          // Use static data as fallback
          setBikes(staticBikes);
        }
      } catch (bikesError) {
        // Use static data as fallback
        setBikes(staticBikes);
      }
    } catch (err) {
      setError('Failed to load data');
      // Use static data as fallback
      setCategories(staticCategories);
      setRecentlyViewed(staticRecentlyViewed);
      setVehicles(staticVehicles);
      setBikes(staticBikes);
    } finally {
      setLoading(false);
      setHomeLoading(false);
    }
  };

  const requestLocationPermission = async () => {
    try {
      if (Platform.OS === 'ios') {
        // For iOS, show a custom alert first, then trigger system permission
        Alert.alert(
          'Location Access',
          'Boly needs access to your location to show relevant ads and services in your area. This helps you find items near you.',
          [
            { 
              text: 'Not Now', 
              style: 'cancel',
              onPress: () => {
                setLocationPermission('denied');
              }
            },
            { 
              text: 'Allow', 
              onPress: () => {
                // For iOS, we'll trigger the system permission when user taps location
                setLocationPermission('ios_ready');
                Alert.alert(
                  'Location Permission',
                  'Please tap the location button below to enable location access.',
                  [{ text: 'OK' }]
                );
              }
            }
          ]
        );
      } else {
        // For Android, request permission explicitly
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'Boly needs access to your location to show relevant ads and services in your area.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          setLocationPermission('granted');
        } else {
          setLocationPermission('denied');
        }
      }
    } catch (error) {
      setLocationPermission('error');
    }
  };

  // Helper function to format category data for display
  const formatCategoryData = (category) => {
    // Map category names to appropriate icons
    const getCategoryIcon = (name) => {
      const iconMap = {
        'Vehicles': '🚗',
        'Bikes': '🏍️',
        'Property for Sale': '🏠',
        'Property for Rent': '🔑',
        'Electronics & Home Appliances': '📱',
        'Mobiles': '📱',
        'Fashion & Beauty': '👗',
        'Furniture & Home Decor': '🪑',
        'Jobs': '💼',
        'Services': '🔧',
        'Animals': '🐕',
        'Books, Sports & Hobbies': '📚',
        'Business, Industrial & Agriculture': '🏭',
        'Kids': '🧸',
        'Electronics': '📱',
        'Property': '🏠',
        'Fashion': '👗',
        'Furniture': '🪑',
        'Books': '📚',
        'Business': '🏭',
      };
      return iconMap[name] || '📦';
    };

    return {
      id: category._id || category.id,
      name: category.name || category.title || category.categoryName || 'Category',
      icon: category.icon || category.emoji || getCategoryIcon(category.name || category.categoryName),
      slug: category.slug || (category.name || category.categoryName)?.toLowerCase().replace(/\s+/g, '-'),
    };
  };

  // Helper function to format car data for display
  const formatCarData = (car) => {
    return {
      id: car._id || car.id,
      title: car.title || car.name || car.model || 'Car',
      price: car.price ? `Rs ${car.price.toLocaleString()}` : 'Price on request',
      location: car.location || car.city || 'Location not specified',
      imageUrl: Array.isArray(car.images) && car.images.length > 0 ? car.images[0].imageUrl : null,
      image: car.image || '🚗', // Use the actual image from car data, fallback to emoji
      category: 'Vehicles',
      time: car.createdAt ? new Date(car.createdAt).toLocaleDateString() : 'Recently'
    };
  };

  // Format vehicle data from API
  const formatVehicleData = (vehicle) => {
    // Handle different image formats from API
    let imageSource = '🚗'; // Default fallback
    
    if (vehicle.image) {
      imageSource = vehicle.image;
    } else if (vehicle.imageUrl) {
      imageSource = vehicle.imageUrl;
    } else if (vehicle.images && Array.isArray(vehicle.images) && vehicle.images.length > 0) {
      // Handle array of images - take the first one
      const firstImage = vehicle.images[0];
      if (typeof firstImage === 'string') {
        imageSource = firstImage;
      } else if (firstImage.imageUrl) {
        imageSource = firstImage.imageUrl;
      } else if (firstImage.url) {
        imageSource = firstImage.url;
      }
    } else if (vehicle.photo) {
      imageSource = vehicle.photo;
    } else if (vehicle.thumbnail) {
      imageSource = vehicle.thumbnail;
    }

    return {
      id: vehicle._id || vehicle.id,
      title: vehicle.title || vehicle.name || vehicle.model || vehicle.brand || 'Unknown Vehicle',
      price: vehicle.price ? `Rs ${vehicle.price.toLocaleString()}` : 'Price not available',
      location: vehicle.location || vehicle.city || vehicle.address || vehicle.area || 'Location not specified',
      image: imageSource,
      imageUrl: typeof imageSource === 'string' && imageSource.startsWith('http') ? imageSource : null,
      category: 'Vehicles',
      time: vehicle.createdAt ? new Date(vehicle.createdAt).toLocaleDateString() : 'Recently',
      // Additional vehicle information
      year: vehicle.year || vehicle.modelYear,
      mileage: vehicle.mileage || vehicle.km,
      fuelType: vehicle.fuelType || vehicle.fuel,
      transmission: vehicle.transmission || vehicle.gear,
      condition: vehicle.condition || vehicle.status,
      brand: vehicle.brand || vehicle.make,
      model: vehicle.model || vehicle.modelName,
      description: vehicle.description || vehicle.details,
      sellerName: vehicle.sellerName || vehicle.seller,
      sellerPhone: vehicle.sellerPhone || vehicle.phone,
      // Original vehicle data for detail screen
      originalData: vehicle
    };
  };

  // Format bike data from API
  const formatBikeData = (bike) => {
    // Handle different image formats from API
    let imageSource = '🏍️'; // Default fallback
    
    if (bike.images && Array.isArray(bike.images) && bike.images.length > 0) {
      // Handle array of images - take the first one
      const firstImage = bike.images[0];
      if (firstImage.imageUrl) {
        imageSource = firstImage.imageUrl;
      } else if (firstImage.url) {
        imageSource = firstImage.url;
      } else if (typeof firstImage === 'string') {
        imageSource = firstImage;
      }
    } else if (bike.image) {
      imageSource = bike.image;
    } else if (bike.imageUrl) {
      imageSource = bike.imageUrl;
    } else if (bike.photo) {
      imageSource = bike.photo;
    } else if (bike.thumbnail) {
      imageSource = bike.thumbnail;
    }

    return {
      id: bike._id || bike.id,
      title: bike.title || bike.name || bike.model || bike.brand || 'Unknown Bike',
      price: bike.price ? `Rs ${bike.price.toLocaleString()}` : 'Price not available',
      location: bike.location || bike.city || bike.address || bike.area || 'Location not specified',
      image: imageSource,
      imageUrl: typeof imageSource === 'string' && imageSource.startsWith('http') ? imageSource : null,
      category: 'Bikes',
      time: bike.createdAt ? new Date(bike.createdAt).toLocaleDateString() : 'Recently',
      // Additional bike information
      year: bike.year || bike.modelYear,
      mileage: bike.mileage || bike.km,
      fuelType: bike.fuelType || bike.fuel,
      transmission: bike.transmission || bike.gear,
      condition: bike.condition || bike.status,
      brand: bike.brand || bike.make,
      model: bike.model || bike.modelName,
      description: bike.description || bike.details,
      sellerName: bike.sellerName || bike.seller,
      sellerPhone: bike.sellerPhone || bike.phone,
      // Original bike data for detail screen
      originalData: bike
    };
  };

  // Format recent items data from API
  const formatRecentItemData = (item) => {
    // Handle different image formats from API
    let imageSource = '📦'; // Default fallback
    
    if (item.images && Array.isArray(item.images) && item.images.length > 0) {
      // Handle array of images - take the first one
      const firstImage = item.images[0];
      if (firstImage.imageUrl) {
        imageSource = firstImage.imageUrl;
      } else if (firstImage.url) {
        imageSource = firstImage.url;
      } else if (typeof firstImage === 'string') {
        imageSource = firstImage;
      }
    } else if (item.image) {
      imageSource = item.image;
    } else if (item.imageUrl) {
      imageSource = item.imageUrl;
    } else if (item.photo) {
      imageSource = item.photo;
    } else if (item.thumbnail) {
      imageSource = item.thumbnail;
    }

    // Determine category based on item data
    let category = 'General';
    if (item.categoryId) {
      // Map category IDs to names (you might want to fetch this from categories API)
      const categoryMap = {
        '68510b6ffc1925fa040184b6': 'Vehicles',
        '68510b16fc1925fa040184ad': 'Bikes',
        '68510b7efc1925fa040184b9': 'Electronics',
        '68510b8ffc1925fa040184bc': 'Property',
        '68510b9ffc1925fa040184bf': 'Mobiles',
        '68510baffc1925fa040184c2': 'Fashion',
        '68510bbffc1925fa040184c5': 'Furniture',
        '68510bcffc1925fa040184c8': 'Jobs',
        '68510bdffc1925fa040184cb': 'Services',
        '68510beffc1925fa040184ce': 'Animals',
        '68510bfffc1925fa040184d1': 'Books',
        '68510c0ffc1925fa040184d4': 'Business',
        '68510c1ffc1925fa040184d7': 'Kids',
      };
      category = categoryMap[item.categoryId] || 'General';
    }

    // Format time
    let timeString = 'Recently';
    if (item.createdAt) {
      const createdDate = new Date(item.createdAt);
      const now = new Date();
      const diffTime = Math.abs(now - createdDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        timeString = '1 day ago';
      } else if (diffDays < 7) {
        timeString = `${diffDays} days ago`;
      } else if (diffDays < 30) {
        const weeks = Math.floor(diffDays / 7);
        timeString = weeks === 1 ? '1 week ago' : `${weeks} weeks ago`;
      } else {
        timeString = createdDate.toLocaleDateString();
      }
    }

    return {
      id: item._id || item.id,
      title: item.title || item.name || 'Item',
      price: item.price ? `Rs ${item.price.toLocaleString()}` : 'Price on request',
      location: 'Location not specified', // You might want to resolve this from regionId, cityId, neighborhoodId
      image: imageSource,
      imageUrl: typeof imageSource === 'string' && imageSource.startsWith('http') ? imageSource : null,
      category: category,
      time: timeString,
      // Additional item information
      condition: item.condition || 'Unknown',
      description: item.description || '',
      available: item.available !== false,
      process: item.process || 'Active',
      isFeatured: item.isFeatured || false,
      viewCount: item.viewCount || 0,
      itemNumber: item.itemNumber || '',
      slug: item.slug || '',
      // Original item data for detail screen
      originalData: item
    };
  };



  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />


      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
       

        {/* Search Bar */}
        {loading ? (
          <SkeletonSearchBar delay={0} />
        ) : (
          <TouchableOpacity 
            style={styles.searchContainer}
            onPress={() => {
              if (navigation) {
                navigation.navigate('Search');
              }
            }}
          >
            <View style={styles.searchBar}>
              <Text style={styles.searchIcon}>🔍</Text>
              <Text style={styles.searchPlaceholder}>Search for anything...</Text>
            </View>
          </TouchableOpacity>
        )}

        {/* Location Selector */}
        {loading ? (
          <SkeletonLocationSelector delay={100} />
        ) : (
          <TouchableOpacity 
            style={styles.locationContainer}
            onPress={() => {
              if (Platform.OS === 'ios' && locationPermission === 'ios_ready') {
                // For iOS, trigger location permission request by showing location modal
                setShowLocationModal(true);
                // After showing modal, update permission state
                setLocationPermission('ios_handled');
              } else {
                setShowLocationModal(true);
              }
            }}
          >
            <Text style={styles.locationIcon}>
              {locationPermission === 'granted' ? '📍' : '📍⚠️'}
            </Text>
            <Text style={styles.locationText}>{selectedLocation.split(', ')[0]}, </Text>
            <Text style={styles.locationTextBold}>{selectedLocation.split(', ')[1]}</Text>
            <Text style={styles.dropdownIcon}>▼</Text>
            {locationPermission !== 'granted' && locationPermission !== 'ios_ready' && (
              <Text style={styles.locationPermissionText}>
                {locationPermission === 'denied' ? ' (Permission needed)' : 
                 locationPermission === 'error' ? ' (Error)' : ''}
              </Text>
            )}
            {locationPermission === 'ios_ready' && (
              <Text style={styles.locationPermissionText}>
                (Tap to enable)
              </Text>
            )}
          </TouchableOpacity>
        )}

        {/* Promotional Banner */}
        {loading ? (
          <SkeletonPromoBanner delay={200} />
        ) : (
          <View style={styles.promoBanner}>
            <View style={styles.promoContent}>
              <View style={styles.promoLeft}>
                <Text style={styles.olxLogo}>boly.pk</Text>
                <Text style={styles.promoTitle}>READY TO SELL</Text>
                <Text style={styles.promoSubtitle}>6X FASTER?</Text>
                <Text style={styles.promoDescription}>Feature your ad today!</Text>
              </View>
              <View style={styles.promoRight}>
                <View style={styles.phoneMockup}>
                  <View style={styles.phoneHeader}>
                    <Text style={styles.featuredText}>FEATURED</Text>
                  </View>
                  <Text style={styles.carListing}>Honda Civic</Text>
                  <Text style={styles.carPrice}>Rs 9,800,000</Text>
                  <View style={styles.phoneActions}>
                    <Text style={styles.actionIcon}>📞</Text>
                    <Text style={styles.actionIcon}>💬</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Category Section */}
        <View style={styles.categorySection}>
          {loading ? (
            <View style={styles.categoriesContainer}>
              {/* First Row Skeleton */}
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoryScrollContainer}
              >
                <View style={styles.categoryRow}>
                  <SkeletonCategoryItem delay={0} />
                  <SkeletonCategoryItem delay={100} />
                  <SkeletonCategoryItem delay={200} />
                  <SkeletonCategoryItem delay={300} />
                </View>
              </ScrollView>

              {/* Second Row Skeleton */}
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoryScrollContainer}
              >
                <View style={styles.categoryRow}>
                  <SkeletonCategoryItem delay={400} />
                  <SkeletonCategoryItem delay={500} />
                  <SkeletonCategoryItem delay={600} />
                  <SkeletonCategoryItem delay={700} />
                </View>
              </ScrollView>
            </View>
          ) : error ? (
            <View style={styles.categoriesErrorContainer}>
              <Text style={styles.categoriesErrorText}>Failed to load categories</Text>
              <TouchableOpacity 
                style={styles.retryButton}
                onPress={fetchData}
              >
                <Text style={styles.retryButtonText}>Retry</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.categoriesContainer}>
              {/* First Row */}
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoryScrollContainer}
              >
                <View style={styles.categoryRow}>
                  {categories.slice(0, Math.ceil(categories.length / 2)).map((category, index) => {
                    const formattedCategory = formatCategoryData(category);
                    return (
                      <TouchableOpacity 
                        key={formattedCategory.id || index} 
                        style={styles.categoryItem}
                        onPress={() => {
                          if (navigation) {
                            // Navigate to SubcategoryScreen first (Categories → Subcategories)
                            navigation.navigate('Subcategory', { 
                              category: formattedCategory.name,
                              categoryData: category,
                              categoryId: category._id,
                              parentCategory: 'All Categories'
                            });
                          } else {
                            Alert.alert('Navigation Error', 'Navigation is not available');
                          }
                        }}
                      >
                        <View style={styles.categoryIcon}>
                          <Text style={styles.categoryEmoji}>{formattedCategory.icon}</Text>
                        </View>
                        <Text style={styles.categoryText}>{formattedCategory.name}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </ScrollView>

              {/* Second Row */}
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoryScrollContainer}
              >
                <View style={styles.categoryRow}>
                  {categories.slice(Math.ceil(categories.length / 2)).map((category, index) => {
                    const formattedCategory = formatCategoryData(category);
                    return (
                      <TouchableOpacity 
                        key={formattedCategory.id || (index + Math.ceil(categories.length / 2))} 
                        style={styles.categoryItem}
                        onPress={() => {
                          if (navigation) {
                            // Navigate to SubcategoryScreen first (Categories → Subcategories)
                            navigation.navigate('Subcategory', { 
                              category: formattedCategory.name,
                              categoryData: category,
                              categoryId: category._id,
                              parentCategory: 'All Categories'
                            });
                          } else {
                            Alert.alert('Navigation Error', 'Navigation is not available');
                          }
                        }}
                      >
                        <View style={styles.categoryIcon}>
                          <Text style={styles.categoryEmoji}>{formattedCategory.icon}</Text>
                        </View>
                        <Text style={styles.categoryText}>{formattedCategory.name}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </ScrollView>
            </View>
          )}
        </View>

        {/* Recently Viewed Section */}
        {loading ? (
          <View style={styles.horizontalSection}>
            <SkeletonSectionHeader delay={0} />
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalScrollContainer}
            >
              <SkeletonHorizontalItem delay={0} />
              <SkeletonHorizontalItem delay={100} />
              <SkeletonHorizontalItem delay={200} />
              <SkeletonHorizontalItem delay={300} />
            </ScrollView>
          </View>
        ) : (
          <HorizontalItemsSection
            title="Recently Viewed"
            items={recentlyViewed}
            loading={loading}
            error={error}
            onRetry={fetchData}
            formatItem={formatRecentItemData}
            onItemPress={(formattedItem, originalItem) => {
              if (navigation) {
                const productId = originalItem?._id || originalItem?.id || formattedItem.originalData?._id || formattedItem.originalData?.id || formattedItem._id || formattedItem.id;
                if (productId) {
                  navigation.navigate('Detail', { 
                    productId: productId
                  });
                } else {
                  Alert.alert('Error', 'Product ID not found');
                }
              } else {
                Alert.alert('Navigation Error', 'Navigation is not available');
              }
            }}
            onSeeAllPress={() => {
              if (navigation) {
                navigation.navigate('RecentlyViewed');
              }
            }}
          />
        )}


        {/* Vehicles Section */}
        {loading ? (
          <View style={styles.horizontalSection}>
            <SkeletonSectionHeader delay={500} />
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalScrollContainer}
            >
              <SkeletonHorizontalItem delay={800} />
              <SkeletonHorizontalItem delay={900} />
              <SkeletonHorizontalItem delay={1000} />
              <SkeletonHorizontalItem delay={1100} />
            </ScrollView>
          </View>
        ) : (
          <HorizontalItemsSection
            title="Cars"
            items={vehicles}
            loading={loading}
            error={error}
            onRetry={fetchData}
            formatItem={formatVehicleData}
            onItemPress={(formattedItem, originalItem) => {
              if (navigation) {
                const productId = originalItem?._id || originalItem?.id || formattedItem.originalData?._id || formattedItem.originalData?.id || formattedItem._id || formattedItem.id;
                if (productId) {
                  navigation.navigate('Detail', { 
                    productId: productId
                  });
                } else {
                  Alert.alert('Error', 'Product ID not found');
                }
              } else {
                Alert.alert('Navigation Error', 'Navigation is not available');
              }
            }}
            onSeeAllPress={() => {
              if (navigation) {
                navigation.navigate('Cars');
              }
            }}
          />
        )}

        {/* Bikes Section */}
        {loading ? (
          <View style={styles.horizontalSection}>
            <SkeletonSectionHeader delay={1000} />
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalScrollContainer}
            >
              <SkeletonHorizontalItem delay={1200} />
              <SkeletonHorizontalItem delay={1300} />
              <SkeletonHorizontalItem delay={1400} />
              <SkeletonHorizontalItem delay={1500} />
            </ScrollView>
          </View>
        ) : (
          <HorizontalItemsSection
            title="Bikes"
            items={bikes}
            loading={loading}
            error={error}
            onRetry={fetchData}
            formatItem={formatBikeData}
            onItemPress={(formattedItem, originalItem) => {
              if (navigation) {
                const productId = originalItem?._id || originalItem?.id || formattedItem.originalData?._id || formattedItem.originalData?.id || formattedItem._id || formattedItem.id;
                if (productId) {
                  navigation.navigate('Detail', { 
                    productId: productId
                  });
                } else {
                  Alert.alert('Error', 'Product ID not found');
                }
              } else {
                Alert.alert('Navigation Error', 'Navigation is not available');
              }
            }}
            onSeeAllPress={() => {
              if (navigation) {
                navigation.navigate('Bikes');
              }
            }}
          />
        )}
      </ScrollView>

      {/* Location Picker Modal */}
      <LocationPickerModal
        visible={showLocationModal}
        onClose={() => setShowLocationModal(false)}
        selectedLocation={selectedLocation}
        onLocationSelect={setSelectedLocation}
      />


    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? 15 : 10,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#f8f9fa',
  },
  timeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  topBarRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconText: {
    fontSize: 16,
  },
  networkText: {
    fontSize: 12,
    color: '#333',
  },
  batteryText: {
    fontSize: 12,
    color: '#333',
  },
  scrollView: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 20 : 30,
  },
  navButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    gap: 10,
  },
  navButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  olxButton: {
    backgroundColor: '#2ecc71',
  },
  olxText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  navIcon: {
    fontSize: 24,
    marginBottom: 5,
  },
  navButtonText: {
    fontSize: 12,
    color: '#333',
    fontWeight: '500',
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e8e8e8',
  },

  searchIcon: {
    fontSize: 18,
    marginRight: 12,
    opacity: 0.7,
  },
  searchPlaceholder: {
    color: '#999',
    fontSize: 14,
    fontWeight: '400',
    flex: 1,
  },

  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 8,
  },
  locationIcon: {
    fontSize: 16,
  },
  locationText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  locationTextBold: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
  },
  dropdownIcon: {
    fontSize: 12,
    color: '#666',
  },
  locationPermissionText: {
    fontSize: 10,
    color: '#ff6b6b',
    marginLeft: 5,
  },
  promoBanner: {
    backgroundColor: '#ff6b35',
    marginHorizontal: 20,
    marginVertical: 15,
    borderRadius: 12,
    overflow: 'hidden',
  },
  promoContent: {
    flexDirection: 'row',
    padding: 20,
  },
  promoLeft: {
    flex: 1,
  },
  olxLogo: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  promoTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  promoSubtitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  promoDescription: {
    color: '#fff',
    fontSize: 14,
  },
  promoRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  phoneMockup: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    width: 120,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  phoneHeader: {
    backgroundColor: '#4ecdc4',
    borderRadius: 4,
    paddingVertical: 2,
    paddingHorizontal: 6,
    marginBottom: 8,
  },
  featuredText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  carListing: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  carPrice: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  phoneActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionIcon: {
    fontSize: 16,
  },
  categorySection: {
    paddingVertical: 15,
  },
  categoriesContainer: {
    paddingVertical: 10,
  },
  categoryScrollContainer: {
    paddingHorizontal: 20,
  },
  categoryRow: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  categoryItem: {
    width: 80,
    alignItems: 'center',
    marginRight: 15,
  },
  categoryIcon: {
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryEmoji: {
    fontSize: 24,
  },
  categoryText: {
    fontSize: 10,
    color: '#333',
    textAlign: 'center',
    fontWeight: '500',
    marginTop: 5,
    lineHeight: 12,
    width: 80,
  },
  summerBanner: {
    backgroundColor: '#667eea',
    marginHorizontal: 20,
    marginVertical: 15,
    borderRadius: 12,
    padding: 20,
  },
  summerContent: {
    alignItems: 'center',
  },
  summerTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  summerSubtitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  summerOffer: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  sellButtonText: {
    fontSize: 10,
    color: '#4ecdc4',
    marginTop: 2,
    fontWeight: '600',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
  },

  // Category Loading, Error, and Empty States
  categoriesLoadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    width: '100%',
  },
  categoriesLoadingText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#7f8c8d',
  },
  categoriesErrorContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    width: '100%',
  },
  categoriesErrorText: {
    fontSize: 14,
    color: '#e74c3c',
    textAlign: 'center',
    marginBottom: 10,
  },
  categoriesEmptyContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    width: '100%',
  },
  categoriesEmptyText: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
  },

  // Skeleton Loading Styles
  skeletonCategoryItem: {
    width: 80,
    alignItems: 'center',
    marginRight: 15,
  },
  skeletonCategoryIcon: {
    width: 50,
    height: 50,
    backgroundColor: '#e1e9ee',
    borderRadius: 25,
    marginBottom: 8,
  },
  skeletonCategoryText: {
    height: 12,
    backgroundColor: '#e1e9ee',
    borderRadius: 4,
    width: 60,
  },
  skeletonSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  skeletonSectionTitle: {
    height: 20,
    backgroundColor: '#e1e9ee',
    borderRadius: 4,
    width: 120,
  },
  skeletonSeeAllButton: {
    height: 28,
    width: 80,
    backgroundColor: '#e1e9ee',
    borderRadius: 15,
  },
  skeletonHorizontalItem: {
    width: 200,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginRight: 15,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  skeletonItemImage: {
    width: '100%',
    height: 140,
    backgroundColor: '#e1e9ee',
  },
  skeletonItemContent: {
    padding: 12,
  },
  skeletonItemTitle: {
    height: 16,
    backgroundColor: '#e1e9ee',
    borderRadius: 4,
    marginBottom: 8,
    width: '80%',
  },
  skeletonItemPrice: {
    height: 14,
    backgroundColor: '#e1e9ee',
    borderRadius: 4,
    marginBottom: 6,
    width: '60%',
  },
  skeletonItemLocation: {
    height: 12,
    backgroundColor: '#e1e9ee',
    borderRadius: 4,
    width: '70%',
  },

  // Horizontal Section Styles
  horizontalSection: {
    marginVertical: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAllButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    backgroundColor: '#f8f9fa',
  },
  seeAllText: {
    fontSize: 14,
    color: '#4ecdc4',
    fontWeight: '600',
  },
  horizontalScrollContainer: {
    paddingHorizontal: 20,
  },

  // Upper Portion Skeleton Styles
  skeletonSearchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  skeletonSearchBar: {
    height: 50,
    backgroundColor: '#e1e9ee',
    borderRadius: 25,
  },
  skeletonLocationContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  skeletonLocationText: {
    height: 20,
    backgroundColor: '#e1e9ee',
    borderRadius: 4,
    width: '60%',
  },
  skeletonPromoBanner: {
    backgroundColor: '#e1e9ee',
    marginHorizontal: 20,
    marginVertical: 15,
    borderRadius: 12,
    overflow: 'hidden',
  },
  skeletonPromoContent: {
    flexDirection: 'row',
    padding: 20,
  },
  skeletonPromoLeft: {
    flex: 1,
  },
  skeletonPromoTitle: {
    height: 20,
    backgroundColor: '#d1d9e0',
    borderRadius: 4,
    marginBottom: 8,
    width: '70%',
  },
  skeletonPromoSubtitle: {
    height: 24,
    backgroundColor: '#d1d9e0',
    borderRadius: 4,
    marginBottom: 8,
    width: '50%',
  },
  skeletonPromoDescription: {
    height: 16,
    backgroundColor: '#d1d9e0',
    borderRadius: 4,
    width: '60%',
  },
  skeletonPromoRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  skeletonPhoneMockup: {
    width: 120,
    height: 80,
    backgroundColor: '#d1d9e0',
    borderRadius: 8,
  },

});

export default HomeScreen; 