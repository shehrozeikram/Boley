import React, { useState, useMemo, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
  Image,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { categoryService } from '../services';
import { usePopularItems } from '../hooks/usePopularItems';

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

const SearchScreen = ({ route, navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(true);
  const [apiItems, setApiItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Fetch popular items from different categories
  const { popularItems, loading: popularItemsLoading, error: popularItemsError } = usePopularItems(1, 5);

  // Mock data for search results across all categories
  const allItems = [
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
      time: '1 week ago'
    },
    {
      id: '5',
      title: 'Dell Laptop Inspiron 15',
      price: 'Rs 120,000',
      location: 'Blue Area, Islamabad',
      image: '💻',
      category: 'Electronics',
      time: '2 weeks ago'
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
    }
  ];

  // Search items from API when search query changes
  useEffect(() => {
    if (searchQuery.trim().length > 2) {
      searchItems();
    } else {
      setApiItems([]);
    }
  }, [searchQuery]);

  // Helper function to extract item data consistently
  const getItemData = (item) => ({
    id: item._id || item.id,
    title: item.title || item.name || item.model || item.brand || 'Untitled',
    price: item.price || item.askingPrice || 'Price not available',
    location: item.location || item.city || 'Location not specified',
    category: item.category || item.categoryName || 'Uncategorized',
    time: item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Recently',
    image: item.images?.[0] || item.image || '📦'
  });

  // Search items from API
  const searchItems = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await categoryService.searchCategories(searchQuery);
      
      // Handle different response structures
      let items = [];
      if (Array.isArray(response)) {
        items = response;
      } else if (response && response.data && Array.isArray(response.data)) {
        items = response.data;
      } else if (response && response.items && Array.isArray(response.items)) {
        items = response.items;
      }
      
      setApiItems(items);
    } catch (err) {
      setError('Failed to search items');
      setApiItems([]);
    } finally {
      setLoading(false);
    }
  };

  // Filter items based on search query
  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    // Use API results if available, otherwise use static data
    const itemsToSearch = (Array.isArray(apiItems) && apiItems.length > 0) ? apiItems : allItems;
    
    // Ensure itemsToSearch is an array before filtering
    if (!Array.isArray(itemsToSearch)) {
      return [];
    }
    
    return itemsToSearch.filter(item => {
      if (!item || typeof item !== 'object') return false;
      
      const itemData = getItemData(item);
      const query = searchQuery.toLowerCase();
      
      return (
        itemData.title.toLowerCase().includes(query) ||
        itemData.category.toLowerCase().includes(query) ||
        itemData.location.toLowerCase().includes(query)
      );
    });
  }, [searchQuery, apiItems, allItems]);

  // Navigation handlers
  const handleItemPress = (item) => {
    const productId = item._id || item.id;
    
    if (productId) {
      navigation.navigate('Detail', { productId });
    } else {
      Alert.alert('Error', 'Product ID not found');
    }
  };

  const handleCategoryPress = (category) => {
    navigation.navigate('CategoryListing', { category });
  };

  const handlePopularSearchPress = (searchItem) => {
    if (searchItem && typeof searchItem === 'object') {
      if (searchItem.item) {
        // Navigate to detail screen with the actual item data
        handleItemPress(searchItem.item);
      } else {
        // Fallback: just set search query if no item data available
        setSearchQuery(searchItem.title.trim());
      }
    } else if (typeof searchItem === 'string') {
      // Handle legacy string format
      setSearchQuery(searchItem.trim());
    }
  };

  // Generate search suggestions from popular items
  const popularSearchItems = useMemo(() => {
    if (!Array.isArray(popularItems) || popularItems.length === 0) {
      // Fallback suggestions if no popular items are loaded
      return [
        { title: 'Honda Civic', item: null },
        { title: 'Toyota Corolla', item: null },
        { title: 'Samsung TV', item: null },
        { title: 'Dell Laptop', item: null },
        { title: 'Honda CB150F', item: null }
      ];
    }
    
    return popularItems.map(item => {
      if (!item || typeof item !== 'object') {
        return null;
      }
      
      const itemData = getItemData(item);
      return {
        title: itemData.title,
        item: item
      };
    }).filter(item => item && item.title !== 'Untitled').slice(0, 5);
  }, [popularItems]);

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
        <Text style={styles.headerTitle}>Search</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={[styles.searchBar, isSearchFocused && styles.searchBarFocused]}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search for anything..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            autoCapitalize="none"
            autoCorrect={false}
            autoFocus={true}
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

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {searchQuery.length === 0 ? (
          // Show popular searches when no query
          <View style={styles.popularSection}>
            <Text style={styles.sectionTitle}>Popular Searches</Text>
            {popularItemsLoading ? (
              <View style={styles.popularLoadingContainer}>
                <ActivityIndicator size="small" color="#4ecdc4" />
                <Text style={styles.popularLoadingText}>Loading popular items...</Text>
              </View>
            ) : popularItemsError ? (
              <View style={styles.popularErrorContainer}>
                <Text style={styles.popularErrorText}>Failed to load popular items</Text>
              </View>
            ) : (
              <View style={styles.popularGrid}>
                {Array.isArray(popularSearchItems) && popularSearchItems.map((searchItem, index) => (
                  <TouchableOpacity 
                    key={`${searchItem.title}-${index}`}
                    style={styles.popularChip}
                    onPress={() => handlePopularSearchPress(searchItem)}
                  >
                    <Text style={styles.popularChipText}>{searchItem.title}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
            
            <Text style={styles.sectionTitle}>Browse Categories</Text>
            <View style={styles.categoriesGrid}>
              {[
                { name: 'Vehicles', icon: '🚗', key: 'vehicles' },
                { name: 'Electronics', icon: '📱', key: 'electronics' },
                { name: 'Bikes', icon: '🏍️', key: 'bikes' },
                { name: 'Property', icon: '🏠', key: 'property' }
              ].map((category, index) => (
                <TouchableOpacity 
                  key={category.key}
                  style={styles.categoryCard}
                  onPress={() => handleCategoryPress(category.name)}
                >
                  <Text style={styles.categoryIcon}>{category.icon}</Text>
                  <Text style={styles.categoryName}>{category.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ) : loading ? (
          // Show loading state
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#4ecdc4" />
            <Text style={styles.loadingText}>Searching...</Text>
          </View>
        ) : error ? (
          // Show error state
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity 
              style={styles.retryButton}
              onPress={searchItems}
            >
              <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : filteredItems.length > 0 ? (
          // Show search results
          <View style={styles.resultsSection}>
            <Text style={styles.resultsCount}>
              {filteredItems.length} result{filteredItems.length !== 1 ? 's' : ''} for "{searchQuery}"
            </Text>
            {filteredItems.map((item) => {
              const itemData = getItemData(item);
              return (
                <TouchableOpacity 
                  key={itemData.id} 
                  style={styles.itemCard}
                  onPress={() => handleItemPress(item)}
                >
                  <View style={styles.itemImage}>
                    {typeof itemData.image === 'string' ? (
                      <Text style={styles.itemEmoji}>{itemData.image}</Text>
                    ) : (
                      <Image 
                        source={itemData.image} 
                        style={styles.itemImageTag} 
                        resizeMode="contain"
                      />
                    )}
                  </View>
                  <View style={styles.itemContent}>
                    <Text style={styles.itemTitle} numberOfLines={2}>
                      {itemData.title}
                    </Text>
                    <Text style={styles.itemPrice}>{itemData.price}</Text>
                    <View style={styles.itemFooter}>
                      <Text style={styles.itemCategory}>{itemData.category}</Text>
                      <Text style={styles.itemLocation} numberOfLines={1}>
                        📍 {itemData.location}
                      </Text>
                      <Text style={styles.itemTime}>{itemData.time}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        ) : (
          // No results found
          <View style={styles.noResultsContainer}>
            <Text style={styles.noResultsText}>No results found for "{searchQuery}"</Text>
            <Text style={styles.noResultsSubtext}>Try different keywords or browse categories</Text>
          </View>
        )}
      </ScrollView>
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
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  placeholder: {
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
  content: {
    flex: 1,
  },
  popularSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  popularGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 30,
  },
  popularChip: {
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  popularChipText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    aspectRatio: 1,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  categoryIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  resultsSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  resultsCount: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  itemCard: {
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
  },
  itemImage: {
    width: 100,
    height: 100,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemEmoji: {
    fontSize: 40,
  },
  itemImageTag: {
    width: 100,
    height: 100,
  },
  itemContent: {
    flex: 1,
    padding: 15,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    lineHeight: 20,
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2ecc71',
    marginBottom: 8,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  itemCategory: {
    fontSize: 12,
    color: '#4ecdc4',
    fontWeight: '600',
    backgroundColor: '#f0f9f8',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
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
    paddingVertical: 50,
  },
  noResultsText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
    textAlign: 'center',
  },
  noResultsSubtext: {
    fontSize: 14,
    color: '#999',
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
  popularLoadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  popularLoadingText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 10,
    fontWeight: '500',
  },
  popularErrorContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  popularErrorText: {
    fontSize: 14,
    color: '#e74c3c',
    fontWeight: '500',
  },
});

export default SearchScreen; 