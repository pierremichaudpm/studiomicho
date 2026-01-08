#!/bin/bash

# Studio Micho React - Robust Server Restart Script for Ubuntu
# This script kills all Next.js processes and restarts cleanly

echo "🔧 Studio Micho - Server Restart Script"
echo "========================================"
echo ""

# Step 1: Kill all Next.js dev processes
echo "📍 Step 1: Stopping all Next.js processes..."
pkill -9 -f "next dev" 2>/dev/null
pkill -9 -f "next-server" 2>/dev/null
pkill -9 node 2>/dev/null
sleep 1
echo "✅ All Node/Next processes killed"
echo ""

# Step 2: Remove lock files
echo "📍 Step 2: Cleaning lock files..."
rm -rf .next/dev/lock 2>/dev/null
rm -rf .next/cache 2>/dev/null
echo "✅ Lock files removed"
echo ""

# Step 3: Kill processes on port 3000-3010
echo "📍 Step 3: Freeing ports 3000-3010..."
for port in {3000..3010}; do
    fuser -k $port/tcp 2>/dev/null
done
sleep 1
echo "✅ Ports freed"
echo ""

# Step 4: Start the dev server
echo "📍 Step 4: Starting development server..."
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Server will start on http://localhost:3000"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "⌨️  Press Ctrl+C to stop the server"
echo ""

npm run dev
