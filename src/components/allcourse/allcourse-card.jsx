// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// const CourseCard = ({
//   course = {},
//   lesson = {},
//   isLoggedIn = false,
//   onClick,
// }) => {
//   const [isHovered, setIsHovered] = useState(false);

//   const {
//     course_name = "Untitled Course",
//     course_thumbnail = null,
//     course_description = "មិនមានការពិពណ៌នា",
//     duration = "N/A",
//     price = "Free",
//     primaryButtonText = "ចុះឈ្មោះ",
//     secondaryButtonText = "ចូលរៀន",
//   } = course;

//   const {
//     lesson_title = "Untitled Lesson",
//     lesson_image = null,
//     id: lessonId,
//   } = lesson;

//   const image = lesson_image || course_thumbnail;
//   const title = lesson_title || course_name;
//   const description = course_description;

//   return (
//     <div
//       className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       onClick={onClick}
//     >
//       <div className="relative h-48 overflow-hidden">
//         {image ? (
//           <img
//             src={image}
//             alt={title}
//             className={`w-full h-full object-cover transition-all duration-300 ${
//               isHovered ? "scale-105" : "scale-100"
//             }`}
//           />
//         ) : (
//           <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
//             មិនមានរូបភាព
//           </div>
//         )}
//       </div>
//       <div className="p-6">
//         <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
//           {title}
//         </h3>
//         <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
//         <div className="flex justify-between items-center text-gray-600 text-sm mb-4">
//           <div className="flex items-center">
//             <svg
//               className="w-4 h-4 mr-1 text-gray-500"
//               viewBox="0 0 20 20"
//               fill="currentColor"
//             >
//               <path
//                 fillRule="evenodd"
//                 d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
//                 clipRule="evenodd"
//               />
//             </svg>
//             <span>{duration}</span>
//           </div>
//           <div className="flex items-center">
//             <svg
//               className="w-4 h-4 mr-1 text-gray-500"
//               viewBox="0 0 20 20"
//               fill="currentColor"
//             >
//               <path
//                 fillRule="evenodd"
//                 d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
//                 clipRule="evenodd"
//               />
//             </svg>
//             <span>{price}</span>
//           </div>
//         </div>
//         <div className="flex justify-between">
//           {lessonId ? (
//             <Link
//               to={`/courses/${courseId}/categories/${categoryId}/lessons/${lessonId}`}
//               className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-[#0e5c7a] transition-all duration-300"
//               onClick={(e) => e.stopPropagation()}
//             >
//               {secondaryButtonText}
//             </Link>
//           ) : (
//             <button
//               className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-[#0e5c7a] transition-all duration-300"
//               onClick={(e) => e.stopPropagation()}
//             >
//               {secondaryButtonText}
//             </button>
//           )}
//           {!isLoggedIn && (
//             <button className="text-primary hover:text-[#0e5c7a]">
//               {primaryButtonText}
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseCard;
import React, { useState } from "react";
import { Link } from "react-router-dom";

const CourseCard = ({
  course = {},
  lesson = {},
  isLoggedIn = false,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const {
    course_name = "Untitled Course",
    course_thumbnail = null,
    course_description = "មិនមានការពិពណ៌នា",
    duration = "N/A",
    price = "Free",
    primaryButtonText = "ចុះឈ្មោះ",
    secondaryButtonText = "ចូលរៀន",
  } = course;

  const {
    lesson_title = "Untitled Lesson",
    lesson_image = null,
    id: lessonId,
  } = lesson;

  const image = lesson_image || course_thumbnail;
  const title = lesson_title || course_name;
  const description = course_description;

  return (
    <div
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={title}
            className={`w-full h-full object-cover transition-all duration-300 ${
              isHovered ? "scale-105" : "scale-100"
            }`}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
            មិនមានរូបភាព
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
          {title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
        <div className="flex justify-between items-center text-gray-600 text-sm mb-4">
          <div className="flex items-center">
            <svg
              className="w-4 h-4 mr-1 text-gray-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
              />
            </svg>
            <span>{duration}</span>
          </div>
          <div className="flex items-center">
            <svg
              className="w-4 h-4 mr-1 text-gray-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                clipRule="evenodd"
              />
            </svg>
            <span>{price}</span>
          </div>
        </div>
        <div className="flex justify-between">
          {lessonId ? (
            <Link
              to={`/វគ្គសិក្សា/${lessonId}`}
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-[#0e5c7a] transition-all duration-300"
              onClick={(e) => e.stopPropagation()} // Prevent triggering onClick of parent
            >
              {secondaryButtonText}
            </Link>
          ) : (
            <button
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-[#0e5c7a] transition-all duration-300"
              onClick={(e) => e.stopPropagation()} // Prevent triggering onClick of parent
            >
              {secondaryButtonText}
            </button>
          )}
          {!isLoggedIn && (
            <button className="text-primary hover:text-[#0e5c7a]">
              {primaryButtonText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;