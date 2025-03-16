import React from "react";
import { motion } from "framer-motion";

const SkeletonForumCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 bg-white rounded-xl shadow-lg border border-gray-100 mb-8 w-full"
    >
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="h-12 w-12 rounded-full bg-gray-200 animate-pulse" />
          <div className="ml-4">
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="h-3 w-32 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="h-8 w-20 bg-gray-200 rounded-full animate-pulse" />
          <div className="h-6 w-6 bg-gray-200 rounded animate-pulse" />
          <div className="h-6 w-6 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>

      {/* Content Section */}
      <div className="mb-6">
        <div className="flex flex-col space-y-4">
          <div className="h-96 w-full bg-gray-200 rounded-xl animate-pulse" />
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse" />
              <div className="h-6 w-24 bg-gray-200 rounded-full animate-pulse" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-4/5 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="flex items-center justify-between py-4 border-t border-gray-200">
        <div className="flex space-x-6">
          <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    </motion.div>
  );
};

export default SkeletonForumCard;