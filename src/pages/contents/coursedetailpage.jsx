// src/pages/course-detail-page.js
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useGetAllCoursesQuery } from "../../api/courses-api";

const CourseDetailPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useGetAllCoursesQuery();
  const courses = data?.results || [];

  const course = courses.find((c) => c.id === courseId);

  useEffect(() => {
    console.log("Course ID:", courseId, "Course Found:", !!course, "Courses:", courses);
    if (!course && !isLoading && !isError) {
      navigate("/all-courses");
    }
  }, [course, isLoading, isError, navigate, courseId]);

  if (isLoading) return <div>Loading ...</div>;
  if (isError) return <div>Error: {error?.data?.message || "Failed to fetch course"}</div>;
  if (!course) return <div>Course not found : {courseId}</div>;

  return (
    <div className="bg-gray-50">
      <div className="max-w-[1300px] mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">{course.course_name}</h1>
        <img
          src={course.course_thumbnail}
          alt={course.course_name}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        <p className="text-gray-700 mb-4">{course.course_description}</p>
        <p className="text-gray-600">Category: {course.categories?.[0]?.category_name || "No Category"}</p>
        <p className="text-gray-600">Rating: {course.rating || 0} /5</p>
        <p className="text-gray-600">Duration: {course.duration || "N/A"}</p>
        <p className="text-gray-600">Price: {course.price || "Free"}</p>
      </div>
    </div>
  );
};

export default CourseDetailPage;