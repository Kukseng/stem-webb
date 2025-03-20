import React, { useState, useEffect, useContext } from "react";
import { FaCalendarAlt, FaSearch, FaChevronLeft, FaChevronRight, FaTags, FaBookmark, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useGetAllArticlesQuery, useCreateArticleMutation, useDeleteArticleMutation } from "../../api/articles-api";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../context/AuthContext";

const BlogComponent = ({ isLoggedIn }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [hoveredPost, setHoveredPost] = useState(null);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newArticle, setNewArticle] = useState({ title: "", content: "", image: "" });
  const [searchError, setSearchError] = useState("");

  const navigate = useNavigate();
  const { user, openLoginModal } = useContext(AuthContext);

  const queryArgs = { page: currentPage, search: searchTerm, ordering: "-created_at" };
  const { data, isLoading, isError, error, refetch } = useGetAllArticlesQuery(queryArgs);

  const [createArticle, { isLoading: isCreating }] = useCreateArticleMutation();
  const [deleteArticle, { isLoading: isDeleting }] = useDeleteArticleMutation();


  useEffect(() => {
    console.log("API Response:", data);
  }, [data]);

  const handleViewArticle = (id) => {
    if (!user) {
      setShowLoginPrompt(true);
      openLoginModal();
    } else {
      navigate(`/articles/${id}`);
    }
  };


  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };


  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm); // Debug search term
    setCurrentPage(1);
    setSearchError("");
    refetch();
  };


  const handleCreateArticle = async (e) => {
    e.preventDefault();
    if (!user) {
      setShowLoginPrompt(true);
      openLoginModal();
      return;
    }
    try {
      await createArticle(newArticle).unwrap();
      setIsCreateModalOpen(false);
      setNewArticle({ title: "", content: "", image: "" });
      refetch();
    } catch (err) {
      console.error("Failed to create article:", err);
    }
  };

  // Handle delete article
  const handleDeleteArticle = async (articleId, author) => {
    if (!user) {
      setShowLoginPrompt(true);
      openLoginModal();
      return;
    }
    if (user.username !== author) {
      alert("You can only delete articles you created.");
      return;
    }
    try {
      await deleteArticle(articleId).unwrap();
      refetch();
    } catch (err) {
      console.error("Failed to delete article:", err);
    }
  };

  // Client-side filtering as fallback
  const filteredResults = data?.results?.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  // Get recent posts
  const recentPosts = data?.results
    ? [...data.results].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 3)
    : [];

  const totalPages = data?.count ? Math.ceil(data.count / 10) : 1;

  
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


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
    exit: { opacity: 0, transition: { staggerChildren: 0.05, staggerDirection: -1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } },
    exit: { y: -20, opacity: 0 },
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 font-sans bg-gradient-to-b from-gray-50 to-white min-h-screen">
      {/* Header */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="mb-12">
        <motion.h1
          className="text-4xl font-bold text-center mb-4 text-gray-800 relative"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          ព័ត៌មាន និង អត្ថបទ
          <motion.div
            className="h-1 w-24 bg-gradient-to-r from-blue-500 to-teal-400 mx-auto mt-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "6rem" }}
            transition={{ duration: 0.8, delay: 0.6 }}
          />
        </motion.h1>
        <motion.p
          className="text-center text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          រកមើលអត្ថបទចុងក្រោយបំផុត និងពត៌មានថ្មីៗពិសេស
        </motion.p>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <motion.div className="w-full lg:w-2/3 order-2 lg:order-1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
          {/* Loading State */}
          <AnimatePresence mode="wait">
            {isLoading && (
              <motion.div className="flex justify-center py-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} key="loading">
                <div className="flex flex-col items-center">
                  <motion.div
                    className="w-16 h-16 rounded-full border-4 border-t-[#16789e] border-gray-200"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.p className="mt-4 text-gray-600 font-medium" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                    កំពុងផ្ទុកអត្ថបទ...
                  </motion.p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error State */}
          <AnimatePresence>
            {isError && (
              <motion.div className="bg-red-50 p-8 rounded-lg text-center shadow-lg border border-red-100" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
                <p className="text-red-600 font-medium text-lg">មានបញ្ហាក្នុងការផ្ទុកអត្ថបទ</p>
                <p className="text-gray-600 mt-2">{error?.data?.message || "សូមព្យាយាមម្តងទៀតពេលក្រោយ"}</p>
                <motion.button className="mt-4 px-5 py-2 bg-red-500 text-white rounded-lg font-medium" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => refetch()}>
                  ព្យាយាមម្តងទៀត
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

      
          <AnimatePresence>
            {searchError && (
              <motion.div className="bg-yellow-50 p-4 rounded-[40px] text-center mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <p className="text-yellow-700">{searchError}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Articles */}
          <AnimatePresence mode="wait">
            {!isLoading && !isError && filteredResults.length > 0 && (
              <motion.div
                className="grid md:grid-cols-2 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                key={`blog-grid-page-${currentPage}`}
              >
                {filteredResults.map((post, index) => (
                  <motion.div
                    key={post.id}
                    className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer group hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2"
                    onClick={() => handleViewArticle(post.id)}
                    variants={itemVariants}
                    onHoverStart={() => setHoveredPost(post.id)}
                    onHoverEnd={() => setHoveredPost(null)}
                  >
                    <div className="relative overflow-hidden h-52">
                      <motion.img
                        src={post.image || "https://img.freepik.com/free-photo/abstract-surface-textures-white-concrete-stone-wall_74190-8189.jpg"}
                        alt={post.title}
                        className={`w-full h-full object-cover transition-all duration-700 ${hoveredPost === post.id ? "scale-110 blur-sm brightness-75" : "scale-100"}`}
                        onError={(e) => (e.target.src = "https://img.freepik.com/free-photo/abstract-surface-textures-white-concrete-stone-wall_74190-8189.jpg")}
                      />
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
                        initial={{ opacity: 0.5 }}
                        whileHover={{ opacity: 0.7 }}
                        transition={{ duration: 0.3 }}
                      />
                      <motion.div
                        className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-1.5 rounded-full shadow-lg"
                        whileHover={{ scale: 1.1 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: hoveredPost === post.id ? 1 : 0 }}
                      >
                        <FaBookmark className="text-[#16789e]" />
                      </motion.div>
                      <motion.div
                        className="absolute bottom-4 left-4 flex items-center space-x-2 text-white text-sm"
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 * index }}
                      >
                        <span className="bg-[#16789e]/90 backdrop-blur-sm px-3 py-1 rounded-full font-medium flex items-center">
                          <FaCalendarAlt className="mr-1" />
                          {new Date(post.created_at).toLocaleDateString("km-KH")}
                        </span>
                      </motion.div>
                    </div>
                    <div className="p-6">
                      <motion.h2
                        className={`text-[24px] font-bold mb-3 transition-all duration-300 line-clamp-2 ${hoveredPost === post.id ? "text-[#16789e] translate-x-3" : "text-gray-800"}`}
                      >
                        {post.title}
                      </motion.h2>
                      <motion.p className="text-gray-600 mb-4 line-clamp-3" initial={{ opacity: 0.8 }} whileHover={{ opacity: 1 }}>
                        {post.content}
                      </motion.p>
                      <motion.div className="flex justify-between items-center pt-3 border-t border-gray-100" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                        <motion.button
                          className="inline-flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-[#16789e] to-[#2198B8] text-white font-medium"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          <span>អានបន្ថែម</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </motion.button>
                        {isLoggedIn && user?.username === post.author && (
                          <div className="flex space-x-2">
                            <motion.button
                              className="p-2 text-blue-500 hover:text-blue-700"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/edit-article/${post.id}`);
                              }}
                            >
                              <FaEdit />
                            </motion.button>
                            <motion.button
                              className="p-2 text-red-500 hover:text-red-700"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteArticle(post.id, post.author);
                              }}
                            >
                              <FaTrash />
                            </motion.button>
                          </div>
                        )}
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* No Results */}
          <AnimatePresence>
            {!isLoading && !isError && filteredResults.length === 0 && (
              <motion.div className="bg-white p-12 rounded-lg shadow-md text-center" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <p className="text-gray-700 text-xl font-medium mb-1">មិនមានអត្ថបទត្រូវបានរកឃើញ</p>
                <motion.button
                  className="mt-6 px-5 py-2 bg-[#16789e] text-white rounded-lg font-medium shadow-md"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSearchTerm("");
                    setCurrentPage(1);
                    refetch();
                  }}
                >
                  ត្រឡប់ទៅកាន់ទំព័រដើម
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pagination */}
          {!isLoading && !isError && data?.count > 0 && (
            <motion.div className="flex justify-center mt-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }}>
              <nav className="flex items-center space-x-1 bg-white px-3 py-2 rounded-xl shadow-md">
                <motion.button
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  className="p-2 rounded-md hover:bg-gray-100 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={currentPage === 1}
                  whileHover={{ scale: 1.1, backgroundColor: "#f3f4f6" }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaChevronLeft />
                </motion.button>

                {getPageNumbers().map((page) => (
                  <motion.button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-10 h-10 flex items-center justify-center rounded-md font-medium transition-all duration-200 ${
                      currentPage === page ? "bg-gradient-to-r from-[#16789e] to-[#2198B8] text-white shadow-md" : "text-gray-700 hover:bg-gray-100"
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
                  whileHover={{ scale: 1.1, backgroundColor: "#f3f4f6" }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaChevronRight />
                </motion.button>
              </nav>
            </motion.div>
          )}
        </motion.div>

        {/* Sidebar */}
        <motion.div className="w-full lg:w-1/3 order-1 lg:order-2 space-y-6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
          {/* Search */}
          <motion.div className={`bg-white p-6 rounded-xl shadow-md ${isSearchFocused ? "ring-2 ring-[#16789e]/30" : ""}`} whileHover={{ y: -3 }}>
            <h3 className="text-xl font-bold mb-4 text-gray-800">ស្វែងរកអត្ថបទ</h3>
            <form onSubmit={handleSearch}>
              <div className="relative">
                <motion.input
                  type="text"
                  placeholder="ស្វែងរកតាមចំណងជើង..."
                  className="w-full py-3 px-4 pr-12 border border-gray-300 rounded-[40px] focus:outline-none focus:ring-2 focus:ring-[#16789e] focus:border-transparent transition-all bg-gray-50"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  animate={isSearchFocused ? { scale: 1.02 } : { scale: 1 }}
                />
                <motion.button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-[#16789e] text-white p-2 rounded-md" >
                  <FaSearch />
                </motion.button>
              </div>
            </form>
          </motion.div>

      
          {isLoggedIn && (
            <motion.div className="bg-white p-6 rounded-[40px] shadow-md" whileHover={{ y: -3 }}>
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="w-full px-6 py-2 bg-[#16789e] text-white rounded-full hover:bg-opacity-90 transition-colors font-medium"
              >
                បង្កើតអត្ថបទថ្មី
              </button>
            </motion.div>
          )}

          {/* Recent Posts */}
          <motion.div className="bg-white p-6 rounded-xl shadow-md" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
            <h3 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">អត្ថបទថ្មីៗ</h3>
            <div className="space-y-4 mt-4">
              {!isLoading && !isError && recentPosts.length > 0 ? (
                recentPosts.map((post) => (
                  <motion.div key={`recent-${post.id}`} className="flex gap-3 cursor-pointer group" onClick={() => handleViewArticle(post.id)} whileHover={{ x: 3 }}>
                    <div className="w-20 h-20 bg-gray-200 rounded-[40px] overflow-hidden">
                      <motion.img
                        src={post.image || "https://img.freepik.com/free-photo/abstract-surface-textures-white-concrete-stone-wall_74190-8189.jpg"}
                        alt={post.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        onError={(e) => (e.target.src = "https://img.freepik.com/free-photo/abstract-surface-textures-white-concrete-stone-wall_74190-8189.jpg")}
                      />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 line-clamp-2 group-hover:text-[#16789e]">{post.title}</h4>
                      <div className="flex items-center mt-1 text-xs text-gray-500">
                        <FaCalendarAlt className="mr-1 text-[#16789e]" />
                        <span>{new Date(post.created_at).toLocaleDateString("km-KH", { year: "numeric", month: "long", day: "numeric" })}</span>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <p className="text-gray-600">មិនមានអត្ថបទថ្មីៗទេ</p>
              )}
            </div>
          </motion.div>

          {/* Tags */}
          <motion.div className="bg-white p-6 rounded-xl shadow-md" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }}>
            <h3 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">ប្រភេទអត្ថបទ</h3>
            <div className="flex flex-wrap gap-2 mt-4">
              {["ព័ត៌មានថ្មីៗ", "សុខភាព", "ការអប់រំ", "បច្ចេកវិទ្យា", "វប្បធម៌"].map((tag, idx) => (
                <motion.div
                  key={tag}
                  className="px-3 py-1.5 bg-gray-100 rounded-full text-gray-700 text-sm flex items-center gap-1.5 cursor-pointer hover:bg-[#16789e]/10"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * idx }}
                >
                  <FaTags className="text-xs" />
                  <span>{tag}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Create Article Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-md text-center shadow-xl"
          >
            <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-3 md:mb-4">បង្កើតអត្ថបទថ្មី</h3>
            <form onSubmit={handleCreateArticle}>
              <div className="mb-4">
                <label className="block text-left text-gray-700 mb-1">ចំណងជើង</label>
                <input
                  type="text"
                  value={newArticle.title}
                  onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
                  className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16789e]"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-left text-gray-700 mb-1">ខ្លឹមសារ</label>
                <textarea
                  value={newArticle.content}
                  onChange={(e) => setNewArticle({ ...newArticle, content: e.target.value })}
                  className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16789e]"
                  rows="5"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-left text-gray-700 mb-1">រូបភាព (URL)</label>
                <input
                  type="text"
                  value={newArticle.image}
                  onChange={(e) => setNewArticle({ ...newArticle, image: e.target.value })}
                  className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16789e]"
                />
              </div>
              <div className="flex justify-center gap-4">
                <button
                  type="submit"
                  className="bg-[#16789e] text-white px-5 py-2 rounded-full hover:bg-[#0e5c7a] transition-all duration-300 shadow-md"
                  disabled={isCreating}
                >
                  {isCreating ? "កំពុងបង្កើត..." : "បង្កើត"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="bg-gray-200 text-gray-700 px-5 py-2 rounded-full hover:bg-gray-300 transition-all duration-300 shadow-md"
                >
                  បោះបង់
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Login Prompt Popup */}
      {showLoginPrompt && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-md text-center shadow-xl"
          >
            <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-3 md:mb-4">សូមចូលគណនីដើម្បីបន្ត</h3>
            <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base">អ្នកត្រូវតែចូលគណនីដើម្បីអានអត្ថបទនេះ។</p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
              <button
                onClick={() => {
                  setShowLoginPrompt(false);
                  navigate("/login");
                }}
                className="bg-[#16789e] text-white px-5 py-2 md:px-6 md:py-2.5 rounded-full hover:bg-[#0e5c7a] transition-all duration-300 shadow-md text-sm md:text-base"
              >
                ចូលគណនី
              </button>
              <button
                onClick={() => setShowLoginPrompt(false)}
                className="bg-gray-200 text-gray-700 px-5 py-2 md:px-6 md:py-2.5 rounded-full hover:bg-gray-300 transition-all duration-300 shadow-md text-sm md:text-base"
              >
                បោះបង់
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default BlogComponent;