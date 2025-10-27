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
import { categoryService } from '../services';
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

const BikesScreen = ({ navigation, route }) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [imageErrors, setImageErrors] = useState(new Set());

  const ITEMS_PER_PAGE = 5;

  // Fetch bikes from API
  useEffect(() => {
    fetchBikes(true);
  }, []);

  const fetchBikes = async (reset = false) => {
    if (reset) {
      setPage(1);
      setBikes([]);
      setHasMoreData(true);
      setLoading(true);
      setError(null);
    } else {
      setLoadingMore(true);
    }
    
    try {
      const currentPage = reset ? 1 : page;
      const response = await categoryService.getAllBikes({
        limit: ITEMS_PER_PAGE,
        featured: true,
        page: currentPage
      });
      
      let newBikes = [];
      if (response && Array.isArray(response)) {
        newBikes = response;
      } else if (response && response.data && Array.isArray(response.data)) {
        newBikes = response.data;
      } else if (response && response.items && Array.isArray(response.items)) {
        newBikes = response.items;
      }

      if (reset) {
        setBikes(newBikes);
      } else {
        setBikes(prevBikes => {
          // Filter out any items that already exist to prevent duplicates
          const existingIds = new Set(prevBikes.map(bike => bike._id || bike.id));
          const uniqueNewBikes = newBikes.filter(bike => !existingIds.has(bike._id || bike.id));
          return [...prevBikes, ...uniqueNewBikes];
        });
      }

      // Check if there's more data
      if (newBikes.length < ITEMS_PER_PAGE) {
        setHasMoreData(false);
      } else {
        setPage(currentPage + 1);
      }
    } catch (err) {
      console.error('Error fetching bikes:', err);
      setError('Failed to load bikes');
    } finally {
      setLoading(false);
      setLoadingMore(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchBikes(true);
  };

  const loadMore = () => {
    if (!loadingMore && hasMoreData) {
      fetchBikes(false);
    }
  };

  // Helper function to format API bike data for display (same as HomeScreen)
  const formatBikeData = (bike) => {
    if (!bike) return null;
    
    // Handle real API response format
    if (bike._id || bike.id) {
      // Determine the best image to use - following DetailScreen pattern exactly
      let imageSource = null;
      
      // Priority 1: API images array with imageUrl property (same logic as DetailScreen)
      if (bike.images && Array.isArray(bike.images) && bike.images.length > 0) {
        const firstImage = bike.images[0];
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
      if (!imageSource && bike.image) {
        if (typeof bike.image === 'string') {
          // Emoji or string
          imageSource = bike.image;
        } else if (bike.image.uri) {
          // URI object
          imageSource = bike.image;
        } else {
          // require() object
          imageSource = bike.image;
        }
      }
      
      // Priority 3: Fallback image (same as DetailScreen)
      if (!imageSource) {
        imageSource = { uri: 'https://via.placeholder.com/300x200?text=No+Image' };
      }
      
      const formattedBike = {
        id: bike._id || bike.id,
        title: bike.title || bike.name || bike.model || bike.brand || 'Unknown Bike',
        price: bike.price ? `Rs ${bike.price.toLocaleString()}` : 'Price not available',
        location: bike.neighborhoodId?.name && bike.cityId?.name 
          ? `${bike.neighborhoodId.name}, ${bike.cityId.name}`
          : bike.cityId?.name || bike.regionId?.name || bike.location || 'Location not available',
        image: imageSource,
        time: bike.createdAt ? new Date(bike.createdAt).toLocaleDateString() : 'Unknown date',
        condition: bike.condition || 'Unknown',
        description: bike.description || '',
        isFeatured: bike.isFeatured || false,
        viewCount: bike.viewCount || 0,
        available: bike.available !== false,
        category: 'Bikes',
        // Additional bike information
        year: bike.year || bike.modelYear,
        mileage: bike.mileage || bike.km,
        fuelType: bike.fuelType || bike.fuel,
        transmission: bike.transmission || bike.gear,
        brand: bike.brand || bike.make,
        model: bike.model || bike.modelName,
        sellerName: bike.sellerName || bike.seller,
        sellerPhone: bike.sellerPhone || bike.phone,
        // Keep original data for reference
        originalData: bike
      };
      
      return formattedBike;
    }
    
    // Handle static/mock data format (fallback)
    return bike;
  };

  // Filter bikes based on search query
  const filteredBikes = useMemo(() => {
    // Format API bikes to consistent structure
    const formattedBikes = bikes.map(formatBikeData).filter(Boolean);
    
    if (!searchQuery.trim()) {
      return formattedBikes;
    }

    return formattedBikes.filter(bike =>
      bike.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bike.brand?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bike.model?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bike.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [bikes, searchQuery]);

  const handleBikePress = (bike) => {
    if (navigation) {
      // Get product ID from formatted bike or original data
      const productId = bike.originalData?._id || bike.originalData?.id || bike._id || bike.id;
      if (productId) {
        navigation.navigate('Detail', { 
          productId: productId
        });
      } else {
        Alert.alert('Error', 'Product ID not found');
      }
    }
  };

  const renderBike = ({ item }) => (
    <TouchableOpacity 
      style={styles.bikeCard}
      onPress={() => handleBikePress(item)}
    >
      <View style={styles.bikeImage}>
        {typeof item.image === 'string' ? (
          <Text style={styles.bikeEmoji}>{item.image}</Text>
        ) : item.image?.uri ? (
          <Image 
            source={{ uri: item.image.uri }} 
            style={styles.bikeImageTag} 
            resizeMode="cover"
            onError={() => {
              setImageErrors(prev => new Set(prev).add(item.id));
            }}
          />
        ) : (
          <Image 
            source={item.image} 
            style={styles.bikeImageTag} 
            resizeMode="contain"
            onError={() => {
              setImageErrors(prev => new Set(prev).add(item.id));
            }}
          />
        )}
        {imageErrors.has(item.id) && (
          <View style={styles.imageErrorOverlay}>
            <Text style={styles.imageErrorText}>🏍️</Text>
          </View>
        )}
      </View>
      <View style={styles.bikeContent}>
        <Text style={styles.bikeTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.bikePrice}>{item.price}</Text>
        <View style={styles.bikeFooter}>
          <Text style={styles.bikeLocation} numberOfLines={1}>
            {item.location}
          </Text>
          <Text style={styles.bikeTime}>{item.time}</Text>
        </View>
        {item.year && (
          <Text style={styles.bikeDetails}>
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
        <Text style={styles.loadingFooterText}>Loading more bikes...</Text>
      </View>
    );
  };

  const renderEmpty = () => {
    if (loading) return null;
    
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>🏍️</Text>
        <Text style={styles.emptyText}>No bikes found</Text>
        <Text style={styles.emptySubtext}>
          {searchQuery.trim() ? 'Try adjusting your search terms' : 'No bikes available at the moment'}
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
        <Text style={styles.headerTitle}>Bikes</Text>
        <View style={styles.headerRight} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={[styles.searchBar, isSearchFocused && styles.searchBarFocused]}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search bikes..."
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
        {loading && bikes.length === 0 ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#4ecdc4" />
            <Text style={styles.loadingText}>Loading bikes...</Text>
          </View>
        ) : error && bikes.length === 0 ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity 
              style={styles.retryButton}
              onPress={() => fetchBikes(true)}
            >
              <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : (
            <FlatList
              data={filteredBikes}
              renderItem={renderBike}
              keyExtractor={(item, index) => `${item.id || item._id || index}-${index}`}
              numColumns={2}
              columnWrapperStyle={styles.bikeRow}
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
  bikeRow: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  bikeCard: {
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
  bikeImage: {
    width: '100%',
    height: 120,
    position: 'relative',
  },
  bikeImageTag: {
    width: '100%',
    height: '100%',
  },
  bikeEmoji: {
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
  bikeContent: {
    padding: 12,
  },
  bikeTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 4,
    lineHeight: 16,
  },
  bikePrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4ecdc4',
    marginBottom: 6,
  },
  bikeFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  bikeLocation: {
    fontSize: 10,
    color: '#7f8c8d',
    flex: 1,
    marginRight: 4,
  },
  bikeTime: {
    fontSize: 9,
    color: '#95a5a6',
    fontWeight: '500',
  },
  bikeDetails: {
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

export default BikesScreen;
