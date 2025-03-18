import React, { useEffect, useState, useMemo, useContext } from "react";
import { useGetAllCoursesQuery } from "../../../api/courses-api";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../components/context/AuthContext";
import AllCoursesHeader from "./AllCoursesHeader";
import AllCoursesFilters from "./AllCoursesFilters";
import AllCoursesList from "./AllCoursesList";
import { AnimatePresence} from "framer-motion";
import { motion } from "framer-motion";

const AllCourse = () => {
  const { courseId, categoryId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useGetAllCoursesQuery({
    pollingInterval: 0,
  });
  const courses = data?.results || [];
  const { user, openLoginModal } = useContext(AuthContext);


  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [filters, setFilters] = useState({
    price: "all",
    duration: "all",
    category: "all",
    level: "all",
  });
  const [visibleCoursesCount, setVisibleCoursesCount] = useState(6);

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const allCategories = useMemo(() => {
    const categories = new Set();
    courses.forEach((course) => {
      course.categories?.forEach((category) =>
        categories.add(category.category_name)
      );
    });
    return Array.from(categories);
  }, [courses]);

  // Sync state with URL params
  useEffect(() => {
    if (courseId) {
      const course = courses.find((c) => c.id === courseId);
      setSelectedCourse(course || null);
      if (categoryId && course) {
        const category = course.categories?.find((cat) => cat.id === categoryId);
        setSelectedCategory(category || null);
      } else {
        setSelectedCategory(null);
      }
    } else {
      setSelectedCourse(null);
      setSelectedCategory(null);
    }
  }, [courseId, categoryId, courses]);

  // Memoized filtered courses
  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch = course.course_name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesPrice =
        filters.price === "all" ||
        (filters.price === "free" && course.price === 0) ||
        (filters.price === "paid" && course.price > 0);
      const matchesDuration =
        filters.duration === "all" ||
        (filters.duration === "short" && course.duration < 60) ||
        (filters.duration === "medium" &&
          course.duration >= 60 &&
          course.duration < 180) ||
        (filters.duration === "long" && course.duration >= 180);
      const matchesLevel =
        filters.level === "all" || course.level === filters.level;
      const matchesCategory =
        filters.category === "all" ||
        (course.categories &&
          course.categories.some((cat) => cat.category_name === filters.category));
      return (
        matchesSearch &&
        matchesPrice &&
        matchesDuration &&
        matchesLevel &&
        matchesCategory
      );
    });
  }, [courses, searchTerm, filters]);

  // Handlers
  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({ ...prev, [filterType]: value }));
    setVisibleCoursesCount(6);
  };

  const resetFilters = () => {
    setFilters({
      price: "all",
      duration: "all",
      category: "all",
      level: "all",
    });
    setSearchTerm("");
    setVisibleCoursesCount(6);
  };

  const handleLoadMore = () => setVisibleCoursesCount((prev) => prev + 6);

  const handleCourseClick = (course) => {
    if (!user) {
      setShowLoginPrompt(true);
      openLoginModal();
    } else {
      setSelectedCourse(course);
      navigate(`/courses/${course.id}`);
    }
  };

  const handleCategoryClick = (category) => {
    if (!user) {
      setShowLoginPrompt(true);
      openLoginModal();
    } else {
      setSelectedCategory(category);
      navigate(`/courses/${selectedCourse.id}/categories/${category.id}/lessons`, {
        state: {
          lessons: category.lessons || [],
          courseTitle: selectedCourse.course_name,
        },
      });
    }
  };

  const resetToCourses = () => {
    setSelectedCourse(null);
    setSelectedCategory(null);
    navigate("/courses");
  };

  const resetToCategories = () => {
    setSelectedCategory(null);
    navigate(`/courses/${selectedCourse.id}`);
  };

  const SkeletonCourseCard = () => (
    <motion.div
      className="bg-white rounded-xl shadow-sm h-[360px] animate-pulse border border-gray-100"
      variants={cardVariants}
    >
      <div className="h-48 bg-gray-200 rounded-t-xl"></div>
      <div className="p-5 space-y-3">
        <div className="h-5 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        <div className="flex justify-between">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        </div>
      </div>
    </motion.div>
  );
  const cardVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.3 } } };
  if (isLoading) {
    return  <div className="bg-gray-50 min-h-screen">
    <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4 md:gap-6 bg-white py-4 md:py-6 px-4 md:px-6 rounded-xl shadow-sm border border-gray-100"
      >
        <div className="flex items-center space-x-4">
          <div className="bg-gray-200 h-12 w-12 rounded-full animate-pulse"></div>
          <div className="h-8 bg-gray-200 rounded w-40"></div>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <div className="relative flex-grow sm:max-w-xs w-full">
            <div className="h-10 bg-gray-200 rounded-lg w-full"></div>
          </div>
          <div className="h-10 bg-gray-200 rounded-lg w-24"></div>
          <div className="h-10 bg-gray-200 rounded-lg w-32"></div>
        </div>
      </motion.div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {Array(6).fill().map((_, i) => (
          <SkeletonCourseCard key={i} />
        ))}
      </motion.div>
    </div>
  </div>;  
  }

  // Error State
  if (isError) {
    return <div>Error: {error?.message || "Something went wrong"}</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AllCoursesHeader
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          filters={filters}
          handleFilterChange={handleFilterChange}
          allCategories={allCategories}
        />
        <AnimatePresence>
          {showFilters && (
            <AllCoursesFilters
              showFilters={showFilters}
              filters={filters}
              handleFilterChange={handleFilterChange}
              resetFilters={resetFilters}
            />
          )}
        </AnimatePresence>
        <AllCoursesList
          selectedCourse={selectedCourse}
          selectedCategory={selectedCategory}
          filteredCourses={filteredCourses}
          visibleCoursesCount={visibleCoursesCount}
          handleCourseClick={handleCourseClick}
          handleCategoryClick={handleCategoryClick}
          handleLoadMore={handleLoadMore}
          resetToCourses={resetToCourses}
          resetToCategories={resetToCategories}
        />
        {/* Login Prompt Modal */}
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
                  className="bg-[#16789e] text-white px-5 py-2 md:px-6 md:py-2.5 rounded-full hover:bg-[#0e5c7a] transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  ចូលគណនី
                </button>
                <button
                  onClick={() => setShowLoginPrompt(false)}
                  className="bg-gray-200 text-gray-700 px-5 py-2 md:px-6 md:py-2.5 rounded-full hover:bg-gray-300 transition-all duration-300 shadow-md hover:shadow-lg"
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

export default AllCourse;