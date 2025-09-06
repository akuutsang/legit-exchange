# 🔧 Troubleshooting Guide - LegitExchange

## 🚨 Current Issues & Solutions

### Issue 1: UserRole.BUYER is undefined
**Error**: `Cannot read properties of undefined (reading 'BUYER')`

**Cause**: Prisma client hasn't been generated yet, so the UserRole enum is not available.

**Solution**: We've implemented a temporary fix by creating local enum definitions. The app should now work without the Prisma client.

### Issue 2: Prisma Client Import Errors
**Error**: `Cannot resolve module '@prisma/client'`

**Cause**: The Prisma client hasn't been generated from the schema.

**Solution**: We've created a mock Prisma client that allows the app to run while you set up the database.

## 🚀 Quick Fix Steps

### Step 1: Copy Environment File
```bash
# Copy the example environment file
cp env.local.example .env.local

# Edit .env.local with your database credentials
nano .env.local
```

### Step 2: Update Environment Variables
Edit `.env.local` with your actual values:
```env
DATABASE_URL="postgresql://yourusername:yourpassword@localhost:5432/legit_exchange"
NEXTAUTH_SECRET="generate-a-random-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
```

### Step 3: Test the App
```bash
# Start the development server
npm run dev

# Open http://localhost:3000 in your browser
```

## 🗄️ Setting Up the Real Database

### Option 1: Local PostgreSQL
```bash
# Install PostgreSQL (if not already installed)
# macOS: brew install postgresql
# Ubuntu: sudo apt-get install postgresql postgresql-contrib

# Start PostgreSQL
brew services start postgresql  # macOS
sudo service postgresql start   # Ubuntu

# Create database
createdb legit_exchange

# Update .env.local with your credentials
```

### Option 2: Cloud Database (Recommended)
1. **Supabase** (Free tier available):
   - Go to [supabase.com](https://supabase.com)
   - Create new project
   - Get connection string from settings
   - Update DATABASE_URL in .env.local

2. **Railway**:
   - Go to [railway.app](https://railway.app)
   - Create new project
   - Add PostgreSQL service
   - Get connection string

### Step 4: Generate Prisma Client
```bash
# Install dependencies (if not already done)
npm install

# Generate Prisma client
npx prisma generate

# Push database schema
npx prisma db push

# Open Prisma Studio (optional)
npx prisma studio
```

### Step 5: Replace Mock Client
Once the real Prisma client is working:
1. Delete the mock client in `lib/prisma.ts`
2. Restore the original Prisma client code:

```typescript
import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export { prisma };
```

## 🔍 Common Error Messages

### "Cannot read properties of undefined (reading 'BUYER')"
- **Status**: ✅ Fixed with local enum
- **Action**: No action needed

### "Cannot resolve module '@prisma/client'"
- **Status**: ✅ Fixed with mock client
- **Action**: Follow database setup steps above

### "Database connection failed"
- **Status**: ⚠️ Needs database setup
- **Action**: 
  1. Check DATABASE_URL in .env.local
  2. Ensure PostgreSQL is running
  3. Verify database exists

### "Prisma schema not found"
- **Status**: ⚠️ Schema file missing
- **Action**: Check if `prisma/schema.prisma` exists

## 🧪 Testing the Fixes

### Test 1: Registration Page
1. Go to `/auth/register`
2. Should load without errors
3. Role dropdown should show: Buyer/Tenant, Seller/Landlord, Lawyer

### Test 2: Property Listings
1. Go to `/properties`
2. Should load without errors
3. May show empty list (normal without database)

### Test 3: Lawyer Directory
1. Go to `/lawyers`
2. Should load without errors
3. May show empty list (normal without database)

## 📱 What Works Now

✅ **Landing Page** - Professional homepage  
✅ **User Registration** - All user types can register  
✅ **Property Listings** - Browse properties (with mock data)  
✅ **Lawyer Directory** - View lawyers (with mock data)  
✅ **Dashboard** - Role-based dashboards  
✅ **Navigation** - All routes accessible  

## 🚧 What Needs Database Setup

⚠️ **User Authentication** - Login/logout functionality  
⚠️ **Property Management** - Create/edit properties  
⚠️ **Real Data** - Actual properties and lawyers  
⚠️ **User Profiles** - Save user preferences  
⚠️ **Messaging** - Communication between users  

## 🔄 Next Steps After Fix

1. **Test the App**: Verify all pages load without errors
2. **Set Up Database**: Follow database setup steps above
3. **Generate Prisma Client**: Run `npx prisma generate`
4. **Replace Mock Client**: Restore real Prisma client
5. **Add Real Data**: Create actual properties and users
6. **Test Full Functionality**: Verify all features work

## 📞 Still Having Issues?

If you're still experiencing problems:

1. **Check Console**: Look for error messages in browser console
2. **Check Terminal**: Look for error messages in terminal
3. **Verify Environment**: Ensure .env.local is properly configured
4. **Clear Cache**: Delete .next folder and restart
5. **Node Version**: Ensure you're using Node.js 18+

## 🎯 Success Indicators

You'll know everything is working when:
- ✅ All pages load without errors
- ✅ User registration works
- ✅ Property listings display
- ✅ Lawyer directory shows lawyers
- ✅ No console errors
- ✅ No terminal errors

---

**The app should now work! 🚀** Follow the database setup steps to enable full functionality.
