#!/bin/bash

echo "🏠 Welcome to LegitExchange Setup! 🏠"
echo "======================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    echo "   Download from: https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo "❌ PostgreSQL is not installed. Please install PostgreSQL first."
    echo "   Download from: https://www.postgresql.org/download/"
    exit 1
fi

echo "✅ PostgreSQL detected"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Create environment file
echo ""
echo "🔧 Setting up environment configuration..."

if [ ! -f .env.local ]; then
    cp config.example.env .env.local
    echo "✅ Created .env.local from config.example.env"
    echo "⚠️  Please edit .env.local with your actual configuration values"
else
    echo "✅ .env.local already exists"
fi

# Generate Prisma client
echo ""
echo "🗄️  Setting up database..."

# Check if database is accessible
if [ -f .env.local ]; then
    source .env.local
    if [ ! -z "$DATABASE_URL" ]; then
        echo "📊 Generating Prisma client..."
        npx prisma generate
        
        echo "🔄 Pushing database schema..."
        npx prisma db push
        
        if [ $? -eq 0 ]; then
            echo "✅ Database setup completed"
        else
            echo "⚠️  Database setup failed. Please check your DATABASE_URL in .env.local"
        fi
    else
        echo "⚠️  DATABASE_URL not found in .env.local"
    fi
else
    echo "⚠️  .env.local not found. Please create it first."
fi

echo ""
echo "🎉 Setup completed! 🎉"
echo ""
echo "Next steps:"
echo "1. Edit .env.local with your actual configuration"
echo "2. Run 'npm run dev' to start the development server"
echo "3. Open   http://localhost:3000 in your browser"
echo ""
echo "For more information, check the README.md file"
echo ""
echo "Happy coding! 🚀"
