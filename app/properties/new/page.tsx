"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useDropzone } from "react-dropzone";
import { 
  Upload, 
  X, 
  Plus, 
  MapPin, 
  Home, 
  Building, 
  Map, 
  FileText,
  CheckCircle
} from "lucide-react";
import Link from "next/link";

type PropertyFormData = {
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
  images: File[];
  videoTour?: string;
  coordinates?: string;
};

const propertyTypes = [
  { value: "APARTMENT", label: "Apartment", icon: <Building className="w-5 h-5" /> },
  { value: "HOUSE", label: "House", icon: <Home className="w-5 h-5" /> },
  { value: "LAND", label: "Land", icon: <Map className="w-5 h-5" /> },
  { value: "COMMERCIAL", label: "Commercial", icon: <Building className="w-5 h-5" /> },
  { value: "OFFICE", label: "Office", icon: <Building className="w-5 h-5" /> },
  { value: "OTHER", label: "Other", icon: <FileText className="w-5 h-5" /> }
];

const propertyStatuses = [
  { value: "AVAILABLE", label: "Available" },
  { value: "PENDING", label: "Pending" },
  { value: "SOLD", label: "Sold" },
  { value: "RENTED", label: "Rented" }
];

const commonFeatures = [
  "Security System",
  "Air Conditioning",
  "Water Borehole",
  "Generator House",
  "Parking Space",
  "Garden",
  "Swimming Pool",
  "Gym",
  "Staff Quarters",
  "Modern Kitchen",
  "Balcony",
  "Fireplace",
  "Elevator",
  "Internet Ready",
  "CCTV"
];

