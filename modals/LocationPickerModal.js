import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  TextInput,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { locationService } from '../services';

// Skeleton Loading Components
const SkeletonListItem = ({ delay = 0 }) => {
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
    <View style={styles.skeletonListItem}>
      <View style={styles.skeletonListItemContent}>
        <Animated.View style={[styles.skeletonListItemName, shimmerStyle]} />
        <Animated.View style={[styles.skeletonListItemSubtext, shimmerStyle]} />
      </View>
      <Animated.View style={[styles.skeletonArrow, shimmerStyle]} />
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
    <View style={styles.skeletonSearchBarContainer}>
      <Animated.View style={[styles.skeletonSearchBar, shimmerStyle]} />
    </View>
  );
};

const LocationPickerModal = ({ 
  visible, 
  onClose, 
  selectedLocation, 
  onLocationSelect 
}) => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [currentView, setCurrentView] = useState('regions'); // 'regions', 'cities', 'places'
  const [searchText, setSearchText] = useState('');
  const [locationData, setLocationData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [showUpdateNotification, setShowUpdateNotification] = useState(false);

  // Initialize with static data and fetch API data in background
  useEffect(() => {
    if (visible) {
      // Always show static data immediately for better UX
      setLocationData(getStaticFallbackData());
      
      // Fetch API data in background if not already loaded
      if (!dataLoaded && !loading) {
        fetchLocationData();
      }
    }
  }, [visible]);

  // Reset states when modal closes
  useEffect(() => {
    if (!visible) {
      setCurrentView('regions');
      setSelectedRegion(null);
      setSelectedCity(null);
      setSearchText('');
      setDataLoaded(false);
      setError(null);
    }
  }, [visible]);

  // Fetch location data from API
  const fetchLocationData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await locationService.getLocationTree();
      
      // Handle different response structures
      let locationsData = [];
      
      if (response) {
        if (Array.isArray(response)) {
          // Direct array response
          locationsData = response;
        } else if (response.data && Array.isArray(response.data)) {
          // Response wrapped in data object
          locationsData = response.data;
        } else if (response.regions && Array.isArray(response.regions)) {
          // Response with regions property
          locationsData = response.regions;
        } else if (response.tree && Array.isArray(response.tree)) {
          // Response with tree property
          locationsData = response.tree;
        }
      }

      if (locationsData.length > 0) {
        // Format the location tree data properly
        const formattedLocations = locationsData.map((region, regionIndex) => {
          
          const cities = region.cities || region.children || [];
          
          const formattedCities = cities.map((city, cityIndex) => {
            
            // Try multiple possible field names for places (including British spelling)
            const places = city.neighbourhoods || city.neighborhoods || city.places || city.areas || city.children || city.localities || [];
            
            const formattedPlaces = places.map((place, placeIndex) => ({
              id: place._id || place.id || `${regionIndex}-${cityIndex}-${placeIndex}`,
              name: place.name || place.title || place.placeName || 'Place',
              slug: place.slug || (place.name || place.title || place.placeName)?.toLowerCase().replace(/\s+/g, '-'),
            }));

            return {
              id: city._id || city.id || `${regionIndex}-${cityIndex}`,
              name: city.name || city.title || 'City',
              slug: city.slug || (city.name || city.title)?.toLowerCase().replace(/\s+/g, '-'),
              places: formattedPlaces,
            };
          });

          return {
            id: region._id || region.id || regionIndex.toString(),
            name: region.name || region.title || 'Region',
            slug: region.slug || (region.name || region.title)?.toLowerCase().replace(/\s+/g, '-'),
            cities: formattedCities,
          };
        });

        // Smoothly update the location data
        setLocationData(formattedLocations);
        setDataLoaded(true);
        
        // Show update notification briefly
        setShowUpdateNotification(true);
        setTimeout(() => setShowUpdateNotification(false), 2000);
      } else {
        // Keep static data if API returns empty
        setDataLoaded(true);
      }
    } catch (err) {
      console.error('Location API Error:', err);
      // Keep static data on error, just mark as loaded
      setDataLoaded(true);
    } finally {
      setLoading(false);
    }
  };

  // Static fallback data
  const getStaticFallbackData = () => [
    {
      id: '1',
      name: 'Punjab',
      slug: 'punjab',
      cities: [
        {
          id: '1',
          name: 'Lahore',
          slug: 'lahore',
          places: [
            { id: '1', name: 'Gulberg', slug: 'gulberg' },
            { id: '2', name: 'Defence', slug: 'defence' },
            { id: '3', name: 'Model Town', slug: 'model-town' },
            { id: '4', name: 'Johar Town', slug: 'johar-town' },
          ]
        },
        {
          id: '2',
          name: 'Rawalpindi',
          slug: 'rawalpindi',
          places: [
            { id: '5', name: 'Saddar', slug: 'saddar' },
            { id: '6', name: 'Raja Bazar', slug: 'raja-bazar' },
            { id: '7', name: 'Commercial Market', slug: 'commercial-market' },
          ]
        }
      ]
    },
    {
      id: '2',
      name: 'Sindh',
      slug: 'sindh',
      cities: [
        {
          id: '3',
          name: 'Karachi',
          slug: 'karachi',
          places: [
            { id: '8', name: 'Clifton', slug: 'clifton' },
            { id: '9', name: 'DHA', slug: 'dha' },
            { id: '10', name: 'Gulshan-e-Iqbal', slug: 'gulshan-e-iqbal' },
          ]
        }
      ]
    },
    {
      id: '3',
      name: 'Federal Capital',
      slug: 'federal-capital',
      cities: [
        {
          id: '4',
          name: 'Islamabad',
          slug: 'islamabad',
          places: [
            { id: '11', name: 'Blue Area', slug: 'blue-area' },
            { id: '12', name: 'F-7 Markaz', slug: 'f-7-markaz' },
            { id: '13', name: 'F-8 Markaz', slug: 'f-8-markaz' },
          ]
        }
      ]
    }
  ];

  // Get current data based on view
  const getCurrentData = () => {
    if (currentView === 'regions') {
      return locationData.filter(item =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
      );
    } else if (currentView === 'cities') {
      const cities = selectedRegion?.cities.filter(city =>
        city.name.toLowerCase().includes(searchText.toLowerCase())
      ) || [];
      return cities;
    } else if (currentView === 'places') {
      const places = selectedCity?.places.filter(place =>
        place.name.toLowerCase().includes(searchText.toLowerCase())
      ) || [];
      return places;
    }
    return [];
  };

  const currentData = getCurrentData();

  const handleClose = () => {
    setCurrentView('regions');
    setSelectedRegion(null);
    setSelectedCity(null);
    setSearchText('');
    onClose();
  };

  // Navigation handlers
  const handleRegionSelect = (region) => {
    setSelectedRegion(region);
    setCurrentView('cities');
    setSearchText('');
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setCurrentView('places');
    setSearchText('');
  };

  const handlePlaceSelect = (place) => {
    const locationString = `${place.name}, ${selectedCity.name}, ${selectedRegion.name}`;
    onLocationSelect(locationString);
    handleClose();
  };

  const handleBack = () => {
    if (currentView === 'places') {
      setCurrentView('cities');
      setSelectedCity(null);
      setSearchText('');
    } else if (currentView === 'cities') {
      setCurrentView('regions');
      setSelectedRegion(null);
      setSearchText('');
    } else if (currentView === 'regions') {
      // Close the modal when on regions view
      handleClose();
    }
  };

  const getHeaderTitle = () => {
    switch (currentView) {
      case 'regions':
        return 'Select Region';
      case 'cities':
        return 'Select City';
      case 'places':
        return 'Select Place';
      default:
        return 'Select Location';
    }
  };

  const getBreadcrumb = () => {
    if (currentView === 'cities' && selectedRegion) {
      return selectedRegion.name;
    } else if (currentView === 'places' && selectedRegion && selectedCity) {
      return `${selectedRegion.name} > ${selectedCity.name}`;
    }
    return '';
  };

  // Show subtle loading indicator in header if still loading API data
  const showLoadingIndicator = loading && !dataLoaded;
  
  // Add refresh functionality
  const handleRefresh = () => {
    setDataLoaded(false);
    setError(null);
    fetchLocationData();
  };

  // Show error state
  if (error) {
    return (
      <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={handleClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Select Location</Text>
            <View style={{ width: 50 }} />
          </View>
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity 
              style={styles.retryButton}
              onPress={fetchLocationData}
            >
              <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={handleClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <TouchableOpacity 
              onPress={handleBack}
              style={styles.backButton}
            >
              <Text style={styles.backButtonText}>
                {currentView === 'regions' ? '✕' : '←'}
              </Text>
            </TouchableOpacity>
            <View style={styles.titleContainer}>
              <Text style={styles.modalTitle}>{getHeaderTitle()}</Text>
              {getBreadcrumb() && (
                <Text style={styles.modalSubtitle}>{getBreadcrumb()}</Text>
              )}
              {showLoadingIndicator && (
                <View style={styles.loadingIndicator}>
                  <ActivityIndicator size="small" color="#4ecdc4" />
                  <Text style={styles.loadingIndicatorText}>Updating locations...</Text>
                </View>
              )}
            </View>
            <TouchableOpacity 
              style={styles.refreshButton}
              onPress={handleRefresh}
              disabled={loading}
            >
              <Text style={[styles.refreshButtonText, loading && styles.refreshButtonDisabled]}>
                {loading ? '⟳' : '↻'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Update Notification */}
          {showUpdateNotification && (
            <View style={styles.updateNotification}>
              <Text style={styles.updateNotificationText}>✓ Locations updated</Text>
            </View>
          )}

          {/* Search Bar */}
          {loading && !dataLoaded ? (
            <SkeletonSearchBar delay={0} />
          ) : (
            <View style={styles.searchBarContainer}>
              <View style={styles.modalSearchBar}>
                <Text style={styles.searchIcon}>🔍</Text>
                <TextInput
                  style={styles.searchInput}
                  placeholder={`Search ${currentView}...`}
                  placeholderTextColor="#999"
                  value={searchText}
                  onChangeText={setSearchText}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
            </View>
          )}

          {/* Content */}
          <View style={styles.contentContainer}>
            {loading && !dataLoaded ? (
              <FlatList
                data={[1, 2, 3, 4, 5, 6, 7, 8]} // Show 8 skeleton items
                keyExtractor={(item) => item.toString()}
                renderItem={({ item, index }) => (
                  <SkeletonListItem delay={index * 100} />
                )}
                showsVerticalScrollIndicator={false}
              />
            ) : (
              <FlatList
                data={currentData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.listItem,
                      selectedLocation && selectedLocation.includes(item.name) && styles.selectedItem
                    ]}
                    onPress={() => {
                      if (currentView === 'regions') {
                        handleRegionSelect(item);
                      } else if (currentView === 'cities') {
                        handleCitySelect(item);
                      } else if (currentView === 'places') {
                        handlePlaceSelect(item);
                      }
                    }}
                  >
                    <View style={styles.listItemContent}>
                      <Text style={styles.listItemName}>{item.name}</Text>
                      {currentView === 'regions' && (
                        <Text style={styles.listItemSubtext}>
                          {item.cities?.length || 0} cities
                        </Text>
                      )}
                      {currentView === 'cities' && (
                        <Text style={styles.listItemSubtext}>
                          {item.places?.length || 0} places
                        </Text>
                      )}
                    </View>
                    <Text style={styles.arrow}>→</Text>
                  </TouchableOpacity>
                )}
                showsVerticalScrollIndicator={false}
              />
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    maxHeight: '75%',
    minHeight: '55%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
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
  backButtonText: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 15,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  modalSubtitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  placeholder: {
    width: 40,
  },
  searchBarContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  modalSearchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 10,
    opacity: 0.7,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#f8f9fa',
  },
  selectedItem: {
    backgroundColor: '#f0f8ff',
  },
  listItemContent: {
    flex: 1,
  },
  listItemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  listItemSubtext: {
    fontSize: 14,
    color: '#666',
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
    paddingHorizontal: 20,
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
  loadingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  loadingIndicatorText: {
    fontSize: 10,
    color: '#4ecdc4',
    marginLeft: 6,
    fontWeight: '500',
  },

  // Skeleton Loading Styles
  skeletonSearchBarContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  skeletonSearchBar: {
    height: 44,
    backgroundColor: '#e1e9ee',
    borderRadius: 25,
  },
  skeletonListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#f8f9fa',
  },
  skeletonListItemContent: {
    flex: 1,
  },
  skeletonListItemName: {
    height: 18,
    backgroundColor: '#e1e9ee',
    borderRadius: 4,
    marginBottom: 6,
    width: '70%',
  },
  skeletonListItemSubtext: {
    height: 14,
    backgroundColor: '#e1e9ee',
    borderRadius: 4,
    width: '40%',
  },
  skeletonArrow: {
    width: 16,
    height: 16,
    backgroundColor: '#e1e9ee',
    borderRadius: 8,
  },

  // Enhanced Location Update Styles
  refreshButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  refreshButtonText: {
    fontSize: 18,
    color: '#4ecdc4',
    fontWeight: 'bold',
  },
  refreshButtonDisabled: {
    color: '#ccc',
  },
  updateNotification: {
    backgroundColor: '#d4edda',
    paddingVertical: 8,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  updateNotificationText: {
    fontSize: 12,
    color: '#155724',
    fontWeight: '500',
  },
});

export default LocationPickerModal;