import React, { useState, useContext } from "react";
import { useSelector } from "react-redux";
import {
  FaCalendarAlt,
  FaEye,
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
  FaBookmark,
  FaEdit,
  FaTrash,
  FaTimes,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useGetAllArticlesQuery } from "../../api/articles-api";
import BlogComponent from "../../components/blog/BlogComponent";
import { AuthContext } from "../../components/context/AuthContext";

const BlogPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const navigate = useNavigate();
  const { user, isLoading: authLoading } = useContext(AuthContext); // Fetch from AuthContext
  const isLoggedIn = !!user;

  // Fetch all articles with pagination
  const { data, isLoading, isError, error } = useGetAllArticlesQuery({
    page: currentPage,
  });

  // Handle loading state for auth and data
  if (authLoading || isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 flex justify-center items-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-[#16789e] border-gray-200 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">កំពុងផ្ទុក...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 text-center">
        <p className="text-red-500">
          មានបញ្ហាក្នុងការផ្ទុកអត្ថបទ: {error?.message || "សូមព្យាយាមម្តងទៀត"}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 font-sans">
      <header className="flex flex-col md:flex-row justify-between items-center mb-8">
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
      </header>

      <BlogComponent articles={data?.results || []} isLoggedIn={isLoggedIn} />
    </div>
  );
};

export default BlogPage;