"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  HelpCircle, 
  MessageSquare, 
  Phone, 
  Mail, 
  Clock, 
  BookOpen,
  Shield,
  Users,
  MapPin,
  CreditCard,
  FileText,
  ChevronDown,
  ChevronUp
} from "lucide-react";

type FAQItem = {
  question: string;
  answer: string;
  category: string;
};

const faqs: FAQItem[] = [
  {
    question: "How does LegitExchange work?",
    answer: "LegitExchange connects property owners and buyers directly, eliminating the need for traditional realtors. Property owners list their properties, buyers search and filter based on preferences, and both parties communicate directly through our secure platform. We provide legal support and charge only a 5% transaction fee.",
    category: "General"
  },
  {
    question: "What are the fees?",
    answer: "We charge only a 5% transaction fee, which is significantly lower than traditional realtor fees of 10% or more. There are no hidden charges, listing fees, or monthly subscriptions.",
    category: "Fees"
  },
  {
    question: "How do I list my property?",
    answer: "To list your property, create an account, verify your identity, and fill out the property listing form. Include photos, detailed descriptions, and accurate pricing. Our team will review and approve your listing within 24 hours.",
    category: "Selling"
  },
  {
    question: "How do I find properties to buy or rent?",
    answer: "Use our advanced search filters to find properties by location, price range, property type, number of bedrooms, and more. You can save searches and get notified when new properties match your criteria.",
    category: "Buying"
  },
  {
    question: "Is the platform secure?",
    answer: "Yes, we use bank-level encryption and security measures. All transactions are protected, and we verify all users and properties. Our legal team ensures compliance with Nigerian real estate laws.",
    category: "Security"
  },
  {
    question: "How do I contact property owners or buyers?",
    answer: "Once you're registered, you can use our secure messaging system to communicate directly with other users. You can also schedule property viewings and negotiate terms through the platform.",
    category: "Communication"
  },
  {
    question: "What legal support do you provide?",
    answer: "We have a network of verified lawyers who specialize in real estate law. They can help with contract reviews, legal advice, and ensuring all transactions comply with Nigerian regulations.",
    category: "Legal"
  },
  {
    question: "How do I verify my account?",
    answer: "Account verification requires a valid government ID, proof of address, and phone number verification. This helps maintain the security and trust of our platform.",
    category: "Account"
  },
  {
    question: "Can I cancel a listing?",
    answer: "Yes, you can cancel or edit your property listing at any time. Changes will be reflected immediately on the platform.",
    category: "Selling"
  },
  {
    question: "What happens if there's a dispute?",
    answer: "We have a dedicated support team and dispute resolution process. In case of serious issues, our legal team can mediate and provide guidance according to Nigerian real estate laws.",
    category: "Support"
  }
];

