"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { 
  MapPin, 
  Bed, 
  Bath, 
  Ruler, 
  Calendar, 
  Phone, 
  Mail, 
  MessageSquare, 
  Heart, 
  Share2,
  Star,
  Clock,
  Shield,
  Users,
  CheckCircle
} from "lucide-react";
import Link from "next/link";

type Property = {
  id: string;
  title: string;
  description: string;
  price: number;
  type: string;
  status: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  address: string;
  city: string;
  state: string;
  features: string[];
  images: string[];
  videoTour?: string;
  isFeatured: boolean;
  owner: {
    id: string;
    name: string;
    email: string;
    phone: string;
    image?: string;
  };
  createdAt: string;
  coordinates?: string;
};

type Review = {
  id: string;
  rating: number;
  comment: string;
  reviewer: {
    name: string;
    image?: string;
  };
  createdAt: string;
};

export default function PropertyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user, status } = useAuth();
  const [property, setProperty] = useState<Property | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    preferredDate: "",
    preferredTime: "",
  });

  useEffect(() => {
    if (params.id) {
      fetchProperty();
      fetchReviews();
    }
  }, [params.id]);

  const fetchProperty = async () => {
    try {
      // In a real app, fetch from your API
      // const response = await fetch(`/api/properties/${params.id}`);
      // const data = await response.json();
      
      // Mock data for demonstration
      const mockProperty: Property = {
        id: params.id as string,
        title: "Beautiful 4-Bedroom Family Home in Rayfield",
        description: "This stunning family home is located in the prestigious Rayfield area of Jos, Plateau State. The property features modern architecture with traditional Nigerian design elements, spacious rooms, and a beautiful garden. Perfect for families looking for comfort and luxury in a prime location.",
        price: 45000000,
        type: "HOUSE",
        status: "AVAILABLE",
        bedrooms: 4,
        bathrooms: 3,
        area: 250,
        address: "15 Rayfield Road",
        city: "Jos",
        state: "Plateau",
        features: [
          "Modern Kitchen",
          "Garden",
          "Security System",
          "Parking Space",
          "Air Conditioning",
          "Water Borehole",
          "Generator House",
          "Staff Quarters"
        ],
        images: [
          "/property1.jpg",
          "/property2.jpg",
          "/property3.jpg",
          "/property4.jpg"
        ],
        isFeatured: true,
        owner: {
          id: "1",
          name: "Alhaji Mohammed Bello",
          email: "mohammed.bello@email.com",
          phone: "+234 803 123 4567",
          image: "/owner1.jpg"
        },
        createdAt: "2024-01-15T10:00:00Z",
        coordinates: "9.8965,8.8583"
      };
      
      setProperty(mockProperty);
    } catch (error) {
      console.error("Error fetching property:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      // Mock reviews data
      const mockReviews: Review[] = [
        {
          id: "1",
          rating: 5,
          comment: "Excellent property! The owner was very professional and the transaction was smooth.",
          reviewer: {
            name: "Aisha Mohammed",
            image: "/user1.jpg"
          },
          createdAt: "2024-01-20T14:30:00Z"
        },
        {
          id: "2",
          rating: 4,
          comment: "Great location and the property is well-maintained. Highly recommended.",
          reviewer: {
            name: "Emeka Okonkwo",
            image: "/user2.jpg"
          },
          createdAt: "2024-01-18T09:15:00Z"
        }
      ];
      
      setReviews(mockReviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      router.push(`/auth/signin?callbackUrl=/properties/${params.id}`);
      return;
    }

    try {
      // In a real app, send message to property owner
      console.log("Sending message:", contactForm);
      
      // Reset form
      setContactForm({
        name: "",
        email: "",
        phone: "",
        message: "",
        preferredDate: "",
        preferredTime: "",
      });
      
      setShowContactForm(false);
      // Show success message
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-NG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Property Not Found</h1>
          <p className="text-gray-600 mb-6">The property you're looking for doesn't exist or has been removed.</p>
          <Link href="/properties" className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700">
            Browse Other Properties
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Property Images */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Image */}
            <div className="lg:col-span-2">
              <div className="relative h-96 lg:h-[500px] rounded-xl overflow-hidden">
                <img
                  src={property.images[selectedImage] || "/placeholder-property.jpg"}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                {property.isFeatured && (
                  <span className="absolute top-4 left-4 bg-yellow-400 text-yellow-900 text-sm font-semibold px-3 py-1 rounded-full">
                    Featured
                  </span>
                )}
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button className="p-2 bg-white/80 rounded-full hover:bg-white">
                    <Heart className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="p-2 bg-white/80 rounded-full hover:bg-white">
                    <Share2 className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
              
              {/* Thumbnail Images */}
              <div className="flex space-x-2 mt-4">
                {property.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? "border-indigo-600" : "border-gray-200"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Property image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Property Info Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
                <div className="mb-6">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">{property.title}</h1>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="w-4 h-4 mr-1" />
                    {property.address}, {property.city}, {property.state}
                  </div>
                  <div className="text-3xl font-bold text-indigo-600">
                    {formatPrice(property.price)}
                  </div>
                </div>

                {/* Property Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{property.bedrooms}</div>
                    <div className="text-sm text-gray-600">Bedrooms</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{property.bathrooms}</div>
                    <div className="text-sm text-gray-600">Bathrooms</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{property.area}</div>
                    <div className="text-sm text-gray-600">m²</div>
                  </div>
                </div>

                {/* Contact Buttons */}
                <div className="space-y-3 mb-6">
                  <button
                    onClick={() => setShowContactForm(true)}
                    className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center"
                  >
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Contact Owner
                  </button>
                  <button className="w-full border border-indigo-600 text-indigo-600 py-3 px-4 rounded-lg hover:bg-indigo-50 transition-colors flex items-center justify-center">
                    <Phone className="w-5 h-5 mr-2" />
                    Call Owner
                  </button>
                </div>

                {/* Owner Info */}
                <div className="border-t pt-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Property Owner</h3>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                      <Users className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{property.owner.name}</div>
                      <div className="text-sm text-gray-600">Verified Owner</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Property Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Description */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
              <p className="text-gray-700 leading-relaxed">{property.description}</p>
            </div>

            {/* Features */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Features & Amenities</h2>
              <div className="grid grid-cols-2 gap-3">
                {property.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Reviews</h2>
              {reviews.length > 0 ? (
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                      <div className="flex items-center mb-2">
                        <div className="flex items-center">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-600">
                          {formatDate(review.createdAt)}
                        </span>
                      </div>
                      <p className="text-gray-700 mb-2">{review.comment}</p>
                      <div className="text-sm text-gray-600">- {review.reviewer.name}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No reviews yet. Be the first to review this property!</p>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Property Details */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h3 className="font-semibold text-gray-900 mb-4">Property Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-medium">{property.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="font-medium text-green-600">{property.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Listed:</span>
                  <span className="font-medium">{formatDate(property.createdAt)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Location:</span>
                  <span className="font-medium">{property.city}, {property.state}</span>
                </div>
              </div>
            </div>

            {/* Legal Support */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex items-center mb-3">
                <Shield className="w-5 h-5 text-indigo-600 mr-2" />
                <h3 className="font-semibold text-gray-900">Legal Support</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Need legal assistance with this transaction? Our verified lawyers are here to help.
              </p>
              <Link
                href="/lawyers"
                className="block w-full bg-green-600 text-white py-2 px-4 rounded-lg text-center hover:bg-green-700 transition-colors"
              >
                Find a Lawyer
              </Link>
            </div>

            {/* Platform Benefits */}
            <div className="bg-indigo-50 rounded-xl p-6">
              <h3 className="font-semibold text-indigo-900 mb-3">Why Use LegitExchange?</h3>
              <div className="space-y-2 text-sm text-indigo-800">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Only 5% transaction fee
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Direct owner contact
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Legal protection included
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  No hidden costs
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Contact Property Owner</h3>
              <button
                onClick={() => setShowContactForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  required
                  value={contactForm.name}
                  onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={contactForm.email}
                  onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  required
                  value={contactForm.phone}
                  onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  required
                  rows={3}
                  value={contactForm.message}
                  onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Tell the owner about your interest in this property..."
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date</label>
                  <input
                    type="date"
                    value={contactForm.preferredDate}
                    onChange={(e) => setContactForm({...contactForm, preferredDate: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Time</label>
                  <select
                    value={contactForm.preferredTime}
                    onChange={(e) => setContactForm({...contactForm, preferredTime: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Select time</option>
                    <option value="morning">Morning (9 AM - 12 PM)</option>
                    <option value="afternoon">Afternoon (12 PM - 3 PM)</option>
                    <option value="evening">Evening (3 PM - 6 PM)</option>
                  </select>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowContactForm(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
