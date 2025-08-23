#!/bin/bash

# iOS Build Script for App Store Submission
# This script automates the build process for Boly iOS app

set -e

echo "🚀 Starting iOS build process for Boly..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -d "ios" ]; then
    print_error "iOS directory not found. Please run this script from the project root."
    exit 1
fi

# Navigate to iOS directory
cd ios

print_status "Cleaning previous builds..."
xcodebuild clean -workspace Boly.xcworkspace -scheme Boly

print_status "Installing CocoaPods dependencies..."
pod install

print_status "Building for Release..."
xcodebuild -workspace Boly.xcworkspace -scheme Boly -configuration Release -destination generic/platform=iOS -archivePath build/Boly.xcarchive archive

if [ $? -eq 0 ]; then
    print_success "Archive created successfully!"
    print_status "Archive location: ios/build/Boly.xcarchive"
    
    echo ""
    print_status "Next steps:"
    echo "1. Open Xcode"
    echo "2. Go to Window → Organizer"
    echo "3. Select the Boly.xcarchive"
    echo "4. Click 'Distribute App'"
    echo "5. Choose 'App Store Connect'"
    echo "6. Follow the export process"
    echo ""
    print_warning "Make sure you have:"
    echo "- Apple Developer Account"
    echo "- App Store Connect access"
    echo "- Proper certificates and provisioning profiles"
    echo "- App icons in all required sizes"
    echo "- Privacy policy URL"
    
else
    print_error "Build failed! Please check the error messages above."
    exit 1
fi

print_success "Build process completed!" 