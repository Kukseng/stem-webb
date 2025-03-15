import React from "react";
import { motion } from "framer-motion";
import ISTAD from "../../assets/images/logo/ISTAD.png";
import logo from "../../assets/images/logo/o-removebg-preview.png";

const Footer = () => {
  const menuItems = ["ទំព័រដើម", "អំពីស្ថាប័ន", "សេវាកម្ម", "តម្លៃ", "ទំនាក់ទំនង", "ប្លុក"];
  const primaryColor = "#16789e"; // Primary teal
  const primaryLight = "#4ba8c1"; // Lighter teal for hover
  const bgGradient = "from-gray-900 via-teal-950 to-gray-900"; // Dark background

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut", staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <footer className={`relative w-full bg-gradient-to-b ${bgGradient} py-8 overflow-hidden text-white font-suwannaphum`}>
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-48 h-48 bg-gradient-to-br from-teal-500/20 to-transparent rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-56 h-56 bg-gradient-to-tl from-teal-500/20 to-transparent rounded-full blur-2xl animate-pulse delay-1000" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZmFkZUdyYWRpZW50IiB4MT0iMCIgeDI9IjAiIHkxPSIwIiB5Mj0iMSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMxNjc4OWUiIHN0b3Atb3BhY2l0eT0iMC4xIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzE2Nzg5ZSIgc3RvcC1vcGFjaXR5PSIwIi8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogICAgPG1hc2sgaWQ9ImZhZGVNYXNrIj4KICAgICAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9InVybCgjZmFkZUdyYWRpZW50KSIvPgogICAgPC9tYXNrPgogIDwvZGVmcz4KICA8cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzE2Nzg5ZSIgbWFzaz0idXJsKCNmYWRlTWFzaykiLz4KPC9zdmc+')] bg-repeat opacity-5"></div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-10 max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {/* iSTEM Section */}
          <motion.div variants={itemVariants} className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="flex items-center gap-4 mb-4">
              <motion.img
                whileHover={{ scale: 1.1 }}
                src={logo}
                alt="iSTEM Logo"
                className="w-12 object-contain"
              />
              <h2 className="text-xl font-bold" style={{ color: primaryColor }}>
                iSTEM
              </h2>
            </div>
            <p className="text-base text-gray-300 leading-relaxed max-w-xs">
              យើងផ្តល់ការអប់រំកម្រិតខ្ពស់ជាមួយមូលដ្ឋានគ្រឹះគុណភាពសម្រាប់សិស្សដើម្បីជោគជ័យក្នុងការសិក្សា។
            </p>
          </motion.div>

          {/* Menu Section */}
          <motion.div variants={itemVariants} className="flex flex-col items-center lg:items-start">
            <h3 className="text-2xl font-bold text-white mb-4">មាតិកា</h3>
            <ul className="space-y-2">
              {menuItems.map((item, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5, color: primaryLight }}
                  className="text-base text-gray-300 cursor-pointer transition-colors duration-200"
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Section */}
          <motion.div variants={itemVariants} className="flex flex-col items-center lg:items-start">
            <h3 className="text-2xl font-bold text-white mb-4">ទំនាក់ទំនង</h3>
            <div className="space-y-3">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3 group cursor-pointer"
              >
                <div
                  className="p-2 rounded-lg transition-all duration-300"
                  style={{ backgroundColor: `${primaryColor}30`, color: primaryColor }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span
                  className="text-base text-gray-300 group-hover:text-white transition-colors duration-300"
                  style={{ color: primaryColor }}
                >
                  stem.istad@gmail.com
                </span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3 group cursor-pointer"
              >
                <div
                  className="p-2 rounded-lg transition-all duration-300"
                  style={{ backgroundColor: `${primaryColor}30`, color: primaryColor }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="text-base text-gray-300 group-hover:text-white transition-colors duration-300">
                  សង្កាត់ទឹកថ្លា ខណ្ឌសែនសុខ រាជធានីភ្នំពេញ
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* ISTAD Section */}
          <motion.div variants={itemVariants} className="flex flex-col items-center lg:items-start">
            <h3 className="text-2xl font-bold text-white mb-4">រៀបចំដោយ</h3>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 group cursor-pointer"
            >
              <img
                src={ISTAD}
                alt="ISTAD Logo"
                className="w-12 object-contain transition-transform duration-300 group-hover:scale-110"
              />
              <span
                className="text-xl font-bold transition-colors duration-300 group-hover:text-white"
                style={{ color: primaryColor }}
              >
                ISTAD
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          variants={itemVariants}
          className="mt-8 pt-4 border-t border-gray-700/50 text-center"
        >
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} iSTEM Club. រក្សាសិទ្ធិគ្រប់យ៉ាង។
          </p>
        </motion.div>
      </motion.div>

      {/* Custom CSS */}
      <style jsx>{`
        html {
          scroll-behavior: smooth;
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }
        .animate-pulse {
          animation: pulse 4s infinite ease-in-out;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </footer>
  );
};

export default Footer;