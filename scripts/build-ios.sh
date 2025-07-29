#!/bin/bash

# iOS Build Script for Boly App Store Submission
# Usage: ./scripts/build-ios.sh

set -e

echo "🚀 Starting iOS build for App Store submission..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Check if iOS directory exists
if [ ! -d "ios" ]; then
    echo "❌ Error: iOS directory not found"
    exit 1
fi

echo "📱 Building iOS app..."

# Clean previous builds
echo "🧹 Cleaning previous builds..."
cd ios
xcodebuild clean -workspace Boly.xcworkspace -scheme Boly

# Build for archive
echo "🔨 Building archive..."
xcodebuild -workspace Boly.xcworkspace -scheme Boly -configuration Release -destination generic/platform=iOS -archivePath Boly.xcarchive archive

echo "✅ Build completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Open Xcode: open ios/Boly.xcworkspace"
echo "2. Go to Window → Organizer"
echo "3. Select your archive and click 'Distribute App'"
echo "4. Choose 'App Store Connect' and follow the steps"
echo ""
echo "📖 For detailed instructions, see: APP_STORE_SUBMISSION_GUIDE.md" 