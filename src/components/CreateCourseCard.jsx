import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiBook, FiChevronDown, FiChevronUp, FiEdit, FiImage, FiList } from "react-icons/fi";

const CreateCourseCard = ({
  isAddingToExistingCourse,
  formData,
  handleChange,
  openSection,
  toggleSection,
  selectedCourseId,
  setSelectedCourseId,
  courses,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Custom color scheme
  const primaryColor = "#16789e";
  const primaryColorDark = "#106080"; // Darker shade for hover states

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.4,
        staggerChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mb-6 overflow-hidden rounded-xl shadow-md bg-white"
    >
      <motion.button
        type="button"
        onClick={() => toggleSection("course")}
        style={{ 
          backgroundColor: isHovered ? primaryColorDark : primaryColor 
        }}
        className="w-full flex justify-between items-center p-4 text-white rounded-t-xl transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="flex items-center space-x-2">
          <FiBook className="text-xl" />
          <span className="text-lg font-medium">Course Details</span>
        </span>
        <motion.div
          animate={{ rotate: openSection === "course" ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <FiChevronDown className="text-xl" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {openSection === "course" && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={cardVariants}
            className="p-5 border-t border-gray-100"
          >
            {!isAddingToExistingCourse ? (
              <>
                <motion.div 
                  variants={itemVariants}
                  className="mb-5"
                >
                  <label className="flex items-center space-x-2 text-gray-700 font-medium mb-2">
                    <FiEdit style={{ color: primaryColor }} />
                    <span>Course Name</span>
                  </label>
                  <input
                    type="text"
                    name="course_name"
                    value={formData.course.course_name}
                    onChange={(e) => handleChange(e, "course")}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200"
                    style={{ focusRing: primaryColor }}
                    placeholder="Enter a descriptive name for your course"
                    required
                  />
                </motion.div>
                
                <motion.div 
                  variants={itemVariants}
                  className="mb-5"
                >
                  <label className="flex items-center space-x-2 text-gray-700 font-medium mb-2">
                    <FiList style={{ color: primaryColor }} />
                    <span>Course Description</span>
                  </label>
                  <textarea
                    name="course_description"
                    value={formData.course.course_description}
                    onChange={(e) => handleChange(e, "course")}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 min-h-24"
                    style={{ focusRing: primaryColor }}
                    placeholder="Describe what students will learn in this course"
                    required
                  />
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <label className="flex items-center space-x-2 text-gray-700 font-medium mb-2">
                    <FiImage style={{ color: primaryColor }} />
                    <span>Course Thumbnail URL</span>
                  </label>
                  <input
                    type="text"
                    name="course_thumbnail"
                    value={formData.course.course_thumbnail}
                    onChange={(e) => handleChange(e, "course")}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200"
                    style={{ focusRing: primaryColor }}
                    placeholder="Add a URL for your course thumbnail image"
                    required
                  />
                  
                  {formData.course.course_thumbnail && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-3"
                    >
                      <p className="text-xs text-gray-500 mb-2">Preview:</p>
                      <div className="w-24 h-24 rounded-lg overflow-hidden border border-gray-200">
                        <div className="bg-gray-100 w-full h-full flex items-center justify-center text-gray-400">
                          <FiImage className="text-3xl" />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              </>
            ) : (
              <motion.div variants={itemVariants}>
                <label className="flex items-center space-x-2 text-gray-700 font-medium mb-2">
                  <FiBook style={{ color: primaryColor }} />
                  <span>Select Existing Course</span>
                </label>
                <div className="relative">
                  <select
                    value={selectedCourseId}
                    onChange={(e) => setSelectedCourseId(e.target.value)}
                    className="w-full p-3 pr-10 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 bg-white"
                    style={{ focusRing: primaryColor }}
                    required
                  >
                    <option value="">-- Select a Course --</option>
                    {courses?.results?.map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.course_name}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <FiChevronDown />
                  </div>
                </div>
                
                {selectedCourseId && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-4 p-3 rounded-lg"
                    style={{ backgroundColor: `${primaryColor}10` }} // Using hex with opacity
                  >
                    <p className="text-sm" style={{ color: primaryColor }}>
                      You've selected a course. Now you can add new categories, lessons, sections, and content to it.
                    </p>
                  </motion.div>
                )}
              </motion.div>
            )}

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-4 pt-4 border-t border-gray-100"
            >
              <div className="text-xs text-gray-500">
                {!isAddingToExistingCourse ? (
                  "Create a new course with unique details and content structure."
                ) : (
                  "Add new content to an existing course from your library."
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CreateCourseCard;