"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";
import Link from "next/link";

// Import role-specific dashboard components
import BuyerDashboard from "./components/BuyerDashboard";
import SellerDashboard from "./components/SellerDashboard";
import LawyerDashboard from "./components/LawyerDashboard";
import AdminDashboard from "./components/AdminDashboard";

export default function DashboardPage() {
  const { user, status, isAdmin, isLawyer, isSeller, isBuyer, isLoading } = useAuth();
  const router = useRouter();

  if (isLoading || status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (status === "unauthenticated") {
    router.push("/auth/signin");
    return null;
  }

  // Redirect users to appropriate dashboard based on their role
  if (isAdmin) {
    return <AdminDashboard />;
  }

  if (isLawyer) {
    return <LawyerDashboard />;
  }

  if (isSeller) {
    return <SellerDashboard />;
  }

  // Default to buyer dashboard
  return <BuyerDashboard />;
}

// Dashboard Components
function BuyerDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Buyer Dashboard</h1>
        <Link
          href="/properties/new"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          List a Property
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Saved Properties */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Saved Properties</h2>
          <p className="text-gray-600">View and manage your saved properties</p>
          <Link href="/properties/saved" className="text-indigo-600 hover:underline mt-2 block">
            View all →
          </Link>
        </div>

        {/* Recent Searches */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Recent Searches</h2>
          <p className="text-gray-600">Your recent property searches</p>
          <Link href="/properties/search-history" className="text-indigo-600 hover:underline mt-2 block">
            View history →
          </Link>
        </div>

        {/* Messages */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Messages</h2>
          <p className="text-gray-600">Check your messages with sellers and lawyers</p>
          <Link href="/messages" className="text-indigo-600 hover:underline mt-2 block">
            View messages →
          </Link>
        </div>
      </div>

      {/* Recommended Properties */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Recommended for You</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Property cards will be mapped here */}
          <div className="border rounded-lg overflow-hidden">
            <div className="h-48 bg-gray-200"></div>
            <div className="p-4">
              <h3 className="font-semibold">Beautiful Family Home</h3>
              <p className="text-gray-600">Jos, Plateau</p>
              <p className="text-lg font-bold mt-2">₦25,000,000</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SellerDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Seller Dashboard</h1>
        <Link
          href="/properties/new"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Add New Property
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Listed Properties */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Listed Properties</h2>
          <p className="text-3xl font-bold text-indigo-600">5</p>
          <p className="text-gray-600">Total properties listed</p>
          <Link href="/properties/my-listings" className="text-indigo-600 hover:underline mt-2 block">
            Manage properties →
          </Link>
        </div>

        {/* Viewings */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Scheduled Viewings</h2>
          <p className="text-3xl font-bold text-indigo-600">3</p>
          <p className="text-gray-600">Upcoming viewings</p>
          <Link href="/appointments" className="text-indigo-600 hover:underline mt-2 block">
            View schedule →
          </Link>
        </div>

        {/* Messages */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Messages</h2>
          <p className="text-3xl font-bold text-indigo-600">7</p>
          <p className="text-gray-600">Unread messages</p>
          <Link href="/messages" className="text-indigo-600 hover:underline mt-2 block">
            View messages →
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {[1, 2, 3].map((item) => (
              <li key={item} className="p-4 hover:bg-gray-50">
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium">New message from John Doe</p>
                    <p className="text-sm text-gray-500">About: Beautiful Family Home</p>
                  </div>
                  <span className="text-sm text-gray-500">2h ago</span>
                </div>
              </li>
            ))}
          </ul>
          <div className="p-4 bg-gray-50 text-center">
            <Link href="/activity" className="text-indigo-600 hover:underline">
              View all activity →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function LawyerDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Lawyer Dashboard</h1>
        <Link
          href="/appointments/new"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          New Consultation
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Upcoming Appointments */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Upcoming Appointments</h2>
          <p className="text-3xl font-bold text-indigo-600">5</p>
          <p className="text-gray-600">Scheduled consultations</p>
          <Link href="/appointments/upcoming" className="text-indigo-600 hover:underline mt-2 block">
            View schedule →
          </Link>
        </div>

        {/* Clients */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Active Clients</h2>
          <p className="text-3xl font-bold text-indigo-600">12</p>
          <p className="text-gray-600">Active client cases</p>
          <Link href="/clients" className="text-indigo-600 hover:underline mt-2 block">
            View clients →
          </Link>
        </div>

        {/* Documents */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Documents</h2>
          <p className="text-3xl font-bold text-indigo-600">8</p>
          <p className="text-gray-600">Documents to review</p>
          <Link href="/documents" className="text-indigo-600 hover:underline mt-2 block">
            View documents →
          </Link>
        </div>
      </div>

      {/* Recent Consultations */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Recent Consultations</h2>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[1, 2, 3].map((item) => (
                <tr key={item} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-900">John Doe</div>
                        <div className="text-sm text-gray-500">Property Purchase</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">Aug 25, 2023</div>
                    <div className="text-sm text-gray-500">2:00 PM</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Confirmed
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link href="/appointments/1" className="text-indigo-600 hover:text-indigo-900">View</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="p-4 bg-gray-50 text-center">
            <Link href="/appointments" className="text-indigo-600 hover:underline">
              View all appointments →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Users */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Total Users</h2>
          <p className="text-3xl font-bold text-indigo-600">1,245</p>
          <p className="text-sm text-gray-500">+12% from last month</p>
        </div>

        {/* Total Properties */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Total Properties</h2>
          <p className="text-3xl font-bold text-indigo-600">876</p>
          <p className="text-sm text-gray-500">+8% from last month</p>
        </div>

        {/* Pending Verifications */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Pending Verifications</h2>
          <p className="text-3xl font-bold text-amber-600">23</p>
          <p className="text-sm text-gray-500">Lawyers and properties</p>
          <Link href="/admin/verifications" className="text-indigo-600 hover:underline mt-2 block">
            Review →
          </Link>
        </div>

        {/* Total Revenue */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Total Revenue</h2>
          <p className="text-3xl font-bold text-indigo-600">₦12,450,000</p>
          <p className="text-sm text-gray-500">+15% from last month</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Users</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[1, 2, 3].map((item) => (
                  <tr key={item}>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">John Doe</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">john@example.com</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Buyer
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">2 hours ago</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-center">
            <Link href="/admin/users" className="text-indigo-600 hover:underline">
              View all users →
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">System Status</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Storage</span>
                <span className="text-sm text-gray-500">45% used</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Active Users</span>
                <span className="text-sm text-gray-500">142 active now</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '70%' }}></div>
              </div>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-2">
                <Link href="/admin/verifications" className="px-3 py-2 bg-indigo-100 text-indigo-700 rounded-md text-sm font-medium hover:bg-indigo-200 text-center">
                  Verify Users
                </Link>
                <Link href="/admin/reports" className="px-3 py-2 bg-amber-100 text-amber-700 rounded-md text-sm font-medium hover:bg-amber-200 text-center">
                  View Reports
                </Link>
                <Link href="/admin/settings" className="px-3 py-2 bg-gray-100 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-200 text-center">
                  Settings
                </Link>
                <Link href="/admin/support" className="px-3 py-2 bg-green-100 text-green-700 rounded-md text-sm font-medium hover:bg-green-200 text-center">
                  Support Tickets
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
