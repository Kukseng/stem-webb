import React, { useState } from "react";
import book from "../../assets/book.svg";
import { FaRegListAlt } from "react-icons/fa";
const CourseCard = ({ course }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Course Image with Zoom and Overlay Effect */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className={`w-full h-full object-cover transition-all duration-700 ${
            isHovered ? "scale-110 blur-sm brightness-75" : "scale-100"
          }`}
        />

        <div
          className={`absolute inset-0 bg-primary/60 flex items-center justify-center transition-opacity duration-500 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <button className="bg-white text-primary px-6 py-2 rounded-md hover:bg-primary hover:text-white transition-all duration-300 transform hover:scale-105">
            {course.primaryButtonText}
          </button>
        </div>

        {course.badgeText && (
          <div
            className={`absolute left-0 bottom-0 bg-black/80 text-white px-4 py-1 text-sm transition-all duration-500 ${
              isHovered ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            {course.badgeText}
          </div>
        )}
      </div>

      <div className="p-4 relative overflow-hidden">
        {/* Animated Accent Line */}
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
          {course.category}
        </div>

        <h3
          className={`text-lg font-semibold mb-2 transition-all duration-300 ${
            isHovered ? "text-primary translate-x-3" : "text-gray-800"
          }`}
        >
          {course.title}
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
                  i < course.rating
                    ? `text-yellow-400 ${
                        isHovered && i < course.rating ? "animate-pulse" : ""
                      }`
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

        {/* Course Details with Slide Animation */}
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
              {course.duration}
            </span>
          </div>
          <div className="mx-4 w-1 h-1 bg-gray-400 rounded-full"></div>
          <div className="flex items-center group">
            <svg
              className="w-4 h-4 mr-1 group-hover:text-primary transition-colors duration-300"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                clipRule="evenodd"
              />
            </svg>
            <span className="group-hover:text-primary transition-colors duration-300">
              {course.price}
            </span>
          </div>
        </div>

        {/* Action Buttons with Growing Underline Effect */}
        <div className="flex justify-between">
          <button className="relative bg-primary text-white px-6 py-2 rounded-[40px] overflow-hidden group">
            <span className="relative z-10 transition-colors duration-300">
              {course.SecondButtonText}
            </span>
            <span className="absolute bottom-0 left-0 w-full h-0 bg-[#0e5c7a] transition-all duration-300 group-hover:h-full"></span>
          </button>
          <button className="relative text-primary group">
            <span>{course.secondaryButtonText}</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </button>
        </div>
      </div>
    </div>
  );
};

