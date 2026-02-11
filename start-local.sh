#!/bin/bash

# CheckPay Local Development Server
# Usage: ./start-local.sh [port]

PORT=${1:-8000}

echo "🚀 Starting CheckPay local development server..."
echo ""
echo "📁 Working directory: $(pwd)"
echo ""
echo "🌐 Server will be available at:"
echo "   Landing page: http://localhost:$PORT/index.html"
echo "   App:          http://localhost:$PORT/app.html"
echo ""
echo "💡 Press Ctrl+C to stop the server"
echo ""
echo "---"
echo ""

# Check if Python 3 is available
if command -v python3 &> /dev/null; then
    echo "✅ Using Python 3"
    echo ""

    # Open browser automatically (macOS)
    if [[ "$OSTYPE" == "darwin"* ]]; then
        echo "🌐 Opening browser..."
        sleep 1 && open "http://localhost:$PORT/index.html" &
    fi

    echo "Server log:"
    echo "---"
    python3 -m http.server "$PORT"

elif command -v python &> /dev/null; then
    echo "✅ Using Python"
    echo ""

    # Open browser automatically (macOS)
    if [[ "$OSTYPE" == "darwin"* ]]; then
        echo "🌐 Opening browser..."
        sleep 1 && open "http://localhost:$PORT/index.html" &
    fi

    echo "Server log:"
    echo "---"
    python -m http.server "$PORT"

else
    echo "❌ Python not found!"
    echo ""
    echo "Please install Python or use another server method:"
    echo "  - Node.js: npx http-server -p $PORT"
    echo "  - PHP: php -S localhost:$PORT"
    exit 1
fi
