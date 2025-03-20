import React from "react";
import { FaClock } from "react-icons/fa";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const AllCoursesCard = ({ course, onClick }) => {
  return (
    <motion.div
      variants={cardVariants}
      onClick={onClick}
      className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-1 border border-gray-100"
      role="button"
      tabIndex={0}
      aria-label={`មើលវគ្គសិក្សា ${course.course_name}`}
    >
      <div className="h-48 overflow-hidden relative">
        <img
          src={course.course_thumbnail || "/placeholder-course.jpg"}
          alt={course.course_name}
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
          loading="lazy"
        />
        {course.price > 0 ? (
          <div className="absolute top-3 right-3 bg-yellow-500 text-white text-sm font-bold py-1 px-3 rounded-full shadow-md">
            ${course.price}
          </div>
        ) : (
          <div className="absolute top-3 right-3 bg-green-500 text-white text-sm font-bold py-1 px-3 rounded-full shadow-md">
            ឥតគិតថ្លៃ
          </div>
        )}
        {course.level && (
          <div className="absolute top-3 left-3 bg-purple-500 bg-opacity-90 text-white text-xs font-medium py-1 px-2 rounded-md shadow-md">
            {course.level === "beginner"
              ? "កម្រិតដំបូង"
              : course.level === "intermediate"
              ? "កម្រិតមធ្យម"
              : "កម្រិតខ្ពស់"}
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
          {course.course_name}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {course.course_description || "មិនមានការពិពណ៌នា"}
        </p>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">
            {course.categories?.length || 0} មេរៀន
          </span>
          <span className="text-[#16789e] font-medium flex items-center gap-1">
            <FaClock className="text-xs" />{" "}
            {course.duration || "មិនបានកំណត់"} នាទី
          </span>
        </div>
        {(course.categories?.some((cat) => cat.is_popular) ||
          course.categories?.some((cat) => cat.is_new)) && (
          <div className="mt-3 pt-3 border-t border-gray-100 flex gap-2">
            {course.categories?.some((cat) => cat.is_popular) && (
              <span className="bg-red-100 text-red-600 text-xs font-medium px-2 py-1 rounded">
                ពេញនិយម
              </span>
            )}
            {course.categories?.some((cat) => cat.is_new) && (
              <span className="bg-blue-100 text-blue-600 text-xs font-medium px-2 py-1 rounded">
                ថ្មី
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AllCoursesCard;