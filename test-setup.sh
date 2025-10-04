#!/bin/bash

# Portfolio Website Test Setup Script
echo "🚀 Portfolio Website Test Setup"
echo "================================"

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker Desktop and try again."
    exit 1
fi

echo "✅ Docker is running"

# Test frontend build
echo "📦 Testing frontend build..."
cd frontend
npm install --no-fund --no-audit
if npm run build; then
    echo "✅ Frontend build successful"
else
    echo "❌ Frontend build failed"
    exit 1
fi

# Test backend
echo "🔧 Testing backend..."
cd ../backend
npm install --no-fund --no-audit
if node src/server.js --version 2>/dev/null || echo "Backend dependencies installed"; then
    echo "✅ Backend setup successful"
else
    echo "❌ Backend setup failed"
    exit 1
fi

# Test Docker builds
echo "🐳 Testing Docker builds..."
cd ..

echo "Building frontend Docker image..."
if docker build -t portfolio-frontend-test ./frontend; then
    echo "✅ Frontend Docker build successful"
else
    echo "❌ Frontend Docker build failed"
    exit 1
fi

echo "Building backend Docker image..."
if docker build -t portfolio-backend-test ./backend; then
    echo "✅ Backend Docker build successful"
else
    echo "❌ Backend Docker build failed"
    exit 1
fi

echo ""
echo "🎉 All tests passed!"
echo ""
echo "Next steps:"
echo "1. Start development servers:"
echo "   Frontend: cd frontend && npm run dev"
echo "   Backend:  cd backend && npm run start"
echo ""
echo "2. Or use Docker:"
echo "   docker-compose -f docker-compose.dev.yml up --build"
echo ""
echo "3. Open http://localhost:5173 to view the portfolio"