export default function NewPropertyPage() {
  const router = useRouter();
  const { user, status } = useAuth();
  const [formData, setFormData] = useState<PropertyFormData>({
    title: "",
    description: "",
    price: 0,
    type: "HOUSE",
    status: "AVAILABLE",
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    address: "",
    city: "Jos",
    state: "Plateau",
    features: [],
    images: [],
    videoTour: "",
    coordinates: ""
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Redirect if not authenticated or not a seller
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    router.push("/auth/signin?callbackUrl=/properties/new");
    return null;
  }

  if (user?.role !== "SELLER" && user?.role !== "ADMIN") {
    router.push("/dashboard");
    return null;
  }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...acceptedFiles]
    }));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 10,
    maxSize: 5 * 1024 * 1024 // 5MB
  });

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const toggleFeature = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const handleInputChange = (field: keyof PropertyFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Property title is required";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Property description is required";
    }
    if (formData.price <= 0) {
      newErrors.price = "Price must be greater than 0";
    }
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }
    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }
    if (formData.bedrooms < 0) {
      newErrors.bedrooms = "Bedrooms cannot be negative";
    }
    if (formData.bathrooms < 0) {
      newErrors.bathrooms = "Bathrooms cannot be negative";
    }
    if (formData.area <= 0) {
      newErrors.area = "Area must be greater than 0";
    }
    if (formData.images.length === 0) {
      newErrors.images = "At least one image is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Create FormData for file upload
      const submitData = new FormData();
      submitData.append("title", formData.title);
      submitData.append("description", formData.description);
      submitData.append("price", formData.price.toString());
      submitData.append("type", formData.type);
      submitData.append("status", formData.status);
      submitData.append("bedrooms", formData.bedrooms.toString());
      submitData.append("bathrooms", formData.bathrooms.toString());
      submitData.append("area", formData.area.toString());
      submitData.append("address", formData.address);
      submitData.append("city", formData.city);
      submitData.append("state", formData.state);
      submitData.append("features", JSON.stringify(formData.features));
      submitData.append("videoTour", formData.videoTour || "");
      submitData.append("coordinates", formData.coordinates || "");

      formData.images.forEach((image, index) => {
        submitData.append(`images`, image);
      });

      // In a real app, submit to your API
      // const response = await fetch("/api/properties", {
      //   method: "POST",
      //   body: submitData,
      // });

      console.log("Submitting property:", formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Redirect to success page or dashboard
      router.push("/dashboard?property=created");
    } catch (error) {
      console.error("Error creating property:", error);
      setErrors({ submit: "Failed to create property. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">List Your Property</h1>
              <p className="text-gray-600 mt-2">
                Reach thousands of potential buyers and tenants. Only 5% transaction fee.
              </p>
            </div>
            <Link
              href="/dashboard"
              className="text-indigo-600 hover:text-indigo-700 font-medium"
            >
              ← Back to Dashboard
            </Link>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Basic Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                    errors.title ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="e.g., Beautiful 4-Bedroom Family Home in Rayfield"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Type *
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => handleInputChange("type", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  {propertyTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price (₦) *
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  step="1000"
                  value={formData.price}
                  onChange={(e) => handleInputChange("price", Number(e.target.value))}
                  className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                    errors.price ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="45000000"
                />
                {errors.price && (
                  <p className="text-red-500 text-sm mt-1">{errors.price}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status *
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => handleInputChange("status", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  {propertyStatuses.map((status) => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                required
                rows={4}
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                  errors.description ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Describe your property in detail. Include features, amenities, and what makes it special..."
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description}</p>
              )}
            </div>
          </div>

          {/* Property Details */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Property Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bedrooms
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.bedrooms}
                  onChange={(e) => handleInputChange("bedrooms", Number(e.target.value))}
                  className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                    errors.bedrooms ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="4"
                />
                {errors.bedrooms && (
                  <p className="text-red-500 text-sm mt-1">{errors.bedrooms}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bathrooms
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.bathrooms}
                  onChange={(e) => handleInputChange("bathrooms", Number(e.target.value))}
                  className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                    errors.bathrooms ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="3"
                />
                {errors.bathrooms && (
                  <p className="text-red-500 text-sm mt-1">{errors.bathrooms}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Area (m²) *
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  step="0.1"
                  value={formData.area}
                  onChange={(e) => handleInputChange("area", Number(e.target.value))}
                  className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                    errors.area ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="250"
                />
                {errors.area && (
                  <p className="text-red-500 text-sm mt-1">{errors.area}</p>
                )}
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Location</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address *
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                    errors.address ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="15 Rayfield Road"
                />
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City *
                </label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Jos"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State
                </label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => handleInputChange("state", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Plateau"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Coordinates (optional)
                </label>
                <input
                  type="text"
                  value={formData.coordinates}
                  onChange={(e) => handleInputChange("coordinates", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="9.8965,8.8583"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Format: latitude,longitude (e.g., 9.8965,8.8583)
                </p>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Features & Amenities</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {commonFeatures.map((feature) => (
                <label key={feature} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.features.includes(feature)}
                    onChange={() => toggleFeature(feature)}
                    className="rounded text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">{feature}</span>
                </label>
              ))}
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Custom Features (comma-separated)
              </label>
              <input
                type="text"
                placeholder="e.g., Solar panels, Smart home system, Wine cellar"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                onBlur={(e) => {
                  const customFeatures = e.target.value
                    .split(",")
                    .map(f => f.trim())
                    .filter(f => f && !commonFeatures.includes(f));
                  
                  if (customFeatures.length > 0) {
                    setFormData(prev => ({
                      ...prev,
                      features: [...prev.features, ...customFeatures]
                    }));
                  }
                }}
              />
            </div>
          </div>

          {/* Images */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Property Images *</h2>
            
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                isDragActive
                  ? "border-indigo-500 bg-indigo-50"
                  : "border-gray-300 hover:border-indigo-400 hover:bg-gray-50"
              }`}
            >
              <input {...getInputProps()} />
              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-lg font-medium text-gray-900 mb-2">
                {isDragActive ? "Drop images here" : "Drag & drop images here"}
              </p>
              <p className="text-gray-600 mb-4">
                or click to select files (max 10 images, 5MB each)
              </p>
              <p className="text-sm text-gray-500">
                PNG, JPG, JPEG, WEBP up to 5MB
              </p>
            </div>

            {errors.images && (
              <p className="text-red-500 text-sm mt-2">{errors.images}</p>
            )}

            {/* Image Preview */}
            {formData.images.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Selected Images ({formData.images.length})
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Video Tour */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Video Tour (Optional)</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Video URL
              </label>
              <input
                type="url"
                value={formData.videoTour}
                onChange={(e) => handleInputChange("videoTour", e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="https://youtube.com/watch?v=..."
              />
              <p className="text-xs text-gray-500 mt-1">
                YouTube, Vimeo, or direct video link
              </p>
            </div>
          </div>

          {/* Submit */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Ready to List?</h2>
                <p className="text-gray-600 mt-1">
                  Your property will be visible to thousands of potential buyers and tenants.
                </p>
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className={`px-8 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                    Creating...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5 mr-2" />
                    List Property
                  </>
                )}
              </button>
            </div>

            {errors.submit && (
              <p className="text-red-500 text-sm mt-4">{errors.submit}</p>
            )}

            <div className="mt-6 p-4 bg-indigo-50 rounded-lg">
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-indigo-600 mr-3 mt-0.5" />
                <div>
                  <h3 className="font-medium text-indigo-900">What happens next?</h3>
                  <ul className="text-sm text-indigo-800 mt-2 space-y-1">
                    <li>• Your property will be reviewed within 24 hours</li>
                    <li>• Once approved, it will be visible to all users</li>
                    <li>• You'll receive inquiries directly from interested buyers/tenants</li>
                    <li>• Only 5% transaction fee when you close a deal</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
