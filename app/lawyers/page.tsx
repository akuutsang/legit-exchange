"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { 
  Search, 
  Filter, 
  MapPin, 
  Star, 
  Clock, 
  Shield, 
  Users, 
  Calendar,
  MessageSquare,
  Phone,
  Mail,
  Award,
  BookOpen,
  CheckCircle
} from "lucide-react";
import Link from "next/link";

type Lawyer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  image?: string;
  barNumber: string;
  specialization: string[];
  isVerified: boolean;
  rating: number;
  reviewCount: number;
  experience: number;
  location: string;
  city: string;
  state: string;
  bio: string;
  consultationFee: number;
  languages: string[];
  availability: {
    days: string[];
    hours: string;
  };
};

type FilterOptions = {
  specialization: string[];
  location: string;
  minRating: number;
  maxFee: number;
  experience: number;
};

const specializations = [
  "Real Estate Law",
  "Property Law",
  "Landlord/Tenant Law",
  "Contract Law",
  "Corporate Law",
  "Family Law",
  "Criminal Law",
  "Civil Litigation",
  "Tax Law",
  "Employment Law"
];

const locations = [
  "Jos, Plateau",
  "Abuja, FCT",
  "Lagos, Lagos",
  "Kano, Kano",
  "Kaduna, Kaduna",
  "Port Harcourt, Rivers",
  "Ibadan, Oyo",
  "Enugu, Enugu"
];

