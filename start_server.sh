#!/bin/bash

echo ""
echo "========================================"
echo "   🚀 Starting Shop Galaxy Server"
echo "========================================"
echo ""
echo "🌐 Server will be available at:"
echo "   http://localhost:8000"
echo ""
echo "📱 Open your browser and navigate to:"
echo "   http://localhost:8000"
echo ""
echo "⚠️  Press Ctrl+C to stop the server"
echo ""
echo "========================================"
echo ""

python3 -m http.server 8000

echo ""
echo "========================================"
echo "   🛑 Server stopped"
echo "========================================"
echo "" 