#!/bin/bash

# PayMyBill Local Development Server
# This script starts a local web server for testing

echo "🚀 Starting PayMyBill local development server..."
echo ""
echo "📁 Working directory: $(pwd)"
echo ""
echo "🌐 Server will be available at:"
echo "   http://localhost:8000"
echo ""
echo "💡 Press Ctrl+C to stop the server"
echo ""
echo "---"
echo ""

# Check if Python 3 is available
if command -v python3 &> /dev/null; then
    echo "✅ Using Python 3"
    echo ""
    echo "📱 Open in your browser:"
    echo "   http://localhost:8000"
    echo ""

    # Open browser automatically (macOS)
    if [[ "$OSTYPE" == "darwin"* ]]; then
        echo "🌐 Opening browser..."
        sleep 1 && open http://localhost:8000 &
    fi

    echo "Server log:"
    echo "---"
    python3 -m http.server 8000

elif command -v python &> /dev/null; then
    echo "✅ Using Python"
    echo ""
    echo "📱 Open in your browser:"
    echo "   http://localhost:8000"
    echo ""

    # Open browser automatically (macOS)
    if [[ "$OSTYPE" == "darwin"* ]]; then
        echo "🌐 Opening browser..."
        sleep 1 && open http://localhost:8000 &
    fi

    echo "Server log:"
    echo "---"
    python -m http.server 8000

else
    echo "❌ Python not found!"
    echo ""
    echo "Please install Python or use another server method:"
    echo "  - Node.js: npx http-server -p 8000"
    echo "  - PHP: php -S localhost:8000"
    echo ""
    echo "See LOCAL_DEVELOPMENT.md for more options."
    exit 1
fi
