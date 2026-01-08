@echo off
REM Studio Micho React - Startup Script for Windows
REM This script starts the development server

echo.
echo ================================
echo   Studio Micho React
echo ================================
echo.
echo Checking if dependencies are installed...
echo.

if not exist "node_modules\" (
    echo [WARNING] node_modules not found. Installing dependencies...
    echo.
    call npm install
    echo.
    echo [SUCCESS] Dependencies installed!
    echo.
) else (
    echo [SUCCESS] Dependencies already installed
    echo.
)

echo Starting development server...
echo.
echo ================================
echo   Server will be available at:
echo   http://localhost:3000
echo ================================
echo.
echo Press Ctrl+C to stop the server
echo.

call npm run dev
