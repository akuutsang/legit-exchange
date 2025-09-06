# 🚀 Deployment Guide - LegitExchange

Deploy your real estate platform to production with these step-by-step guides.

## 🌐 Deployment Options

### 1. Vercel (Recommended for Next.js)
**Best for**: Quick deployment, automatic scaling, edge functions
**Cost**: Free tier available, then pay-as-you-go

### 2. Netlify
**Best for**: Static sites, form handling, serverless functions
**Cost**: Free tier available, then $19/month

### 3. Railway
**Best for**: Full-stack apps, databases, background jobs
**Cost**: Pay-as-you-go, starts at $5/month

### 4. DigitalOcean App Platform
**Best for**: Production apps, custom domains, SSL
**Cost**: Starts at $5/month

## 🚀 Deploy to Vercel

### Step 1: Prepare Your App
```bash
# Build your application
npm run build

# Test the build locally
npm start
```

### Step 2: Deploy
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow the prompts:
# - Link to existing project? No
# - Project name: legit-exchange
# - Directory: ./
# - Override settings? No
```

### Step 3: Configure Environment Variables
In Vercel dashboard:
1. Go to your project settings
2. Add environment variables:
   ```
   DATABASE_URL=your-production-db-url
   NEXTAUTH_SECRET=your-production-secret
   NEXTAUTH_URL=https://your-domain.vercel.app
   ```

### Step 4: Connect Database
```bash
# Update your production database
npx prisma db push --accept-data-loss

# Generate Prisma client
npx prisma generate
```

## 🐳 Deploy with Docker

### Create Dockerfile
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

### Create docker-compose.yml
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://user:password@db:5432/legit_exchange
      - NEXTAUTH_SECRET=your-secret
      - NEXTAUTH_URL=http://localhost:3000
    depends_on:
      - db
  
  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=legit_exchange
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  postgres_data:
```

### Deploy with Docker
```bash
# Build and run
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 🗄️ Database Deployment

### Option 1: Vercel Postgres
```bash
# Create database in Vercel
vercel postgres create

# Get connection string
vercel env pull .env.local
```

### Option 2: Supabase
1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Get connection string from settings
4. Update environment variables

### Option 3: Railway
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login and create project
railway login
railway init

# Add PostgreSQL service
railway add

# Deploy
railway up
```

## 🔐 Environment Variables

### Production Environment
```env
# Required
DATABASE_URL="postgresql://user:password@host:port/database"
NEXTAUTH_SECRET="your-super-secure-secret-here"
NEXTAUTH_URL="https://yourdomain.com"

# Optional but recommended
NODE_ENV="production"
NEXT_TELEMETRY_DISABLED="1"

# Payment processing
STRIPE_PUBLISHABLE_KEY="pk_live_..."
STRIPE_SECRET_KEY="sk_live_..."

# File storage
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Analytics
GOOGLE_ANALYTICS_ID="G-XXXXXXXXXX"
```

## 📱 Mobile App Deployment

### React Native (Future)
```bash
# Build for Android
npx react-native run-android --variant=release

# Build for iOS
npx react-native run-ios --configuration Release

# Generate APK
cd android && ./gradlew assembleRelease
```

### Progressive Web App (PWA)
```bash
# Install PWA dependencies
npm install next-pwa

# Configure in next.config.js
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
})

module.exports = withPWA({
  // your existing config
})
```

## 🔒 Security Checklist

### Before Deployment
- [ ] Change default passwords
- [ ] Generate strong NEXTAUTH_SECRET
- [ ] Enable HTTPS
- [ ] Set up firewall rules
- [ ] Configure CORS policies
- [ ] Enable rate limiting

### After Deployment
- [ ] Test all user flows
- [ ] Verify database connections
- [ ] Check error logging
- [ ] Monitor performance
- [ ] Set up backups
- [ ] Configure monitoring

## 📊 Performance Optimization

### Build Optimization
```bash
# Analyze bundle size
npm run build
npx @next/bundle-analyzer

# Optimize images
npm install @next/image

# Enable compression
npm install compression
```

### Database Optimization
```sql
-- Add indexes for better performance
CREATE INDEX idx_properties_location ON properties(city, state);
CREATE INDEX idx_properties_price ON properties(price);
CREATE INDEX idx_properties_type ON properties(type);
```

## 🚨 Monitoring & Maintenance

### Health Checks
```bash
# Add health check endpoint
# app/api/health/route.ts
export async function GET() {
  try {
    // Check database connection
    await prisma.$queryRaw`SELECT 1`
    
    return Response.json({ status: 'healthy' })
  } catch (error) {
    return Response.json({ status: 'unhealthy' }, { status: 500 })
  }
}
```

### Logging
```bash
# Install logging library
npm install winston

# Configure logging
# lib/logger.ts
import winston from 'winston'

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
})
```

## 🔄 Continuous Deployment

### GitHub Actions
```yaml
# .github/workflows/deploy.yml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 📞 Support & Troubleshooting

### Common Issues
1. **Build Failures**: Check Node.js version and dependencies
2. **Database Connection**: Verify DATABASE_URL and network access
3. **Environment Variables**: Ensure all required vars are set
4. **Performance**: Monitor bundle size and database queries

### Getting Help
- **Documentation**: Check README.md and QUICKSTART.md
- **Issues**: Create GitHub issue with error details
- **Community**: Join our Discord/Telegram groups

---

**Ready to deploy? 🚀** Your real estate platform is about to go live!
