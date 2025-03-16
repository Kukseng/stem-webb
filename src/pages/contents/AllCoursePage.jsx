import React, { useEffect, useState, useRef, useMemo, useContext } from "react";
import { FaBook, FaSearch, FaChevronLeft, FaFilter, FaClock, FaTags, FaStar } from "react-icons/fa";
import { useGetAllCoursesQuery } from "../../api/courses-api";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowBigDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../../components/context/AuthContext";

const AllCoursePage = () => {
  const { courseId, categoryId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useGetAllCoursesQuery({ pollingInterval: 0 });
  const courses = data?.results || [];

  const { user, openLoginModal } = useContext(AuthContext);

  // State
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
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [visibleCoursesCount, setVisibleCoursesCount] = useState(6);
  const dropdownRef = useRef(null);

  // Memoized unique categories
  const allCategories = useMemo(() => {
    const categories = new Set();
    courses.forEach((course) => {
      course.categories?.forEach((category) => categories.add(category.category_name));
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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsCategoryDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Memoized filtered courses
  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
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
        course.level === filters.level;
      const matchesCategory =
        filters.category === "all" ||
        (course.categories && course.categories.some((cat) => cat.category_name === filters.category));
      return matchesSearch && matchesPrice && matchesDuration && matchesLevel && matchesCategory;
    });
  }, [courses, searchTerm, filters]);

  // Handlers
  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({ ...prev, [filterType]: value }));
    setIsCategoryDropdownOpen(false);
    setVisibleCoursesCount(6);
  };

  const resetFilters = () => {
    setFilters({ price: "all", duration: "all", category: "all", level: "all" });
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
        state: { lessons: category.lessons || [], courseTitle: selectedCourse.course_name },
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

  // Animation variants
  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const cardVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.3 } } };
  const filterPanelVariants = { hidden: { opacity: 0, height: 0 }, visible: { opacity: 1, height: "auto", transition: { duration: 0.3 } } };

  // Skeleton UI Component
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

  // Loading State with Skeleton UI
  if (isLoading) {
    return (
      <div className="bg-gray-50 min-h-screen">
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
      </div>
    );
  }

  // Error State
  if (isError) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
        <div className="bg-red-50 p-8 rounded-lg text-center shadow-lg border border-red-100">
          <h2 className="text-red-600 font-bold text-lg mb-2">មានបញ្ហាកើតឡើង</h2>
          <p className="text-red-500 mb-4 text-base">{error?.data?.message || error?.message || "មិនអាចទាញយកវគ្គសិក្សាបានទេ"}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-lg transition-all shadow-md hover:shadow-lg"
          >
            ព្យាយាមម្តងទៀត
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4 md:gap-6 bg-white py-4 md:py-6 px-4 md:px-6 rounded-xl shadow-sm border border-gray-100"
        >
          <div className="flex items-center space-x-4">
            <div className="bg-[#16789e] bg-opacity-10 p-3 rounded-full shadow-inner transition-transform duration-300 hover:scale-105">
              <FaBook className="w-6 h-6 text-[#16789e]" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">
              វគ្គសិក្សាទាំងអស់
              <span className="block h-1 w-16 bg-gradient-to-r from-[#16789e] to-[#2198B8] mt-2 rounded-full" />
            </h1>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <div className="relative flex-grow sm:max-w-xs w-full">
              <input
                type="text"
                placeholder="ស្វែងរកវគ្គសិក្សា..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 md:py-3 bg-gray-50 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#16789e] focus:border-transparent transition-all duration-300 ease-in-out shadow-sm hover:shadow-md"
                aria-label="ស្វែងរកវគ្គសិក្សា"
              />
              <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 transition-colors duration-300 hover:text-[#16789e]" />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center justify-center gap-2 px-4 py-2.5 md:px-5 md:py-3 rounded-lg font-medium transition-all duration-300 ease-in-out shadow-sm hover:shadow-md ${
                showFilters ? "bg-[#16789e] text-white" : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
              }`}
              aria-label={showFilters ? "បិទការចម្រាញ់" : "បើកការចម្រាញ់"}
            >
              <FaFilter className={`w-4 h-4 md:w-5 md:h-5 ${showFilters ? "text-white" : "text-gray-500"}`} />
              <span className="text-sm md:text-base">ចម្រាញ់</span>
            </button>
            {allCategories.length > 0 && (
              <div className="relative w-full sm:w-auto" ref={dropdownRef}>
                <button
                  onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2.5 bg-white border border-gray-200 rounded-lg text-sm md:text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#16789e] transition-all duration-300 ease-in-out shadow-sm hover:bg-gray-50 hover:shadow-md"
                  aria-label="ជ្រើសរើសប្រភេទ"
                  aria-expanded={isCategoryDropdownOpen}
                >
                  {filters.category === "all" ? "ជ្រើសរើសប្រភេទ" : filters.category}
                  <ArrowBigDown
                    className={`w-4 h-4 md:w-5 md:h-5 text-gray-500 transition-transform duration-200 ease-in-out ${
                      isCategoryDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {isCategoryDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute z-20 mt-2 w-full min-w-[180px] md:w-56 bg-white border border-gray-200 rounded-lg shadow-xl max-h-60 overflow-y-auto"
                    >
                      <ul className="text-sm md:text-base text-gray-700">
                        <li
                          onClick={() => handleFilterChange("category", "all")}
                          className={`px-4 py-2 hover:bg-[#16789e] hover:text-white cursor-pointer transition-all duration-200 ease-in-out ${
                            filters.category === "all" ? "bg-[#16789e] text-white" : ""
                          }`}
                          role="option"
                          aria-selected={filters.category === "all"}
                        >
                          ទាំងអស់
                        </li>
                        {allCategories.map((category) => (
                          <li
                            key={category}
                            onClick={() => handleFilterChange("category", category)}
                            className={`px-4 py-2 hover:bg-[#16789e] hover:text-white cursor-pointer transition-all duration-200 ease-in-out ${
                              filters.category === category ? "bg-[#16789e] text-white" : ""
                            }`}
                            role="option"
                            aria-selected={filters.category === category}
                          >
                            {category}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </motion.header>

        {/* Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              variants={filterPanelVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="bg-white p-6 rounded-xl shadow-md mb-6 border border-gray-200 sticky top-4 z-10"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Price Filter */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
                    <FaStar className="text-[#16789e]" /> តម្លៃ
                  </h3>
                  <select
                    value={filters.price}
                    onChange={(e) => handleFilterChange("price", e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#16789e] transition-all duration-300 ease-in-out shadow-sm"
                  >
                    <option value="all">ទាំងអស់</option>
                    <option value="free">ឥតគិតថ្លៃ</option>
                    <option value="paid">បង់ប្រាក់</option>
                  </select>
                </div>

                {/* Duration Filter */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
                    <FaClock className="text-[#16789e]" /> រយៈពេល
                  </h3>
                
                </div>

                {/* Level Filter */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
                    <FaTags className="text-[#16789e]" /> កម្រិត
                  </h3>
                  <select
                    value={filters.level}
                    onChange={(e) => handleFilterChange("level", e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#16789e] transition-all duration-300 ease-in-out shadow-sm"
                  >
                    <option value="all">ទាំងអស់</option>
                    <option value="beginner">កម្រិតដំបូង</option>
                    <option value="intermediate">កម្រិតមធ្យម</option>
                    <option value="advanced">កម្រិតខ្ពស់</option>
                  </select>
                </div>

                {/* Reset Button */}
                <div className="flex items-end">
                  <button
                    onClick={resetFilters}
                    className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-all duration-300 ease-in-out shadow-sm"
                  >
                    សម្អាតការចម្រាញ់
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center h-10 mb-6 bg-white shadow-sm rounded-lg px-4"
          aria-label="Breadcrumb"
        >
          <ol className="flex items-center text-sm text-gray-600">
            <li className={`${!selectedCourse ? "font-medium text-[#16789e]" : "hover:text-[#16789e]"}`}>
              <Link to="/courses" onClick={resetToCourses} aria-current={!selectedCourse ? "page" : undefined}>
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
                    className={`hover:text-[#16789e] ${!selectedCategory ? "font-medium text-[#16789e]" : ""}`}
                    aria-current={!selectedCategory ? "page" : undefined}
                  >
                    {selectedCourse.course_name}
                  </Link>
                </li>
                {selectedCategory && (
                  <li className="flex items-center">
                    <span className="mx-2 text-gray-400">/</span>
                    <span className="font-medium text-[#16789e]" aria-current="page">
                      {selectedCategory.category_name}
                    </span>
                  </li>
                )}
              </>
            )}
          </ol>
        </motion.nav>

        {/* Main Content */}
        {!selectedCourse ? (
          <>
            {filteredCourses.length > 0 ? (
              <>
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {filteredCourses.slice(0, visibleCoursesCount).map((course) => (
                    <motion.div
                      key={course.id}
                      variants={cardVariants}
                      onClick={() => handleCourseClick(course)}
                      className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-1 border border-gray-100"
                      role="button"
                      tabIndex={0}
                      aria-label={`មើលវគ្គសិក្សា ${course.course_name}`}
                    >
                      <div className="h-48 overflow-hidden relative">
                        <img
                          src={course.course_thumbnail || "/placeholder-course.jpg"}
                          alt={course.course_name}
                          className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                          loading="lazy"
                        />
                        {course.price > 0 ? (
                          <div className="absolute top-3 right-3 bg-yellow-500 text-white text-sm font-bold py-1 px-3 rounded-full shadow-md">
                            ${course.price}
                          </div>
                        ) : (
                          <div className="absolute top-3 right-3 bg-green-500 text-white text-sm font-bold py-1 px-3 rounded-full shadow-md">
                            ឥតគិតថ្លៃ
                          </div>
                        )}
                        {course.level && (
                          <div className="absolute top-3 left-3 bg-purple-500 bg-opacity-90 text-white text-xs font-medium py-1 px-2 rounded-md shadow-md">
                            {course.level === "beginner" ? "កម្រិតដំបូង" : course.level === "intermediate" ? "កម្រិតមធ្យម" : "កម្រិតខ្ពស់"}
                          </div>
                        )}
                      </div>
                      <div className="p-5">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">{course.course_name}</h3>
                        <p className="text-gray-600 text-[18px] mb-3 line-clamp-2">{course.course_description || "មិនមានការពិពណ៌នា"}</p>
                        <div className="flex justify-between items-center text-[16px]">
                          <span className="text-gray-500">{course.categories?.length || 0} មេរៀន</span>
                          <span className="text-[#16789e] font-medium flex items-center gap-1">
                            <FaClock className="text-xs" /> {course.duration || "មិនបានកំណត់"} នាទី
                          </span>
                        </div>
                        {(course.categories?.some((cat) => cat.is_popular) || course.categories?.some((cat) => cat.is_new)) && (
                          <div className="mt-3 pt-3 border-t border-gray-100 flex gap-2">
                            {course.categories?.some((cat) => cat.is_popular) && (
                              <span className="bg-red-100 text-red-600 text-xs font-medium px-2 py-1 rounded">ពេញនិយម</span>
                            )}
                            {course.categories?.some((cat) => cat.is_new) && (
                              <span className="bg-blue-100 text-blue-600 text-xs font-medium px-2 py-1 rounded">ថ្មី</span>
                            )}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
                {visibleCoursesCount < filteredCourses.length && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="mt-8 text-center">
                    <button
                      onClick={handleLoadMore}
                      className="bg-[#16789e] text-white px-6 py-2 rounded-lg hover:bg-[#0e5c7a] transition-all duration-300 ease-in-out shadow-md hover:shadow-lg"
                    >
                      មើលវគ្គសិក្សាបន្ថែម
                    </button>
                  </motion.div>
                )}
              </>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="bg-white rounded-lg shadow-sm p-10 text-center">
                <div className="flex justify-center mb-4">
                  <FaSearch className="h-12 w-12 text-gray-300" />
                </div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">មិនមានវគ្គសិក្សាដែលត្រូវគ្នានឹងការស្វែងរករបស់អ្នកទេ</h3>
                <p className="text-gray-500 mb-4">សាកល្បងការស្វែងរកផ្សេង ឬ សម្អាតការចម្រាញ់</p>
                <button
                  onClick={resetFilters}
                  className="bg-[#16789e] text-white px-4 py-2 rounded-lg hover:bg-[#0e5c7a] transition-all duration-300 ease-in-out shadow-md hover:shadow-lg"
                >
                  មើលវគ្គសិក្សាទាំងអស់
                </button>
              </motion.div>
            )}
          </>
        ) : !selectedCategory ? (
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border-l-4 border-[#16789e]"
            >
              <h2 className="text-xl font-semibold text-gray-800">{selectedCourse.course_name}</h2>
              <button
                onClick={resetToCourses}
                className="flex items-center text-[#16789e] hover:text-[#0e5c7a] bg-[#16789e] bg-opacity-10 px-3 py-2 rounded-lg transition-all duration-300 ease-in-out shadow-md hover:shadow-lg"
              >
                <FaChevronLeft className="mr-1" /> ត្រលប់ទៅវគ្គសិក្សាទាំងអស់
              </button>
            </motion.div>
            {selectedCourse.categories?.length > 0 ? (
              <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {selectedCourse.categories.map((category) => (
                  <motion.div
                    key={category.id}
                    variants={cardVariants}
                    className="bg-white rounded-lg shadow-sm hover:shadow-md border border-gray-100 transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                    onClick={() => handleCategoryClick(category)}
                    role="button"
                    tabIndex={0}
                    aria-label={`មើលប្រភេទ ${category.category_name}`}
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{category.category_name}</h3>
                        <div className="bg-blue-100 text-blue-600 text-xs font-medium px-2 py-1 rounded">
                          {category.lessons?.length || 0} មេរៀន
                        </div>
                      </div>
                      <div className="mb-4 aspect-[16/9] overflow-hidden rounded-md">
                        <img
                          src={category.lessons?.[0]?.lesson_image || "/placeholder-lesson.jpg"}
                          alt={category.category_name}
                          className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                      <p className="text-gray-600 mb-4 line-clamp-2 text-[18px] md:text-[20px]">{category.category_description || "មិនមានការពិពណ៌នា"}</p>
                      <div className="flex justify-end">
                        <button className="text-[#16789e] text-sm font-medium hover:underline flex items-center gap-1">
                          មើលមេរៀន →
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="bg-white rounded-lg shadow-sm p-10 text-center">
                <h3 className="text-lg font-medium text-gray-700 mb-2">មិនមានប្រភេទសម្រាប់វគ្គសិក្សានេះទេ</h3>
                <p className="text-gray-500 mb-4">វគ្គសិក្សានេះមិនទាន់មានមាតិកាទេ</p>
                <button
                  onClick={resetToCourses}
                  className="bg-[#16789e] text-white px-4 py-2 rounded-lg hover:bg-[#0e5c7a] transition-all duration-300 ease-in-out shadow-md hover:shadow-lg"
                >
                  ត្រលប់ទៅវគ្គសិក្សាទាំងអស់
                </button>
              </motion.div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border-l-4 border-[#16789e]"
            >
              <div>
                <p className="text-sm text-gray-500 mb-1">{selectedCourse.course_name}</p>
                <h2 className="text-xl font-semibold text-gray-800">{selectedCategory.category_name}</h2>
              </div>
              <button
                onClick={resetToCategories}
                className="flex items-center text-[#16789e] hover:text-[#0e5c7a] bg-[#16789e] bg-opacity-10 px-3 py-2 rounded-lg transition-all duration-300 ease-in-out shadow-md hover:shadow-lg"
              >
                <FaChevronLeft className="mr-1" /> ត្រលប់ទៅប្រភេទទាំងអស់
              </button>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="bg-white rounded-lg shadow-sm p-8 text-center">
              <FaSpinner className="animate-spin h-10 w-10 text-[#16789e] mx-auto mb-4" />
              <p className="text-gray-600">កំពុងបង្ហាញទំព័រមេរៀន...</p>
            </motion.div>
          </div>
        )}

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
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-3 md:mb-4">សូមចូលគណនីដើម្បីបន្ត</h3>
              <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base">អ្នកត្រូវតែចូលគណនីដើម្បីចូលមើលវគ្គសិក្សា។</p>
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

export default AllCoursePage;