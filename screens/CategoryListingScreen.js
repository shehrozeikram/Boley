import React, { useState, useMemo } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  TextInput,
} from 'react-native';

const CategoryListingScreen = ({ route, navigation }) => {
  const { category, searchQuery: initialSearchQuery } = route.params || { category: 'Category' };
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery || '');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
  // Mock data for category listings
  const getCategoryItems = (categoryName) => {
    const category = categoryName.toLowerCase();
    
    if (category.includes('mobile')) {
      return [
        {
          id: '1',
          title: 'iPhone 13 Pro Max',
          price: 'Rs 180,000',
          location: 'Blue Area, Islamabad',
          image: '📱',
          time: '2 hours ago'
        },
        {
          id: '2',
          title: 'Samsung Galaxy S21',
          price: 'Rs 150,000',
          location: 'F-7 Markaz, Islamabad',
          image: '📱',
          time: '1 day ago'
        },
        {
          id: '3',
          title: 'OnePlus 9 Pro',
          price: 'Rs 120,000',
          location: 'DHA, Lahore',
          image: '📱',
          time: '3 days ago'
        }
      ];
    } else if (category.includes('vehicle')) {
      return [
        {
          id: '1',
          title: 'Honda Civic 2020',
          price: 'Rs 4,500,000',
          location: 'F-7 Markaz, Islamabad',
          image: '🚗',
          time: '1 day ago'
        },
        {
          id: '2',
          title: 'Toyota Corolla 2019',
          price: 'Rs 3,800,000',
          location: 'DHA, Lahore',
          image: '🚗',
          time: '3 days ago'
        },
        {
          id: '3',
          title: 'Suzuki Swift 2021',
          price: 'Rs 2,200,000',
          location: 'Gulberg, Lahore',
          image: '🚗',
          time: '1 week ago'
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
          title: 'MacBook Pro M2',
          price: 'Rs 350,000',
          location: 'Gulberg, Lahore',
          image: '💻',
          time: '1 week ago'
        },
        {
          id: '2',
          title: 'Dell XPS 13',
          price: 'Rs 280,000',
          location: 'Blue Area, Islamabad',
          image: '💻',
          time: '2 weeks ago'
        },
        {
          id: '3',
          title: 'iPad Pro 12.9',
          price: 'Rs 180,000',
          location: 'F-7 Markaz, Islamabad',
          image: '📱',
          time: '3 days ago'
        }
      ];
    } else if (category.includes('job')) {
      return [
        {
          id: '1',
          title: 'Senior React Native Developer',
          price: 'Rs 150,000 - 200,000',
          location: 'Karachi, Pakistan',
          image: '💼',
          time: '2 days ago'
        },
        {
          id: '2',
          title: 'Frontend Developer',
          price: 'Rs 120,000 - 150,000',
          location: 'Lahore, Pakistan',
          image: '💼',
          time: '1 week ago'
        },
        {
          id: '3',
          title: 'UI/UX Designer',
          price: 'Rs 100,000 - 130,000',
          location: 'Islamabad, Pakistan',
          image: '💼',
          time: '3 days ago'
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

  const categoryItems = getCategoryItems(category);

  // Filter items based on search query
  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return categoryItems;
    return categoryItems.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.price.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, categoryItems]);

  const handleItemPress = (item) => {
    // Navigate to appropriate detail screen based on category
    const categoryName = category.toLowerCase();
    if (categoryName.includes('mobile')) {
      navigation.navigate('MobileDetail', { item });
    } else if (categoryName.includes('vehicle')) {
      navigation.navigate('VehicleDetail', { item });
    } else if (categoryName.includes('property')) {
      navigation.navigate('PropertyDetail', { item });
    } else if (categoryName.includes('electronics')) {
      navigation.navigate('ElectronicsDetail', { item });
    } else if (categoryName.includes('job')) {
      navigation.navigate('JobsDetail', { item });
    } else {
      navigation.navigate('MobileDetail', { item });
    }
  };

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
        <Text style={styles.headerTitle}>{category}</Text>
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
            placeholder={`Search in ${category}...`}
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
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
          <TouchableOpacity style={styles.filterChip}>
            <Text style={styles.filterChipText}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterChip}>
            <Text style={styles.filterChipText}>Price: Low to High</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterChip}>
            <Text style={styles.filterChipText}>Price: High to Low</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterChip}>
            <Text style={styles.filterChipText}>Newest First</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Items List */}
      <ScrollView style={styles.itemsList} showsVerticalScrollIndicator={false}>
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
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
            <Text style={styles.noResultsText}>No items found</Text>
            <Text style={styles.noResultsSubtext}>Try adjusting your search terms</Text>
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
  itemsList: {
    flex: 1,
    paddingHorizontal: 20,
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
  },
  noResultsSubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});

export default CategoryListingScreen; 