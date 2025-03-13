import React from "react";
import { motion } from "framer-motion";
import { FiEdit, FiBook, FiImage } from "react-icons/fi";

const ForumForm = ({ formData, setFormData, onSubmit, onCancel, submitText, primaryColor = "#2563EB" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="mt-4 p-5 bg-white border border-gray-200 rounded-lg shadow-lg"
    >
      <form onSubmit={onSubmit} className="space-y-4">
        {/* Title Field */}
        <div>
          <label className="flex items-center space-x-2 text-gray-700 font-medium">
            <FiEdit className="text-gray-500" />
            <span>Title</span>
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            placeholder="Enter forum title"
            required
          />
        </div>

    
        <div>
          <label className="flex items-center space-x-2 text-gray-700 font-medium">
            <FiBook className="text-gray-500" />
            <span>Description</span>
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all min-h-[100px]"
            placeholder="Enter forum description"
            required
          />
        </div>

        {/* Image URL Field */}
        <div>
          <label className="flex items-center space-x-2 text-gray-700 font-medium">
            <FiImage className="text-gray-500" />
            <span>Image URL</span>
          </label>
          <input
            type="text"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            placeholder="Enter image URL (optional)"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 transition-all"
          >
            Cancel
          </button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="px-4 py-2 rounded-md text-sm font-medium text-white shadow-md transition-all"
            style={{ backgroundColor: primaryColor }}
          >
            {submitText}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default ForumForm;
