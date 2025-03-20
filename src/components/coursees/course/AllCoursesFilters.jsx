import React from "react";
import { FaStar, FaClock, FaTags } from "react-icons/fa";
import { motion } from "framer-motion";

const filterPanelVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: "auto", transition: { duration: 0.3 } },
};

const AllCoursesFilters = ({ showFilters, filters, handleFilterChange, resetFilters }) => {
  return (
    <motion.div
      variants={filterPanelVariants}
      initial="hidden"
      animate={showFilters ? "visible" : "hidden"}
      className="bg-white p-6 rounded-xl shadow-md mb-6 border border-gray-200 sticky top-4 z-10"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Price Filter */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
            <FaStar className="text-[#16789e]" /> តម្លៃ
          </h3>
          <select
            value={filters.price}
            onChange={(e) => handleFilterChange("price", e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#16789e] transition-all duration-300 ease-in-out shadow-sm"
          >
            <option value="all">ទាំងអស់</option>
            <option value="free">ឥតគិតថ្លៃ</option>
            <option value="paid">បង់ប្រាក់</option>
          </select>
        </div>

        {/* Duration Filter */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
            <FaClock className="text-[#16789e]" /> រយៈពេល
          </h3>
          <select
            value={filters.duration}
            onChange={(e) => handleFilterChange("duration", e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#16789e] transition-all duration-300 ease-in-out shadow-sm"
          >
            <option value="all">ទាំងអស់</option>
            <option value="short">ខ្លី (&lt; 60 នាទី)</option>
            <option value="medium">មធ្យម (60-180 នាទី)</option>
            <option value="long">វែង (&gt; 180 នាទី)</option>
          </select>
        </div>

        {/* Level Filter */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
            <FaTags className="text-[#16789e]" /> កម្រិត
          </h3>
          <select
            value={filters.level}
            onChange={(e) => handleFilterChange("level", e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#16789e] transition-all duration-300 ease-in-out shadow-sm"
          >
            <option value="all">ទាំងអស់</option>
            <option value="beginner">កម្រិតដំបូង</option>
            <option value="intermediate">កម្រិតមធ្យម</option>
            <option value="advanced">កម្រិតខ្ពស់</option>
          </select>
        </div>

        {/* Reset Button */}
        <div className="flex items-end">
          <button
            onClick={resetFilters}
            className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-all duration-300 ease-in-out shadow-sm"
          >
            សម្អាតការចម្រាញ់
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default AllCoursesFilters;