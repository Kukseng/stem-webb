import React, { useState, useEffect, useRef } from "react";
import { FaBook, FaSearch, FaFilter } from "react-icons/fa";
import { ArrowBigDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AllCoursesHeader = ({
  searchTerm,
  setSearchTerm,
  showFilters,
  setShowFilters,
  filters,
  handleFilterChange,
  allCategories,
}) => {
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsCategoryDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <motion.header
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4 md:gap-6 bg-white py-4 md:py-6 px-4 md:px-6 rounded-xl shadow-sm border border-gray-100"
  >
    <div className="flex items-center justify-center space-x-4">
      <div className="bg-[#16789e] bg-opacity-10 p-3 rounded-full shadow-inner transition-transform duration-300 hover:scale-105">
        <FaBook className="w-6 h-6 text-[#16789e]" />
      </div>
    
    
  <motion.nav
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.2 }}
    className="flex items-center h-10 mb-6 bg-white shadow-sm rounded-lg px-4"
    aria-label="Breadcrumb"
  >
  
  </motion.nav>
 
      </div>
   
    <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
      <div className="relative flex-grow sm:max-w-xs w-full">
        <input
          type="text"
          placeholder="ស្វែងរកវគ្គសិក្សា..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border border-gray-200 rounded-[40px] pl-10 pr-4 py-2.5 md:py-3 bg-gray-50 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#16789e] focus:border-transparent transition-all duration-300 ease-in-out shadow-sm hover:shadow-md"
          aria-label="ស្វែងរកវគ្គសិក្សា"
        />
        <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 transition-colors duration-300 hover:text-[#16789e]" />
      </div>
     
      {allCategories.length > 0 && (
        <div className="relative w-full sm:w-auto" ref={dropdownRef}>
          <button
            onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
            className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2.5 bg-white border border-gray-200 rounded-[40px] text-[16px] md:text-[18px] text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#16789e] transition-all duration-300 ease-in-out shadow-sm hover:bg-gray-50 hover:shadow-md"
            aria-label="ជ្រើសរើស"
            aria-expanded={isCategoryDropdownOpen}
          >
            {filters.category === "all" ? "ជ្រើសរើស" : filters.category}
            <ArrowBigDown
              className={`w-4 h-4 md:w-5 md:h-5 text-gray-500 transition-transform duration-200 ease-in-out ${
                isCategoryDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          <AnimatePresence>
            {isCategoryDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute z-20 mt-2 w-full min-w-[180px] md:w-56 bg-white border border-gray-200 rounded-lg shadow-xl max-h-60 overflow-y-auto"
              >
                <ul className="text-sm md:text-base text-gray-700">
                  <li
                    onClick={() => handleFilterChange("category", "all")}
                    className={`px-4 py-2 hover:bg-[#16789e] hover:text-white cursor-pointer transition-all duration-200 ease-in-out ${
                      filters.category === "all" ? "bg-[#16789e] text-white" : ""
                    }`}
                    role="option"
                    aria-selected={filters.category === "all"}
                  >
                    ទាំងអស់
                  </li>
                  {allCategories.map((category) => (
                    <li
                      key={category}
                      onClick={() => handleFilterChange("category", category)}
                      className={`px-4 py-2 hover:bg-[#16789e] hover:text-white cursor-pointer transition-all duration-200 ease-in-out ${
                        filters.category === category ? "bg-[#16789e] text-white" : ""
                      }`}
                      role="option"
                      aria-selected={filters.category === category}
                    >
                      {category}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  </motion.header>
  );
};

export default AllCoursesHeader;