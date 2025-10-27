import React, { useState, useMemo, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  useColorScheme,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  FlatList,
  Image,
  Platform,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from 'react-native';
import { carsService } from '../services';
import { API_BASE_URL } from '../config/api';

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

const CarsScreen = ({ navigation, route }) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [imageErrors, setImageErrors] = useState(new Set());

  const ITEMS_PER_PAGE = 5;

  // Fetch cars from API
  useEffect(() => {
    fetchCars(true);
  }, []);

  const fetchCars = async (reset = false) => {
    if (reset) {
      setPage(1);
      setCars([]);
      setHasMoreData(true);
      setLoading(true);
      setError(null);
    } else {
      setLoadingMore(true);
    }
    
    try {
      const currentPage = reset ? 1 : page;
      const response = await carsService.getAllVehicles({
        limit: ITEMS_PER_PAGE,
        featured: true,
        page: currentPage
      });
      
      let newCars = [];
      if (response && Array.isArray(response)) {
        newCars = response;
      } else if (response && response.data && Array.isArray(response.data)) {
        newCars = response.data;
      } else if (response && response.items && Array.isArray(response.items)) {
        newCars = response.items;
      }

      if (reset) {
        setCars(newCars);
      } else {
        setCars(prevCars => {
          // Filter out any items that already exist to prevent duplicates
          const existingIds = new Set(prevCars.map(car => car._id || car.id));
          const uniqueNewCars = newCars.filter(car => !existingIds.has(car._id || car.id));
          return [...prevCars, ...uniqueNewCars];
        });
      }

      // Check if there's more data
      if (newCars.length < ITEMS_PER_PAGE) {
        setHasMoreData(false);
      } else {
        setPage(currentPage + 1);
      }
    } catch (err) {
      console.error('Error fetching cars:', err);
      setError('Failed to load cars');
    } finally {
      setLoading(false);
      setLoadingMore(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchCars(true);
  };

  const loadMore = () => {
    if (!loadingMore && hasMoreData) {
      fetchCars(false);
    }
  };

  // Helper function to format API car data for display (same as HomeScreen)
  const formatCarData = (car) => {
    if (!car) return null;
    
    // Handle real API response format
    if (car._id || car.id) {
      // Determine the best image to use - following DetailScreen pattern exactly
      let imageSource = null;
      
      // Priority 1: API images array with imageUrl property (same logic as DetailScreen)
      if (car.images && Array.isArray(car.images) && car.images.length > 0) {
        const firstImage = car.images[0];
        if (firstImage && firstImage.imageUrl) {
          // Use the same logic as DetailScreen - accept all imageUrl values
          let imageUrl = firstImage.imageUrl;
          
          // Check if it's a relative path and convert to full URL
          if (!imageUrl.startsWith('http') && !imageUrl.startsWith('https')) {
            // Convert relative path to full URL using the API base URL
            imageUrl = `${API_BASE_URL}:8080/uploads/${imageUrl}`;
          }
          
          imageSource = { uri: imageUrl };
        }
      }
      
      // Priority 2: Direct image property (for static data)
      if (!imageSource && car.image) {
        if (typeof car.image === 'string') {
          // Emoji or string
          imageSource = car.image;
        } else if (car.image.uri) {
          // URI object
          imageSource = car.image;
        } else {
          // require() object
          imageSource = car.image;
        }
      }
      
      // Priority 3: Fallback image (same as DetailScreen)
      if (!imageSource) {
        imageSource = { uri: 'https://via.placeholder.com/300x200?text=No+Image' };
      }
      
      const formattedCar = {
        id: car._id || car.id,
        title: car.title || car.name || car.model || car.brand || 'Unknown Car',
        price: car.price ? `Rs ${car.price.toLocaleString()}` : 'Price not available',
        location: car.neighborhoodId?.name && car.cityId?.name 
          ? `${car.neighborhoodId.name}, ${car.cityId.name}`
          : car.cityId?.name || car.regionId?.name || car.location || 'Location not available',
        image: imageSource,
        time: car.createdAt ? new Date(car.createdAt).toLocaleDateString() : 'Unknown date',
        condition: car.condition || 'Unknown',
        description: car.description || '',
        isFeatured: car.isFeatured || false,
        viewCount: car.viewCount || 0,
        available: car.available !== false,
        category: 'Vehicles',
        // Additional car information
        year: car.year || car.modelYear,
        mileage: car.mileage || car.km,
        fuelType: car.fuelType || car.fuel,
        transmission: car.transmission || car.gear,
        brand: car.brand || car.make,
        model: car.model || car.modelName,
        sellerName: car.sellerName || car.seller,
        sellerPhone: car.sellerPhone || car.phone,
        // Keep original data for reference
        originalData: car
      };
      
      return formattedCar;
    }
    
    // Handle static/mock data format (fallback)
    return car;
  };

  // Filter cars based on search query
  const filteredCars = useMemo(() => {
    // Format API cars to consistent structure
    const formattedCars = cars.map(formatCarData).filter(Boolean);
    
    if (!searchQuery.trim()) {
      return formattedCars;
    }

    return formattedCars.filter(car =>
      car.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.brand?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.model?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [cars, searchQuery]);

  const handleCarPress = (car) => {
    if (navigation) {
      // Get product ID from formatted car or original data
      const productId = car.originalData?._id || car.originalData?.id || car._id || car.id;
      if (productId) {
        navigation.navigate('Detail', { 
          productId: productId
        });
      } else {
        Alert.alert('Error', 'Product ID not found');
      }
    }
  };

  const renderCar = ({ item }) => (
    <TouchableOpacity 
      style={styles.carCard}
      onPress={() => handleCarPress(item)}
    >
      <View style={styles.carImage}>
        {typeof item.image === 'string' ? (
          <Text style={styles.carEmoji}>{item.image}</Text>
        ) : item.image?.uri ? (
          <Image 
            source={{ uri: item.image.uri }} 
            style={styles.carImageTag} 
            resizeMode="cover"
            onError={() => {
              setImageErrors(prev => new Set(prev).add(item.id));
            }}
          />
        ) : (
          <Image 
            source={item.image} 
            style={styles.carImageTag} 
            resizeMode="contain"
            onError={() => {
              setImageErrors(prev => new Set(prev).add(item.id));
            }}
          />
        )}
        {imageErrors.has(item.id) && (
          <View style={styles.imageErrorOverlay}>
            <Text style={styles.imageErrorText}>🚗</Text>
          </View>
        )}
      </View>
      <View style={styles.carContent}>
        <Text style={styles.carTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.carPrice}>{item.price}</Text>
        <View style={styles.carFooter}>
          <Text style={styles.carLocation} numberOfLines={1}>
            {item.location}
          </Text>
          <Text style={styles.carTime}>{item.time}</Text>
        </View>
        {item.year && (
          <Text style={styles.carDetails}>
            {item.year} • {item.fuelType || 'N/A'} • {item.transmission || 'N/A'}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );

  const renderFooter = () => {
    if (!loadingMore) return null;
    
    return (
      <View style={styles.loadingFooter}>
        <ActivityIndicator size="small" color="#4ecdc4" />
        <Text style={styles.loadingFooterText}>Loading more cars...</Text>
      </View>
    );
  };

  const renderEmpty = () => {
    if (loading) return null;
    
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>🚗</Text>
        <Text style={styles.emptyText}>No cars found</Text>
        <Text style={styles.emptySubtext}>
          {searchQuery.trim() ? 'Try adjusting your search terms' : 'No cars available at the moment'}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />

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
        <Text style={styles.headerTitle}>Cars</Text>
        <View style={styles.headerRight} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={[styles.searchBar, isSearchFocused && styles.searchBarFocused]}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search cars..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
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

      {/* Content */}
      <View style={styles.content}>
        {loading && cars.length === 0 ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#4ecdc4" />
            <Text style={styles.loadingText}>Loading cars...</Text>
          </View>
        ) : error && cars.length === 0 ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity 
              style={styles.retryButton}
              onPress={() => fetchCars(true)}
            >
              <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : (
            <FlatList
              data={filteredCars}
              renderItem={renderCar}
              keyExtractor={(item, index) => `${item.id || item._id || index}-${index}`}
              numColumns={2}
              columnWrapperStyle={styles.carRow}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContainer}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  colors={['#4ecdc4']}
                  tintColor="#4ecdc4"
                />
              }
              onEndReached={loadMore}
              onEndReachedThreshold={0.5}
              ListFooterComponent={renderFooter}
              ListEmptyComponent={renderEmpty}
            />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingTop: Platform.OS === 'android' ? 10 : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e8',
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    fontSize: 20,
    color: '#333',
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  headerRight: {
    width: 36, // Same width as back button for centering
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#e8e8e8',
  },
  searchBarFocused: {
    borderColor: '#4ecdc4',
    backgroundColor: '#fff',
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 12,
    opacity: 0.7,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  clearButton: {
    padding: 4,
  },
  clearButtonText: {
    fontSize: 16,
    color: '#999',
  },
  content: {
    flex: 1,
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
  listContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  carRow: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  carCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  carImage: {
    width: '100%',
    height: 120,
    position: 'relative',
  },
  carImageTag: {
    width: '100%',
    height: '100%',
  },
  carEmoji: {
    fontSize: 40,
    textAlign: 'center',
    lineHeight: 120,
  },
  imageErrorOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageErrorText: {
    fontSize: 30,
    opacity: 0.5,
  },
  carContent: {
    padding: 12,
  },
  carTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 4,
    lineHeight: 16,
  },
  carPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4ecdc4',
    marginBottom: 6,
  },
  carFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  carLocation: {
    fontSize: 10,
    color: '#7f8c8d',
    flex: 1,
    marginRight: 4,
  },
  carTime: {
    fontSize: 9,
    color: '#95a5a6',
    fontWeight: '500',
  },
  carDetails: {
    fontSize: 10,
    color: '#95a5a6',
    marginTop: 2,
  },
  loadingFooter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  loadingFooterText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingVertical: 50,
  },
  emptyIcon: {
    fontSize: 60,
    marginBottom: 20,
    opacity: 0.5,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default CarsScreen;
