import React, { useState, useEffect } from "react";
import { FaCalendarAlt, FaEye, FaSearch, FaChevronLeft, FaChevronRight, FaTags } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useGetAllArticlesQuery } from "../../api/articles-api";
import { motion, AnimatePresence } from "framer-motion";

const BlogComponent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const navigate = useNavigate();

  // Fetch all articles with pagination
  const { data, isLoading, isError, error } = useGetAllArticlesQuery({ page: currentPage });

  // Handle view article
  const handleViewArticle = (id) => {
    navigate(`/articles/${id}`);
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
    // Implement search functionality here
  };

  const totalPages = data?.count ? Math.ceil(data.count / 10) : 1;

  // For pagination display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
      } else if (currentPage >= totalPages - 2) {
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pages.push(i);
        }
      }
    }
    
    return pages;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 font-sans bg-gray-50 min-h-screen">
      <motion.h1 
        className="text-3xl font-bold text-center mb-12 text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        ព័ត៌មាន និង អត្ថបទ
      </motion.h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <motion.div 
          className="w-full lg:w-2/3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Loading State */}
          <AnimatePresence>
            {isLoading && (
              <motion.div 
                className="flex justify-center py-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 border-4 border-t-[#16789e] border-gray-200 rounded-full animate-spin"></div>
                  <p className="mt-4 text-gray-600">កំពុងផ្ទុកអត្ថបទ...</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error State */}
          <AnimatePresence>
            {isError && (
              <motion.div 
                className="bg-red-50 p-6 rounded-lg text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <p className="text-red-500 font-medium">
                  មានបញ្ហាក្នុងការផ្ទុកអត្ថបទ: {error?.data?.message || "សូមព្យាយាមម្តងទៀត"}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Blog Grid */}
          {!isLoading && !isError && data?.results && (
            <AnimatePresence>
              <motion.div 
                className="grid md:grid-cols-2 gap-6"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.1
                    }
                  }
                }}
              >
                {data.results.map((post, index) => (
                  <motion.div
                    key={post.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer group"
                    onClick={() => handleViewArticle(post.id)}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
                    }}
                    whileHover={{ 
                      y: -8,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <div className="relative overflow-hidden">
                      <motion.img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-52 object-cover transition-transform"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        onError={(e) => (e.target.src = "https://via.placeholder.com/400x200?text=No+Image")}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>
                    <div className="p-6">
                      <h2 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-[#16789e] transition-colors">
                        {post.title}
                      </h2>
                      <div className="flex items-center text-gray-500 text-sm mb-4">
                        <div className="flex items-center mr-4">
                          <FaCalendarAlt className="mr-1 text-[#16789e]" />
                          <span>{new Date(post.created_at).toLocaleDateString("km-KH")}</span>
                        </div>
                        <div className="flex items-center">
                          <FaEye className="mr-1 text-[#16789e]" />
                          <span>{post.views || 0}</span>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-4 line-clamp-3">{post.content}</p>
                      <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                        <motion.button
                          className="inline-block px-4 py-2 rounded-md bg-[#16789e]/10 text-[#16789e] font-medium hover:bg-[#16789e]/20 transition-colors"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          អានបន្ថែម
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}

          {/* No Results */}
          {!isLoading && !isError && (!data?.results || data.results.length === 0) && (
            <motion.div
              className="bg-white p-10 rounded-lg shadow-md text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-gray-600">មិនមានអត្ថបទត្រូវបានរកឃើញ</p>
            </motion.div>
          )}

          {/* Pagination */}
          {!isLoading && !isError && data?.count > 0 && (
            <motion.div 
              className="flex justify-center mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <nav className="flex items-center space-x-1 bg-white px-2 py-1 rounded-lg shadow-md">
                <motion.button
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  className="p-2 rounded-md hover:bg-gray-100 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={currentPage === 1}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaChevronLeft />
                </motion.button>

                {getPageNumbers().map((page) => (
                  <motion.button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-9 h-9 flex items-center justify-center rounded-md font-medium ${
                      currentPage === page
                        ? "bg-[#16789e] text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                    whileHover={currentPage !== page ? { scale: 1.1, backgroundColor: "#e5f5fa" } : {}}
                    whileTap={{ scale: 0.95 }}
                  >
                    {page}
                  </motion.button>
                ))}

                <motion.button
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="p-2 rounded-md hover:bg-gray-100 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={currentPage === totalPages}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaChevronRight />
                </motion.button>
              </nav>
            </motion.div>
          )}
        </motion.div>

        {/* Sidebar */}
        <motion.div 
          className="w-full lg:w-1/3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {/* Search */}
          <motion.div 
            className={`bg-white p-6 rounded-lg shadow-md mb-6 ${isSearchFocused ? 'ring-2 ring-[#16789e]/30' : ''}`}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
          >
            <form onSubmit={handleSearch}>
              <div className="relative">
                <input
                  type="text"
                  placeholder="ស្វែងរក..."
                  className="w-full py-3 px-4 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16789e] focus:border-transparent transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                />
                <motion.button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#16789e]"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaSearch />
                </motion.button>
              </div>
            </form>
          </motion.div>

          {/* Featured or Recent Posts */}
          <motion.div 
            className="bg-white p-6 rounded-lg shadow-md mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">អត្ថបទថ្មីៗ</h3>
            <div className="space-y-4">
              {!isLoading && !isError && data?.results && 
                data.results.slice(0, 3).map((post) => (
                  <motion.div 
                    key={`recent-${post.id}`}
                    className="flex gap-3 cursor-pointer"
                    onClick={() => handleViewArticle(post.id)}
                    whileHover={{ x: 3 }}
                  >
                    <div className="w-20 h-20 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
                      <img 
                        src={post.image} 
                        alt="" 
                        className="w-full h-full object-cover"
                        onError={(e) => (e.target.src = "https://via.placeholder.com/80?text=No+Image")}
                      />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 line-clamp-2 hover:text-[#16789e] transition-colors">
                        {post.title}
                      </h4>
                      <div className="flex items-center mt-1 text-xs text-gray-500">
                        <FaCalendarAlt className="mr-1 text-[#16789e]" />
                        <span>{new Date(post.created_at).toLocaleDateString("km-KH")}</span>
                      </div>
                    </div>
                  </motion.div>
                ))
              }
            </div>
          </motion.div>

          {/* Tags or Categories */}
          <motion.div 
            className="bg-white p-6 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h3 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">ប្រភេទអត្ថបទ</h3>
            <div className="flex flex-wrap gap-2 mt-4">
              {["ព័ត៌មានថ្មីៗ", "សុខភាព", "ការអប់រំ", "បច្ចេកវិទ្យា", "វប្បធម៌"].map((tag) => (
                <motion.div 
                  key={tag}
                  className="px-3 py-1.5 bg-gray-100 rounded-full text-gray-700 text-sm flex items-center gap-1.5 cursor-pointer hover:bg-[#16789e]/10 hover:text-[#16789e]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaTags className="text-xs" />
                  <span>{tag}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogComponent;