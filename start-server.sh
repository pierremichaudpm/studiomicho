#!/bin/bash

# Studio Micho React - Startup Script
# This script starts the development server

echo "🚀 Starting Studio Micho React..."
echo ""
echo "📦 Checking if dependencies are installed..."

if [ ! -d "node_modules" ]; then
    echo "⚠️  node_modules not found. Installing dependencies..."
    npm install
    echo "✅ Dependencies installed!"
    echo ""
else
    echo "✅ Dependencies already installed"
    echo ""
fi

echo "🔥 Starting development server..."
echo ""
echo "📍 The site will be available at:"
echo "   → http://localhost:3000"
echo ""
echo "⌨️  Press Ctrl+C to stop the server"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

npm run dev
