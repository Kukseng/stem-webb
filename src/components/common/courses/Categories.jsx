import React from "react";
import { useParams, Link } from "react-router-dom";
import { useGetCourseByUuidQuery } from "../../../api/courses-api";
import { FaRegListAlt } from "react-icons/fa";

const Categories = () => {
  const { courseId } = useParams();
  const { data, isLoading, isError, error, isFetching } = useGetCourseByUuidQuery(courseId);

  if (isLoading || isFetching) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <p className="text-red-500 font-bold">
          Error: {error?.data?.message || error?.message || "Failed to fetch course details"}
        </p>
      </div>
    );
  }

  const categories = data?.categories || [];

  return (
    <div className="bg-gray-50">
      <div className="max-w-[1300px] mx-auto px-4 py-8">
        <header className="flex mb-10 justify-between items-center relative overflow-hidden">
          <div className="flex items-center group">
            <div className="w-8 h-8 text-primary rounded flex items-center justify-center mr-3 transition-all duration-300 group-hover:rotate-12">
              <FaRegListAlt className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 relative">
              ប្រភេទវគ្គសិក្សា
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-500 group-hover:w-full"></span>
            </h2>
          </div>
          <Link
            to="/courses"
            className="flex items-center text-primary hover:text-[#0e5c7a] transition-colors relative group"
          >
            <span className="mr-2 group-hover:mr-4 transition-all duration-300 font-suwannaphum text-[16px] font-bold">
              ត្រលប់ទៅវគ្គសិក្សា
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
          </Link>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.length > 0 ? (
            categories.map((category) => (
              <div
                key={category.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              >
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {category.category_name}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {category.category_description || "មិនមានការពិពណ៌នា"}
                  </p>
                  <Link
                    to={`/courses/${courseId}/categories/${category.id}/lessons`}
                    state={{ lessons: category.lessons || [] }}
                    className="inline-block bg-primary text-white font-semibold py-2 px-4 rounded hover:bg-[#0e5c7a] transition-colors duration-300"
                  >
                    មើលមេរៀន
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-600 font-bold">
              មិនមានប្រភេទសម្រាប់វគ្គសិក្សានេះទេ។
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Categories;