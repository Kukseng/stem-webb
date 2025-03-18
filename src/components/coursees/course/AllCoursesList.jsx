import React from "react";
import { FaChevronLeft, FaSearch, FaSpinner } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AllCoursesCard from "./AllCoursesCard";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const AllCoursesList = ({
  selectedCourse,
  selectedCategory,
  filteredCourses,
  visibleCoursesCount,
  handleCourseClick,
  handleCategoryClick,
  handleLoadMore,
  resetToCourses,
  resetToCategories,
}) => {
  return (
    <>

      {!selectedCourse ? (
        <>
          {filteredCourses.length > 0 ? (
            <>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredCourses.slice(0, visibleCoursesCount).map((course) => (
                  <AllCoursesCard
                    key={course.id}
                    course={course}
                    onClick={() => handleCourseClick(course)}
                  />
                ))}
              </motion.div>
              {visibleCoursesCount < filteredCourses.length && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="mt-8 text-center"
                >
                  <button
                    onClick={handleLoadMore}
                    className="bg-[#16789e] text-white px-6 py-2 rounded-lg hover:bg-[#0e5c7a] transition-all duration-300 ease-in-out shadow-md hover:shadow-lg"
                  >
                    មើលវគ្គសិក្សាបន្ថែម
                  </button>
                </motion.div>
              )}
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-sm p-10 text-center"
            >
              <div className="flex justify-center mb-4">
                <FaSearch className="h-12 w-12 text-gray-300" />
              </div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                មិនមានវគ្គសិក្សាដែលត្រូវគ្នានឹងការស្វែងរករបស់អ្នកទេ
              </h3>
              <p className="text-gray-500 mb-4">
                សាកល្បងការស្វែងរកផ្សេង ឬ សម្អាតការចម្រាញ់
              </p>
            </motion.div>
          )}
        </>
      ) : !selectedCategory ? (
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border-l-4 border-[#16789e]"
          >
            <h2 className="text-xl font-semibold text-gray-800">
              {selectedCourse.course_name}
            </h2>
            <button
              onClick={resetToCourses}
              className="flex items-center text-[#16789e] hover:text-[#0e5c7a] bg-[#16789e] bg-opacity-10 px-3 py-2 rounded-lg transition-all duration-300 ease-in-out shadow-md hover:shadow-lg"
            >
              <FaChevronLeft className="mr-1" /> ត្រលប់ទៅវគ្គសិក្សាទាំងអស់
            </button>
          </motion.div>
          {selectedCourse.categories?.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {selectedCourse.categories.map((category) => (
                <motion.div
                  key={category.id}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md border border-gray-100 transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                  onClick={() => handleCategoryClick(category)}
                  role="button"
                  tabIndex={0}
                  aria-label={`មើលប្រភេទ ${category.category_name}`}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                        {category.category_name}
                      </h3>
                      <div className="bg-blue-100 text-blue-600 text-xs font-medium px-2 py-1 rounded">
                        {category.lessons?.length || 0} មេរៀន
                      </div>
                    </div>
                    <div className="mb-4 aspect-[16/9] overflow-hidden rounded-md">
                      <img
                        src={
                          category.lessons?.[0]?.lesson_image ||
                          "/placeholder-lesson.jpg"
                        }
                        alt={category.category_name}
                        className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
                      {category.category_description || "មិនមានការពិពណ៌នា"}
                    </p>
                    <div className="flex justify-end">
                      <button className="text-[#16789e] text-sm font-medium hover:underline flex items-center gap-1">
                        មើលមេរៀន →
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-sm p-10 text-center"
            >
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                មិនមានប្រភេទសម្រាប់វគ្គសិក្សានេះទេ
              </h3>
              <p className="text-gray-500 mb-4">
                វគ្គសិក្សានេះមិនទាន់មានមាតិកាទេ
              </p>
              <button
                onClick={resetToCourses}
                className="bg-[#16789e] text-white px-4 py-2 rounded-lg hover:bg-[#0e5c7a] transition-all duration-300 ease-in-out shadow-md hover:shadow-lg"
              >
                ត្រលប់ទៅវគ្គសិក្សាទាំងអស់
              </button>
            </motion.div>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border-l-4 border-[#16789e]"
          >
            <div>
              <p className="text-sm text-gray-500 mb-1">
                {selectedCourse.course_name}
              </p>
              <h2 className="text-xl font-semibold text-gray-800">
                {selectedCategory.category_name}
              </h2>
            </div>
            <button
              onClick={resetToCategories}
              className="flex items-center text-[#16789e] hover:text-[#0e5c7a] bg-[#16789e] bg-opacity-10 px-3 py-2 rounded-lg transition-all duration-300 ease-in-out shadow-md hover:shadow-lg"
            >
              <FaChevronLeft className="mr-1" /> ត្រលប់ទៅប្រភេទទាំងអស់
            </button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-sm p-8 text-center"
          >
            <FaSpinner className="animate-spin h-10 w-10 text-[#16789e] mx-auto mb-4" />
            <p className="text-gray-600">កំពុងបង្ហាញទំព័រមេរៀន...</p>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default AllCoursesList;