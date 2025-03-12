import React, { useEffect, useState, useRef } from "react";
import { FaBook, FaSearch, FaChevronLeft, FaFilter, FaSpinner, FaClock, FaTags, FaStar } from "react-icons/fa";
import { useGetAllCoursesQuery } from "../../api/courses-api";
import CourseCard from "../../components/courses/allcourse/allcourse-card";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowBigDown, ArrowUp } from "lucide-react";

const AllCoursePage = () => {
  const { courseId, categoryId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useGetAllCoursesQuery({
    pollingInterval: 0,
  });
  const courses = data?.results || [];

  // State
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    price: "all",
    duration: "all",
    category: "all",
    level: "all",
  });
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Get unique categories across all courses
  const allCategories = React.useMemo(() => {
    const categories = new Set();
    courses.forEach(course => {
      course.categories?.forEach(category => {
        categories.add(category.category_name);
      });
    });
    return Array.from(categories);
  }, [courses]);

  // Sync state with URL params
  useEffect(() => {
    if (courseId) {
      const course = courses.find((c) => c.id === courseId);
      setSelectedCourse(course || null);
      if (categoryId && course) {
        const category = course.categories.find((cat) => cat.id === categoryId);
        setSelectedCategory(category || null);
      } else {
        setSelectedCategory(null);
      }
    } else {
      setSelectedCourse(null);
      setSelectedCategory(null);
    }
  }, [courseId, categoryId, courses]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsCategoryDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Filter courses based on multiple criteria
  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.course_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = 
      filters.price === "all" || 
      (filters.price === "free" && course.price === 0) || 
      (filters.price === "paid" && course.price > 0);
    const matchesDuration = 
      filters.duration === "all" ||
      (filters.duration === "short" && course.duration < 60) || 
      (filters.duration === "medium" && course.duration >= 60 && course.duration < 180) ||
      (filters.duration === "long" && course.duration >= 180);
    const matchesLevel = 
      filters.level === "all" ||
      (filters.level === "beginner" && course.level === "beginner") ||
      (filters.level === "intermediate" && course.level === "intermediate") ||
      (filters.level === "advanced" && course.level === "advanced");
    const matchesCategory = 
      filters.category === "all" ||
      (course.categories && course.categories.some(cat => 
        (filters.category === "popular" && cat.is_popular) ||
        (filters.category === "new" && cat.is_new) ||
        cat.category_name === filters.category
      ));
    return matchesSearch && matchesPrice && matchesDuration && matchesLevel && matchesCategory;
  });

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
    setIsCategoryDropdownOpen(false); // Close dropdown after selection
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      price: "all",
      duration: "all",
      category: "all",
      level: "all"
    });
    setSearchTerm("");
  };

  // Handlers for navigation
  const handleCourseClick = (course) => {
    setSelectedCourse(course);
    navigate(`/courses/${course.id}`);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    navigate(`/courses/${selectedCourse.id}/categories/${category.id}/lessons`, {
      state: {
        lessons: category.lessons || [],
        courseTitle: selectedCourse.course_name,
      },
    });
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

  // Loading and error states
  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
        <FaSpinner className="animate-spin text-primary h-12 w-12 mb-4" />
        <p className="text-gray-600 font-medium">កំពុងផ្ទុកវគ្គសិក្សា...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <h2 className="text-red-600 font-bold text-lg mb-2">មានបញ្ហាកើតឡើង</h2>
          <p className="text-red-500">
            {error?.data?.message || error?.message || "មិនអាចទាញយកវគ្គសិក្សាបានទេ"}
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-all"
          >
            ព្យាយាមម្តងទៀត
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-[1300px] mx-auto px-4 py-8">
        {/* Header with enhanced styling */}
        <header className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
          <div className="flex items-center space-x-3">
            <div className="bg-primary bg-opacity-10 p-3 rounded-full">
              <FaBook className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              ក្រុមវគ្គសិក្សាទាំងអស់
            </h1>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <div className="relative flex-grow sm:max-w-xs">
              <input
                type="text"
                placeholder="ស្វែងរកវគ្គសិក្សា..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
              <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg transition-all ${
                showFilters 
                  ? "bg-primary text-white" 
                  : "bg-white border border-gray-300 hover:bg-gray-50 text-gray-700"
              }`}
            >
              <FaFilter className={showFilters ? "text-white" : "text-gray-500"} />
              <span>ចម្រាញ់</span>
            </button>
          </div>
        </header>
        
        {/* Enhanced Filters Panel */}
        {showFilters && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6 border border-gray-200 transition-all">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium text-lg text-gray-800">ចម្រាញ់វគ្គសិក្សា</h3>
              {(filters.price !== "all" || filters.duration !== "all" || filters.category !== "all" || filters.level !== "all") && (
                <button
                  onClick={resetFilters}
                  className="text-sm text-primary hover:underline flex items-center"
                >
                  សម្អាតការចម្រាញ់ទាំងអស់
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Price Filter */}
              <div>
                <h4 className="font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <FaTags className="text-primary" />
                  តម្លៃ
                </h4>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleFilterChange("price", "all")}
                    className={`px-3 py-1.5 rounded-md text-sm transition-all ${
                      filters.price === "all" 
                        ? "bg-primary text-white" 
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    ទាំងអស់
                  </button>
                  <button
                    onClick={() => handleFilterChange("price", "free")}
                    className={`px-3 py-1.5 rounded-md text-sm transition-all ${
                      filters.price === "free" 
                        ? "bg-green-500 text-white" 
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    ឥតគិតថ្លៃ
                  </button>
                  <button
                    onClick={() => handleFilterChange("price", "paid")}
                    className={`px-3 py-1.5 rounded-md text-sm transition-all ${
                      filters.price === "paid" 
                        ? "bg-yellow-500 text-white" 
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    បង់ប្រាក់
                  </button>
                </div>
              </div>
              
              {/* Duration Filter */}
              <div>
                <h4 className="font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <FaClock className="text-primary" />
                  រយៈពេល
                </h4>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleFilterChange("duration", "all")}
                    className={`px-3 py-1.5 rounded-md text-sm transition-all ${
                      filters.duration === "all" 
                        ? "bg-primary text-white" 
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    ទាំងអស់
                  </button>
                  <button
                    onClick={() => handleFilterChange("duration", "short")}
                    className={`px-3 py-1.5 rounded-md text-sm transition-all ${
                      filters.duration === "short" 
                        ? "bg-blue-500 text-white" 
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    ខ្លី 
                  </button>
                  <button
                    onClick={() => handleFilterChange("duration", "medium")}
                    className={`px-3 py-1.5 rounded-md text-sm transition-all ${
                      filters.duration === "medium" 
                        ? "bg-blue-500 text-white" 
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    មធ្យម (១-៣ម៉ោង)
                  </button>
                  <button
                    onClick={() => handleFilterChange("duration", "long")}
                    className={`px-3 py-1.5 rounded-md text-sm transition-all ${
                      filters.duration === "long" 
                        ? "bg-blue-500 text-white" 
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    វែង (&gt;៣ម៉ោង)
                  </button>
                </div>
              </div>
              
              {/* Level Filter */}
              <div>
                <h4 className="font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <FaStar className="text-primary" />
                  កម្រិត
                </h4>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleFilterChange("level", "all")}
                    className={`px-3 py-1.5 rounded-md text-sm transition-all ${
                      filters.level === "all" 
                        ? "bg-primary text-white" 
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    ទាំងអស់
                  </button>
                  <button
                    onClick={() => handleFilterChange("level", "beginner")}
                    className={`px-3 py-1.5 rounded-md text-sm transition-all ${
                      filters.level === "beginner" 
                        ? "bg-purple-500 text-white" 
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    កម្រិតដំបូង
                  </button>
                  <button
                    onClick={() => handleFilterChange("level", "intermediate")}
                    className={`px-3 py-1.5 rounded-md text-sm transition-all ${
                      filters.level === "intermediate" 
                        ? "bg-purple-500 text-white" 
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    កម្រិតមធ្យម
                  </button>
                  <button
                    onClick={() => handleFilterChange("level", "advanced")}
                    className={`px-3 py-1.5 rounded-md text-sm transition-all ${
                      filters.level === "advanced" 
                        ? "bg-purple-500 text-white" 
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    កម្រិតខ្ពស់
                  </button>
                </div>
              </div>
              
              {/* Category Type Filter */}
              <div>
                <h4 className="font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <FaBook className="text-primary" />
                  ប្រភេទវគ្គសិក្សា
                </h4>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleFilterChange("category", "all")}
                    className={`px-3 py-1.5 rounded-md text-sm transition-all ${
                      filters.category === "all" 
                        ? "bg-primary text-white" 
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    ទាំងអស់
                  </button>
                  <button
                    onClick={() => handleFilterChange("category", "popular")}
                    className={`px-3 py-1.5 rounded-md text-sm transition-all ${
                      filters.category === "popular" 
                        ? "bg-red-500 text-white" 
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    ពេញនិយម
                  </button>
                  <button
                    onClick={() => handleFilterChange("category", "new")}
                    className={`px-3 py-1.5 rounded-md text-sm transition-all ${
                      filters.category === "new" 
                        ? "bg-red-500 text-white" 
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    ថ្មីៗ
                  </button>
                  {/* Custom Dropdown for Categories */}
                  {allCategories.length > 0 && (
                    <div className="relative" ref={dropdownRef}>
                      <button
                        onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                        className="bg-gray-100 border border-gray-200 rounded-md px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-primary flex items-center gap-2"
                      >
                        {filters.category === "all" ? "ជ្រើសរើសប្រភេទ" : filters.category}
                        <ArrowBigDown className={`w-4 h-4 transition-transform ${isCategoryDropdownOpen ? "rotate-180" : ""}`} />
                      </button>
                      {isCategoryDropdownOpen && (
                        <div className="absolute z-10 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                          <ul className="text-sm text-gray-700">
                            <li
                              onClick={() => handleFilterChange("category", "all")}
                              className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${filters.category === "all" ? "bg-primary text-white" : ""}`}
                            >
                              ទាំងអស់
                            </li>
                            {allCategories.map(category => (
                              <li
                                key={category}
                                onClick={() => handleFilterChange("category", category)}
                                className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${filters.category === category ? "bg-primary text-white" : ""}`}
                              >
                                {category}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                  <div className="flex items-center">
                    <button
                      onClick={() => setShowFilters(!showFilters)}
                      className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg transition-all ${
                        showFilters 
                          ? "bg-primary text-white" 
                          : "bg-white border border-gray-300 hover:bg-gray-50 text-gray-700"
                      }`}
                    >
                      <FaFilter className={showFilters ? "text-white" : "text-gray-500"} />
                      <span><ArrowUp /></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="mb-6">
          <div className="bg-white p-3 rounded-lg shadow-sm flex flex-wrap gap-2">
            <button
              onClick={resetFilters}
              className={`px-3 py-1.5 rounded-[40px] text-sm transition-all ${
                filters.price === "all" && filters.duration === "all" && filters.category === "all" && filters.level === "all" 
                  ? "bg-primary text-white" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              វគ្គសិក្សាទាំងអស់
            </button>
            {/* Custom Dropdown for Categories outside Filters */}
            {allCategories.length > 0 && (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                  className="bg-gray-100 border border-gray-200 rounded-md px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-primary flex items-center gap-2"
                >
                  {filters.category === "all" ? "ជ្រើសរើសប្រភេទ" : filters.category}
                  <ArrowBigDown className={`w-4 h-4 transition-transform ${isCategoryDropdownOpen ? "rotate-180" : ""}`} />
                </button>
                {isCategoryDropdownOpen && (
                  <div className="absolute z-10 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                    <ul className="text-sm text-gray-700">
                      <li
                        onClick={() => handleFilterChange("category", "all")}
                        className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${filters.category === "all" ? "bg-primary text-white" : ""}`}
                      >
                        ទាំងអស់
                      </li>
                      {allCategories.map(category => (
                        <li
                          key={category}
                          onClick={() => handleFilterChange("category", category)}
                          className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${filters.category === category ? "bg-primary text-white" : ""}`}
                        >
                          {category}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
            {(filters.price !== "all" || filters.duration !== "all" || filters.category !== "all" || filters.level !== "all") && (
              <button
                onClick={resetFilters}
                className="text-sm text-primary hover:underline flex items-center"
              >
                សម្អាតការចម្រាញ់ទាំងអស់
              </button>
            )}
          </div>
        </div>

        {/* Enhanced Breadcrumbs */}
        <nav className="flex items-center h-10 mb-6 bg-white shadow-sm rounded-lg px-4">
          <ol className="flex items-center text-sm text-gray-600">
            <li className={`${!selectedCourse ? "font-medium text-primary" : "hover:text-primary"}`}>
              <Link to="/courses" onClick={resetToCourses}>
                វគ្គសិក្សា
              </Link>
            </li>
            {selectedCourse && (
              <>
                <li className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <Link
                    to={`/courses/${selectedCourse.id}`}
                    onClick={resetToCategories}
                    className={`hover:text-primary ${!selectedCategory ? "font-medium text-primary" : ""}`}
                  >
                    {selectedCourse.course_name}
                  </Link>
                </li>
                {selectedCategory && (
                  <li className="flex items-center">
                    <span className="mx-2 text-gray-400">/</span>
                    <span className="font-medium text-primary">{selectedCategory.category_name}</span>
                  </li>
                )}
              </>
            )}
          </ol>
        </nav>

        {/* Main Content with Enhanced UI */}
        {!selectedCourse ? (
          // Improved Course List View
          <>
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-xl font-medium text-gray-700">
                {(() => {
                  if (filters.price === "free" && filters.category === "all" && filters.level === "all" && filters.duration === "all") {
                    return `វគ្គសិក្សាឥតគិតថ្លៃ (${filteredCourses.length})`;
                  } else if (filters.category === "popular" && filters.price === "all" && filters.level === "all" && filters.duration === "all") {
                    return `វគ្គសិក្សាពេញនិយម (${filteredCourses.length})`;
                  } else if (filters.category === "new" && filters.price === "all" && filters.level === "all" && filters.duration === "all") {
                    return `វគ្គសិក្សាថ្មីៗ (${filteredCourses.length})`;
                  } else if (filters.level === "beginner" && filters.price === "all" && filters.category === "all" && filters.duration === "all") {
                    return `វគ្គសិក្សាសម្រាប់អ្នកចាប់ផ្ដើម (${filteredCourses.length})`;
                  } else if (filters.level === "intermediate" && filters.price === "all" && filters.category === "all" && filters.duration === "all") {
                    return `វគ្គសិក្សាកម្រិតមធ្យម (${filteredCourses.length})`;
                  } else if (filters.level === "advanced" && filters.price === "all" && filters.category === "all" && filters.duration === "all") {
                    return `វគ្គសិក្សាកម្រិតខ្ពស់ (${filteredCourses.length})`;
                  } else if (filters.price === "free" && filters.level === "beginner") {
                    return `វគ្គសិក្សាឥតគិតថ្លៃសម្រាប់អ្នកចាប់ផ្ដើម (${filteredCourses.length})`;
                  } else if (filters.category === "popular" && filters.price === "free") {
                    return `វគ្គសិក្សាឥតគិតថ្លៃដែលពេញនិយម (${filteredCourses.length})`;
                  } else {
                    return `វគ្គសិក្សាដែលមាន (${filteredCourses.length})`;
                  }
                })()}
              </h2>
              {(filters.price !== "all" || filters.duration !== "all" || filters.category !== "all" || filters.level !== "all") && (
                <button
                  onClick={resetFilters}
                  className="text-sm text-primary hover:underline"
                >
                  សម្អាតការចម្រាញ់
                </button>
              )}
            </div>
            
            {filteredCourses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  <div
                    key={course.id}
                    onClick={() => handleCourseClick(course)}
                    className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-1"
                  >
                    <div className="h-48 overflow-hidden relative">
                      <img
                        src={course.course_thumbnail || "/placeholder-course.jpg"}
                        alt={course.course_name}
                        className="w-full h-full object-cover"
                      />
                      {course.price > 0 ? (
                        <div className="absolute top-3 right-3 bg-yellow-500 text-white text-sm font-bold py-1 px-3 rounded-full">
                          ${course.price}
                        </div>
                      ) : (
                        <div className="absolute top-3 right-3 bg-green-500 text-white text-sm font-bold py-1 px-3 rounded-full">
                          ឥតគិតថ្លៃ
                        </div>
                      )}
                      {course.level && (
                        <div className="absolute top-3 left-3 bg-purple-500 bg-opacity-90 text-white text-xs font-medium py-1 px-2 rounded-md">
                          {course.level === "beginner" && "កម្រិតដំបូង"}
                          {course.level === "intermediate" && "កម្រិតមធ្យម"}
                          {course.level === "advanced" && "កម្រិតខ្ពស់"}
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
                        <span className="text-primary font-medium flex items-center gap-1">
                          <FaClock className="text-xs" />
                          {course.duration || "N/A"} នាទី
                        </span>
                      </div>
                      
                      {/* Popular or New badge */}
                      {(course.categories?.some(cat => cat.is_popular) || course.categories?.some(cat => cat.is_new)) && (
                        <div className="mt-3 pt-3 border-t border-gray-100 flex gap-2">
                          {course.categories?.some(cat => cat.is_popular) && (
                            <span className="bg-red-100 text-red-600 text-xs font-medium px-2 py-1 rounded">
                              ពេញនិយម
                            </span>
                          )}
                          {course.categories?.some(cat => cat.is_new) && (
                            <span className="bg-blue-100 text-blue-600 text-xs font-medium px-2 py-1 rounded">
                              ថ្មី
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-10 text-center">
                <div className="flex justify-center mb-4">
                  <FaSearch className="h-12 w-12 text-gray-300" />
                </div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">
                  មិនមានវគ្គសិក្សាដែលត្រូវគ្នានឹងការស្វែងរករបស់អ្នកទេ
                </h3>
                <p className="text-gray-500 mb-4">
                  សាកល្បងការស្វែងរកផ្សេងឬសម្អាតការចម្រាញ់
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                  }}
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-[#0e5c7a] transition-all"
                >
                  មើលវគ្គសិក្សាទាំងអស់
                </button>
              </div>
            )}
          </>
        ) : !selectedCategory ? (
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border-l-4 border-primary">
              <h2 className="text-xl font-semibold text-gray-800">
                {selectedCourse.course_name}
              </h2>
              <button
                onClick={resetToCourses}
                className="flex items-center text-primary hover:text-[#0e5c7a] bg-primary bg-opacity-10 px-3 py-2 rounded-lg transition-all"
              >
                <FaChevronLeft className="mr-1" />
                ត្រលប់ទៅវគ្គសិក្សាទាំងអស់
              </button>
            </div>
            
            {selectedCourse.categories?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {selectedCourse.categories.map((category) => (
                  <div
                    key={category.id}
                    className="bg-white rounded-lg shadow-sm hover:shadow-md border border-gray-100 transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                    onClick={() => handleCategoryClick(category)}
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {category.category_name}
                        </h3>
                        <div className="bg-blue-100 text-blue-600 text-xs font-medium px-2 py-1 rounded">
                          {category.lessons?.length || 0} មេរៀន
                        </div>
                      </div>
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {category.category_description || "មិនមានការពិពណ៌នា"}
                      </p>
                      <div className="flex justify-end">
                        <button className="text-primary text-sm font-medium hover:underline">
                          មើលមេរៀន →
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-10 text-center">
                <h3 className="text-lg font-medium text-gray-700 mb-2">
                  មិនមានប្រភេទសម្រាប់វគ្គសិក្សានេះទេ
                </h3>
                <p className="text-gray-500 mb-4">
                  វគ្គសិក្សានេះមិនទាន់មានមាតិកាទេ
                </p>
                <button
                  onClick={resetToCourses}
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-[#0e5c7a] transition-all"
                >
                  ត្រលប់ទៅវគ្គសិក្សាទាំងអស់
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border-l-4 border-primary">
              <div>
                <p className="text-sm text-gray-500 mb-1">{selectedCourse.course_name}</p>
                <h2 className="text-xl font-semibold text-gray-800">
                  {selectedCategory.category_name}
                </h2>
              </div>
              <button
                onClick={resetToCategories}
                className="flex items-center text-primary hover:text-[#0e5c7a] bg-primary bg-opacity-10 px-3 py-2 rounded-lg transition-all"
              >
                <FaChevronLeft className="mr-1" />
                ត្រលប់ទៅប្រភេទទាំងអស់
              </button>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <FaSpinner className="animate-spin h-10 w-10 text-primary mx-auto mb-4" />
              <p className="text-gray-600">
                កំពុងបង្ហាញទំព័រមេរៀន...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllCoursePage;