"use client";

import { motion, Variants, easeOut } from "framer-motion";
import {
  Shield,
  TrendingUp,
  Users,
  MapPin,
  CheckCircle,
  Star,
  Play,
} from "lucide-react";

// ✅ Correctly typed variants with framer-motion easing
const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: easeOut },
  },
};

// Example features (extend as needed)
const features = [
  {
    icon: Shield,
    title: "Legal Protection",
    description:
      "Verified lawyers available for all transactions. Get legal advice and ensure your property deals are secure.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: TrendingUp,
    title: "Better Prices",
    description:
      "Direct connection between buyers and sellers means no inflated prices. Save up to 10% on traditional realtor fees.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Users,
    title: "Trusted Network",
    description:
      "Verified property owners and buyers. No more dealing with unreliable middlemen.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: MapPin,
    title: "Jos & Beyond",
    description:
      "Focused on Plateau State with coverage across Nigeria. Find properties in your preferred location.",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: CheckCircle,
    title: "Verified Listings",
    description:
      "Every property goes through a strict verification process, so you only see legitimate opportunities.",
    color: "from-indigo-500 to-blue-500",
  },
  {
    icon: Star,
    title: "Top Rated Agents",
    description:
      "Work with trusted, highly rated agents who understand the Nigerian market inside out.",
    color: "from-yellow-500 to-orange-400",
  },
  {
    icon: Play,
    title: "Virtual Tours",
    description:
      "Save time with 3D walkthroughs and video tours before scheduling physical visits.",
    color: "from-pink-500 to-rose-500",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="text-center py-24 px-6 bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
        <motion.h1
          className="text-5xl font-bold mb-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOut }}
        >
          Welcome to Legit Exchange
        </motion.h1>
        <motion.p
          className="text-lg max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: easeOut }}
        >
          Buy, sell, and rent properties in Nigeria with confidence. Connect
          directly with verified buyers, sellers, and legal experts.
        </motion.p>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="text-center"
              variants={itemVariants}
              custom={index}
            >
              <motion.div
                className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-gradient-to-r ${feature.color}`}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, ease: easeOut, delay: index * 0.1 }}
              >
                <feature.icon className="w-8 h-8 text-white" aria-hidden="true" />
              </motion.div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </main>
  );
}
