import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';

const DetailScreen = ({ route, navigation }) => {
  // Removed login state - always show contact seller
  
  // Get category and item data from route params
  const { category, item } = route.params || {};
  
  // Check if we have valid data
  if (!category || !item) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <Text style={styles.errorText}>No item data available</Text>
          <TouchableOpacity style={styles.backToHomeButton} onPress={() => navigation.navigate('Home')}>
            <Text style={styles.backToHomeButtonText}>Back to Home</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
  
  // Generate similar products data
  // Removed getSimilarProducts function - no longer needed

  // Dynamic data based on category
  const getDetailData = (categoryName, itemData) => {
    const category = categoryName?.toLowerCase() || '';
    
    if (category.includes('vehicle')) {
      return {
        id: itemData?.id || '1',
        title: itemData?.title || 'Honda Civic 2020',
        price: itemData?.price || 'Rs 4,500,000',
        originalPrice: 'Rs 5,200,000',
        location: itemData?.location || 'F-7 Markaz, Islamabad',
        postedDate: itemData?.time || '1 day ago',
        condition: 'Used',
        brand: 'Honda',
        model: 'Civic',
        year: '2020',
        mileage: '45,000 km',
        fuelType: 'Petrol',
        transmission: 'Automatic',
        engineCapacity: '1.8L',
        color: 'White',
        description: 'Well-maintained Honda Civic 2020 with low mileage. Single owner, full service history available. Excellent condition both interior and exterior. Reason for selling: moving abroad.',
        images: ['🚗', '🚗', '🚗', '🚗'],
        seller: {
          name: 'Sara Ahmed',
          rating: 4.9,
          totalAds: 8,
          memberSince: '2020',
          verified: true,
        },
        specifications: {
          'Make': 'Honda',
          'Model': 'Civic',
          'Year': '2020',
          'Mileage': '45,000 km',
          'Fuel Type': 'Petrol',
          'Transmission': 'Automatic',
          'Engine': '1.8L i-VTEC',
          'Color': 'White',
          'Body Type': 'Sedan',
          'Doors': '4',
          'Seats': '5',
          'Drive Type': 'Front Wheel Drive',
        },
        features: [
          'Power Steering',
          'Air Conditioning',
          'Power Windows',
          'Central Locking',
          'ABS Brakes',
          'Airbags',
          'Bluetooth Connectivity',
          'Backup Camera',
          'Alloy Wheels',
          'Fog Lights',
        ],
        documents: [
          'Registration Book',
          'Insurance Valid',
          'Tax Paid',
          'Service History',
        ],
        category: 'Vehicle'
      };
    } else if (category.includes('property')) {
      return {
        id: itemData?.id || '1',
        title: itemData?.title || '3 Bedroom Apartment for Rent',
        price: itemData?.price || 'Rs 25,000/month',
        originalPrice: 'Rs 30,000/month',
        location: itemData?.location || 'DHA, Lahore',
        postedDate: itemData?.time || '3 days ago',
        condition: 'Furnished',
        propertyType: 'Apartment',
        bedrooms: 3,
        bathrooms: 2,
        area: '1,200 sq ft',
        floor: '3rd Floor',
        totalFloors: 8,
        description: 'Beautiful 3-bedroom apartment in prime DHA location. Fully furnished with modern amenities. Close to schools, hospitals, and shopping centers. Available for immediate possession.',
        images: ['🏠', '🏠', '🏠', '🏠'],
        seller: {
          name: 'Real Estate Plus',
          rating: 4.7,
          totalAds: 45,
          memberSince: '2018',
          verified: true,
        },
        specifications: {
          'Property Type': 'Apartment',
          'Bedrooms': '3',
          'Bathrooms': '2',
          'Area': '1,200 sq ft',
          'Floor': '3rd Floor',
          'Total Floors': '8',
          'Furnishing': 'Furnished',
          'Parking': '1 Car',
          'Balcony': 'Yes',
          'Lift': 'Yes',
          'Security': '24/7',
        },
        amenities: [
          'Air Conditioning',
          'Heating',
          'Kitchen Appliances',
          'Washing Machine',
          'Refrigerator',
          'Microwave',
          'Dishwasher',
          'Balcony',
          'Parking Space',
          'Security System',
          'Intercom',
          'Power Backup',
        ],
        locationDetails: {
          'Distance to Mall': '500m',
          'Distance to Hospital': '1.2km',
          'Distance to School': '800m',
          'Distance to Metro': '1.5km',
          'Distance to Airport': '15km',
        },
        nearbyPlaces: [
          'DHA Shopping Center',
          'CMH Hospital',
          'Beaconhouse School',
          'Metro Station',
          'Parks',
        ],
        category: 'Property'
      };
    } else if (category.includes('electronics')) {
      return {
        id: itemData?.id || '1',
        title: itemData?.title || 'MacBook Pro M2 14-inch',
        price: itemData?.price || 'Rs 350,000',
        originalPrice: 'Rs 420,000',
        location: itemData?.location || 'Gulberg, Lahore',
        postedDate: itemData?.time || '1 week ago',
        condition: 'Used',
        brand: 'Apple',
        model: 'MacBook Pro M2',
        warranty: '6 months remaining',
        description: 'Excellent condition MacBook Pro M2 with 14-inch display. Perfect for professional work and development. Comes with original charger and box. Reason for selling: upgrading to M3.',
        images: ['💻', '💻', '💻', '💻'],
        seller: {
          name: 'Tech Solutions',
          rating: 4.6,
          totalAds: 23,
          memberSince: '2019',
          verified: true,
        },
        specifications: {
          'Brand': 'Apple',
          'Model': 'MacBook Pro M2',
          'Screen Size': '14 inches',
          'Processor': 'M2 Chip',
          'RAM': '16GB',
          'Storage': '512GB SSD',
          'Graphics': 'Integrated',
          'OS': 'macOS Ventura',
          'Color': 'Space Gray',
          'Year': '2022',
        },
        features: [
          'Retina Display',
          'Touch Bar',
          'Backlit Keyboard',
          'Force Touch Trackpad',
          'Thunderbolt 4',
          'Wi-Fi 6',
          'Bluetooth 5.0',
          'FaceTime HD Camera',
          'Studio Quality Mics',
          'Long Battery Life',
        ],
        warranty: {
          'Warranty Type': 'Apple Care',
          'Remaining': '6 months',
          'Transferable': 'Yes',
          'Coverage': 'Hardware + Software',
        },
        accessories: [
          'Original Charger',
          'Original Box',
          'User Manual',
          'Cleaning Cloth',
        ],
        category: 'Electronics'
      };
    } else {
      // Default to vehicle data
      return getDetailData('vehicle', itemData);
    }
  };

  const detailData = getDetailData(category, item);

  // const handleCall = () => {
  //   Alert.alert('Call Seller', `Calling ${detailData.seller.name}...`);
  // };

  // const handleChat = () => {
  //   Alert.alert('Start Chat', 'Opening chat with seller...');
  // };

  // Removed handleSimilarProductPress function - no longer needed

  const handleContactSeller = () => {
    // Show seller contact information with fallbacks
    const sellerName = detailData?.seller?.name || 'Seller';
    const sellerRating = detailData?.seller?.rating || '4.5';
    const memberSince = detailData?.seller?.memberSince || '2023';
    
    Alert.alert(
      'Contact Seller',
      `Name: ${sellerName}\nPhone: +92 300 1234567\nEmail: ${sellerName.toLowerCase().replace(' ', '.')}@email.com\nRating: ⭐ ${sellerRating}\nMember since: ${memberSince}`,
      [
        { text: 'OK', style: 'default' }
      ]
    );
  };

  // const handleShare = () => {
  //   Alert.alert('Share', 'Sharing this listing...');
  // };

  const renderSpecifications = () => {
    if (!detailData.specifications) return null;
    
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Specifications</Text>
        <View style={styles.specificationsGrid}>
          {Object.entries(detailData.specifications).map(([key, value], index) => (
            <View key={index} style={styles.specItem}>
              <Text style={styles.specLabel}>{key}</Text>
              <Text style={styles.specValue}>{value}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const renderFeatures = () => {
    if (!detailData.features) return null;
    
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Features</Text>
        <View style={styles.featuresList}>
          {detailData.features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <Text style={styles.featureBullet}>•</Text>
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const renderAmenities = () => {
    if (!detailData.amenities) return null;
    
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Amenities</Text>
        <View style={styles.featuresList}>
          {detailData.amenities.map((amenity, index) => (
            <View key={index} style={styles.featureItem}>
              <Text style={styles.featureBullet}>•</Text>
              <Text style={styles.featureText}>{amenity}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const renderDocuments = () => {
    if (!detailData.documents) return null;
    
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Documents</Text>
        <View style={styles.featuresList}>
          {detailData.documents.map((doc, index) => (
            <View key={index} style={styles.featureItem}>
              <Text style={styles.featureBullet}>•</Text>
              <Text style={styles.featureText}>{doc}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const renderRequirements = () => {
    if (!detailData.requirements) return null;
    
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Requirements</Text>
        <View style={styles.specificationsGrid}>
          {Object.entries(detailData.requirements).map(([key, value], index) => (
            <View key={index} style={styles.specItem}>
              <Text style={styles.specLabel}>{key}</Text>
              <Text style={styles.specValue}>{value}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const renderResponsibilities = () => {
    if (!detailData.responsibilities) return null;
    
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Responsibilities</Text>
        <View style={styles.featuresList}>
          {detailData.responsibilities.map((resp, index) => (
            <View key={index} style={styles.featureItem}>
              <Text style={styles.featureBullet}>•</Text>
              <Text style={styles.featureText}>{resp}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const renderBenefits = () => {
    if (!detailData.benefits) return null;
    
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Benefits</Text>
        <View style={styles.featuresList}>
          {detailData.benefits.map((benefit, index) => (
            <View key={index} style={styles.featureItem}>
              <Text style={styles.featureBullet}>•</Text>
              <Text style={styles.featureText}>{benefit}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const renderSkills = () => {
    if (!detailData.skills) return null;
    
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Skills</Text>
        <View style={styles.skillsContainer}>
          {detailData.skills.map((skill, index) => (
            <View key={index} style={styles.skillChip}>
              <Text style={styles.skillText}>{skill}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const renderLocationDetails = () => {
    if (!detailData.locationDetails) return null;
    
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Location Details</Text>
        <View style={styles.specificationsGrid}>
          {Object.entries(detailData.locationDetails).map(([key, value], index) => (
            <View key={index} style={styles.specItem}>
              <Text style={styles.specLabel}>{key}</Text>
              <Text style={styles.specValue}>{value}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const renderNearbyPlaces = () => {
    if (!detailData.nearbyPlaces) return null;
    
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Nearby Places</Text>
        <View style={styles.featuresList}>
          {detailData.nearbyPlaces.map((place, index) => (
            <View key={index} style={styles.featureItem}>
              <Text style={styles.featureBullet}>📍</Text>
              <Text style={styles.featureText}>{place}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const renderWarranty = () => {
    if (!detailData.warranty) return null;
    
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Warranty</Text>
        <View style={styles.specificationsGrid}>
          {Object.entries(detailData.warranty).map(([key, value], index) => (
            <View key={index} style={styles.specItem}>
              <Text style={styles.specLabel}>{key}</Text>
              <Text style={styles.specValue}>{value}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const renderAccessories = () => {
    if (!detailData.accessories) return null;
    
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Accessories</Text>
        <View style={styles.featuresList}>
          {detailData.accessories.map((accessory, index) => (
            <View key={index} style={styles.featureItem}>
              <Text style={styles.featureBullet}>•</Text>
              <Text style={styles.featureText}>{accessory}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        
        {/* Header with Back Button */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <View style={styles.headerActions}>
            {/* <TouchableOpacity style={styles.headerAction} onPress={handleShare}>
              <Text style={styles.headerActionIcon}>📤</Text>
            </TouchableOpacity> */}
            {/* Removed favorite button */}
          </View>
        </View>

        {/* Main Image */}
        <View style={styles.imageContainer}>
          <View style={styles.mainImage}>
            <Text style={styles.imagePlaceholder}>{detailData.images[0]}</Text>
          </View>
        </View>

        {/* Price and Title Section */}
        <View style={styles.priceSection}>
          <Text style={styles.price}>{detailData.price}</Text>
          {detailData.originalPrice && (
            <Text style={styles.originalPrice}>{detailData.originalPrice}</Text>
          )}
          <Text style={styles.title}>{detailData.title}</Text>
          <View style={styles.locationRow}>
            <Text style={styles.location}>📍 {detailData.location}</Text>
            <Text style={styles.postedDate}>• {detailData.postedDate}</Text>
          </View>
        </View>

        {/* Condition Badge */}
        <View style={styles.conditionContainer}>
          <View style={styles.conditionBadge}>
            <Text style={styles.conditionText}>{detailData.condition}</Text>
          </View>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{detailData.description}</Text>
        </View>

        {/* Dynamic Sections based on category */}
        {renderSpecifications()}
        {renderFeatures()}
        {renderAmenities()}
        {renderDocuments()}
        {renderRequirements()}
        {renderResponsibilities()}
        {renderBenefits()}
        {renderSkills()}
        {renderLocationDetails()}
        {renderNearbyPlaces()}
        {renderWarranty()}
        {renderAccessories()}

        {/* Seller Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Seller Information</Text>
          <View style={styles.sellerCard}>
            <View style={styles.sellerInfo}>
              <Text style={styles.sellerName}>{detailData?.seller?.name || 'Seller'}</Text>
              <View style={styles.sellerStats}>
                <Text style={styles.sellerRating}>⭐ {detailData?.seller?.rating || '4.5'}</Text>
                <Text style={styles.sellerAds}>{detailData?.seller?.totalAds || '0'} ads</Text>
                <Text style={styles.sellerMember}>Member since {detailData?.seller?.memberSince || '2023'}</Text>
              </View>
              {detailData?.seller?.verified && (
                <View style={styles.verifiedBadge}>
                  <Text style={styles.verifiedText}>✓ Verified</Text>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionBar}>
        <TouchableOpacity style={styles.contactSellerButton} onPress={handleContactSeller}>
          <Text style={styles.contactSellerButtonText}>
            📞 Contact Seller
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    fontSize: 24,
    color: '#333',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 15,
  },
  headerAction: {
    padding: 8,
  },
  headerActionIcon: {
    fontSize: 20,
  },
  imageContainer: {
    backgroundColor: '#fff',
    paddingBottom: 20,
  },
  mainImage: {
    height: 300,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePlaceholder: {
    fontSize: 80,
  },
  priceSection: {
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4ecdc4',
    marginBottom: 5,
  },
  originalPrice: {
    fontSize: 16,
    color: '#999',
    textDecorationLine: 'line-through',
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
    lineHeight: 26,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  location: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  postedDate: {
    fontSize: 14,
    color: '#95a5a6',
  },
  conditionContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  conditionBadge: {
    backgroundColor: '#e8f5e8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    alignSelf: 'flex-start',
  },
  conditionText: {
    color: '#27ae60',
    fontSize: 12,
    fontWeight: '600',
  },
  section: {
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: '#34495e',
  },
  specificationsGrid: {
    gap: 12,
  },
  specItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  specLabel: {
    fontSize: 14,
    color: '#7f8c8d',
    fontWeight: '500',
  },
  specValue: {
    fontSize: 14,
    color: '#2c3e50',
    fontWeight: '600',
  },
  featuresList: {
    gap: 8,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  featureBullet: {
    fontSize: 16,
    color: '#4ecdc4',
  },
  featureText: {
    fontSize: 14,
    color: '#34495e',
    flex: 1,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillChip: {
    backgroundColor: '#f0f8ff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  skillText: {
    fontSize: 12,
    color: '#4ecdc4',
    fontWeight: '500',
  },
  sellerCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 10,
  },
  sellerInfo: {
    flex: 1,
  },
  sellerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  sellerStats: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 8,
  },
  sellerRating: {
    fontSize: 12,
    color: '#f39c12',
  },
  sellerAds: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  sellerMember: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  verifiedBadge: {
    backgroundColor: '#e8f5e8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  verifiedText: {
    fontSize: 10,
    color: '#27ae60',
    fontWeight: '600',
  },
  viewProfileButton: {
    backgroundColor: '#4ecdc4',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  viewProfileText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  contactSellerButton: {
    flex: 1,
    backgroundColor: '#4ecdc4',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  contactSellerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomSpacing: {
    height: 100,
  },
  actionBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  backToHomeButton: {
    backgroundColor: '#4ecdc4',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  backToHomeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default DetailScreen; 