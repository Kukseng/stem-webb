import React, { useState, useEffect } from "react";
import { FaRegListAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom"; 

const CourseCard = ({ course = {} }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setIsLoggedIn(!!token);
  }, []);

  const {
    course_name = "Untitled Course",
    course_thumbnail = null,
    course_description = "សូមរង់ចាំការសិក្សាថ្មីរបស់អ្នកនៅទីនេះ",
    categories = [],
    rating = 4,
    duration = "មូលដ្ឋាន ៨០ម៉ោង",
    price = "៩,៩០០រៀល",
    primaryButtonText = "ចុះឈ្មោះ",
    secondButtonText = "ចូលរៀន",
    secondaryButtonText = "ពិនិត្យមើលទៀត",
    badgeText = "kmol kmol mk mk rean",
    id: courseId,
  } = course;

  const categoryName = categories.length > 0 ? categories[0].category_name : "No Category";

  const handleButtonClick = (e, action) => {
    e.preventDefault();
    e.stopPropagation();
    if (action === "signup" && !isLoggedIn) {
      navigate("/login");
    } else if (action === "enroll") {
      console.log("Enroll button clicked for course:", courseId);
    } else if (action === "learnMore") {
      console.log("Learn More button clicked for course:", courseId);
    }
  };

  return (
    <Link to={`/courses/${courseId}/categories`} className="block">
      <div
        className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative h-48 overflow-hidden" >
          {course_thumbnail ? (
            <img
              src={course_thumbnail}
              alt={course_name}
              className={`w-full h-full object-cover transition-all duration-700 ${
                isHovered ? "scale-110 blur-sm brightness-75" : "scale-100"
              }`}
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              No Thumbnail
            </div>
          )}
          <div
            className={`absolute inset-0 bg-primary/60 flex items-center justify-center transition-opacity duration-500 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            {!isLoggedIn && (
              <button
                onClick={(e) => handleButtonClick(e, "signup")}
                className="bg-white text-primary px-6 py-2 rounded-[40px] hover:bg-primary hover:text-white transition-all duration-300 transform hover:scale-105"
              >
                {primaryButtonText}
              </button>
            )}
          </div>
          {badgeText && (
            <div
              className={`absolute left-0 bottom-0 bg-white bg-opacity-30 backdrop-blur-md bg-black/80 text-white px-4 py-1 text-sm transition-all duration-500 ${
                isHovered ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              {badgeText}
            </div>
          )}
        </div>
        <div className="p-4 relative overflow-hidden">
          <div
            className={`absolute left-0 top-0 w-1 bg-primary transition-all duration-700 ${
              isHovered ? "h-full" : "h-0"
            }`}
          ></div>
          <div
            className={`text-sm text-gray-600 mb-1 transition-all duration-300 ${
              isHovered ? "translate-x-3" : "translate-x-0"
            }`}
          >
            {course_name}
          </div>
          <h3
            className={`text-lg font-semibold mb-2 transition-all duration-300 line-clamp-1 ${
              isHovered ? "text-primary translate-x-3" : "text-gray-800"
            }`}
          >
            {course_description}
          </h3>
          <div
            className={`flex items-center mb-4 transition-all duration-500 ${
              isHovered ? "translate-x-3" : ""
            }`}
          >
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(rating)
                      ? `text-yellow-400 ${isHovered && i < Math.floor(rating) ? "animate-pulse" : ""}`
                      : "text-gray-300"
                  } transition-colors duration-300`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
          <div
            className={`flex justify-between text-gray-600 text-sm mb-4 transition-all duration-500 ${
              isHovered ? "translate-x-3" : ""
            }`}
          >
            <div className="flex items-center group">
              <svg
                className="w-4 h-4 mr-1 group-hover:text-primary transition-colors duration-300"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="group-hover:text-primary transition-colors duration-300">
                {duration}
              </span>
            </div>
            <div className="mx-4 w-1 h-1 bg-gray-400 rounded-full"></div>
            <div className="flex items-center group">
              <svg
                className="w-4 h-4 mr-1 group-hover:text-primary transition-colors duration-300"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582c0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="group-hover:text-primary transition-colors duration-300">
                {price}
              </span>
            </div>
          </div>
          <div className="flex justify-between">
            <button
              onClick={(e) => handleButtonClick(e, "enroll")}
              className="relative bg-primary text-white px-6 py-2 rounded-[40px] overflow-hidden group"
            >
              <span className="relative z-10 transition-colors duration-300">
                {secondButtonText}
              </span>
              <span className="absolute bottom-0 left-0 w-full h-0 bg-[#0e5c7a] transition-all duration-300 group-hover:h-full"></span>
            </button>
            <button
              onClick={(e) => handleButtonClick(e, "learnMore")}
              className="relative text-primary group"
            >
              <span>{secondaryButtonText}</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;