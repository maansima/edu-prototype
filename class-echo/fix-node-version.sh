#!/bin/bash

echo "🔍 Checking Node.js version..."
NODE_VERSION=$(node --version)
echo "Current Node.js version: $NODE_VERSION"

# Extract major version number
MAJOR_VERSION=$(echo $NODE_VERSION | cut -d'.' -f1 | sed 's/v//')

if [ "$MAJOR_VERSION" -lt 14 ]; then
    echo "❌ Error: Node.js version $NODE_VERSION is too old"
    echo "   This project requires Node.js 14.0.0 or higher"
    echo ""
    echo "Please upgrade Node.js:"
    echo "  • Using nvm: nvm install 22 && nvm use 22"
    echo "  • Direct download: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version is compatible"
echo ""
echo "🧹 Cleaning old dependencies..."
rm -rf node_modules package-lock.json

echo "📦 Installing fresh dependencies..."
npm install

echo ""
echo "✨ Done! Your dependencies are now compatible with Node.js $NODE_VERSION"
echo ""
echo "You can now run:"
echo "  npm run dev    # Start development server"
echo "  npm run build  # Build for production"
