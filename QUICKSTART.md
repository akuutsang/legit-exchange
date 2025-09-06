# 🚀 Quick Start Guide - LegitExchange

Get your real estate platform up and running in minutes!

## ⚡ Quick Setup (5 minutes)

### 1. Prerequisites Check
```bash
# Check Node.js version (18+ required)
node --version

# Check if PostgreSQL is running
psql --version
```

### 2. Clone and Setup
```bash
# Clone the repository
git clone <your-repo-url>
cd legit-exchange

# Run the automated setup script
./setup.sh
```

### 3. Configure Environment
Edit `.env.local` with your database credentials:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/legit_exchange"
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
```

### 4. Start Development Server
```bash
npm run dev
```

### 5. Open Your Browser
Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 What You'll See

- **Landing Page**: Professional homepage showcasing the platform
- **Property Listings**: Browse available properties
- **User Registration**: Sign up as Buyer, Seller, or Lawyer
- **Dashboard**: Role-specific dashboards for different user types
- **Lawyer Directory**: Find and book legal consultations

## 🔑 Default Test Accounts

### Buyer Account
- Email: buyer@test.com
- Password: password123

### Seller Account
- Email: seller@test.com
- Password: password123

### Lawyer Account
- Email: lawyer@test.com
- Password: password123

## 🏠 Sample Data

The platform comes with:
- **Sample Properties**: 4-bedroom house in Rayfield, Jos
- **Sample Lawyers**: 4 verified lawyers with different specializations
- **Sample Reviews**: User feedback and ratings

## 🛠️ Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run database migrations
npx prisma migrate dev

# Open Prisma Studio (database GUI)
npx prisma studio

# Run tests
npm test

# Lint code
npm run lint
```

## 📱 Test the Platform

### As a Buyer
1. Register as a Buyer
2. Browse properties
3. Contact property owners
4. Book legal consultations

### As a Seller
1. Register as a Seller
2. List your property
3. Upload images and details
4. Respond to inquiries

### As a Lawyer
1. Register as a Lawyer
2. Complete your profile
3. Set consultation fees
4. Accept booking requests

## 🚨 Troubleshooting

### Database Connection Issues
```bash
# Check if PostgreSQL is running
sudo service postgresql status

# Create database manually
createdb legit_exchange

# Test connection
psql -d legit_exchange -c "SELECT version();"
```

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
npm run dev -- -p 3001
```

### Prisma Issues
```bash
# Reset Prisma
npx prisma generate
npx prisma db push --force-reset

# Check database connection
npx prisma db seed
```

## 🔄 Next Steps

After getting the basic platform running:

1. **Customize Content**: Update property types, locations, and features
2. **Add Real Data**: Connect to actual property databases
3. **Integrate Payments**: Set up Stripe for transaction fees
4. **Add Maps**: Integrate Google Maps or Mapbox
5. **Deploy**: Deploy to Vercel, Netlify, or your preferred hosting

## 📞 Need Help?

- **Documentation**: Check the main [README.md](README.md)
- **Issues**: Create an issue on GitHub
- **Discussions**: Join our community discussions

---

**Happy coding! 🚀** Your real estate platform is ready to disrupt the market!
