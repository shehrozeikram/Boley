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
import { itemsApi } from '../services/api';
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

const RecentlyViewedScreen = ({ navigation, route }) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [imageErrors, setImageErrors] = useState(new Set());

  const ITEMS_PER_PAGE = 5;

  // Fetch recently viewed items from API
  useEffect(() => {
    fetchRecentlyViewedItems(true);
  }, []);

  const fetchRecentlyViewedItems = async (reset = false) => {
    if (reset) {
      setPage(1);
      setRecentlyViewed([]);
      setHasMoreData(true);
      setLoading(true);
      setError(null);
    } else {
      setLoadingMore(true);
    }
    
    try {
      const currentPage = reset ? 1 : page;
      const response = await itemsApi.getRecentlyViewedItemsPaginated();
      
      let newItems = [];
      if (response && Array.isArray(response)) {
        newItems = response;
      } else if (response && response.data && Array.isArray(response.data)) {
        newItems = response.data;
      } else if (response && response.items && Array.isArray(response.items)) {
        newItems = response.items;
      }

      if (reset) {
        setRecentlyViewed(newItems);
      } else {
        setRecentlyViewed(prevItems => {
          // Filter out any items that already exist to prevent duplicates
          const existingIds = new Set(prevItems.map(item => item._id || item.id));
          const uniqueNewItems = newItems.filter(item => !existingIds.has(item._id || item.id));
          return [...prevItems, ...uniqueNewItems];
        });
      }

      // Check if there's more data
      if (newItems.length < ITEMS_PER_PAGE) {
        setHasMoreData(false);
      } else {
        setPage(currentPage + 1);
      }
    } catch (err) {
      console.error('Error fetching recently viewed items:', err);
      setError('Failed to load recently viewed items');
    } finally {
      setLoading(false);
      setLoadingMore(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchRecentlyViewedItems(true);
  };

  const loadMore = () => {
    if (!loadingMore && hasMoreData) {
      fetchRecentlyViewedItems(false);
    }
  };

  // Helper function to format API item data for display (same as CategoryListingScreen)
  const formatApiItem = (item) => {
    if (!item) return null;
    
    // Handle real API response format
    if (item._id || item.id) {
      // Determine the best image to use - following DetailScreen pattern exactly
      let imageSource = null;
      
      // Priority 1: API images array with imageUrl property (same logic as DetailScreen)
      if (item.images && Array.isArray(item.images) && item.images.length > 0) {
        const firstImage = item.images[0];
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
      if (!imageSource && item.image) {
        if (typeof item.image === 'string') {
          // Emoji or string
          imageSource = item.image;
        } else if (item.image.uri) {
          // URI object
          imageSource = item.image;
        } else {
          // require() object
          imageSource = item.image;
        }
      }
      
      // Priority 3: Fallback image (same as DetailScreen)
      if (!imageSource) {
        imageSource = { uri: 'https://via.placeholder.com/300x200?text=No+Image' };
      }
      
      const formattedItem = {
        id: item._id || item.id,
        title: item.title || 'No Title',
        price: item.price ? `Rs ${item.price.toLocaleString()}` : 'Price not available',
        location: item.neighborhoodId?.name && item.cityId?.name 
          ? `${item.neighborhoodId.name}, ${item.cityId.name}`
          : item.cityId?.name || item.regionId?.name || 'Location not available',
        image: imageSource,
        time: item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Unknown date',
        condition: item.condition || 'Unknown',
        description: item.description || '',
        isFeatured: item.isFeatured || false,
        viewCount: item.viewCount || 0,
        available: item.available !== false,
        category: item.subCategoryId?.name || 'Product',
        // Keep original data for reference
        originalData: item
      };
      
      return formattedItem;
    }
    
    // Handle static/mock data format (fallback)
    return item;
  };

  // Mock data for recently viewed items (fallback)
  const mockRecentlyViewed = [
    // Vehicles
    {
      id: '1',
      title: 'Honda Civic 2020',
      price: 'Rs 4,500,000',
      location: 'F-7 Markaz, Islamabad',
      image: require('../assets/images/honda-civic-2020.png'),
      category: 'Vehicles',
      time: '1 day ago'
    },
    {
      id: '2',
      title: 'Toyota Corolla 2019',
      price: 'Rs 3,800,000',
      location: 'DHA, Lahore',
      image: require('../assets/images/toyota-corolla-2019.png'),
      category: 'Vehicles',
      time: '3 days ago'
    },
    {
      id: '3',
      title: 'Suzuki Swift 2021',
      price: 'Rs 2,200,000',
      location: 'Gulberg, Lahore',
      image: require('../assets/images/suzuki-swift-2021.png'),
      category: 'Vehicles',
      time: '1 week ago'
    },
    // Electronics
    {
      id: '4',
      title: 'Samsung 55" Smart TV',
      price: 'Rs 180,000',
      location: 'Gulberg, Lahore',
      image: '📺',
      category: 'Electronics',
      time: '2 weeks ago'
    },
    {
      id: '5',
      title: 'Dell Laptop Inspiron 15',
      price: 'Rs 120,000',
      location: 'Blue Area, Islamabad',
      image: '💻',
      category: 'Electronics',
      time: '3 weeks ago'
    },
    {
      id: '6',
      title: 'Sony PlayStation 5',
      price: 'Rs 150,000',
      location: 'Defence, Karachi',
      image: '🎮',
      category: 'Electronics',
      time: '1 month ago'
    },
    // Bikes
    {
      id: '7',
      title: 'Honda CB150F 2023',
      price: 'Rs 450,000',
      location: 'F-7 Markaz, Islamabad',
      image: require('../assets/images/honda-CB150F.jpeg'),
      category: 'Bikes',
      time: '1 day ago'
    },
    {
      id: '8',
      title: 'Yamaha YBR125 2022',
      price: 'Rs 380,000',
      location: 'DHA, Lahore',
      image: '🏍️',
      category: 'Bikes',
      time: '3 days ago'
    },
    {
      id: '9',
      title: 'Suzuki GS150 2021',
      price: 'Rs 320,000',
      location: 'Gulberg, Lahore',
      image: require('../assets/images/suzuki-gs150.png'),
      category: 'Bikes',
      time: '1 week ago'
    },
    {
      id: '10',
      title: 'Kawasaki Ninja 300 2020',
      price: 'Rs 850,000',
      location: 'Blue Area, Islamabad',
      image: require('../assets/images/kawasaki-ninja-300.png'),
      category: 'Bikes',
      time: '2 weeks ago'
    }
  ];

  // Filter items based on search query
  const filteredItems = useMemo(() => {
    // Use API data if available, otherwise use mock data
    const itemsToFilter = recentlyViewed.length > 0 ? recentlyViewed : mockRecentlyViewed;
    
    // Format API items to consistent structure
    const formattedItems = itemsToFilter.map(formatApiItem).filter(Boolean);
    
    if (!searchQuery.trim()) {
      return formattedItems;
    }

    return formattedItems.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [recentlyViewed, searchQuery]);

  const handleItemPress = (item) => {
    if (navigation) {
      // Get product ID from formatted item or original data
      const productId = item.originalData?._id || item.originalData?.id || item._id || item.id;
      if (productId) {
        navigation.navigate('Detail', { 
          productId: productId
        });
      } else {
        Alert.alert('Error', 'Product ID not found');
      }
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
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
            onError={() => {
              setImageErrors(prev => new Set(prev).add(item.id));
            }}
          />
        ) : (
          <Image 
            source={item.image} 
            style={styles.itemImageTag} 
            resizeMode="contain"
            onError={() => {
              setImageErrors(prev => new Set(prev).add(item.id));
            }}
          />
        )}
        {imageErrors.has(item.id) && (
          <View style={styles.imageErrorOverlay}>
            <Text style={styles.imageErrorText}>📦</Text>
          </View>
        )}
      </View>
      <View style={styles.itemContent}>
        <Text style={styles.itemTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.itemPrice}>{item.price}</Text>
        <View style={styles.itemFooter}>
          <Text style={styles.itemLocation} numberOfLines={1}>
            📍 {item.location}
          </Text>
          <Text style={styles.itemTime}>{item.time}</Text>
        </View>
        <Text style={styles.itemCategory}>{item.category}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderFooter = () => {
    if (!loadingMore) return null;
    
    return (
      <View style={styles.loadingFooter}>
        <ActivityIndicator size="small" color="#4ecdc4" />
        <Text style={styles.loadingFooterText}>Loading more items...</Text>
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
        <Text style={styles.headerTitle}>Recently Viewed</Text>
        <View style={styles.headerRight} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={[styles.searchBar, isSearchFocused && styles.searchBarFocused]}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search in recently viewed..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            returnKeyType="search"
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

      {/* Results */}
      <View style={styles.content}>
        {loading && recentlyViewed.length === 0 ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#4ecdc4" />
            <Text style={styles.loadingText}>Loading recently viewed items...</Text>
          </View>
        ) : error && recentlyViewed.length === 0 ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity 
              style={styles.retryButton}
              onPress={() => fetchRecentlyViewedItems(true)}
            >
              <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : filteredItems.length > 0 ? (
          <>
            <View style={styles.resultsHeader}>
              <Text style={styles.resultsCount}>
                {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''} found
              </Text>
            </View>
            <FlatList
              data={filteredItems}
              renderItem={renderItem}
              keyExtractor={(item, index) => `${item.id || item._id || index}-${index}`}
              numColumns={2}
              columnWrapperStyle={styles.itemRow}
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
            />
          </>
        ) : (
          <View style={styles.noResultsContainer}>
            <Text style={styles.noResultsIcon}>🔍</Text>
            <Text style={styles.noResultsText}>No items found</Text>
            <Text style={styles.noResultsSubtext}>
              {searchQuery.trim() ? 'Try adjusting your search terms' : 'No recently viewed items available'}
            </Text>
          </View>
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
    fontSize: 24,
    color: '#333',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  headerRight: {
    width: 40,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
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
  searchBarFocused: {
    borderColor: '#4ecdc4',
    shadowColor: '#4ecdc4',
    shadowOpacity: 0.2,
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
  resultsHeader: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  resultsCount: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  itemRow: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  itemCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  itemImage: {
    height: 120,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  itemEmoji: {
    fontSize: 40,
  },
  itemImageTag: {
    width: '100%',
    height: '100%',
  },
  itemContent: {
    padding: 12,
  },
  itemTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 4,
    lineHeight: 16,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4ecdc4',
    marginBottom: 6,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  itemLocation: {
    fontSize: 10,
    color: '#7f8c8d',
    flex: 1,
    marginRight: 4,
  },
  itemTime: {
    fontSize: 9,
    color: '#95a5a6',
    fontWeight: '500',
  },
  itemCategory: {
    fontSize: 10,
    color: '#4ecdc4',
    fontWeight: '500',
  },
  noResultsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  noResultsIcon: {
    fontSize: 60,
    marginBottom: 20,
    opacity: 0.5,
  },
  noResultsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  noResultsSubtext: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
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
});

export default RecentlyViewedScreen; 