import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import iconStudy from "../../assets/iconsvg/iconStudy.svg";

const StemEducationHeader = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: { type: "spring", stiffness: 200, damping: 15, delay: 0.2 },
    },
    hover: { scale: 1.2, rotate: 10, transition: { duration: 0.3 } },
  };

  const textVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, delay: 0.4 },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, delay: 0.6 },
    },
    hover: { scale: 1.05, y: -5, transition: { duration: 0.3 } },
    tap: { scale: 0.95 },
  };

  return (
    <section className="w-full py-8 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-[1300px] mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          className="relative bg-gradient-to-r from-blue-600 via-teal-500 to-blue-400 p-6 rounded-xl shadow-lg flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden"
        >
          {/* Subtle Background Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2)_0%,transparent_70%)] pointer-events-none"></div>

          {/* Left Section: Icon + Title */}
          <div className="flex items-center space-x-6 z-10">
            {/* Animated Icon */}
            <motion.div
              variants={iconVariants}
              whileHover="hover"
              className="relative w-16 h-16 flex items-center justify-center"
            >
              <div className="absolute w-20 h-20 bg-white/20 rounded-full blur-md animate-pulse"></div>
              <img
                src={iconStudy}
                alt="STEM Icon"
                className="w-12 h-12 text-white relative z-10"
              />
            </motion.div>

            {/* Title with Gradient Text */}
            <motion.h1
              variants={textVariants}
              className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-teal-100 hover:from-teal-100 hover:to-white transition-all duration-500 font-suwannaphum"
            >
              គោលបំណងមុខវិជ្ជា STEM
            </motion.h1>
          </div>

          {/* Right Section: Buttons */}
          <motion.div
            variants={buttonVariants}
            className="flex space-x-4 z-10"
          >
            {/* Language Button */}
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="px-6 py-2 border-2 border-white text-white rounded-full bg-transparent hover:bg-white/20 transition-all duration-300 font-medium font-suwannaphum relative overflow-hidden group"
            >
              <span className="relative z-10">ខ្មែរ/អង់គ្លេស</span>
              <span className="absolute inset-0 bg-teal-400/30 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
            </motion.button>

            {/* Become a Teacher Button */}
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="px-6 py-2 bg-white text-teal-600 rounded-full font-medium font-suwannaphum relative overflow-hidden group shadow-md"
            >
              <span className="relative z-10 flex items-center">
                <Sparkles className="w-4 h-4 mr-2 text-teal-500 group-hover:text-teal-700 transition-colors" />
                ក្លាយជាគ្រូបង្រៀន
              </span>
              <span className="absolute inset-0 bg-teal-200 transform scale-x-0 origin-right transition-transform duration-300 group-hover:scale-x-100"></span>
            </motion.button>
          </motion.div>

          {/* Decorative Sparkles */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="absolute top-4 right-4 text-white/50"
          >
            <Sparkles className="w-6 h-6 animate-twinkle" />
          </motion.div>
        </motion.div>
      </div>

      {/* Custom CSS for Twinkle Animation */}
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        .animate-twinkle {
          animation: twinkle 2s infinite ease-in-out;
        }
      `}</style>
    </section>
  );
};

export default StemEducationHeader;