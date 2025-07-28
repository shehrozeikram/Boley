# Detail Screens

This directory contains all the detail screens for different categories in the Boly app. Each screen is organized and structured with consistent design patterns and reusable components.

## Structure

```
screens/detail/
├── index.js                    # Exports all detail screens
├── README.md                   # This documentation
├── MobileDetailScreen.js       # Mobile phones detail screen
├── VehicleDetailScreen.js      # Vehicles detail screen
├── PropertyDetailScreen.js     # Properties detail screen
├── ElectronicsDetailScreen.js  # Electronics detail screen
└── JobsDetailScreen.js         # Jobs detail screen
```

## Components

All detail screens use shared components from the `components/` directory:

- `DetailHeader.js` - Reusable header with back button and actions
- `DetailActionBar.js` - Reusable action bar with favorite, chat, call buttons
- `SellerCard.js` - Reusable seller/company information card

## Screen Features

Each detail screen includes:

### Common Features
- **Header**: Back navigation, share, and favorite buttons
- **Image Gallery**: Main image with indicators (placeholder emojis for now)
- **Price/Value Section**: Current price, original price, title, location
- **Condition Badge**: Item condition (Used, New, etc.)
- **Specifications**: Category-specific technical details
- **Features/Amenities**: List of features or amenities
- **Description**: Detailed description of the item
- **Seller Information**: Seller/company details with rating
- **Similar Items**: Horizontal scroll of similar listings
- **Action Bar**: Favorite, chat, call, and category-specific actions

### Category-Specific Features

#### MobileDetailScreen
- Technical specifications (RAM, Storage, Camera, etc.)
- Features list (Face ID, Wireless Charging, etc.)
- Battery health information

#### VehicleDetailScreen
- Vehicle specifications (Make, Model, Year, Mileage, etc.)
- Features list (Power Steering, Air Conditioning, etc.)
- Documents section (Registration, Insurance, etc.)

#### PropertyDetailScreen
- Property details (Bedrooms, Bathrooms, Area, etc.)
- Amenities list (Air Conditioning, Parking, etc.)
- Location details with distances to key places
- Nearby places list
- Quick stats (Bedrooms, Bathrooms, Area)

#### ElectronicsDetailScreen
- Technical specifications (Brand, Model, Processor, etc.)
- Features list (Retina Display, Touch Bar, etc.)
- Warranty information
- Included accessories

#### JobsDetailScreen
- Job requirements (Experience, Education, Skills, etc.)
- Key responsibilities list
- Benefits & perks
- Required skills badges
- Company information

## Usage

To use these screens in your navigation:

```javascript
import { 
  MobileDetailScreen, 
  VehicleDetailScreen, 
  PropertyDetailScreen,
  ElectronicsDetailScreen,
  JobsDetailScreen 
} from './screens/detail';

// In your navigation stack
<Stack.Screen name="MobileDetail" component={MobileDetailScreen} />
<Stack.Screen name="VehicleDetail" component={VehicleDetailScreen} />
<Stack.Screen name="PropertyDetail" component={PropertyDetailScreen} />
<Stack.Screen name="ElectronicsDetail" component={ElectronicsDetailScreen} />
<Stack.Screen name="JobsDetail" component={JobsDetailScreen} />
```

## Data Structure

Each screen expects data to be passed via `route.params` with the following structure:

```javascript
const itemData = {
  id: '1',
  title: 'Item Title',
  price: 'Rs 100,000',
  originalPrice: 'Rs 120,000',
  location: 'City, Country',
  postedDate: '2 days ago',
  condition: 'Used',
  description: 'Detailed description...',
  images: ['📱', '📱', '📱'],
  seller: {
    name: 'Seller Name',
    rating: 4.8,
    totalAds: 12,
    memberSince: '2021',
    verified: true,
  },
  specifications: {
    'Key': 'Value',
    // ... more specs
  },
  features: [
    'Feature 1',
    'Feature 2',
    // ... more features
  ]
};
```

## Styling

All screens use consistent styling with:
- Primary color: `#2ecc71` (green)
- Secondary color: `#3498db` (blue)
- Background: `#fff` (white)
- Card background: `#f8f9fa` (light gray)
- Text colors: `#333` (dark), `#666` (medium), `#999` (light)

## Future Enhancements

- Add image carousel functionality
- Implement real image loading
- Add video support for listings
- Implement review/rating system
- Add map integration for location-based features
- Implement real-time chat functionality
- Add payment integration
- Implement advanced filtering and search 