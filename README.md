# Boly - Pakistan's Premier Marketplace

A React Native mobile application for buying and selling everything in Pakistan. From vehicles and properties to electronics and jobs, Boly connects buyers and sellers across the country.

## Features

- **Browse Categories**: Vehicles, properties, electronics, jobs, and more
- **Search & Filter**: Find exactly what you're looking for with advanced search
- **Location-Based**: Discover items near you
- **Seller Profiles**: Verified seller information and ratings
- **Recently Viewed**: Track items you've browsed
- **Favorites**: Save items for later

## Getting Started

### Prerequisites

- Node.js (>= 18)
- React Native CLI
- Xcode (for iOS development)
- Android Studio (for Android development)

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd Boly
```

2. Install dependencies
```bash
npm install
```

3. Install iOS dependencies
```bash
cd ios && pod install && cd ..
```

4. Run the app
```bash
# iOS
npm run ios

# Android
npm run android
```

## App Store Submission

### Prerequisites

- Apple Developer Account ($99/year)
- Xcode (latest version)
- App Store Connect access

### Quick Start

1. **Update Bundle Identifier**
   - Open `ios/Boly.xcodeproj` in Xcode
   - Set Bundle Identifier to `com.boly.app`

2. **Build for Release**
   ```bash
   ./scripts/build-ios.sh
   ```

3. **Upload to App Store Connect**
   - Open Xcode → Window → Organizer
   - Select your archive
   - Click "Distribute App" → "App Store Connect"

### Detailed Guide

See [APP_STORE_SUBMISSION_GUIDE.md](./APP_STORE_SUBMISSION_GUIDE.md) for complete step-by-step instructions.

### Checklist

See [APP_STORE_SUBMISSION_CHANGES.md](./APP_STORE_SUBMISSION_CHANGES.md) for a comprehensive checklist.

## Project Structure

```
Boly/
├── android/                 # Android-specific files
├── ios/                    # iOS-specific files
├── screens/                # App screens
│   ├── detail/            # Detail screens for different categories
│   └── navigators/        # Navigation screens
├── components/            # Reusable components
├── navigation/            # Navigation configuration
├── modals/               # Modal components
├── assets/               # Images, videos, and other assets
├── scripts/              # Build and utility scripts
└── docs/                 # Documentation
```

## Configuration

### App Configuration
- **Bundle ID**: `com.boly.app`
- **Version**: `1.0.0`
- **Build**: `1`

### Permissions
- **Location**: Show relevant ads in your area
- **Camera**: Take photos of items to sell
- **Photo Library**: Select photos for listings

## Privacy Policy

See [PRIVACY_POLICY.md](./PRIVACY_POLICY.md) for our privacy policy.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support

For support and questions:
- Email: support@boly.app
- Documentation: See the guides in this repository

## License

This project is proprietary software. All rights reserved.

---

**Note**: This app is ready for App Store submission. All non-functional elements have been properly disabled to ensure compliance with Apple's review guidelines.
