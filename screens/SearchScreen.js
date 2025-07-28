import React, { useState, useMemo } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
} from 'react-native';

const SearchScreen = ({ route, navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(true);

  // Mock data for search results across all categories
  const allItems = [
    // Mobiles
    {
      id: '1',
      title: 'iPhone 13 Pro Max',
      price: 'Rs 180,000',
      location: 'Blue Area, Islamabad',
      image: '📱',
      category: 'Mobiles',
      time: '2 hours ago'
    },
    {
      id: '2',
      title: 'Samsung Galaxy S21',
      price: 'Rs 150,000',
      location: 'F-7 Markaz, Islamabad',
      image: '📱',
      category: 'Mobiles',
      time: '1 day ago'
    },
    // Vehicles
    {
      id: '3',
      title: 'Honda Civic 2020',
      price: 'Rs 4,500,000',
      location: 'F-7 Markaz, Islamabad',
      image: '🚗',
      category: 'Vehicles',
      time: '1 day ago'
    },
    {
      id: '4',
      title: 'Toyota Corolla 2019',
      price: 'Rs 3,800,000',
      location: 'DHA, Lahore',
      image: '🚗',
      category: 'Vehicles',
      time: '3 days ago'
    },
    // Property
    {
      id: '5',
      title: '3 Bedroom Apartment',
      price: 'Rs 25,000/month',
      location: 'DHA, Lahore',
      image: '🏠',
      category: 'Property',
      time: '3 days ago'
    },
    {
      id: '6',
      title: '2 Bedroom Flat',
      price: 'Rs 20,000/month',
      location: 'Gulberg, Lahore',
      image: '🏠',
      category: 'Property',
      time: '1 week ago'
    },
    // Electronics
    {
      id: '7',
      title: 'MacBook Pro M2',
      price: 'Rs 350,000',
      location: 'Gulberg, Lahore',
      image: '💻',
      category: 'Electronics',
      time: '1 week ago'
    },
    {
      id: '8',
      title: 'Dell XPS 13',
      price: 'Rs 280,000',
      location: 'Blue Area, Islamabad',
      image: '💻',
      category: 'Electronics',
      time: '2 weeks ago'
    },
    // Jobs
    {
      id: '9',
      title: 'Senior React Native Developer',
      price: 'Rs 150,000 - 200,000',
      location: 'Karachi, Pakistan',
      image: '💼',
      category: 'Jobs',
      time: '2 days ago'
    },
    {
      id: '10',
      title: 'Frontend Developer',
      price: 'Rs 120,000 - 150,000',
      location: 'Lahore, Pakistan',
      image: '💼',
      category: 'Jobs',
      time: '1 week ago'
    },
    // Services
    {
      id: '11',
      title: 'House Cleaning Service',
      price: 'Rs 2,000/day',
      location: 'Islamabad, Pakistan',
      image: '🔧',
      category: 'Services',
      time: '1 day ago'
    },
    // Animals
    {
      id: '12',
      title: 'Golden Retriever Puppy',
      price: 'Rs 45,000',
      location: 'Clifton, Karachi',
      image: '🐕',
      category: 'Animals',
      time: '2 weeks ago'
    },
    // Furniture
    {
      id: '13',
      title: 'Leather Sofa Set',
      price: 'Rs 85,000',
      location: 'Gulberg, Lahore',
      image: '🛏️',
      category: 'Furniture',
      time: '3 days ago'
    },
    // Fashion
    {
      id: '14',
      title: 'Designer Dress Collection',
      price: 'Rs 15,000',
      location: 'Blue Area, Islamabad',
      image: '👗',
      category: 'Fashion',
      time: '1 week ago'
    }
  ];

  // Filter items based on search query
  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return allItems.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, allItems]);

  const handleItemPress = (item) => {
    // Navigate to appropriate detail screen based on category
    const category = item.category.toLowerCase();
    if (category.includes('mobile')) {
      navigation.navigate('MobileDetail', { item });
    } else if (category.includes('vehicle')) {
      navigation.navigate('VehicleDetail', { item });
    } else if (category.includes('property')) {
      navigation.navigate('PropertyDetail', { item });
    } else if (category.includes('electronics')) {
      navigation.navigate('ElectronicsDetail', { item });
    } else if (category.includes('job')) {
      navigation.navigate('JobsDetail', { item });
    } else {
      navigation.navigate('MobileDetail', { item });
    }
  };

  const handleCategoryPress = (category) => {
    navigation.navigate('CategoryListing', { category });
  };

  // Popular search suggestions
  const popularSearches = [
    'iPhone', 'Honda Civic', 'Apartment', 'MacBook', 'Developer', 'Puppy', 'Sofa'
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backIcon}>←</Text>
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
            <View style={styles.popularGrid}>
              {popularSearches.map((search, index) => (
                <TouchableOpacity 
                  key={index}
                  style={styles.popularChip}
                  onPress={() => setSearchQuery(search)}
                >
                  <Text style={styles.popularChipText}>{search}</Text>
                </TouchableOpacity>
              ))}
            </View>
            
            <Text style={styles.sectionTitle}>Browse Categories</Text>
            <View style={styles.categoriesGrid}>
              {['Mobiles', 'Vehicles', 'Property', 'Electronics', 'Jobs', 'Services'].map((category, index) => (
                <TouchableOpacity 
                  key={index}
                  style={styles.categoryCard}
                  onPress={() => handleCategoryPress(category)}
                >
                  <Text style={styles.categoryIcon}>
                    {category === 'Mobiles' ? '📱' : 
                     category === 'Vehicles' ? '🚗' : 
                     category === 'Property' ? '🏠' : 
                     category === 'Electronics' ? '💻' : 
                     category === 'Jobs' ? '💼' : '🔧'}
                  </Text>
                  <Text style={styles.categoryName}>{category}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ) : filteredItems.length > 0 ? (
          // Show search results
          <View style={styles.resultsSection}>
            <Text style={styles.resultsCount}>
              {filteredItems.length} result{filteredItems.length !== 1 ? 's' : ''} for "{searchQuery}"
            </Text>
            {filteredItems.map((item) => (
              <TouchableOpacity 
                key={item.id} 
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
                    <Text style={styles.itemCategory}>{item.category}</Text>
                    <Text style={styles.itemLocation} numberOfLines={1}>
                      📍 {item.location}
                    </Text>
                    <Text style={styles.itemTime}>{item.time}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
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
});

export default SearchScreen; 