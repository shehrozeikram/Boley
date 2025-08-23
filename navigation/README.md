# Navigation Structure

This directory contains the navigation setup for the Boly app using React Navigation.

## Structure

```
navigation/
├── AppNavigator.js    # Main navigation container
└── README.md         # This documentation
```

## Detail Screen Navigation

The app uses a single, dynamic `DetailScreen` that handles all categories:

```javascript
// Navigate to detail screen with category and item data
navigation.navigate('Detail', { 
  category: 'Vehicle', // or 'Property', 'Electronics', 'Job'
  item: itemData 
});
```

### Example Usage

```javascript
// From HomeScreen
navigation.navigate('Detail', { 
  category: 'Vehicle',
  item: vehicleItem 
});

// From CategoryListingScreen
navigation.navigate('Detail', { 
  category: 'Property',
  item: propertyItem 
});

// From SearchScreen
navigation.navigate('Detail', { 
  category: 'Electronics',
  item: electronicsItem 
});
```

### Category-Specific Data

The DetailScreen automatically generates appropriate data based on the category:
- **Vehicle**: Specifications, features, documents
- **Property**: Amenities, location details, nearby places
- **Electronics**: Specifications, warranty, accessories
- **Jobs**: Requirements, responsibilities, benefits

## Screen Navigation Flow

### Main Flow
1. **SplashScreen** → **LoginScreen** (if not logged in)
2. **LoginScreen** → **MainNavigator** (after successful login)
3. **MainNavigator** → **HomeScreen** (default tab)

### Category Navigation
1. **HomeScreen** → **CategoryListingScreen** (when category is tapped)
2. **CategoryListingScreen** → **DetailScreen** (when item is tapped)
3. **DetailScreen** → **Back** (returns to previous screen)

### Search Flow
1. **HomeScreen** → **SearchScreen** (when search bar is tapped)
2. **SearchScreen** → **DetailScreen** (when search result is tapped)

### Recently Viewed
1. **HomeScreen** → **RecentlyViewedScreen** (when "See All" is tapped)
2. **RecentlyViewedScreen** → **DetailScreen** (when item is tapped)

## Navigation Structure

```
AppNavigator
├── SplashScreen
├── AuthNavigator
│   ├── LoginScreen
│   └── SignUpScreen
└── MainNavigator
    ├── HomeScreen
    ├── SearchScreen
    ├── SellScreen
    ├── ChatsScreen
    ├── AccountScreen
    └── DetailScreen (Dynamic - handles all categories)
```

## Key Features

### ✅ Dynamic Detail Screen
- **Single Component**: Handles all categories (Vehicle, Property, Electronics, Jobs)
- **Category-Specific Data**: Automatically loads appropriate content
- **Consistent UI**: Same layout and behavior across all categories

### ✅ Tab Navigation
- **Bottom Tabs**: Easy access to main sections
- **Swipe Gestures**: Smooth navigation between tabs
- **Badge Support**: Notifications and unread counts

### ✅ Stack Navigation
- **Push/Pop**: Standard navigation patterns
- **Back Button**: Automatic back button handling
- **Header Customization**: Category-specific headers

## Implementation Details

### Navigation Setup
```javascript
// In AppNavigator.js
const Stack = createStackNavigator();

<Stack.Navigator>
  <Stack.Screen name="Detail" component={DetailScreen} />
</Stack.Navigator>
```

### Route Parameters
```javascript
// Navigation call
navigation.navigate('Detail', { 
  category: 'Vehicle',
  item: itemData 
});

// In DetailScreen
const { category, item } = route.params || {};
```

### Category Handling
```javascript
// Dynamic data generation based on category
const getDetailData = (categoryName, itemData) => {
  if (category.includes('vehicle')) {
    return { /* Vehicle-specific data */ };
  } else if (category.includes('property')) {
    return { /* Property-specific data */ };
  }
  // ... etc
};
```

## Benefits

1. **Maintainability**: Single detail screen instead of 5 separate ones
2. **Consistency**: Same UI and behavior across all categories
3. **Performance**: Reduced component switching overhead
4. **Scalability**: Easy to add new categories
5. **Code Reuse**: No duplicate logic between screens

## Future Enhancements

1. **Category-Specific UI**: Different layouts for different categories
2. **Custom Actions**: Different buttons/actions per category
3. **Analytics**: Track category-specific user behavior
4. **Deep Linking**: Direct navigation to specific items 