const CourseCardCom = () => {
  const courses = [
    {
      id: 1,
      image:
        "https://img.freepik.com/free-photo/blackboard-inscribed-with-scientific-formulas-calculations_1150-19413.jpg?uid=R187953990&ga=GA1.1.898532044.1736838035&semt=ais_hybrid",
      title: "ការមេរៀន UI/UX សម្រាប់អ្នកចាប់ផ្តើមថ្មី",
      rating: 4,
      duration: "មូលដ្ឋាន ៨០ម៉ោង",
      price: "៩,៩០០រៀល",
      primaryButtonText: "ចុះឈ្មោះ",
      SecondButtonText: "ចូលរៀន",
      secondaryButtonText: "ពិនិត្យមើលទៀត",
      badgeText: "",
    },
    {
      id: 2,
      image:
        "https://img.freepik.com/free-vector/maths-realistic-chalkboard-background_23-2148159115.jpg?uid=R187953990&ga=GA1.1.898532044.1736838035&semt=ais_hybrid",
      category: "Math",
      title: "ការមេរៀន UI/UX សម្រាប់អ្នកចាប់ផ្តើមថ្មី",
      rating: 4,
      duration: "មូលដ្ឋាន ៨០ម៉ោង",
      price: "៩,៩០០រៀល",
      primaryButtonText: "ចុះឈ្មោះ",
      SecondButtonText: "ចូលរៀន",
      secondaryButtonText: "ពិនិត្យមើលទៀត",
      badgeText: "",
    },
    {
      id: 3,
      image:
        "https://img.freepik.com/free-vector/maths-realistic-chalkboard-background_23-2148159115.jpg?uid=R187953990&ga=GA1.1.898532044.1736838035&semt=ais_hybrid",
      category: "Physic",
      title: "ការមេរៀន UI/UX សម្រាប់អ្នកចាប់ផ្តើមថ្មី",
      rating: 4,
      duration: "មូលដ្ឋាន ៨០ម៉ោង",
      price: "៩,៩០០រៀល",
      primaryButtonText: "ចុះឈ្មោះ",
      SecondButtonText: "ចូលរៀន",
      secondaryButtonText: "ពិនិត្យមើលទៀត",
      badgeText: "",
    },
    {
      id: 4,
      image:
        "https://img.freepik.com/free-vector/maths-realistic-chalkboard-background_23-2148159115.jpg?uid=R187953990&ga=GA1.1.898532044.1736838035&semt=ais_hybrid",
      category: "Chemistry",
      title: "ការមេរៀន UI/UX សម្រាប់អ្នកចាប់ផ្តើមថ្មី",
      rating: 4,
      duration: "មូលដ្ឋាន ៨០ម៉ោង",
      price: "៩,៩០០រៀល",
      primaryButtonText: "ចុះឈ្មោះ",
      SecondButtonText: "ចូលរៀន",
      secondaryButtonText: "ពិនិត្យមើលទៀត",
      badgeText:
        "វិទ្យាសាស្ត្រដែលសិក្សាអំពីចំនួន, រចនាសម្ព័ន្ធ, បំលាស់ប្តូរ និងលំហ",
    },
    {
      id: 5,
      image:
        "https://img.freepik.com/free-vector/maths-realistic-chalkboard-background_23-2148159115.jpg?uid=R187953990&ga=GA1.1.898532044.1736838035&semt=ais_hybrid",
      category: "Biology",
      title: "ការមេរៀន UI/UX សម្រាប់អ្នកចាប់ផ្តើមថ្មី",
      rating: 4,
      duration: "មូលដ្ឋាន ៨០ម៉ោង",
      price: "៩,៩០០រៀល",
      primaryButtonText: "ចុះឈ្មោះ",
      SecondButtonText: "ចូលរៀន",
      secondaryButtonText: "ពិនិត្យមើលទៀត",
      badgeText:
        "វិទ្យាសាស្ត្រដែលសិក្សាអំពីចំនួន, រចនាសម្ព័ន្ធ, បំលាស់ប្តូរ និងលំហ",
    },
    {
      id: 6,
      image:
        "https://img.freepik.com/free-vector/maths-realistic-chalkboard-background_23-2148159115.jpg?uid=R187953990&ga=GA1.1.898532044.1736838035&semt=ais_hybrid",
      category: "Web Design",
      title: "ការមេរៀន UI/UX សម្រាប់អ្នកចាប់ផ្តើមថ្មី",
      rating: 4,
      duration: "មូលដ្ឋាន ៨០ម៉ោង",
      price: "៩,៩០០រៀល",
      primaryButtonText: "ចុះឈ្មោះ",
      SecondButtonText: "ចូលរៀន",
      secondaryButtonText: "ពិនិត្យមើលទៀត",
      badgeText:
        "វិទ្យាសាស្ត្រដែលសិក្សាអំពីចំនួន, រចនាសម្ព័ន្ធ, បំលាស់ប្តូរ និងលំហ",
    },
  ];

  return (
    <div className="bg-gray-50">
      <div className="max-w-[1300px] mx-auto px-4">
        <header className="flex mb-10 justify-between items-center  relative overflow-hidden">
          <div className="flex items-center group">
            <div className="w-8 h-8 text-primary  rounded flex items-center justify-center mr-3 transition-all duration-300 group-hover:rotate-12">
              <FaRegListAlt className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 relative">
              ក្រុមវគ្គសិក្សាទាំងអស់
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-500 group-hover:w-full"></span>
            </h2>
          </div>
          <a
            href="#"
            className="flex items-center text-primary hover:text-[#0e5c7a] transition-colors relative group"
          >
            <span className="mr-2 group-hover:mr-4 transition-all duration-300 font-suwannaphum text-[16px] font-bold">
              ចូលទៅកាន់ទំព័រ
            </span>
            <svg
              className="w-5 h-5 transform group-hover:translate-x-2 transition-all duration-300"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-500 group-hover:w-full"></span>
          </a>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseCardCom;
