import React from "react";
import { motion } from "framer-motion";
import { FiEdit, FiBook, FiImage, FiX } from "react-icons/fi";

const ForumForm = ({ formData, setFormData, onSubmit, onCancel, submitText }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="relative p-6 bg-white border border-gray-200 rounded-xl shadow-md max-w-2xl mx-auto"
      onClick={(e) => e.stopPropagation()} 
    >
    
      <button
        onClick={onCancel}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
        aria-label="Close form"
      >
        <FiX size={24} />
      </button>

      <form onSubmit={onSubmit} className="space-y-6">
        {/* Title Field */}
        <div>
          <label className="flex items-center space-x-2 text-gray-700 font-medium text-base">
            <FiEdit className="text-gray-500" />
            <span>ចំណងជើង</span>
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm text-sm"
            placeholder="Enter forum title"
            required
          />
        </div>

        {/* Description Field */}
        <div>
          <label className="flex items-center space-x-2 text-gray-700 font-medium text-base">
            <FiBook className="text-gray-500" />
            <span>ការពិពណ៌នា</span>
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all min-h-[120px] shadow-sm text-sm"
            placeholder="បញ្ចូលការពិពណ៌នាវេទិកា"
            required
          />
        </div>

        {/* Image URL Field */}
        <div>
          <label className="flex items-center space-x-2 text-gray-700 font-medium text-base">
            <FiImage className="text-gray-500" />
            <span>រូបភាព URL</span>
          </label>
          <input
            type="text"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm text-sm"
            placeholder="បញ្ចូល  រូបភាព URL (ជាជម្រើស)"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 transition-all shadow-sm"
          >
            បោះបង់
          </button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="px-4 py-2 rounded-md text-sm font-medium text-white shadow-md transition-all"
            style={{ backgroundColor:" #16789e" }}
          >
            {submitText}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default ForumForm;