import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import CourseUpload from '../courses/Courses-Upload'; // Import the CourseUpload component

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phone: '',
    location: '',
    about: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [selectedInstitution, setSelectedInstitution] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const BASE_URL = 'https://stem-api.istad.co/api/';
  const accessToken = localStorage.getItem('access_token');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setFormData({
        ...formData,
        firstName: 'សុភា',
        lastName: 'រក្ខិតា',
        username: 'sopharakhita',
        email: 'sopha.r@example.com',
        phone: '012 345 678',
        location: 'ភ្នំពេញ, កម្ពុជា',
        about: 'និស្សិតផ្នែកវិទ្យាសាស្ត្រកុំព្យូទ័រ',
      });
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword({
      ...showPassword,
      [field]: !showPassword[field],
    });
  };

  const handleInstitutionSelect = (institution) => {
    setSelectedInstitution(institution);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const institutions = [
    { id: 1, name: 'ProCrew', icon: 'building' },
    { id: 2, name: 'Noon', icon: 'building' },
    { id: 3, name: 'LamasaTech', icon: 'building' },
    { id: 4, name: 'ផ្សេងទៀត', icon: 'plus' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, when: 'beforeChildren', staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 },
    },
  };

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'building':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
        );
      case 'plus':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white z-50 flex items-center justify-center"
          >
            <motion.div
              animate={{
                rotate: 360,
                transition: { duration: 1.5, repeat: Infinity, ease: 'linear' },
              }}
              className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1">
        <motion.header
          className="bg-white border-b border-gray-200 p-4 flex justify-between items-center sticky top-0 z-10"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-xl font-semibold text-gray-800">
            ទម្រង់ពត៌មានអ្នកប្រើប្រាស់
          </h1>
          <div className="flex items-center">
            <motion.button
              className="p-2 rounded-full hover:bg-gray-100"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </motion.button>
            <motion.button
              className="p-2 rounded-full hover:bg-gray-100 ml-2 relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                3
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </motion.button>
            <motion.div
              className="ml-4 flex items-center cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <img
                  src="/api/placeholder/100/100"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="ml-2 text-sm font-medium text-gray-700">
                សុភារក្ខិតា
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-1 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </motion.div>
          </div>
        </motion.header>

        <main className="p-6">
          <motion.div
            className="max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="bg-white rounded-xl shadow-sm p-6 mb-6"
              variants={itemVariants}
            >
              <div className="flex flex-col md:flex-row md:items-center mb-6">
                <div className="flex items-center mb-4 md:mb-0">
                  <motion.div
                    className="w-20 h-20 rounded-full overflow-hidden mr-4 border-4 border-blue-100"
                    whileHover={{ scale: 1.1, borderColor: '#3B82F6' }}
                  >
                    <img
                      src="/api/placeholder/100/100"
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  <div>
                    <h2 className="text-xl font-semibold">សុភារក្ខិតា</h2>
                    <p className="text-gray-500 text-sm">
                      ១៨ ឆ្នាំ, និស្សិតផ្នែកវិទ្យាសាស្ត្រកុំព្យូទ័រ
                    </p>
                  </div>
                </div>
                <div className="md:ml-auto flex flex-wrap gap-2">
                  <motion.button
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium flex items-center"
                    whileHover={{ scale: 1.05, backgroundColor: '#2563EB' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    មុខងារហ្នឹង
                  </motion.button>
                  <motion.button
                    className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium flex items-center"
                    onClick={() => handleNavigation('/logout')}
                    whileHover={{ scale: 1.05, backgroundColor: '#F3F4F6' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    ចាកចេញ
                  </motion.button>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-white rounded-xl shadow-sm overflow-hidden mb-6"
              variants={itemVariants}
            >
              <div className="flex border-b border-gray-200">
                {[
                  'ពត៌មានទូទៅ',
                  'ពាក្យសម្ងាត់',
                  'ការកំណត់',
                  'បញ្ចូលវគ្គសិក្សា',
                ].map((tab, index) => (
                  <motion.button
                    key={index}
                    className={`px-6 py-3 text-sm font-medium ${
                      activeTab === index
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab(index)}
                    whileHover={{ backgroundColor: '#F9FAFB' }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {tab}
                  </motion.button>
                ))}
              </div>

              <div className="p-6">
                <AnimatePresence mode="wait">
                  {activeTab === 0 && (
                    <motion.div
                      key="general"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div whileHover={{ y: -2 }}>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            ឈ្មោះដំបូង
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="សុភា"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          />
                        </motion.div>
                        <motion.div whileHover={{ y: -2 }}>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            នាមត្រកូល
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="រក្ខិតា"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          />
                        </motion.div>
                      </div>

                      <motion.div className="mt-4" whileHover={{ y: -2 }}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          ឈ្មោះពេញលេញរបស់
                        </label>
                        <input
                          type="text"
                          name="username"
                          value={formData.username}
                          onChange={handleChange}
                          placeholder="sopharakhita"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                      </motion.div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <motion.div whileHover={{ y: -2 }}>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            អាសយដ្ឋានអីម៉ែល
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                />
                              </svg>
                            </div>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              placeholder="example@mail.com"
                              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                          </div>
                        </motion.div>
                        <motion.div whileHover={{ y: -2 }}>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            លេខទូរស័ព្ទ
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                                />
                              </svg>
                            </div>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              placeholder="012 345 678"
                              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                          </div>
                        </motion.div>
                      </div>

                      <motion.div
                        className="mt-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
                      >
                        <h3 className="text-lg font-medium text-gray-800 mb-3">ស្ថាប័ន</h3>
                        <div className="flex flex-wrap gap-3">
                          {institutions.map((institution) => (
                            <motion.div
                              key={institution.id}
                              className={`border ${
                                selectedInstitution === institution.id
                                  ? 'border-blue-500 bg-blue-50'
                                  : 'border-gray-300'
                              } rounded-lg p-3 flex items-center min-w-32 hover:border-blue-500 cursor-pointer transition-colors`}
                              onClick={() => handleInstitutionSelect(institution.id)}
                              whileHover={{ y: -5, boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)' }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-2">
                                {getIcon(institution.icon)}
                              </div>
                              <span className="text-sm">{institution.name}</span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>

                      <motion.div className="mt-6" whileHover={{ y: -2 }}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          ទីតាំង
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-gray-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                          </div>
                          <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="ភ្នំពេញ, កម្ពុជា"
                            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          />
                        </div>
                      </motion.div>

                      <motion.div className="mt-4" whileHover={{ y: -2 }}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          អំពីការហាត់រៀន
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-gray-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                              />
                            </svg>
                          </div>
                          <input
                            type="text"
                            name="about"
                            value={formData.about}
                            onChange={handleChange}
                            placeholder="និស្សិតផ្នែកវិទ្យាសាស្ត្រកុំព្យូទ័រ"
                            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          />
                        </div>
                      </motion.div>
                    </motion.div>
                  )}

                  {activeTab === 1 && (
                    <motion.div
                      key="password"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="grid grid-cols-1 gap-6">
                        <motion.div whileHover={{ y: -2 }}>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            ពាក្យសម្ងាត់បច្ចុប្បន្ន
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 0"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                />
                              </svg>
                            </div>
                            <input
                              type={showPassword.current ? 'text' : 'password'}
                              name="currentPassword"
                              value={formData.currentPassword}
                              onChange={handleChange}
                              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                              <motion.button
                                type="button"
                                onClick={() => togglePasswordVisibility('current')}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5 text-gray-400"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d={
                                      showPassword.current
                                        ? 'M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21'
                                        : 'M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                                    }
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d={
                                      showPassword.current
                                        ? ''
                                        : 'M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                                    }
                                  />
                                </svg>
                              </motion.button>
                            </div>
                          </div>
                        </motion.div>

                        <motion.div whileHover={{ y: -2 }}>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            ពាក្យសម្ងាត់ថ្មី
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                />
                              </svg>
                            </div>
                            <input
                              type={showPassword.new ? 'text' : 'password'}
                              name="newPassword"
                              value={formData.newPassword}
                              onChange={handleChange}
                              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                              <motion.button
                                type="button"
                                onClick={() => togglePasswordVisibility('new')}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5 text-gray-400"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d={
                                      showPassword.new
                                        ? 'M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21'
                                        : 'M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                                    }
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d={
                                      showPassword.new
                                        ? ''
                                        : 'M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                                    }
                                  />
                                </svg>
                              </motion.button>
                            </div>
                          </div>
                        </motion.div>

                        <motion.div whileHover={{ y: -2 }}>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            បញ្ជាក់ពាក្យសម្ងាត់ថ្មី
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                />
                              </svg>
                            </div>
                            <input
                              type={showPassword.confirm ? 'text' : 'password'}
                              name="confirmPassword"
                              value={formData.confirmPassword}
                              onChange={handleChange}
                              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                              <motion.button
                                type="button"
                                onClick={() => togglePasswordVisibility('confirm')}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5 text-gray-400"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d={
                                      showPassword.confirm
                                        ? 'M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21'
                                        : 'M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                                    }
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d={
                                      showPassword.confirm
                                        ? ''
                                        : 'M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                                    }
                                  />
                                </svg>
                              </motion.button>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 2 && (
                    <motion.div
                      key="settings"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h3 className="text-lg font-medium text-gray-800 mb-4">ការកំណត់</h3>
                      <p className="text-gray-500">
                        នៅទីនេះអ្នកអាចកំណត់ការកំណត់បន្ថែមសម្រាប់គណនីរបស់អ្នក។
                      </p>
                    </motion.div>
                  )}

                  {activeTab === 3 && (
                    <motion.div
                      key="course-upload"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <CourseUpload /> {/* Replace the form with CourseUpload component */}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default UserProfile;