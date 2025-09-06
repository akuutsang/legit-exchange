# 🏠 LegitExchange - Revolutionizing Real Estate in Nigeria

**LegitExchange** is a cutting-edge real estate platform designed to disrupt the traditional realtor market in Jos, Plateau State, and across Nigeria. By connecting property owners directly with buyers and tenants, we eliminate unnecessary middlemen and reduce transaction fees from the traditional 10% to just 5%.

## 🎯 Mission

To democratize real estate transactions in Nigeria by:
- **Eliminating inflated prices** caused by traditional realtors
- **Providing direct connections** between property owners and buyers/tenants
- **Offering legal protection** through verified lawyers
- **Reducing transaction costs** from 10% to 5%
- **Focusing on Jos, Plateau State** while expanding nationwide

## ✨ Key Features

### 🏘️ Property Management
- **Property Listings**: Comprehensive property creation with images, videos, and detailed descriptions
- **Advanced Search**: Filter by location, price, type, bedrooms, and more
- **Property Details**: Rich property pages with owner information and contact options
- **Image Galleries**: Multiple image uploads with drag-and-drop functionality

### 👥 User Management
- **Multi-Role System**: Buyers, Sellers, Lawyers, and Admins
- **User Verification**: Secure authentication with NextAuth.js
- **Profile Management**: Complete user profiles with preferences and history

### ⚖️ Legal Integration
- **Verified Lawyers**: Bar-verified legal professionals specializing in real estate
- **Legal Consultations**: Book appointments with lawyers for property transactions
- **Document Review**: Legal assistance for contracts and agreements
- **Dispute Resolution**: Professional legal support for property conflicts

### 💬 Communication
- **Direct Messaging**: Secure communication between buyers and sellers
- **Appointment Booking**: Schedule property viewings and legal consultations
- **Notification System**: Real-time updates on messages and appointments

### 💰 Transparent Pricing
- **5% Transaction Fee**: Significantly lower than traditional 10% realtor fees
- **No Hidden Costs**: Transparent fee structure
- **Payment Integration**: Secure payment processing (Stripe integration ready)

## 🚀 Technology Stack

### Frontend
- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful, customizable icons
- **React Hook Form**: Performant forms with validation

### Backend
- **Next.js API Routes**: Serverless API endpoints
- **Prisma**: Type-safe database ORM
- **PostgreSQL**: Robust relational database
- **NextAuth.js**: Authentication and authorization

### Additional Tools
- **React Dropzone**: File upload functionality
- **React Hot Toast**: User notifications
- **Leaflet**: Interactive maps (ready for integration)
- **Stripe**: Payment processing (ready for integration)

## 📁 Project Structure

```
legit-exchange/
├── app/                    # Next.js App Router
│   ├── api/               # API endpoints
│   │   ├── auth/          # Authentication routes
│   │   └── properties/    # Property management
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # User dashboards
│   ├── properties/        # Property pages
│   └── lawyers/           # Lawyer directory
├── components/            # Reusable UI components
├── hooks/                 # Custom React hooks
├── lib/                   # Utility libraries
├── prisma/                # Database schema and migrations
└── middleware.ts          # Route protection
```

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/legit-exchange.git
   cd legit-exchange
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/legit_exchange"
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Database Setup**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🗄️ Database Schema

The platform uses a comprehensive database schema with the following key models:

- **User**: Multi-role user management (Buyer, Seller, Lawyer, Admin)
- **Property**: Complete property information with images and features
- **Message**: Secure communication between users
- **Appointment**: Booking system for viewings and consultations
- **Review**: User feedback and ratings
- **Transaction**: Payment tracking with 5% fee structure

## 🔐 Authentication & Security

- **NextAuth.js**: Secure authentication with multiple providers
- **Role-based Access Control**: Different permissions for different user types
- **Middleware Protection**: Route-level security
- **Input Validation**: Comprehensive form validation
- **SQL Injection Protection**: Prisma ORM with parameterized queries

## 📱 User Experience

### For Property Owners/Sellers
- Easy property listing with rich media uploads
- Direct communication with potential buyers
- Legal support for transactions
- Transparent fee structure (5% vs traditional 10%)

### For Buyers/Tenants
- Advanced property search and filtering
- Direct contact with property owners
- Legal consultation booking
- No inflated prices from middlemen

### For Lawyers
- Professional profile management
- Consultation booking system
- Client management tools
- Specialization-based discovery

## 🌍 Location Focus

### Primary Market: Jos, Plateau State
- **Rayfield**: Premium residential area
- **Central Business District**: Commercial properties
- **Bauchi Ring Road**: Mixed-use developments
- **Terminal Junction**: Transportation hub

### Expansion Plans
- Abuja, FCT
- Lagos, Lagos State
- Kano, Kano State
- Other major Nigerian cities

## 💡 Business Model

### Revenue Streams
1. **Transaction Fees**: 5% of property sale/rental value
2. **Legal Consultation Fees**: Platform commission on lawyer bookings
3. **Premium Listings**: Featured property placement
4. **Verification Services**: Enhanced user verification

### Cost Advantages
- **Traditional Realtors**: 10% transaction fee
- **LegitExchange**: 5% transaction fee
- **Savings**: Up to 50% reduction in transaction costs

## 🚧 Development Status

### ✅ Completed Features
- User authentication and role management
- Property listing and management
- Advanced search and filtering
- Lawyer directory and booking
- Responsive UI/UX design
- Database schema and API structure

### 🔄 In Development
- Payment processing integration
- Real-time messaging system
- Mobile app development
- Advanced analytics dashboard

### 📋 Planned Features
- Interactive property maps
- Virtual property tours
- AI-powered property recommendations
- Multi-language support (Hausa, Igbo, Yoruba)
- Blockchain-based property verification

## 🤝 Contributing

We welcome contributions from developers, designers, and real estate professionals!

### How to Contribute
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

### Areas for Contribution
- UI/UX improvements
- New features and functionality
- Bug fixes and performance optimization
- Documentation and testing
- Localization and cultural adaptation

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact & Support

- **Email**: support@legitexchange.ng
- **Phone**: +234 XXX XXX XXXX
- **Address**: Jos, Plateau State, Nigeria
- **Website**: [legitexchange.ng](https://legitexchange.ng)

## 🙏 Acknowledgments

- **Next.js Team**: For the amazing React framework
- **Prisma Team**: For the excellent database ORM
- **Tailwind CSS**: For the utility-first CSS framework
- **Nigerian Real Estate Community**: For insights and feedback

## 📊 Impact Metrics

### Target Goals (Year 1)
- **Properties Listed**: 1,000+
- **Active Users**: 5,000+
- **Verified Lawyers**: 100+
- **Cities Covered**: 10+
- **Transaction Volume**: ₦5 billion+

### Success Metrics
- **User Satisfaction**: 4.5+ star rating
- **Transaction Success Rate**: 85%+
- **Legal Consultation Bookings**: 500+ monthly
- **Cost Savings**: ₦500 million+ saved by users

---

**LegitExchange** - Making real estate accessible, affordable, and transparent for all Nigerians. 🏠✨