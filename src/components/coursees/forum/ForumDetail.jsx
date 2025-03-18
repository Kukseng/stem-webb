import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetForumByIdQuery } from "../../../api/forums-api";
import { FiX } from "react-icons/fi";
import { motion } from "framer-motion";
import SkeletonForumCard from "./SkeletonForumCard";

const ForumDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: forum, isLoading, error } = useGetForumByIdQuery(id);

  if (isLoading) {
    return <div className="text-center py-10"><SkeletonForumCard/></div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-600">មានបញ្ហាក្នុងការទាញយកទិន្នន័យ</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{forum.title}</h1>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="text-gray-500 hover:text-gray-700 transition-all duration-300 ease-in-out"
          >
            <FiX size={32} />
          </motion.button>
        </div>
        {forum.image && (
          <img
            src={forum.image}
            alt={forum.title}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
        )}
        <p className="text-lg text-gray-700 leading-relaxed">{forum.description}</p>
        <div className="mt-6">
          <p className="text-base text-gray-500">
            បង្កើតដោយ: {forum.author} • {new Date(forum.created_at).toLocaleDateString()}
          </p>
          <p className="text-base text-gray-500">
            ចំនួនមតិ: {forum.comments?.length || 0}
          </p>
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">មតិ</h2>
          {forum.comments && forum.comments.length > 0 ? (
            forum.comments.map((comment) => (
              <div key={comment.id} className="p-4 bg-gray-50 rounded-lg mb-4 border border-gray-200">
                <p className="font-semibold text-gray-800">{comment.author}</p>
                <p className="text-lg text-gray-700 leading-relaxed">{comment.content}</p>
                <p className="text-base text-gray-500">
                  {new Date(comment.created_at).toLocaleDateString()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-lg text-gray-700 leading-relaxed">មិនទាន់មានមតិនៅឡើយទេ</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForumDetail;