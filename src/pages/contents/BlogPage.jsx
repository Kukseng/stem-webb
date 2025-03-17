import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import BlogComponent from "../../components/blog/BlogComponent";
import { AuthContext } from "../../components/context/AuthContext";

const BlogPage = () => {
  const navigate = useNavigate();
  const { user, isLoading: authLoading } = useContext(AuthContext);
  const isLoggedIn = !!user;

  if (authLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 flex justify-center items-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-[#16789e] border-gray-200 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">កំពុងផ្ទុក...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 font-sans">
      <BlogComponent isLoggedIn={isLoggedIn} />
    </div>
  );
};

export default BlogPage;