import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  Animated,
  Platform,
} from 'react-native';
import { categoryService } from '../services';

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
const SkeletonSubcategoryCard = ({ delay = 0 }) => {
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
      <View style={styles.skeletonContent}>
        <Animated.View style={[styles.skeletonName, shimmerStyle]} />
        <Animated.View style={[styles.skeletonCount, shimmerStyle]} />
      </View>
      <Animated.View style={[styles.skeletonArrow, shimmerStyle]} />
    </View>
  );
};

const SubcategoryScreen = ({ route, navigation }) => {
  const { 
    category,
    categoryId,
    parentCategory 
  } = route.params || {};
  
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch subcategories when component mounts
  useEffect(() => {
    fetchSubcategories();
  }, [categoryId]);

  // Fetch subcategories from API
  const fetchSubcategories = async () => {
    setLoading(true);
    setError(null);
    
    try {
      let response;
      
      if (categoryId) {
        // Fetch subcategories by category ID
        response = await categoryService.getSubCategoriesByCategoryId(categoryId);
        console.log('Subcategories API Response:', response);
      } else {
        // Fallback: try to get all subcategories
        response = await categoryService.getAllSubCategories();
      }

      // Handle different response structures
      let subcategoriesData = [];
      
      if (response) {
        if (Array.isArray(response)) {
          // Direct array response
          subcategoriesData = response;
        } else if (response.data && Array.isArray(response.data)) {
          // Response wrapped in data object
          subcategoriesData = response.data;
        } else if (response.subcategories && Array.isArray(response.subcategories)) {
          // Response with subcategories property
          subcategoriesData = response.subcategories;
        }
      }

      if (subcategoriesData.length > 0) {
        // Format the subcategories data for display
        const formattedSubcategories = subcategoriesData.map((item, index) => ({
          id: item._id || item.id || index.toString(),
          name: item.name || item.title || item.subcategoryName || 'Subcategory',
          slug: item.slug || (item.name || item.title)?.toLowerCase().replace(/\s+/g, '-') || 'subcategory',
          count: item.count || item.itemsCount || Math.floor(Math.random() * 100) + 10, // Random count if not provided
          ...item // Include all other properties from API
        }));
        
        setSubcategories(formattedSubcategories);
      } else {
        // Only use static data as fallback if API returns empty
        console.log('No subcategories found in API response, using static fallback');
        setSubcategories(getStaticSubcategories(category));
      }
    } catch (err) {
      console.error('Error fetching subcategories:', err);
      setError('Failed to load subcategories');
      // Use static data as fallback
      setSubcategories(getStaticSubcategories(category));
    } finally {
      setLoading(false);
    }
  };

  // Static subcategories fallback
  const getStaticSubcategories = (categoryName) => {
    const category = categoryName?.toLowerCase() || '';
    
    if (category.includes('vehicle') || category.includes('car')) {
      return [
        { id: 'cars', name: 'Cars', slug: 'cars', count: 150 },
        { id: 'bikes', name: 'Bikes', slug: 'bikes', count: 200 },
        { id: 'buses-vans-trucks', name: 'Buses, Vans & Trucks', slug: 'buses-vans-trucks', count: 85 },
        { id: 'commercial', name: 'Commercial Vehicles', slug: 'commercial', count: 50 },
        { id: 'parts', name: 'Vehicle Parts', slug: 'parts', count: 75 },
      ];
    } else if (category.includes('property') || category.includes('real-estate')) {
      return [
        { id: 'houses', name: 'Houses', slug: 'houses', count: 120 },
        { id: 'apartments', name: 'Apartments', slug: 'apartments', count: 180 },
        { id: 'plots', name: 'Plots', slug: 'plots', count: 90 },
        { id: 'commercial', name: 'Commercial Property', slug: 'commercial', count: 60 },
      ];
    } else if (category.includes('mobile') || category.includes('phone')) {
      return [
        { id: 'samsung', name: 'Samsung', slug: 'samsung', count: 80 },
        { id: 'apple', name: 'Apple', slug: 'apple', count: 60 },
        { id: 'xiaomi', name: 'Xiaomi', slug: 'xiaomi', count: 45 },
        { id: 'oppo', name: 'Oppo', slug: 'oppo', count: 35 },
        { id: 'vivo', name: 'Vivo', slug: 'vivo', count: 30 },
      ];
    } else if (category.includes('electronics')) {
      return [
        { id: 'computers', name: 'Computers', slug: 'computers', count: 100 },
        { id: 'tv', name: 'TVs', slug: 'tv', count: 70 },
        { id: 'audio', name: 'Audio Equipment', slug: 'audio', count: 50 },
        { id: 'gaming', name: 'Gaming', slug: 'gaming', count: 40 },
      ];
    } else if (category.includes('animal')) {
      return [
        { id: 'hens', name: 'Hens', slug: 'hens', count: 45 },
        { id: 'cats', name: 'Cats', slug: 'cats', count: 30 },
        { id: 'dogs', name: 'Dogs', slug: 'dogs', count: 25 },
        { id: 'parrots', name: 'Parrots', slug: 'parrots', count: 20 },
        { id: 'cows', name: 'Cows', slug: 'cows', count: 15 },
      ];
    } else if (category.includes('books')) {
      return [
        { id: 'programming', name: 'Programming Books', slug: 'programming', count: 25 },
        { id: 'sports', name: 'Sports Equipment', slug: 'sports', count: 30 },
        { id: 'hobbies', name: 'Hobbies', slug: 'hobbies', count: 20 },
      ];
    } else if (category.includes('business')) {
      return [
        { id: 'industrial', name: 'Industrial', slug: 'industrial', count: 15 },
        { id: 'agriculture', name: 'Agriculture', slug: 'agriculture', count: 20 },
        { id: 'office', name: 'Office Equipment', slug: 'office', count: 25 },
      ];
    } else if (category.includes('fashion')) {
      return [
        { id: 'clothes', name: 'Clothes', slug: 'clothes', count: 80 },
        { id: 'beauty', name: 'Beauty Products', slug: 'beauty', count: 45 },
        { id: 'accessories', name: 'Accessories', slug: 'accessories', count: 35 },
      ];
    } else if (category.includes('furniture')) {
      return [
        { id: 'sofa', name: 'Sofas', slug: 'sofa', count: 25 },
        { id: 'beds', name: 'Beds', slug: 'beds', count: 30 },
        { id: 'tables', name: 'Tables', slug: 'tables', count: 20 },
      ];
    } else if (category.includes('property-rent')) {
      return [
        { id: 'apartments', name: 'Apartments', slug: 'apartments', count: 40 },
        { id: 'houses', name: 'Houses', slug: 'houses', count: 25 },
        { id: 'commercial', name: 'Commercial', slug: 'commercial', count: 15 },
      ];
    } else if (category.includes('services')) {
      return [
        { id: 'cleaning', name: 'Cleaning Services', slug: 'cleaning', count: 20 },
        { id: 'repair', name: 'Repair Services', slug: 'repair', count: 25 },
        { id: 'consultation', name: 'Consultation', slug: 'consultation', count: 15 },
      ];
    } else {
      return [
        { id: 'general', name: 'General', slug: 'general', count: 25 },
        { id: 'featured', name: 'Featured', slug: 'featured', count: 15 },
      ];
    }
  };

  const handleSubcategoryPress = (subcategory) => {
    // Navigate to CategoryListingScreen with subcategory info
    navigation.navigate('CategoryListing', {
      category: subcategory.name,
      subcategory: subcategory.name,
      parentCategory: category,
      categoryId: categoryId,
      subcategoryId: subcategory.id,
      subcategorySlug: subcategory.slug,
    });
  };

  const renderSubcategoryItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.subcategoryCard}
      onPress={() => handleSubcategoryPress(item)}
    >
      <View style={styles.subcategoryContent}>
        <Text style={styles.subcategoryName}>{item.name}</Text>
        <Text style={styles.subcategoryCount}>{item.count} items</Text>
      </View>
      <View style={styles.arrowContainer}>
        <Text style={styles.arrow}>→</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
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
        </View>

        {/* Skeleton Loading */}
        <ScrollView style={styles.listContainer} showsVerticalScrollIndicator={false}>
          <SkeletonSubcategoryCard delay={0} />
          <SkeletonSubcategoryCard delay={100} />
          <SkeletonSubcategoryCard delay={200} />
          <SkeletonSubcategoryCard delay={300} />
          <SkeletonSubcategoryCard delay={400} />
          <SkeletonSubcategoryCard delay={500} />
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={fetchSubcategories}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
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
      </View>

      {/* Subcategories List */}
      <FlatList
        data={subcategories}
        renderItem={renderSubcategoryItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
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
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: Platform.OS === 'android' ? 25 : 15,
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
    marginRight: 15,
  },
  backIcon: {
    fontSize: 20,
    color: '#333',
  },
  headerTitleContainer: {
    flex: 1,
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
  listContainer: {
    padding: 20,
  },
  subcategoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  subcategoryContent: {
    flex: 1,
  },
  subcategoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  subcategoryCount: {
    fontSize: 14,
    color: '#666',
  },
  arrowContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrow: {
    fontSize: 16,
    color: '#4ecdc4',
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  // Skeleton Loading Styles
  skeletonCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  skeletonContent: {
    flex: 1,
  },
  skeletonName: {
    height: 20,
    backgroundColor: '#e1e9ee',
    borderRadius: 4,
    marginBottom: 8,
    width: '70%',
  },
  skeletonCount: {
    height: 16,
    backgroundColor: '#e1e9ee',
    borderRadius: 4,
    width: '40%',
  },
  skeletonArrow: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#e1e9ee',
  },
});

export default SubcategoryScreen;