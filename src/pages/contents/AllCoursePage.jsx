import React, { useEffect } from "react";
import { FaRegListAlt } from "react-icons/fa";
import { useGetAllCoursesQuery } from "../../api/courses-api";
import CourseCard from "../../components/common/courses/allcourse/allcourse-card";
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

  if (isLoading) return <div>Loading courses...</div>;
  if (isError)
    return (
      <div>Error: {error?.data?.message || "Failed to fetch courses"}</div>
    );

  return (
    <div className="bg-gray-50">
      <div className="max-w-[1300px] mx-auto px-4">
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

        <div>
          {courses.length > 0 ? (
            courses.map((course) => (
              <div key={course.id} className="mb-8">
                <h3 className="text-xl font-semibold mb-4">
                  {course.course_name}
                </h3>
                {course.categories?.length > 0 ? (
                  course.categories.map((category) => (
                    <div key={category.id} className="mb-6">
                      {/* <h4 className="text-lg font-medium mb-2">
                        {category.category_name}
                      </h4> */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {category.lessons?.length > 0 ? (
                          category.lessons.map((lesson) => (
                            <CourseCard key={lesson.id} lesson={lesson} />
                          ))
                        ) : (
                          <p>No lessons available for this category.</p>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No categories available for this course.</p>
                )}
              </div>
            ))
          ) : (
            <p>No courses available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllCoursePage;