export default function LawyersPage() {
  const router = useRouter();
  const { user, status } = useAuth();
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    specialization: [],
    location: "",
    minRating: 0,
    maxFee: 100000,
    experience: 0
  });

  useEffect(() => {
    fetchLawyers();
  }, []);

  const fetchLawyers = async () => {
    try {
      // Mock data for demonstration
      const mockLawyers: Lawyer[] = [
        {
          id: "1",
          name: "Barrister Aisha Mohammed",
          email: "aisha.mohammed@law.com",
          phone: "+234 803 123 4567",
          image: "/lawyer1.jpg",
          barNumber: "BL-001-2020",
          specialization: ["Real Estate Law", "Property Law", "Contract Law"],
          isVerified: true,
          rating: 4.9,
          reviewCount: 127,
          experience: 8,
          location: "Rayfield",
          city: "Jos",
          state: "Plateau",
          bio: "Specialized in real estate transactions with over 8 years of experience. Expert in property law, land disputes, and contract negotiations. Fluent in English, Hausa, and Arabic.",
          consultationFee: 25000,
          languages: ["English", "Hausa", "Arabic"],
          availability: {
            days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            hours: "9:00 AM - 5:00 PM"
          }
        },
        {
          id: "2",
          name: "Barrister Emeka Okonkwo",
          email: "emeka.okonkwo@law.com",
          phone: "+234 803 234 5678",
          image: "/lawyer2.jpg",
          barNumber: "BL-002-2018",
          specialization: ["Corporate Law", "Real Estate Law", "Tax Law"],
          isVerified: true,
          rating: 4.8,
          reviewCount: 89,
          experience: 12,
          location: "Central Business District",
          city: "Jos",
          state: "Plateau",
          bio: "Corporate lawyer with extensive experience in real estate development projects. Specializes in corporate structuring, tax planning, and large-scale property transactions.",
          consultationFee: 35000,
          languages: ["English", "Igbo"],
          availability: {
            days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            hours: "8:00 AM - 6:00 PM"
          }
        },
        {
          id: "3",
          name: "Barrister Fatima Hassan",
          email: "fatima.hassan@law.com",
          phone: "+234 803 345 6789",
          image: "/lawyer3.jpg",
          barNumber: "BL-003-2019",
          specialization: ["Landlord/Tenant Law", "Family Law", "Civil Litigation"],
          isVerified: true,
          rating: 4.7,
          reviewCount: 156,
          experience: 6,
          location: "Bauchi Ring Road",
          city: "Jos",
          state: "Plateau",
          bio: "Expert in landlord-tenant disputes and family law matters. Known for fair and efficient resolution of property conflicts and family legal issues.",
          consultationFee: 20000,
          languages: ["English", "Hausa", "Fulani"],
          availability: {
            days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            hours: "10:00 AM - 4:00 PM"
          }
        },
        {
          id: "4",
          name: "Barrister John Adebayo",
          email: "john.adebayo@law.com",
          phone: "+234 803 456 7890",
          image: "/lawyer4.jpg",
          barNumber: "BL-004-2017",
          specialization: ["Contract Law", "Real Estate Law", "Employment Law"],
          isVerified: true,
          rating: 4.9,
          reviewCount: 203,
          experience: 15,
          location: "Terminal Junction",
          city: "Jos",
          state: "Plateau",
          bio: "Senior lawyer with 15 years of experience in contract law and real estate. Specializes in complex property transactions and employment contracts.",
          consultationFee: 40000,
          languages: ["English", "Yoruba"],
          availability: {
            days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            hours: "9:00 AM - 6:00 PM"
          }
        }
      ];
      
      setLawyers(mockLawyers);
    } catch (error) {
      console.error("Error fetching lawyers:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would trigger a search
    console.log("Searching for:", searchQuery);
  };

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const toggleSpecialization = (spec: string) => {
    setFilters(prev => ({
      ...prev,
      specialization: prev.specialization.includes(spec)
        ? prev.specialization.filter(s => s !== spec)
        : [...prev.specialization, spec]
    }));
  };

  const applyFilters = () => {
    // In a real app, apply filters to API call
    console.log("Applying filters:", filters);
    setShowFilters(false);
  };

  const resetFilters = () => {
    setFilters({
      specialization: [],
      location: "",
      minRating: 0,
      maxFee: 100000,
      experience: 0
    });
  };

  const filteredLawyers = lawyers.filter(lawyer => {
    if (searchQuery && !lawyer.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !lawyer.specialization.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))) {
      return false;
    }
    
    if (filters.specialization.length > 0 && 
        !filters.specialization.some(s => lawyer.specialization.includes(s))) {
      return false;
    }
    
    if (filters.location && lawyer.city !== filters.location.split(',')[0]) {
      return false;
    }
    
    if (lawyer.rating < filters.minRating) {
      return false;
    }
    
    if (lawyer.consultationFee > filters.maxFee) {
      return false;
    }
    
    if (lawyer.experience < filters.experience) {
      return false;
    }
    
    return true;
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Find Verified Legal Experts
            </h1>
            <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
              Get professional legal advice for your property transactions. 
              All our lawyers are verified and specialize in real estate law.
            </p>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, specialization, or location..."
                  className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Filters</h2>
                <button
                  onClick={resetFilters}
                  className="text-sm text-indigo-600 hover:underline"
                >
                  Reset All
                </button>
              </div>

              {/* Specialization */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Specialization</h3>
                <div className="space-y-2">
                  {specializations.map((spec) => (
                    <label key={spec} className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded text-indigo-600 focus:ring-indigo-500"
                        checked={filters.specialization.includes(spec)}
                        onChange={() => toggleSpecialization(spec)}
                      />
                      <span className="ml-2 text-sm text-gray-700">{spec}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Location</h3>
                <select
                  className="w-full border rounded-lg px-3 py-2"
                  value={filters.location}
                  onChange={(e) => handleFilterChange("location", e.target.value)}
                >
                  <option value="">All Locations</option>
                  {locations.map((location) => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>

              {/* Rating */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Minimum Rating</h3>
                <select
                  className="w-full border rounded-lg px-3 py-2"
                  value={filters.minRating}
                  onChange={(e) => handleFilterChange("minRating", Number(e.target.value))}
                >
                  <option value={0}>Any Rating</option>
                  <option value={3}>3+ Stars</option>
                  <option value={4}>4+ Stars</option>
                  <option value={4.5}>4.5+ Stars</option>
                </select>
              </div>

              {/* Consultation Fee */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Max Consultation Fee</h3>
                <input
                  type="range"
                  min="0"
                  max="100000"
                  step="5000"
                  className="w-full"
                  value={filters.maxFee}
                  onChange={(e) => handleFilterChange("maxFee", Number(e.target.value))}
                />
                <div className="text-sm text-gray-600 mt-1">
                  Up to {formatPrice(filters.maxFee)}
                </div>
              </div>

              {/* Experience */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Minimum Experience</h3>
                <select
                  className="w-full border rounded-lg px-3 py-2"
                  value={filters.experience}
                  onChange={(e) => handleFilterChange("experience", Number(e.target.value))}
                >
                  <option value={0}>Any Experience</option>
                  <option value={2}>2+ Years</option>
                  <option value={5}>5+ Years</option>
                  <option value={10}>10+ Years</option>
                </select>
              </div>

              <button
                onClick={applyFilters}
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>

          {/* Lawyers List */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {filteredLawyers.length} Lawyers Found
              </h2>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center space-x-1 border rounded-lg px-3 py-2"
              >
                <Filter size={16} />
                <span>Filters</span>
              </button>
            </div>

            <div className="space-y-6">
              {filteredLawyers.map((lawyer) => (
                <div key={lawyer.id} className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Lawyer Image */}
                    <div className="lg:w-1/4">
                      <div className="w-full h-48 lg:h-32 bg-gray-200 rounded-lg overflow-hidden">
                        {lawyer.image ? (
                          <img
                            src={lawyer.image}
                            alt={lawyer.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-indigo-100 flex items-center justify-center">
                            <Users className="w-12 h-12 text-indigo-600" />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Lawyer Info */}
                    <div className="lg:flex-1">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-xl font-semibold text-gray-900">{lawyer.name}</h3>
                            {lawyer.isVerified && (
                              <Shield className="w-5 h-5 text-green-600" title="Verified Lawyer" />
                            )}
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                            <span>Bar No: {lawyer.barNumber}</span>
                            <span>•</span>
                            <span>{lawyer.experience} years experience</span>
                            <span>•</span>
                            <div className="flex items-center">
                              <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                              {lawyer.rating} ({lawyer.reviewCount} reviews)
                            </div>
                          </div>

                          <div className="flex items-center text-gray-600 mb-3">
                            <MapPin className="w-4 h-4 mr-1" />
                            {lawyer.location}, {lawyer.city}, {lawyer.state}
                          </div>

                          <p className="text-gray-700 mb-4">{lawyer.bio}</p>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {lawyer.specialization.map((spec) => (
                              <span
                                key={spec}
                                className="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm rounded-full"
                              >
                                {spec}
                              </span>
                            ))}
                          </div>

                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {lawyer.availability.hours}
                            </div>
                            <div className="flex items-center">
                              <BookOpen className="w-4 h-4 mr-1" />
                              {lawyer.languages.join(", ")}
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="lg:w-48 space-y-3">
                          <div className="text-right">
                            <div className="text-2xl font-bold text-indigo-600">
                              {formatPrice(lawyer.consultationFee)}
                            </div>
                            <div className="text-sm text-gray-600">per consultation</div>
                          </div>

                          <div className="space-y-2">
                            <button
                              onClick={() => router.push(`/appointments/new?lawyerId=${lawyer.id}`)}
                              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center"
                            >
                              <Calendar className="w-4 h-4 mr-2" />
                              Book Consultation
                            </button>
                            
                            <button className="w-full border border-indigo-600 text-indigo-600 py-2 px-4 rounded-lg hover:bg-indigo-50 transition-colors flex items-center justify-center">
                              <MessageSquare className="w-4 h-4 mr-2" />
                              Send Message
                            </button>
                          </div>

                          <div className="flex space-x-2">
                            <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center">
                              <Phone className="w-4 h-4" />
                            </button>
                            <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center">
                              <Mail className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredLawyers.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Shield className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No lawyers found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search criteria or filters.
                </p>
                <button
                  onClick={resetFilters}
                  className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Need Legal Help with Your Property?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Our verified lawyers are here to help you navigate complex property transactions, 
            contracts, and legal disputes. Get professional advice you can trust.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push('/auth/register')}
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              Get Started Today
            </button>
            <Link
              href="/help"
              className="border border-indigo-600 text-indigo-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-50 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
