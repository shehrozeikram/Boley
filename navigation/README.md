# Navigation Structure

This directory contains the navigation setup for the Boly app using React Navigation.

## Structure

```
navigation/
├── AppNavigator.js    # Main navigation container
└── README.md         # This documentation
```

## Navigation Flow

### Main Navigation
- **Tab Navigator**: Bottom tab navigation with Home, Chats, My Ads, and Account
- **Stack Navigator**: Handles navigation between screens and detail views

### Screen Hierarchy

```
AppNavigator
├── MainTabs (TabNavigator)
│   ├── Home
│   ├── Chats
│   ├── Sell (Special floating button)
│   ├── MyAds
│   └── Account
├── CategoryListing
├── Search
├── RecentlyViewed
└── Detail (Dynamic - handles all categories)
```

## Navigation Features

### Tab Navigation
- **Home**: Main home screen with categories and recently viewed items
- **Chats**: Chat/messaging screen
- **Sell**: Dedicated selling screen with category selection and tips
- **My Ads**: User's posted advertisements
- **Account**: User profile and settings

### Stack Navigation
- **CategoryListing**: Shows items from a specific category
- **Search**: Dedicated search screen with global search functionality
- **RecentlyViewed**: Shows all recently viewed items in a grid layout
- **Detail**: Dynamic detail screen that handles all categories (Mobile, Vehicle, Property, Electronics, Jobs)

## Usage

### Navigating to Detail Screen
```javascript
// From any screen
navigation.navigate('Detail', { 
  category: 'Mobile', // or 'Vehicle', 'Property', 'Electronics', 'Job'
  item: itemData 
});
```

### Navigating to Category Listing
```javascript
// From HomeScreen
navigation.navigate('CategoryListing', { category: 'Mobiles' });
```

### Navigating to Search Screen
```javascript
// From HomeScreen
navigation.navigate('Search');
```

### Navigating to Recently Viewed Screen
```javascript
// From HomeScreen
navigation.navigate('RecentlyViewed');
```

### Going Back
```javascript
navigation.goBack();
```

## Dependencies

- `@react-navigation/native`: Core navigation library
- `@react-navigation/stack`: Stack navigator for detail screens
- `@react-navigation/bottom-tabs`: Tab navigator for main screens
- `react-native-screens`: Native screen components
- `react-native-safe-area-context`: Safe area handling

## Installation

The navigation dependencies are already installed. For iOS, run:
```bash
cd ios && pod install
```

## Future Enhancements

- Add search functionality
- Implement deep linking
- Add navigation state persistence
- Implement navigation analytics
- Add custom transitions
- Support for nested navigators 