const categories = ["All", "General", "Fees", "Selling", "Buying", "Security", "Communication", "Legal", "Account", "Support"];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleExpanded = (index: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.4 }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.div 
        className="bg-white shadow-sm border-b"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Help Center
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions and get support for your LegitExchange experience
            </p>
          </motion.div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filters */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search Bar */}
            <div className="flex-1">
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for help articles, FAQs, or topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                />
              </motion.div>
            </div>

            {/* Category Filter */}
            <div className="lg:w-64">
              <motion.select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </motion.select>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-all duration-300 group cursor-pointer"
            variants={cardVariants}
            whileHover={{ 
              scale: 1.05, 
              y: -5,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex items-center mb-4">
              <motion.div
                className="bg-gradient-to-br from-blue-500 to-cyan-500 w-8 h-8 rounded-lg flex items-center justify-center text-white mr-3 group-hover:scale-110 transition-transform duration-300"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <MessageSquare className="w-5 h-5" />
              </motion.div>
              <h3 className="text-lg font-semibold text-gray-900">Live Chat</h3>
            </div>
            <p className="text-gray-600 mb-4">Get instant help from our support team</p>
            <motion.button 
              className="text-indigo-600 hover:text-indigo-700 font-medium group-hover:translate-x-1 transition-transform duration-300"
              whileHover={{ x: 5 }}
            >
              Start Chat →
            </motion.button>
          </motion.div>

          <motion.div 
            className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-all duration-300 group cursor-pointer"
            variants={cardVariants}
            whileHover={{ 
              scale: 1.05, 
              y: -5,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex items-center mb-4">
              <motion.div
                className="bg-gradient-to-br from-green-500 to-emerald-500 w-8 h-8 rounded-lg flex items-center justify-center text-white mr-3 group-hover:scale-110 transition-transform duration-300"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Phone className="w-5 h-5" />
              </motion.div>
              <h3 className="text-lg font-semibold text-gray-900">Call Us</h3>
            </div>
            <p className="text-gray-600 mb-4">Speak directly with our support team</p>
            <p className="text-indigo-600 font-medium">+234 800 LEGIT</p>
          </motion.div>

          <motion.div 
            className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-all duration-300 group cursor-pointer"
            variants={cardVariants}
            whileHover={{ 
              scale: 1.05, 
              y: -5,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex items-center mb-4">
              <motion.div
                className="bg-gradient-to-br from-purple-500 to-pink-500 w-8 h-8 rounded-lg flex items-center justify-center text-white mr-3 group-hover:scale-110 transition-transform duration-300"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Mail className="w-5 h-5" />
              </motion.div>
              <h3 className="text-lg font-semibold text-gray-900">Email Support</h3>
            </div>
            <p className="text-gray-600 mb-4">Send us a detailed message</p>
            <p className="text-indigo-600 font-medium">support@legitexchange.ng</p>
          </motion.div>

          <motion.div 
            className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-all duration-300 group cursor-pointer"
            variants={cardVariants}
            whileHover={{ 
              scale: 1.05, 
              y: -5,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex items-center mb-4">
              <motion.div
                className="bg-gradient-to-br from-orange-500 to-red-500 w-8 h-8 rounded-lg flex items-center justify-center text-white mr-3 group-hover:scale-110 transition-transform duration-300"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <BookOpen className="w-5 h-5" />
              </motion.div>
              <h3 className="text-lg font-semibold text-gray-900">Documentation</h3>
            </div>
            <p className="text-gray-600 mb-4">Detailed guides and tutorials</p>
            <motion.button 
              className="text-indigo-600 hover:text-indigo-700 font-medium group-hover:translate-x-1 transition-transform duration-300"
              whileHover={{ x: 5 }}
            >
              View Docs →
            </motion.button>
          </motion.div>
        </motion.div>

        {/* FAQs */}
        <motion.div 
          className="bg-white rounded-lg shadow-sm border"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="px-6 py-4 border-b">
            <h2 className="text-2xl font-bold text-gray-900">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 mt-2">
              Find quick answers to common questions about using LegitExchange
            </p>
          </div>

          <div className="divide-y divide-gray-200">
            <AnimatePresence>
              {filteredFAQs.map((faq, index) => (
                <motion.div 
                  key={index} 
                  className="px-6 py-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.button
                    onClick={() => toggleExpanded(index)}
                    className="w-full flex items-center justify-between text-left hover:bg-gray-50 p-2 rounded-lg transition-all duration-300 group"
                    whileHover={{ backgroundColor: "#f9fafb" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors duration-300">
                        {faq.question}
                      </h3>
                      <motion.span 
                        className="inline-block bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        {faq.category}
                      </motion.span>
                    </div>
                    <motion.div
                      animate={{ rotate: expandedItems.has(index) ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {expandedItems.has(index) ? (
                        <ChevronUp className="w-5 h-5 text-gray-400 ml-4" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400 ml-4" />
                      )}
                    </motion.div>
                  </motion.button>
                  
                  <AnimatePresence>
                    {expandedItems.has(index) && (
                      <motion.div 
                        className="mt-4 pl-2"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Contact Information */}
        <motion.div 
          className="mt-12 bg-indigo-600 rounded-lg text-white p-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">
              Still Need Help?
            </h2>
            <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
              Our support team is here to help you with any questions or issues you might have.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div 
                className="text-center group"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="bg-indigo-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Clock className="w-6 h-6" />
                </motion.div>
                <h3 className="text-lg font-semibold mb-2">Support Hours</h3>
                <p className="text-indigo-100">
                  Monday - Friday: 8:00 AM - 6:00 PM<br />
                  Saturday: 9:00 AM - 3:00 PM<br />
                  Sunday: Closed
                </p>
              </motion.div>
              
              <motion.div 
                className="text-center group"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="bg-indigo-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Shield className="w-6 h-6" />
                </motion.div>
                <h3 className="text-lg font-semibold mb-2">Security</h3>
                <p className="text-indigo-100">
                  Bank-level encryption<br />
                  Verified users only<br />
                  Legal compliance
                </p>
              </motion.div>
              
              <motion.div 
                className="text-center group"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="bg-indigo-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Users className="w-6 h-6" />
                </motion.div>
                <h3 className="text-lg font-semibold mb-2">Community</h3>
                <p className="text-indigo-100">
                  Join our user community<br />
                  Share experiences<br />
                  Get tips and advice
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
