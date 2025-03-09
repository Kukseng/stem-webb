import React, { useEffect, useState } from "react";
import { FaRegListAlt, FaFilter } from "react-icons/fa";
import { useGetAllCoursesQuery } from "../../api/courses-api";
import CourseCard from "../../components/courses/allcourse/allcourse-card";
import CategoryDetailsPage from "../../components/common/courses/Detail/Category-Detail";
import { Link } from "react-router-dom";

const AllCoursePage = () => {
  const { data, isLoading, isError, error } = useGetAllCoursesQuery({
    pollingInterval: 0,
  });
  const courses = data?.results || [];

  useEffect(() => {
    console.log(
      "Courses (sample):",
      JSON.stringify(courses.slice(0, 2), null, 2)
    );
  }, [courses]);

  // State for filter
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Extract unique categories from all courses
  const uniqueCategories = [
    ...new Set(
      courses.flatMap((course) =>
        course.categories.map((category) => ({
          id: category.id,
          name: category.category_name,
        }))
      )
    ),
  ];

  // Filter lessons based on selected category
  const filteredLessons = selectedCategory
    ? courses
        .flatMap((course) =>
          course.categories
            .filter((cat) => cat.id === selectedCategory)
            .flatMap((cat) => cat.lessons)
        )
    : [];

  if (isLoading) {
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
          Error: {error?.data?.message || error?.message || "Failed to fetch courses"}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-[1300px] mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex mb-10 justify-between items-center relative overflow-hidden">
          <div className="flex items-center group">
            <div className="w-8 h-8 text-primary rounded flex items-center justify-center mr-3 transition-all duration-300 group-hover:rotate-12">
              <FaRegListAlt className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 relative">
              ក្រុមវគ្គសិក្សាទាំងអស់
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-500 group-hover:w-full"></span>
            </h2>
          </div>
          <Link
            to="#"
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
          </Link>
        </header>

        {/* Filter Section - Top Center */}
        <div className="mb-8 text-center">
          <div className="inline-flex gap-2 flex-wrap justify-center">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-[40px] text-gray-700 hover:bg-gray-100 transition-colors ${
                !selectedCategory ? "bg-primary text-white" : "bg-white"
              }`}
            >
              ទាំងអស់
            </button>
            {/* Example categories */}
            <button
              onClick={() => setSelectedCategory(uniqueCategories.find((cat) => cat.name === "Math")?.id || null)}
              className={`px-4 py-2 rounded-[40px] text-gray-700 hover:bg-gray-100 transition-colors ${
                selectedCategory === uniqueCategories.find((cat) => cat.name === "Math")?.id ? "bg-primary text-white" : "bg-white"
              }`}
            >
              Math
            </button>
            <button
              onClick={() => setSelectedCategory(uniqueCategories.find((cat) => cat.name === "Physics")?.id || null)}
              className={`px-4 py-2 rounded-[40px] text-gray-700 hover:bg-gray-100 transition-colors ${
                selectedCategory === uniqueCategories.find((cat) => cat.name === "Physics")?.id ? "bg-primary text-white" : "bg-white"
              }`}
            >
              Physics
            </button>
            <button
              onClick={() => setSelectedCategory(uniqueCategories.find((cat) => cat.name === "Biology")?.id || null)}
              className={`px-4 py-2 rounded-[40px] text-gray-700 hover:bg-gray-100 transition-colors ${
                selectedCategory === uniqueCategories.find((cat) => cat.name === "Biology")?.id ? "bg-primary text-white" : "bg-white"
              }`}
            >
              Biology
            </button>
            {/* Dynamic categories from API */}
            {uniqueCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-[40px] text-gray-700 hover:bg-gray-100 transition-colors ${
                  selectedCategory === category.id ? "bg-primary text-white" : "bg-white"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Courses Section */}
        <div className="space-y-8">
          {courses.length > 0 ? (
            courses.map((course) => (
              <div key={course.id} className="mb-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  {course.course_name}
                  <Link
                    to={`/courses/${course.id}`}
                    className="ml-2 text-primary hover:text-[#0e5c7a] underline"
                  >
                    មើលលម្អិត
                  </Link>
                </h3>
                {course.categories?.length > 0 ? (
                  course.categories.map((category) => (
                    <div key={category.id} className="mb-6">
                      <h4 className="text-lg font-medium mb-2">
                        {category.category_name}
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {category.lessons?.length > 0 ? (
                          category.lessons.map((lesson) => (
                            <CourseCard key={lesson.id} lesson={lesson} />
                          ))
                        ) : (
                          <p className="text-gray-600">មិនមានមេរៀនសម្រាប់ប្រភេទនេះទេ។</p>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">មិនមានប្រភេទសម្រាប់វគ្គសិក្សានេះទេ។</p>
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 font-bold">មិនមានវគ្គសិក្សាទេ។</p>
          )}
        </div>

        {/* Filtered Lessons Section */}
        {selectedCategory && filteredLessons.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              មេរៀនសម្រាប់{" "}
              {uniqueCategories.find((cat) => cat.id === selectedCategory)?.name}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLessons.map((lesson) => (
                <CourseCard key={lesson.id} lesson={lesson} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllCoursePage;