import React, { useState, useMemo } from 'react';
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
} from 'react-native';

const RecentlyViewedScreen = ({ navigation, route }) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Mock data for recently viewed items (you can pass this via route.params or use a global state)
  const recentlyViewed = [
    {
      id: '1',
      title: 'Honda Civic 2020',
      price: 'Rs 4,500,000',
      location: 'F-7 Markaz, Islamabad',
      image: '🚗',
      category: 'Vehicles',
      time: '1 day ago'
    },
    {
      id: '2',
      title: '3 Bedroom Apartment',
      price: 'Rs 25,000/month',
      location: 'DHA, Lahore',
      image: '🏠',
      category: 'Property for Rent',
      time: '3 days ago'
    },
    {
      id: '3',
      title: 'MacBook Pro M2 14-inch',
      price: 'Rs 350,000',
      location: 'Gulberg, Lahore',
      image: '💻',
      category: 'Electronics',
      time: '1 week ago'
    },
    {
      id: '4',
      title: 'Toyota Corolla 2021',
      price: 'Rs 3,800,000',
      location: 'Bahria Town, Rawalpindi',
      image: '🚗',
      category: 'Vehicles',
      time: '2 weeks ago'
    },
    {
      id: '5',
      title: 'MacBook Air M1 13-inch',
      price: 'Rs 280,000',
      location: 'Blue Area, Islamabad',
      image: '💻',
      category: 'Electronics',
      time: '3 weeks ago'
    },
    {
      id: '6',
      title: 'Toyota Corolla 2021',
      price: 'Rs 3,800,000',
      location: 'Bahria Town, Rawalpindi',
      image: '🚗',
      category: 'Vehicles',
      time: '1 month ago'
    },
    {
      id: '7',
      title: '2 Bedroom Flat',
      price: 'Rs 18,000/month',
      location: 'Model Town, Lahore',
      image: '🏠',
      category: 'Property for Rent',
      time: '1 month ago'
    },
    {
      id: '8',
      title: 'MacBook Pro M3 16-inch',
      price: 'Rs 450,000',
      location: 'Defence, Karachi',
      image: '💻',
      category: 'Electronics',
      time: '2 months ago'
    },
    {
      id: '9',
      title: '3 Bedroom Apartment',
      price: 'Rs 22,000/month',
      location: 'DHA, Lahore',
      image: '🏠',
      category: 'Property for Rent',
      time: '2 months ago'
    },
    {
      id: '10',
      title: 'Honda City 2020',
      price: 'Rs 3,200,000',
      location: 'Gulberg, Lahore',
      image: '🚗',
      category: 'Vehicles',
      time: '3 months ago'
    }
  ];

  // Filter items based on search query
  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) {
      return recentlyViewed;
    }
    return recentlyViewed.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, recentlyViewed]);

  const handleItemPress = (item) => {
    if (navigation) {
      navigation.navigate('Detail', { 
        category: item.category,
        item: item 
      });
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.itemCard}
      onPress={() => handleItemPress(item)}
    >
      <View style={styles.itemImage}>
        <Text style={styles.itemEmoji}>{item.image}</Text>
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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backIcon}>←</Text>
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
        {filteredItems.length > 0 ? (
          <>
            <View style={styles.resultsHeader}>
              <Text style={styles.resultsCount}>
                {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''} found
              </Text>
            </View>
            <FlatList
              data={filteredItems}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              numColumns={2}
              columnWrapperStyle={styles.itemRow}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContainer}
            />
          </>
        ) : (
          <View style={styles.noResultsContainer}>
            <Text style={styles.noResultsIcon}>🔍</Text>
            <Text style={styles.noResultsText}>No items found</Text>
            <Text style={styles.noResultsSubtext}>
              Try adjusting your search terms
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
});

export default RecentlyViewedScreen; 