import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Image,
  Platform,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { api } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

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

const DetailScreen = ({ route, navigation }) => {
  // Get product ID from route params (required)
  const { productId } = route.params || {};
  
  // Authentication context
  const { isAuthenticated, user } = useAuth();
  
  // State for API data
  const [apiProductData, setApiProductData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // State to track if we should auto-proceed with contact seller after login
  const [shouldProceedWithContact, setShouldProceedWithContact] = useState(false);
  
  // Animation for skeleton loading
  const shimmerAnimation = useRef(new Animated.Value(0)).current;

  // Start shimmer animation when loading
  useEffect(() => {
    if (loading) {
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
      shimmer.start();
      return () => shimmer.stop();
    }
  }, [loading, shimmerAnimation]);

  // Handle auto-proceed with contact seller after successful login/signup
  useEffect(() => {
    if (isAuthenticated && shouldProceedWithContact) {
      setShouldProceedWithContact(false);
      // Small delay to ensure the screen is fully loaded
      setTimeout(() => {
        proceedWithContactSeller();
      }, 500);
    }
  }, [isAuthenticated, shouldProceedWithContact]);

  // Fetch product data
  useEffect(() => {
    const fetchProductData = async () => {
      if (!productId) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const result = await api.items.getProductById(productId);
        setApiProductData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [productId]);

  // Refetch function
  const refetch = async () => {
    if (!productId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await api.items.getProductById(productId);
      setApiProductData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Check if we have a product ID (required for API call)
  if (!productId) {
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
        </View>
        <View style={styles.content}>
          <Text style={styles.errorText}>Product ID is required</Text>
          <TouchableOpacity style={styles.backToHomeButton} onPress={() => navigation.navigate('Home')}>
            <Text style={styles.backToHomeButtonText}>Back to Home</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Skeleton Loading Component
  const SkeletonBox = ({ width, height, style = {} }) => {
    const shimmerOpacity = shimmerAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0.3, 0.7],
    });

    return (
      <Animated.View style={[styles.skeletonBox, { width, height, opacity: shimmerOpacity }, style]} />
    );
  };

  const SkeletonText = ({ width, height = 16, style = {} }) => (
    <SkeletonBox width={width} height={height} style={[styles.skeletonText, style]} />
  );

  const SkeletonImage = ({ width, height, style = {} }) => (
    <SkeletonBox width={width} height={height} style={[styles.skeletonImage, style]} />
  );

  // Show skeleton loading state
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Header Skeleton */}
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
            <View style={styles.headerActions}>
              <SkeletonBox width={40} height={40} style={styles.skeletonHeaderAction} />
            </View>
          </View>

          {/* Image Skeleton */}
          <View style={styles.imageContainer}>
            <SkeletonImage width="100%" height={300} />
          </View>

          {/* Price and Title Section Skeleton */}
          <View style={styles.priceSection}>
            <SkeletonText width="60%" height={28} style={{ marginBottom: 8 }} />
            <SkeletonText width="40%" height={20} style={{ marginBottom: 12 }} />
            <SkeletonText width="80%" height={24} style={{ marginBottom: 8 }} />
            <View style={styles.locationRow}>
              <SkeletonText width="50%" height={16} />
              <SkeletonText width="30%" height={16} style={{ marginLeft: 10 }} />
            </View>
          </View>

          {/* Condition Badge Skeleton */}
          <View style={styles.conditionContainer}>
            <SkeletonBox width={80} height={30} style={styles.skeletonBadge} />
          </View>

          {/* Description Skeleton */}
          <View style={styles.section}>
            <SkeletonText width="30%" height={20} style={{ marginBottom: 15 }} />
            <SkeletonText width="100%" height={16} style={{ marginBottom: 8 }} />
            <SkeletonText width="95%" height={16} style={{ marginBottom: 8 }} />
            <SkeletonText width="85%" height={16} style={{ marginBottom: 8 }} />
            <SkeletonText width="90%" height={16} />
          </View>

          {/* Specifications Skeleton */}
          <View style={styles.section}>
            <SkeletonText width="40%" height={20} style={{ marginBottom: 15 }} />
            {[1, 2, 3, 4, 5].map((item) => (
              <View key={item} style={styles.specItem}>
                <SkeletonText width="35%" height={16} />
                <SkeletonText width="25%" height={16} />
              </View>
            ))}
          </View>

          {/* Features Skeleton */}
          <View style={styles.section}>
            <SkeletonText width="30%" height={20} style={{ marginBottom: 15 }} />
            {[1, 2, 3, 4].map((item) => (
              <View key={item} style={styles.featureItem}>
                <SkeletonBox width={16} height={16} style={styles.skeletonBullet} />
                <SkeletonText width="80%" height={16} />
              </View>
            ))}
          </View>

          {/* Seller Information Skeleton */}
          <View style={styles.section}>
            <SkeletonText width="50%" height={20} style={{ marginBottom: 15 }} />
            <View style={styles.sellerCard}>
              <View style={styles.sellerInfo}>
                <SkeletonText width="60%" height={18} style={{ marginBottom: 8 }} />
                <View style={styles.sellerStats}>
                  <SkeletonText width="25%" height={14} />
                  <SkeletonText width="20%" height={14} />
                  <SkeletonText width="30%" height={14} />
                </View>
                <SkeletonBox width={70} height={24} style={styles.skeletonVerifiedBadge} />
              </View>
            </View>
          </View>

          {/* Bottom Spacing */}
          <View style={styles.bottomSpacing} />
        </ScrollView>

        {/* Action Bar Skeleton */}
        <View style={styles.actionBar}>
          <SkeletonBox width="100%" height={56} style={styles.skeletonActionButton} />
        </View>
      </SafeAreaView>
    );
  }

  // Show error state
  if (error) {
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
        </View>
        <View style={styles.content}>
          <Text style={styles.errorText}>Failed to load product details</Text>
          <TouchableOpacity style={styles.backToHomeButton} onPress={() => navigation.navigate('Home')}>
            <Text style={styles.backToHomeButtonText}>Back to Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.retryButton} onPress={refetch}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
  
  // Transform API data to match existing UI structure
  const transformApiData = (apiData) => {
    if (!apiData) return null;

    return {
      id: apiData._id || apiData.id,
      title: apiData.title || 'Product',
      price: apiData.price ? `Rs ${apiData.price.toLocaleString()}` : 'Price not available',
      originalPrice: null, // API doesn't provide original price
      location: apiData.neighborhoodId?.name && apiData.cityId?.name 
        ? `${apiData.neighborhoodId.name}, ${apiData.cityId.name}` 
        : apiData.regionId?.name || 'Location not specified',
      postedDate: apiData.createdAt ? new Date(apiData.createdAt).toLocaleDateString() : 'Date not available',
      condition: 'Available', // API doesn't provide condition, defaulting to available
      description: apiData.description || 'No description available',
      images: apiData.images && apiData.images.length > 0 
        ? apiData.images.map(img => ({ uri: img.imageUrl }))
        : [{ uri: 'https://via.placeholder.com/300x200?text=No+Image' }],
      seller: {
        name: apiData.userId ? `${apiData.userId.firstName} ${apiData.userId.lastName}` : 'Seller',
        rating: 4.5, // Default rating since API doesn't provide
        totalAds: 0, // Default since API doesn't provide
        memberSince: apiData.userId?.createdAt ? new Date(apiData.userId.createdAt).getFullYear().toString() : '2023',
        verified: apiData.userId?.isVerified || false,
        phone: apiData.userId?.phoneNumber || '+92 300 1234567',
        email: apiData.userId?.email || 'seller@email.com',
      },
      specifications: {
        'Item Number': apiData.itemNumber || 'N/A',
        'Category': apiData.subCategoryId?.name || 'N/A',
        'Region': apiData.regionId?.name || 'N/A',
        'City': apiData.cityId?.name || 'N/A',
        'Neighborhood': apiData.neighborhoodId?.name || 'N/A',
        'Status': apiData.process || 'N/A',
        'Featured': apiData.isFeatured ? 'Yes' : 'No',
        'View Count': apiData.viewCount || 0,
        'Available': apiData.available ? 'Yes' : 'No',
      },
      features: apiData.checkboxDetails ? apiData.checkboxDetails.map(item => 
        typeof item === 'object' ? item.checkboxValue || item.name || JSON.stringify(item) : item
      ) : [],
      category: apiData.subCategoryId?.name || 'Product',
      apiData: apiData, // Keep original API data for reference
    };
  };

  // Only use API data - no fallback
  const detailData = apiProductData ? transformApiData(apiProductData) : null;

  // Show error if no API data available
  if (!loading && !error && !detailData) {
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
        </View>
        <View style={styles.content}>
          <Text style={styles.errorText}>No product data available</Text>
          <TouchableOpacity style={styles.backToHomeButton} onPress={() => navigation.navigate('Home')}>
            <Text style={styles.backToHomeButtonText}>Back to Home</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }


  const handleContactSeller = () => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      Alert.alert(
        'Login Required',
        'You need to login to contact the seller. Would you like to login or create an account?',
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Login', 
            onPress: () => {
              setShouldProceedWithContact(true);
              navigation.navigate('Login', {
                returnToDetail: true
              });
            }
          },
          { 
            text: 'Sign Up', 
            onPress: () => {
              setShouldProceedWithContact(true);
              navigation.navigate('SignUp', {
                returnToDetail: true
              });
            }
          }
        ]
      );
      return;
    }

    // If authenticated, proceed with contact seller
    proceedWithContactSeller();
  };

  const proceedWithContactSeller = () => {
    // Show seller contact information with fallbacks
    const sellerName = detailData?.seller?.name || 'Seller';
    const sellerRating = detailData?.seller?.rating || '4.5';
    const memberSince = detailData?.seller?.memberSince || '2023';
    const sellerPhone = detailData?.seller?.phone || '+92 300 1234567';
    const sellerEmail = detailData?.seller?.email || `${sellerName.toLowerCase().replace(' ', '.')}@email.com`;
    
    Alert.alert(
      'Contact Seller',
      `Name: ${sellerName}\nPhone: ${sellerPhone}\nEmail: ${sellerEmail}\nRating: ⭐ ${sellerRating}\nMember since: ${memberSince}`,
      [
        { text: 'OK', style: 'default' }
      ]
    );
  };


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
    if (!detailData.features || !Array.isArray(detailData.features)) return null;
    
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Features</Text>
        <View style={styles.featuresList}>
          {detailData.features.map((feature, index) => {
            // Ensure feature is a string
            const featureText = typeof feature === 'string' ? feature : 
                               typeof feature === 'object' ? (feature.checkboxValue || feature.name || JSON.stringify(feature)) : 
                               String(feature);
            
            return (
              <View key={index} style={styles.featureItem}>
                <Text style={styles.featureBullet}>•</Text>
                <Text style={styles.featureText}>{featureText}</Text>
              </View>
            );
          })}
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
          <View style={styles.headerActions}>
            {/* Header actions can be added here if needed */}
          </View>
        </View>

        {/* Main Image */}
        <View style={styles.imageContainer}>
          <View style={styles.mainImage}>
            {typeof detailData.images[0] === 'string' ? (
              <Text style={styles.imagePlaceholder}>{detailData.images[0]}</Text>
            ) : detailData.images[0]?.uri ? (
              <Image 
                source={{ uri: detailData.images[0].uri }} 
                style={styles.mainImageTag} 
                resizeMode="cover"
              />
            ) : (
              <Image 
                source={detailData.images[0]} 
                style={styles.mainImageTag} 
                resizeMode="cover"
              />
            )}
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
    paddingTop: Platform.OS === 'android' ? 10 : 0,
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
  mainImageTag: {
    width: '100%',
    height: '100%',
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
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#4ecdc4',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  // Skeleton Loading Styles
  skeletonBox: {
    backgroundColor: '#e1e9ee',
    borderRadius: 4,
    overflow: 'hidden',
  },
  skeletonText: {
    backgroundColor: '#e1e9ee',
    borderRadius: 4,
  },
  skeletonImage: {
    backgroundColor: '#e1e9ee',
    borderRadius: 0,
  },
  skeletonHeaderAction: {
    borderRadius: 20,
  },
  skeletonBadge: {
    borderRadius: 15,
  },
  skeletonBullet: {
    borderRadius: 8,
  },
  skeletonVerifiedBadge: {
    borderRadius: 12,
  },
  skeletonActionButton: {
    borderRadius: 25,
  },
});

export default DetailScreen; 