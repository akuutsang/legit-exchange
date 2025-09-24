'use client'

import { useState } from 'react'
import { Shield, Star, MapPin } from 'lucide-react'

const lawyers = [
  {
    id: 1,
    name: 'Barrister Aisha Ibrahim',
    specialty: 'Criminal Law',
    rating: 4.8,
    location: 'Lagos, Nigeria',
    isVerified: true,
  },
  {
    id: 2,
    name: 'Barrister Chukwuemeka Okafor',
    specialty: 'Corporate Law',
    rating: 4.6,
    location: 'Abuja, Nigeria',
    isVerified: true,
  },
  {
    id: 3,
    name: 'Barrister Fatima Bello',
    specialty: 'Family Law',
    rating: 4.7,
    location: 'Kano, Nigeria',
    isVerified: false,
  },
]

export default function LawyersPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredLawyers = lawyers.filter(
    (lawyer) =>
      lawyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lawyer.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            Find a Lawyer
          </h1>
          <p className="text-lg text-gray-600">
            Connect with verified legal professionals across Nigeria
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <input
            type="text"
            placeholder="Search by name or specialty..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-6 py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
          />
        </div>

        {/* Lawyer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredLawyers.map((lawyer) => (
            <div
              key={lawyer.id}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-semibold text-gray-900">
                  {lawyer.name}
                </h3>
                {lawyer.isVerified && (
                  <Shield
                    className="w-5 h-5 text-green-600"
                    aria-label="Verified Lawyer"
                  />
                )}
              </div>
              <p className="text-blue-600 font-medium mb-2">
                {lawyer.specialty}
              </p>
              <div className="flex items-center gap-1 mb-2">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-gray-600">{lawyer.rating}</span>
              </div>
              <div className="flex items-center gap-1 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{lawyer.location}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredLawyers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Shield
                className="w-16 h-16 mx-auto"
                aria-hidden="true"
              />
            </div>
            <p className="text-gray-600 text-lg">
              No lawyers found matching your search
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
