import React, { useState } from "react";
import { FaCalendarAlt, FaEye, FaSearch, FaChevronLeft, FaChevronRight, FaBookmark, FaEdit, FaTrash, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useGetAllArticlesQuery,
  useCreateArticleMutation,
  useUpdateArticleMutation,
  useDeleteArticleMutation,
} from "../../api/articles-api"; // Adjust the import path based on your project structure
const BlogComponent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [formData, setFormData] = useState({ title: "", content: "", image: "" });

  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth); // Assuming auth state is managed in Redux
  const isLoggedIn = !!user;

  // Fetch all articles with pagination
  const { data, isLoading, isError, error } = useGetAllArticlesQuery({ page: currentPage });

  // Mutations for CRUD operations
  const [createArticle, { isLoading: isCreating }] = useCreateArticleMutation();
  const [updateArticle, { isLoading: isUpdating }] = useUpdateArticleMutation();
  const [deleteArticle, { isLoading: isDeleting }] = useDeleteArticleMutation();

  // Popular posts and categories (static for now, can be fetched from API if needed)
  const popularPosts = [
    {
      id: 7,
      title: "បង្កើតកម្មវិធី ដែលលេចធ្លោមួយនៅឆ្នាំ 2023",
      image: "https://via.placeholder.com/100x100/16789e/ffffff?text=Popular+1",
      date: "មករា 24, 2023",
    },
    {
      id: 8,
      title: "បង្កើតកម្មវិធី ដែលលេចធ្លោមួយនៅឆ្នាំ 2023",
      image: "https://via.placeholder.com/100x100/16789e/ffffff?text=Popular+2",
      date: "មករា 20, 2023",
    },
    {
      id: 9,
      title: "បង្កើតកម្មវិធី ដែលលេចធ្លោមួយនៅឆ្នាំ 2023",
      image: "https://via.placeholder.com/100x100/16789e/ffffff?text=Popular+3",
      date: "មករា 18, 2023",
    },
  ];

  const categories = [
    { name: "ផ្នែក", count: 15 },
    { name: "សេវាកម្ម", count: 15 },
    { name: "អីវ៉ាន់", count: 15 },
    { name: "ដំណឹង", count: 15 },
    { name: "វិភាគលំហូរឥវ៉ាន់", count: 15 },
    { name: "តម្លៃឥវ៉ាន់", count: 15 },
  ];

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
    // Implement search functionality here (e.g., filter articles or modify API query)
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle create article
  const handleCreateArticle = async (e) => {
    e.preventDefault();
    try {
      await createArticle(formData).unwrap();
      setIsCreateModalOpen(false);
      setFormData({ title: "", content: "", image: "" });
    } catch (err) {
      console.error("Failed to create article:", err);
    }
  };

  // Handle edit article
  const handleEditArticle = (post) => {
    setSelectedPost(post);
    setFormData({ title: post.title, content: post.content, image: post.image });
    setIsEditModalOpen(true);
  };

  const handleUpdateArticle = async (e) => {
    e.preventDefault();
    try {
      await updateArticle({ id: selectedPost.id, ...formData }).unwrap();
      setIsEditModalOpen(false);
      setSelectedPost(null);
      setFormData({ title: "", content: "", image: "" });
    } catch (err) {
      console.error("Failed to update article:", err);
    }
  };

  // Handle delete article
  const handleDeleteArticle = async (id) => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      try {
        await deleteArticle(id).unwrap();
      } catch (err) {
        console.error("Failed to delete article:", err);
      }
    }
  };

  // Calculate total pages for pagination
  const totalPages = data?.count ? Math.ceil(data.count / 10) : 1; // Assuming 10 items per page

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 font-sans">
      {/* Header */}
      {/* <header className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
          អត្ថបទទាំងអស់
        </h1>
        <div className="w-full md:w-auto">
          {isLoggedIn ? (
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="w-full md:w-auto px-6 py-2 bg-[#16789e] text-white rounded-full hover:bg-opacity-90 transition-colors font-medium"
            >
              បង្កើតអត្ថបទថ្មី
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="w-full md:w-auto px-6 py-2 bg-[#16789e] text-white rounded-full hover:bg-opacity-90 transition-colors font-medium"
            >
              ចាប់ផ្តើម
            </button>
          )}
        </div>
      </header> */}

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="w-full lg:w-2/3">
          {/* Loading and Error States */}
          {isLoading && <p className="text-center text-gray-500">Loading articles...</p>}
          {isError && (
            <p className="text-center text-red-500">
              Error loading articles: {error?.data?.message || "Something went wrong"}
            </p>
          )}

          {/* Blog Grid */}
          {!isLoading && !isError && data?.results && (
            <div className="grid md:grid-cols-2 gap-6">
              {data.results.map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 hover:shadow-lg"
                >
                  <div className="relative">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                      onError={(e) => (e.target.src = "")}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors">
                      <FaBookmark className="text-[#16789e]" />
                    </button>
                  </div>
                  <div className="p-5">
                    <h2 className="text-xl font-bold text-gray-800 mb-2 hover:text-[#16789e] transition-colors">
                      <a href="#">{post.title}</a>
                    </h2>
                    <div className="flex items-center text-gray-500 text-sm mb-3">
                      <div className="flex items-center mr-4">
                        <FaCalendarAlt className="mr-1 text-[#16789e]" />
                        <span>{new Date(post.created_at).toLocaleDateString("km-KH")}</span>
                      </div>
                      <div className="flex items-center">
                        <FaEye className="mr-1 text-[#16789e]" />
                        <span>{post.views || 0}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4 line-clamp-2">{post.content}</p>
                    <div className="flex justify-between items-center">
                      <a
                        href="#"
                        className="inline-block text-[#16789e] font-medium hover:underline"
                      >
                        អានបន្ថែម
                      </a>
                      {isLoggedIn && (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditArticle(post)}
                            className="text-[#16789e] hover:text-[#1e8fb8] transition-colors"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDeleteArticle(post.id)}
                            className="text-red-500 hover:text-red-600 transition-colors"
                            disabled={isDeleting}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {!isLoading && !isError && data?.count > 0 && (
            <div className="flex justify-center mt-10">
              <nav className="flex items-center space-x-2">
                <button
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  className="p-2 rounded-md hover:bg-gray-100 text-gray-600"
                  disabled={currentPage === 1}
                >
                  <FaChevronLeft />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-8 h-8 flex items-center justify-center rounded-md ${
                      currentPage === page
                        ? "bg-[#16789e] text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="p-2 rounded-md hover:bg-gray-100 text-gray-600"
                  disabled={currentPage === totalPages}
                >
                  <FaChevronRight />
                </button>
              </nav>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-1/3">
          {/* Search */}
          <div className="bg-white p-5 rounded-lg shadow-md mb-6">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="ស្វែងរក..."
                className="w-full py-2 px-4 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16789e] focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#16789e]"
              >
                <FaSearch />
              </button>
            </form>
          </div>

          {/* Categories */}
          <div className="bg-white p-5 rounded-lg shadow-md mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">ប្រភេទ</h3>
            <ul className="space-y-2">
              {categories.map((category, index) => (
                <li key={index} className="flex justify-between items-center py-2 border-b last:border-0">
                  <a href="#" className="text-gray-700 hover:text-[#16789e]">
                    {category.name}
                  </a>
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                    {category.count}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Posts */}
          <div className="bg-white p-5 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-4">អត្ថបទថ្មីៗ</h3>
            <div className="space-y-4">
              {popularPosts.map((post) => (
                <div key={post.id} className="flex gap-3">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div className="flex flex-col">
                    <h4 className="font-medium hover:text-[#16789e]">
                      <a href="#">{post.title}</a>
                    </h4>
                    <span className="text-sm text-gray-500 mt-1">{post.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Create Article Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md transform transition-transform duration-300 scale-95 hover:scale-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">បង្កើតអត្ថបទថ្មី</h2>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleCreateArticle}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">ចំណងជើង</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#16789e]"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">ខ្លឹមសារ</label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#16789e]"
                  rows="4"
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">រូបភាព (URL)</label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#16789e]"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                >
                  បោះបង់
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#16789e] text-white rounded-lg hover:bg-opacity-90"
                  disabled={isCreating}
                >
                  {isCreating ? "កំពុងបង្កើត..." : "បង្កើត"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Article Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md transform transition-transform duration-300 scale-95 hover:scale-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">កែសម្រួលអត្ថបទ</h2>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleUpdateArticle}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">ចំណងជើង</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#16789e]"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">ខ្លឹមសារ</label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#16789e]"
                  rows="4"
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">រូបភាព (URL)</label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#16789e]"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                >
                  បោះបង់
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#16789e] text-white rounded-lg hover:bg-opacity-90"
                  disabled={isUpdating}
                >
                  {isUpdating ? "កំពុងកែសម្រួល..." : "កែសម្រួល"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogComponent; 