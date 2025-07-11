@echo off
echo.
echo ========================================
echo    🚀 Starting Shop Galaxy Server
echo ========================================
echo.
echo 🌐 Server will be available at:
echo    http://localhost:8000
echo.
echo 📱 Open your browser and navigate to:
echo    http://localhost:8000
echo.
echo ⚠️  Press Ctrl+C to stop the server
echo.
echo ========================================
echo.

python -m http.server 8000

echo.
echo ========================================
echo    🛑 Server stopped
echo ========================================
echo.
pause 