import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useGetAllArticlesQuery } from '../../../api/articles-api';

const BlogCard = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  // Fetch blog posts from API
  const { data, isLoading, isError } = useGetAllArticlesQuery({ page: 1 });
  const blogPosts = data?.results || [];
  const featuredPost = blogPosts[2]; // Only use the first post

  useEffect(() => {
    if (!isLoading && blogPosts.length > 0) {
      setIsLoaded(true);
    }
  }, [isLoading, blogPosts]);

  const handlePostClick = (id) => {
    navigate(`/articles/${id}`); // Navigate to individual article page
  };

  const FeaturedPost = ({ post }) => (
    <div
      className={`relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 transform ${
        isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
      onClick={() => handlePostClick(post.id)}
    >
      <div className="relative w-full h-80 md:h-96 overflow-hidden">
        <img
          src={post.image || post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          onError={(e) => (e.target.src = 'https://via.placeholder.com/400')} // Fallback image
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-medium text-gray-800 shadow-md">
          Featured
        </div>
        <div className="absolute bottom-0 left-0 p-6 md:p-8 text-white">
          <div className="text-green-300 text-sm md:text-base mb-2">
            {new Date(post.created_at).toLocaleDateString('km-KH')}
          </div>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 line-clamp-2">
            {post.title}
          </h2>
          <p className="text-white/90 text-sm md:text-base mb-4 line-clamp-2">
            {post.content}
          </p>
          <button className="flex items-center text-white hover:text-white/80 transition-colors duration-300 group">
            អានបន្ត
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div
        className={`flex flex-col md:flex-row justify-between items-start md:items-center mb-10 transition-transform duration-700 ${
          isLoaded ? 'translate-y-0' : 'translate-y-10'
        }`}
      >
        <div className="mb-6 md:mb-0">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            អត្ថបទចុងក្រោយ
          </h1>
          <p className="text-gray-600 text-base md:text-lg mt-2">
            ស្វែងយល់ពីអត្ថបទថ្មីបំផុតរបស់យើង
          </p>
        </div>
        <button
          onClick={() => navigate('/blog')}
          className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300 flex items-center shadow-md"
        >
          មើលទាំងអស់
          <ArrowRight className="ml-2 w-5 h-5" />
        </button>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="text-center py-16">
          <p className="text-red-600 text-lg font-medium">
            មានបញ្ហាក្នុងការផ្ទុកអត្ថបទ
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors duration-300 shadow-md"
          >
            ព្យាយាមម្តងទៀត
          </button>
        </div>
      )}

      {/* Featured Post */}
      {!isLoading && !isError && featuredPost && (
        <div className="mb-12">
          <FeaturedPost post={featuredPost} />
        </div>
      )}

      {/* No Post Message */}
      {!isLoading && !isError && !featuredPost && (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">
            មិនមានអត្ថបទថ្មីដើម្បីបង្ហាញទេ
          </p>
          <button
            onClick={() => navigate('/blog')}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300 shadow-md"
          >
            ទៅកាន់ទំព័រប្លក់
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogCard;