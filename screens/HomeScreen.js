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
  Alert,
  TextInput,
} from 'react-native';
import LocationPickerModal from '../modals/LocationPickerModal';

const HomeScreen = ({ navigation = null }) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [selectedLocation, setSelectedLocation] = useState('Blue Area, Islamabad');
  const [showLocationModal, setShowLocationModal] = useState(false);

  const categories = [
    { name: 'Mobiles', icon: '📱' },
    { name: 'Vehicles', icon: '🚗' },
    { name: 'Property for Sale', icon: '🏠' },
    { name: 'Property for Rent', icon: '🔑' },
    { name: 'Electronics & Home', icon: '📷' },
    { name: 'Services', icon: '🔧' },
    { name: 'Jobs', icon: '💼' },
    { name: 'Animals', icon: '🐾' },
    { name: 'Furniture & Home De...', icon: '🛏️' },
    { name: 'Fashion & Beau...', icon: '👗' },
  ];

  const recentlyViewed = [
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
      title: 'Honda Civic 2020',
      price: 'Rs 4,500,000',
      location: 'F-7 Markaz, Islamabad',
      image: '🚗',
      category: 'Vehicles',
      time: '1 day ago'
    },
    {
      id: '3',
      title: '3 Bedroom Apartment',
      price: 'Rs 25,000/month',
      location: 'DHA, Lahore',
      image: '🏠',
      category: 'Property for Rent',
      time: '3 days ago'
    },
    {
      id: '4',
      title: 'MacBook Pro M2',
      price: 'Rs 350,000',
      location: 'Gulberg, Lahore',
      image: '💻',
      category: 'Electronics',
      time: '1 week ago'
    },
    {
      id: '5',
      title: 'Golden Retriever Puppy',
      price: 'Rs 45,000',
      location: 'Clifton, Karachi',
      image: '🐕',
      category: 'Animals',
      time: '2 weeks ago'
    }
  ];



  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />


      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
       

        {/* Search Bar */}
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



        {/* Location Selector */}
        <TouchableOpacity 
          style={styles.locationContainer}
          onPress={() => setShowLocationModal(true)}
        >
          <Text style={styles.locationIcon}>📍</Text>
          <Text style={styles.locationText}>{selectedLocation.split(', ')[0]}, </Text>
          <Text style={styles.locationTextBold}>{selectedLocation.split(', ')[1]}</Text>
          <Text style={styles.dropdownIcon}>▼</Text>
        </TouchableOpacity>

        {/* Promotional Banner */}
        <TouchableOpacity 
          style={styles.promoBanner}
          onPress={() => {
            Alert.alert(
              'Sell on Boly',
              'Create your listing and reach thousands of buyers!',
              [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Start Selling', onPress: () => {
                  Alert.alert('Coming Soon', 'Sell feature will be available soon!');
                }}
              ]
            );
          }}
        >
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
                  <Text style={styles.actionIcon}>❤️</Text>
                  <Text style={styles.actionIcon}>📞</Text>
                  <Text style={styles.actionIcon}>💬</Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        {/* Category Grid */}
        <View style={styles.categoryGrid}>
          {categories.map((category, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.categoryItem}
              onPress={() => {
                // Navigate to category listing screen
                if (navigation) {
                  navigation.navigate('CategoryListing', { 
                    category: category.name
                  });
                } else {
                  Alert.alert('Navigation Error', 'Navigation is not available');
                }
              }}
            >
              <View style={styles.categoryIcon}>
                <Text style={styles.categoryEmoji}>{category.icon}</Text>
              </View>
              <Text style={styles.categoryText}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recently Viewed Section */}
        <View style={styles.recentlyViewedContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recently Viewed</Text>
            <TouchableOpacity
              onPress={() => {
                if (navigation) {
                  navigation.navigate('RecentlyViewed');
                }
              }}
            >
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.recentlyViewedScroll}
          >
            {recentlyViewed.map((item) => (
              <TouchableOpacity 
                key={item.id} 
                style={styles.recentCard}
                onPress={() => {
                  // Navigate to appropriate detail screen based on category
                  if (navigation) {
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
                      // Default to mobile detail for now
                      navigation.navigate('MobileDetail', { item });
                    }
                  } else {
                    Alert.alert('Navigation Error', 'Navigation is not available');
                  }
                }}
              >
                <View style={styles.recentCardImage}>
                  <Text style={styles.recentCardEmoji}>{item.image}</Text>
                </View>
                <View style={styles.recentCardContent}>
                  <Text style={styles.recentCardTitle} numberOfLines={2}>
                    {item.title}
                  </Text>
                  <Text style={styles.recentCardPrice}>{item.price}</Text>
                  <View style={styles.recentCardFooter}>
                    <Text style={styles.recentCardLocation} numberOfLines={1}>
                      📍 {item.location}
                    </Text>
                    <Text style={styles.recentCardTime}>{item.time}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
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
    paddingTop: 20,
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
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  categoryItem: {
    width: '20%',
    alignItems: 'center',
    marginBottom: 20,
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
  // Recently Viewed Styles
  recentlyViewedContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  seeAllText: {
    fontSize: 14,
    color: '#4ecdc4',
    fontWeight: '600',
  },
  recentlyViewedScroll: {
    paddingHorizontal: 20,
  },
  recentCard: {
    width: 200,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
    marginBottom: 10,
  },
  recentCardImage: {
    height: 120,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  recentCardEmoji: {
    fontSize: 40,
  },
  recentCardContent: {
    padding: 15,
  },
  recentCardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 6,
    lineHeight: 18,
  },
  recentCardPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4ecdc4',
    marginBottom: 8,
  },
  recentCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recentCardLocation: {
    fontSize: 11,
    color: '#7f8c8d',
    flex: 1,
    marginRight: 8,
  },
  recentCardTime: {
    fontSize: 10,
    color: '#95a5a6',
    fontWeight: '500',
  },


});

export default HomeScreen; 