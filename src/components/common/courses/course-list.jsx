import React, { useEffect, useState } from "react";
import { FaRegListAlt, FaSpinner } from "react-icons/fa";
import { useGetAllCoursesQuery } from "../../../api/courses-api";
import { Link, useNavigate } from "react-router-dom";
import CourseCard from "./course-card";
import { motion } from "framer-motion";
import { AuthContext } from "../../context/AuthContext.jsx";

const CoursesList = () => {
  const { data, isLoading, isError, error } = useGetAllCoursesQuery({
    pollingInterval: 0,
  });
  const courses = data?.results || [];
  const limitedCourses = courses.slice(0, 6);
  const navigate = useNavigate();

  const { user, openLoginModal } = React.useContext(AuthContext);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  useEffect(() => {
    console.log("Full courses data:", JSON.stringify(data, null, 2));
  }, [data]);

  const handleCourseClick = (course) => {
    if (!user) {
      setShowLoginPrompt(true);
      openLoginModal();
    } else {
      navigate(`/courses/${course.id}`);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
        <FaSpinner className="animate-spin text-[#16789e] h-12 w-12 md:h-14 md:w-14 mb-4" />
        <p className="text-base md:text-lg text-gray-700 font-medium">កំពុងទាញយកវគ្គសិក្សា...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 px-4">
        <div className=" rounded-[40px] p-6 md:p-8 w-full max-w-md text-center shadow-md">
          <h2 className="text-red-600 font-medium  text-lg md:text-xl mb-3">មានបញ្ហាកើតឡើង</h2>
          <p className="text-red-500 text-sm md:text-base mb-4 md:mb-6">
            {error?.data?.message || error?.message || "មិនអាចទាញយកវគ្គសិក្សាបានទេ"}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-5 md:py-2.5 md:px-6 rounded-full transition-all shadow-md text-sm md:text-base"
          >
            ព្យាយាមម្តងទៀត
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-8 md:py-16">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        <header className="flex flex-col sm:flex-row justify-between items-center mb-8 md:mb-12 gap-4 sm:gap-0">
          <div className="flex items-center group w-full sm:w-auto">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-[#16789e] text-white rounded-full flex items-center justify-center mr-3 md:mr-4 shadow-md transition-transform duration-300 group-hover:scale-110">
              <FaRegListAlt className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 relative">
              ក្រុមវគ្គសិក្សាទាំងអស់
              <span className="absolute -bottom-1 left-0 w-0 h-1 bg-[#16789e] transition-all duration-500 group-hover:w-full"></span>
            </h2>
          </div>
          <Link
            to="/courses"
            className="flex items-center text-[#16789e] hover:text-[#0e5c7a] transition-colors group relative w-full sm:w-auto justify-center sm:justify-start"
          >
            <span className="mr-2 text-base md:text-[22px] font-semibold transition-all duration-300 group-hover:mr-3">
              ចូលទៅកាន់ទំព័រ
            </span>
            <svg
              className="w-4 h-4 md:w-5 md:h-5 transform group-hover:translate-x-1 transition-transform duration-300"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#16789e] transition-all duration-500 group-hover:w-full"></span>
          </Link>
        </header>

        {limitedCourses.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {limitedCourses.map((course) => (
              <motion.div key={course.id} variants={cardVariants} className="w-full">
                <CourseCard course={course} onClick={() => handleCourseClick(course)} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <p className="text-center text-gray-600 text-base md:text-lg font-medium">
            មិនមានវគ្គសិក្សាដែលអាចបង្ហាញបានទេ។
          </p>
        )}

        {showLoginPrompt && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-md text-center shadow-xl"
            >
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-3 md:mb-4">
                សូមចូលគណនីដើម្បីបន្ត
              </h3>
              <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base">
                អ្នកត្រូវតែចូលគណនីដើម្បីចូលមើលវគ្គសិក្សា។
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
                <button
                  onClick={() => {
                    setShowLoginPrompt(false);
                    navigate("/login");
                  }}
                  className="bg-[#16789e] text-white px-5 py-2 md:px-6 md:py-2.5 rounded-full hover:bg-[#0e5c7a] transition-all duration-300 shadow-md text-sm md:text-base"
                >
                  ចូលគណនី
                </button>
                <button
                  onClick={() => setShowLoginPrompt(false)}
                  className="bg-gray-200 text-gray-700 px-5 py-2 md:px-6 md:py-2.5 rounded-full hover:bg-gray-300 transition-all duration-300 shadow-md text-sm md:text-base"
                >
                  បោះបង់
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesList;