#!/bin/bash

# Studio Micho React - Server Stop Script
# Kills all Next.js dev servers cleanly

echo "🛑 Stopping Studio Micho Server..."
echo "===================================="
echo ""

# Kill all Next.js processes
echo "📍 Killing Next.js processes..."
pkill -9 -f "next dev" 2>/dev/null
pkill -9 -f "next-server" 2>/dev/null
pkill -9 node 2>/dev/null

# Free ports
echo "📍 Freeing ports 3000-3010..."
for port in {3000..3010}; do
    fuser -k $port/tcp 2>/dev/null
done

# Clean lock files
echo "📍 Cleaning lock files..."
rm -rf .next/dev/lock 2>/dev/null
rm -rf .next/cache 2>/dev/null

sleep 1

echo ""
echo "✅ Server stopped successfully!"
echo ""
echo "To restart: ./restart-server.sh"
echo ""
