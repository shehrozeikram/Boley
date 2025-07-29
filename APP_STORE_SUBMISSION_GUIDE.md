# App Store Submission Guide for Boly

## Prerequisites

### 1. Apple Developer Account
- You need a paid Apple Developer Account ($99/year)
- Sign up at: https://developer.apple.com/

### 2. Xcode Setup
- Install the latest version of Xcode from the Mac App Store
- Open Xcode and sign in with your Apple Developer Account

## Step-by-Step Submission Process

### Step 1: Configure Bundle Identifier

1. Open your project in Xcode:
   ```bash
   cd ios
   open Boly.xcworkspace
   ```

2. In Xcode:
   - Select the "Boly" project in the navigator
   - Select the "Boly" target
   - Go to "General" tab
   - Set "Bundle Identifier" to something unique like: `com.yourcompany.boly`

### Step 2: Configure Code Signing

1. In Xcode, still in the "Boly" target:
   - Go to "Signing & Capabilities" tab
   - Check "Automatically manage signing"
   - Select your Team (Apple Developer Account)
   - Xcode will automatically create provisioning profiles

### Step 3: Set App Version

1. In the "General" tab:
   - Set "Version" (e.g., "1.0.0") - This is the public version
   - Set "Build" (e.g., "1") - This is the build number

### Step 4: Configure App Icons

1. Replace the default app icons in `ios/Boly/Images.xcassets/AppIcon.appiconset/`
2. You need icons in these sizes:
   - 1024x1024 (App Store)
   - 180x180 (iPhone)
   - 167x167 (iPad)
   - 152x152 (iPad)
   - 120x120 (iPhone)
   - 87x87 (iPhone)
   - 80x80 (iPhone)
   - 76x76 (iPad)
   - 60x60 (iPhone)
   - 40x40 (iPhone)
   - 29x29 (iPhone)

### Step 5: Build for Release

1. In Xcode:
   - Select "Any iOS Device (arm64)" as the target
   - Go to Product → Archive

2. If successful, the Organizer will open with your archive

### Step 6: Upload to App Store Connect

1. In the Organizer:
   - Select your archive
   - Click "Distribute App"
   - Choose "App Store Connect"
   - Click "Upload"
   - Follow the signing steps

### Step 7: Configure App Store Connect

1. Go to https://appstoreconnect.apple.com/
2. Create a new app:
   - Platform: iOS
   - Name: Boly
   - Bundle ID: com.yourcompany.boly (same as in Xcode)
   - SKU: boly-app (unique identifier)

### Step 8: Fill App Information

1. **App Information:**
   - Category: Shopping
   - Subcategory: Lifestyle
   - Content Rights: No
   - Age Rating: Complete the questionnaire

2. **Pricing and Availability:**
   - Price: Free
   - Availability: Select countries

3. **App Review Information:**
   - Contact Information
   - Demo Account (if needed)
   - Notes for Review

### Step 9: App Store Listing

1. **App Store:**
   - App Name: Boly
   - Subtitle: Buy and sell anything
   - Keywords: marketplace, buy, sell, classifieds, local
   - Description: Write a compelling description
   - Screenshots: Upload screenshots of your app
   - App Preview: Upload video preview (optional)

2. **Screenshots Required:**
   - iPhone 6.7" Display: 1290 x 2796
   - iPhone 6.5" Display: 1242 x 2688
   - iPhone 5.5" Display: 1242 x 2208
   - iPad Pro 12.9" Display: 2048 x 2732
   - iPad Pro 11" Display: 1668 x 2388

### Step 10: Submit for Review

1. In App Store Connect:
   - Go to "App Store" tab
   - Click "Submit for Review"
   - Answer any additional questions
   - Submit

## Important Notes

### Privacy Policy
- You need a privacy policy URL
- Create one at: https://www.privacypolicygenerator.info/
- Host it on your website or GitHub Pages

### App Store Guidelines
- Ensure your app follows Apple's App Store Review Guidelines
- Test all functionality thoroughly
- Remove any "Coming Soon" or non-functional features

### Common Rejection Reasons
1. **Missing Privacy Policy**
2. **Non-functional features**
3. **Incomplete app information**
4. **Poor app performance**
5. **Missing app icons**

## Current App Status

✅ **Ready for submission:**
- All non-functional features commented out
- Privacy manifest configured
- Location permissions properly implemented
- App Store compliant UI

⚠️ **Still needed:**
- Apple Developer Account
- Bundle identifier configuration
- App icons
- Privacy policy URL
- App Store screenshots
- App description and metadata

## Quick Commands

```bash
# Open project in Xcode
cd ios && open Boly.xcworkspace

# Build for release (after configuring signing)
cd ios && xcodebuild -workspace Boly.xcworkspace -scheme Boly -configuration Release -destination generic/platform=iOS -archivePath Boly.xcarchive archive

# Clean build
cd ios && xcodebuild clean -workspace Boly.xcworkspace -scheme Boly
```

## Support Resources

- [Apple Developer Documentation](https://developer.apple.com/documentation/)
- [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- [App Store Connect Help](https://help.apple.com/app-store-connect/) 