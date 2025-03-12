import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FaCalendarAlt, FaEye, FaSearch, FaChevronLeft, FaChevronRight, FaBookmark, FaEdit, FaTrash, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import {
  useGetAllArticlesQuery,
  useCreateArticleMutation,
  useUpdateArticleMutation,
  useDeleteArticleMutation,
} from '../../api/articles-api';
import BlogComponent from '../../components/blog/BlogComponent';
import CreateCourseForm from '../../components/CreateCourse';

const BlogPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [formData, setFormData] = useState({ title: '', content: '', image: '' });

  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth); // Access user from auth state
  const isLoggedIn = !!user; // Check if user exists

  // Fetch all articles with pagination
  const { data, isLoading, isError, error } = useGetAllArticlesQuery({ page: currentPage });

  // Mutations for CRUD operations
  const [createArticle, { isLoading: isCreating }] = useCreateArticleMutation();
  const [updateArticle, { isLoading: isUpdating }] = useUpdateArticleMutation();
  const [deleteArticle, { isLoading: isDeleting }] = useDeleteArticleMutation();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 font-sans">
      {/* Header */}
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
              onClick={() => navigate('/login')}
              className="w-full md:w-auto px-6 py-2 bg-[#16789e] text-white rounded-full hover:bg-opacity-90 transition-colors font-medium"
            >
              ចាប់ផ្តើម
            </button>
          )}
        </div>
      </header>

      <BlogComponent/>
      <CreateCourseForm/>
    </div>
  );
};

export default BlogPage;