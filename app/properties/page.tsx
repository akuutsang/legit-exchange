"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, Filter, MapPin, Bed, Bath, Ruler, Heart } from "lucide-react";
import Link from "next/link";

type Property = {
  id: string;
  title: string;
  price: number;
  location: string;
  city: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  type: string;
  status: string;
  image: string;
  featured: boolean;
};

type FilterOptions = {
  type: string[];
  minPrice: number;
  maxPrice: number;
  bedrooms: number | "";
  status: string;
};

export default function PropertiesPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    type: [],
    minPrice: 0,
    maxPrice: 100000000,
    bedrooms: "",
    status: "all",
  });

  // Fetch properties from API
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        // In a real app, you would fetch from your API with query parameters
        // const query = new URLSearchParams(searchParams.toString());
        // const response = await fetch(`/api/properties?${query}`);
        // const data = await response.json();
        
        // Mock data for demonstration
        const mockProperties: Property[] = [
          {
            id: "1",
            title: "Modern Family Home",
            price: 45000000,
            location: "Rayfield",
            city: "Jos",
            bedrooms: 4,
            bathrooms: 3,
            area: 250,
            type: "house",
            status: "sale",
            image: "/property1.jpg",
            featured: true,
          },
          // Add more mock properties...
        ];
        
        setProperties(mockProperties);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    router.push(`/properties?${params.toString()}`);
  };

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const toggleFilter = (type: string) => {
    setFilters((prev) => ({
      ...prev,
      type: prev.type.includes(type)
        ? prev.type.filter((t) => t !== type)
        : [...prev.type, type],
    }));
  };

  const applyFilters = () => {
    const params = new URLSearchParams();
    
    if (filters.type.length > 0) {
      params.set("type", filters.type.join(","));
    }
    if (filters.minPrice) {
      params.set("minPrice", filters.minPrice.toString());
    }
    if (filters.maxPrice < 100000000) {
      params.set("maxPrice", filters.maxPrice.toString());
    }
    if (filters.bedrooms) {
      params.set("bedrooms", filters.bedrooms.toString());
    }
    if (filters.status !== "all") {
      params.set("status", filters.status);
    }
    
    router.push(`/properties?${params.toString()}`);
    setShowFilters(false);
  };

  const resetFilters = () => {
    setFilters({
      type: [],
      minPrice: 0,
      maxPrice: 100000000,
      bedrooms: "",
      status: "all",
    });
    router.push("/properties");
  };

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
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="bg-indigo-700 text-white rounded-2xl p-8 mb-12">
        <h1 className="text-3xl font-bold mb-4">Find Your Dream Property</h1>
        <p className="text-indigo-100 mb-6">
          Discover the perfect property that matches your needs and budget
        </p>
        
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="relative max-w-2xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by location, property type, or keyword..."
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

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className={`md:w-1/4 ${showFilters ? 'block' : 'hidden md:block'}`}>
          <div className="bg-white rounded-xl shadow-md p-6 sticky top-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Filters</h2>
              <button
                onClick={resetFilters}
                className="text-sm text-indigo-600 hover:underline"
              >
                Reset All
              </button>
            </div>

            {/* Property Type */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">Property Type</h3>
              <div className="space-y-2">
                {["House", "Apartment", "Land", "Commercial"].map((type) => (
                  <label key={type} className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded text-indigo-600 focus:ring-indigo-500"
                      checked={filters.type.includes(type.toLowerCase())}
                      onChange={() => toggleFilter(type.toLowerCase())}
                    />
                    <span className="ml-2 text-gray-700">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">Price Range (₦)</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Min</label>
                  <input
                    type="number"
                    className="w-full border rounded-lg px-3 py-2"
                    value={filters.minPrice}
                    onChange={(e) =>
                      handleFilterChange("minPrice", Number(e.target.value))
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Max</label>
                  <input
                    type="number"
                    className="w-full border rounded-lg px-3 py-2"
                    value={filters.maxPrice}
                    onChange={(e) =>
                      handleFilterChange("maxPrice", Number(e.target.value))
                    }
                  />
                </div>
              </div>
              <div className="relative pt-1">
                <input
                  type="range"
                  min="0"
                  max="100000000"
                  step="1000000"
                  className="w-full"
                  value={filters.maxPrice}
                  onChange={(e) =>
                    handleFilterChange("maxPrice", Number(e.target.value))
                  }
                />
              </div>
            </div>

            {/* Bedrooms */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">Bedrooms</h3>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3, 4, "5+"].map((num) => (
                  <button
                    key={num}
                    className={`py-2 px-3 rounded-lg border ${
                      filters.bedrooms === num
                        ? "bg-indigo-100 text-indigo-700 border-indigo-300"
                        : "border-gray-300"
                    }`}
                    onClick={() => handleFilterChange("bedrooms", num)}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {/* Property Status */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">Status</h3>
              <select
                className="w-full border rounded-lg px-3 py-2"
                value={filters.status}
                onChange={(e) => handleFilterChange("status", e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="sale">For Sale</option>
                <option value="rent">For Rent</option>
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

        {/* Property Listings */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              {properties.length} Properties Found
            </h2>
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">Sort by:</span>
              <select className="border rounded-lg px-3 py-2">
                <option>Most Recent</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden flex items-center space-x-1 border rounded-lg px-3 py-2"
              >
                <Filter size={16} />
                <span>Filters</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <div
                key={property.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative">
                  <img
                    src={property.image || "/placeholder-property.jpg"}
                    alt={property.title}
                    className="w-full h-48 object-cover"
                  />
                  {property.featured && (
                    <span className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 text-xs font-semibold px-2 py-1 rounded">
                      Featured
                    </span>
                  )}
                  <button className="absolute top-2 right-2 p-2 bg-white/80 rounded-full hover:bg-white">
                    <Heart className="w-5 h-5 text-gray-600" fill="currentColor" />
                  </button>
                  <div className="absolute bottom-2 left-2 bg-white/90 px-2 py-1 rounded text-sm font-medium">
                    {property.status === "sale" ? "For Sale" : "For Rent"}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold">{property.title}</h3>
                    <p className="text-lg font-bold text-indigo-600">
                      {formatPrice(property.price)}
                      {property.status === "rent" && <span className="text-sm font-normal">/mo</span>}
                    </p>
                  </div>
                  <div className="flex items-center text-gray-500 text-sm mt-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    {property.location}, {property.city}
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center text-sm text-gray-600">
                      <Bed className="w-4 h-4 mr-1 text-indigo-500" />
                      {property.bedrooms} {property.bedrooms === 1 ? "Bed" : "Beds"}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Bath className="w-4 h-4 mr-1 text-indigo-500" />
                      {property.bathrooms} {property.bathrooms === 1 ? "Bath" : "Baths"}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Ruler className="w-4 h-4 mr-1 text-indigo-500" />
                      {property.area} m²
                    </div>
                  </div>
                  <Link
                    href={`/properties/${property.id}`}
                    className="block mt-4 text-center bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-8">
            <nav className="flex items-center space-x-1">
              <button className="px-3 py-1 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50">
                Previous
              </button>
              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  className={`px-3 py-1 rounded-lg ${
                    page === 1
                      ? "bg-indigo-600 text-white"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button className="px-3 py-1 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50">
                Next
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
