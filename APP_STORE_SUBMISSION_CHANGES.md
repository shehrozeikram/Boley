# App Store Submission Checklist

## ✅ Completed Changes

### 1. App Configuration
- [x] Updated `app.json` with proper bundle identifier
- [x] Added iOS configuration with permissions
- [x] Set version to 1.0.0
- [x] Added build number

### 2. Permissions
- [x] Location permission description
- [x] Camera permission description  
- [x] Photo library permission description

## 🔄 Required Changes

### 1. iOS Project Configuration
- [ ] Open `ios/Boly.xcodeproj` in Xcode
- [ ] Update Bundle Identifier to `com.boly.app`
- [ ] Set Marketing Version to `1.0.0`
- [ ] Set Current Project Version to `1`

### 2. App Icons
- [ ] Create 1024x1024 App Store icon
- [ ] Add all required icon sizes to `ios/Boly/Images.xcassets/AppIcon.appiconset/`
- [ ] Update `Contents.json` in AppIcon.appiconset

### 3. Launch Screen
- [ ] Update `ios/Boly/LaunchScreen.storyboard`
- [ ] Ensure it matches your app design
- [ ] Test on different device sizes

### 4. Privacy Policy
- [ ] Create privacy policy website/page
- [ ] Add privacy policy URL to app
- [ ] Update Info.plist with privacy policy link

### 5. App Store Metadata
- [ ] App name: "Boly"
- [ ] Subtitle: "Buy and Sell Everything"
- [ ] Keywords: "marketplace,classifieds,buy,sell,Pakistan"
- [ ] Description (see guide for full text)
- [ ] Screenshots for all required device sizes

### 6. Testing
- [ ] Test app thoroughly on different devices
- [ ] Ensure no crashes during normal usage
- [ ] Test all major features
- [ ] Verify permissions work correctly

### 7. Build Configuration
- [ ] Set build configuration to Release
- [ ] Archive the app using Xcode
- [ ] Export IPA for App Store Connect

## 📱 Required Screenshots

### iPhone Screenshots
- [ ] iPhone 6.7" Display (1290 x 2796)
- [ ] iPhone 6.5" Display (1242 x 2688)  
- [ ] iPhone 5.5" Display (1242 x 2208)

### iPad Screenshots (if supporting iPad)
- [ ] iPad Pro 12.9" Display (2048 x 2732)
- [ ] iPad Pro 11" Display (1668 x 2388)

## 🚨 Critical Items

### Before Submission
- [ ] App doesn't crash during testing
- [ ] All features work as described
- [ ] Privacy policy is accessible
- [ ] App icons are properly sized
- [ ] Launch screen looks professional
- [ ] Bundle identifier is unique
- [ ] Version numbers are correct

### App Store Connect
- [ ] App record created
- [ ] Build uploaded successfully
- [ ] All metadata completed
- [ ] Screenshots uploaded
- [ ] Privacy policy URL added
- [ ] App review information filled

## 📋 Submission Checklist

### Final Steps
- [ ] Submit for review
- [ ] Answer compliance questions
- [ ] Monitor review status
- [ ] Respond to any review feedback
- [ ] Prepare for release

## 🔧 Technical Requirements

### Code Changes Needed
```javascript
// In your app, ensure these are properly configured:
// 1. Bundle identifier in Xcode
// 2. Version numbers
// 3. App icons
// 4. Launch screen
// 5. Privacy policy integration
```

### Build Commands
```bash
# Clean and build for release
cd ios
xcodebuild clean -workspace Boly.xcworkspace -scheme Boly
xcodebuild -workspace Boly.xcworkspace -scheme Boly -configuration Release -destination generic/platform=iOS -archivePath build/Boly.xcarchive archive
```

## 📞 Support Resources

- [Apple Developer Documentation](https://developer.apple.com/documentation/)
- [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- [App Store Connect Help](https://help.apple.com/app-store-connect/)
- [iOS Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/) 