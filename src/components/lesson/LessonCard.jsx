import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import {
  FaRegListAlt,
  FaPlayCircle,
  FaFilePdf,
  FaClock,
  FaBook,
  FaChevronRight,
  FaChevronLeft,
  FaLock,
  FaCheckCircle,
} from "react-icons/fa";
import { useGetProfileQuery } from "../../api/auth-api";
import { motion, AnimatePresence } from "framer-motion";

// Helper Functions
const getYouTubeEmbedUrl = (url) => {
  if (!url) return null;
  const regex = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{11})/;
  const match = url.match(regex);
  const videoId = match ? match[1] : null;
  return videoId
    ? `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&iv_load_policy=3&controls=1&showinfo=0`
    : url;
};

const formatDuration = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hours > 0 ? `${hours}:${mins.toString().padStart(2, "0")} ម៉ោង` : `${mins} នាទី`;
};

const LessonsCard = () => {
  const { courseId, categoryId } = useParams();
  const location = useLocation();
  const lessons = location.state?.lessons || [];
  const courseTitle = location.state?.courseTitle || "វគ្គសិក្សា";
  const instructor = location.state?.instructor || {
    uuid: "default-uuid",
    username: "Pensive-Tesla",
    image: "",
  };

  const [selectedLesson, setSelectedLesson] = useState(lessons[0] || null);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [progress, setProgress] = useState(0);
  const { data: profileData } = useGetProfileQuery();
  const primaryColor = "#16789e";

  const handleLessonClick = (lesson) => {
    setSelectedLesson(lesson);
    const randomProgress = Math.floor(Math.random() * 101); // Replace with real progress logic
    setProgress(randomProgress);
  };

  const section = selectedLesson?.sections?.[0] || {};
  const content = section?.contents?.[0] || {};
  const embedVideoUrl = content.video_url ? getYouTubeEmbedUrl(content.video_url) : null;

  const currentIndex = lessons.findIndex((lesson) => lesson.id === selectedLesson?.id);
  const nextLesson = currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null;
  const prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null;

  useEffect(() => {
    if (selectedLesson) {
      document.title = `${selectedLesson.lesson_title || "មេរៀន"} | ${courseTitle}`;
    }
  }, [selectedLesson, courseTitle]);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  // Animation Variants
  const sidebarVariants = {
    open: { x: 0, opacity: 1, width: "18rem" },
    closed: { x: "-100%", opacity: 0, width: 0 },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-200 min-h-screen flex font-suwannaphum">
      {/* Mobile Toggle Button */}
      <motion.button
        onClick={toggleSidebar}
        className="lg:hidden fixed z-50 top-4 left-4 text-white p-2 rounded-full shadow-lg"
        style={{ backgroundColor: primaryColor }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {isSidebarOpen ? <FaChevronLeft /> : <FaChevronRight />}
      </motion.button>

      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.aside
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
            transition={{ duration: 0.3 }}
            className="lg:static z-40 w-72 bg-white shadow-xl h-screen flex flex-col overflow-hidden"
          >
            <div className="p-6 border-b border-gray-200">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center mb-6 group"
              >
                <div
                  className="w-10 h-10 text-white rounded-full flex items-center justify-center mr-3 shadow-md transition-transform group-hover:rotate-12"
                  style={{ backgroundColor: primaryColor }}
                >
                  <FaRegListAlt className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">មេរៀន</h2>
              </motion.div>
              <div className="mb-4 px-2 py-1 bg-gray-50 rounded-md text-sm text-gray-600">
                <Link to="/courses" className="hover:text-[#16789e] transition-colors">
                  វគ្គសិក្សា
                </Link>
                <span className="mx-1">›</span>
                <span className="font-medium">{courseTitle}</span>
              </div>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">ការរីកចម្រើន</span>
                  <span className="font-medium" style={{ color: primaryColor }}>
                    {Math.round((lessons.filter((l) => l.completed).length / lessons.length) * 100) || 0}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${Math.round((lessons.filter((l) => l.completed).length / lessons.length) * 100) || 0}%`,
                    }}
                    transition={{ duration: 0.5 }}
                    className="h-2 rounded-full"
                    style={{ backgroundColor: primaryColor }}
                  />
                </div>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <ul className="space-y-2">
                {lessons.length > 0 ? (
                  lessons.map((lesson, index) => (
                    <motion.li
                      key={lesson.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <button
                        onClick={() => handleLessonClick(lesson)}
                        className={`w-full text-left px-4 py-3 rounded-lg flex items-center transition-all duration-300 ${
                          selectedLesson?.id === lesson.id
                            ? "text-white shadow-md"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                        style={{
                          backgroundColor: selectedLesson?.id === lesson.id ? primaryColor : "transparent",
                        }}
                      >
                        <div className="w-6 h-6 flex items-center justify-center mr-3 rounded-full border border-current">
                          {lesson.completed ? (
                            <FaCheckCircle className="w-5 h-5 text-yellow-400" />
                          ) : (
                            <span className="text-sm font-medium">{index + 1}</span>
                          )}
                        </div>
                        <div className="flex-1">
                          <span className="block text-sm font-medium">
                            {lesson.lesson_title || `មេរៀន ${index + 1}`}
                          </span>
                          <span className="text-xs opacity-75 flex items-center mt-1">
                            <FaClock className="mr-1 w-3 h-3" />
                            {formatDuration(lesson.duration || 15)}
                          </span>
                        </div>
                        {lesson.locked && <FaLock className="ml-2 text-gray-400 flex-shrink-0" />}
                      </button>
                    </motion.li>
                  ))
                ) : (
                  <li className="text-center py-8 text-gray-500">
                    <FaBook className="w-10 h-10 mx-auto text-gray-300 mb-3" />
                    <span className="text-lg">មិនមានមេរៀនទេ។</span>
                    <p className="text-sm mt-2">សូមត្រឡប់ក្រោយវិញ។</p>
                  </li>
                )}
              </ul>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Overlay for Mobile Sidebar */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main
        className={`flex-1 p-4 md:p-8 transition-all duration-300 ${isSidebarOpen ? "lg:ml-0" : "ml-0"} overflow-y-auto h-screen`}
      >
        {selectedLesson ? (
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="p-6">
              {/* Video/PDF Section */}
              <div className="space-y-6">
                {embedVideoUrl && (
                  <div className="relative w-full h-0 pb-[56.25%] rounded-lg overflow-hidden shadow-md">
                    <iframe
                      src={embedVideoUrl}
                      title={content.video_title || selectedLesson.lesson_title || "មេរៀន"}
                      className="absolute top-0 left-0 w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )}
                {content.file && (
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="p-4 rounded-lg flex items-center justify-between shadow-sm"
                    style={{ backgroundColor: "#f5f8fa" }}
                  >
                    <div className="flex items-center">
                      <FaFilePdf className="w-6 h-6 mr-3" style={{ color: primaryColor }} />
                      <span className="text-lg font-medium text-gray-800">
                        {content.title || "ឯកសារ PDF"}
                      </span>
                    </div>
                    <motion.a
                      href={content.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-white px-4 py-2 rounded-lg transition-colors shadow-md"
                      style={{ backgroundColor: primaryColor }}
                    >
                      <FaFilePdf className="mr-2 inline" /> ទាញយក
                    </motion.a>
                  </motion.div>
                )}
                {!embedVideoUrl && !content.file && (
                  <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 shadow-sm">
                    <div className="text-center p-6">
                      <FaPlayCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p className="text-lg">មិនមានមាតិកាបង្ហាញទេ។</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Lesson Details */}
              <div className="mt-8 border-t border-gray-200 pt-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
                  <h1 className="text-3xl font-bold text-gray-800 mb-2 md:mb-0">
                    {selectedLesson.lesson_title || "មេរៀន"}
                  </h1>
                  <div className="flex items-center space-x-4 text-gray-600 text-sm">
                    <span className="flex items-center">
                      <FaRegListAlt className="mr-1 w-4 h-4" />
                      {currentIndex + 1}/{lessons.length}
                    </span>
                    <span className="flex items-center">
                      <FaClock className="mr-1 w-4 h-4" />
                      {formatDuration(selectedLesson.duration || 20)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Lesson Content */}
                  <div className="lg:col-span-2">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">ការពិពណ៌នា</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed text-base">
                      {selectedLesson.description ||
                        "មេរៀននេះផ្តល់នូវចំណេះដឹងមូលដ្ឋានសម្រាប់សិក្សាផ្នែកបន្ទាប់។ សូមរៀនឱ្យបានយល់ច្បាស់មុនពេលរៀនមេរៀនបន្ទាប់។"}
                    </p>
                    {section.attachments?.length > 0 && (
                      <div className="mb-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-3">ឯកសារគាំទ្រ</h3>
                        <ul className="space-y-2">
                          {section.attachments.map((attachment, index) => (
                            <motion.li
                              key={index}
                              whileHover={{ scale: 1.02 }}
                              className="flex items-center p-2 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors shadow-sm"
                            >
                              <FaFilePdf className="mr-2" style={{ color: primaryColor }} />
                              <a
                                href={attachment.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-800 hover:text-[#16789e] text-base transition-colors"
                              >
                                {attachment.title || `ឯកសារ ${index + 1}`}
                              </a>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <div className="flex flex-col sm:flex-row justify-between mt-8 pt-4 border-t border-gray-200">
                      <motion.button
                        whileHover={{ scale: prevLesson ? 1.05 : 1 }}
                        whileTap={{ scale: prevLesson ? 0.95 : 1 }}
                        onClick={() => prevLesson && handleLessonClick(prevLesson)}
                        disabled={!prevLesson}
                        className={`flex items-center mb-3 sm:mb-0 text-base font-medium transition-colors ${
                          prevLesson ? "hover:text-yellow-500" : "text-gray-400 cursor-not-allowed"
                        }`}
                        style={{ color: prevLesson ? primaryColor : "#9ca3af" }}
                      >
                        <FaChevronLeft className="mr-1 w-4 h-4" />
                        {prevLesson ? prevLesson.lesson_title : "មិនមានមេរៀនមុន"}
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: nextLesson ? 1.05 : 1 }}
                        whileTap={{ scale: nextLesson ? 0.95 : 1 }}
                        onClick={() => nextLesson && handleLessonClick(nextLesson)}
                        disabled={!nextLesson}
                        className={`flex items-center justify-end text-base font-medium transition-colors ${
                          nextLesson ? "hover:text-yellow-500" : "text-gray-400 cursor-not-allowed"
                        }`}
                        style={{ color: nextLesson ? primaryColor : "#9ca3af" }}
                      >
                        {nextLesson ? nextLesson.lesson_title : "មិនមានមេរៀនបន្ទាប់"}
                        <FaChevronRight className="ml-1 w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>

                  {/* Instructor & Progress */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4 rounded-lg shadow-sm"
                    style={{ backgroundColor: "#f5f8fa" }}
                  >
                    <div className="flex items-center mb-6">
                      <img
                        src={instructor.image || "https://via.placeholder.com/48"}
                        alt={instructor.username}
                        className="w-12 h-12 rounded-full mr-4 border-2 shadow-sm"
                        style={{ borderColor: primaryColor }}
                      />
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">
                          {instructor.username}
                        </h3>
                        <p className="text-sm text-gray-600">គ្រូបង្រៀន</p>
                      </div>
                    </div>
                    <div className="mb-6">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">ការបញ្ចប់មេរៀន</span>
                        <span className="font-medium" style={{ color: primaryColor }}>
                          {progress}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 0.5 }}
                          className="h-2 rounded-full"
                          style={{ backgroundColor: "#faca15" }}
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link
                          to={`/courses/${courseId}/categories/${categoryId}/lessons/${selectedLesson.id}`}
                          className="w-full text-white font-semibold py-3 px-6 rounded-lg transition-colors text-center block text-base shadow-md"
                          style={{ backgroundColor: primaryColor }}
                        >
                          ចាប់ផ្តើមរៀន
                        </Link>
                      </motion.div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full border font-semibold py-3 px-6 rounded-lg transition-colors text-center text-base shadow-md"
                        style={{ borderColor: primaryColor, color: primaryColor }}
                        onClick={() => setProgress(100)}
                      >
                        សម្គាល់ថាបានបញ្ចប់
                      </motion.button>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center justify-center text-gray-600 py-20"
          >
            <FaBook className="w-16 h-16 text-gray-300 mb-4" />
            <p className="font-bold text-2xl mb-2">សូមជ្រើសរើសមេរៀន</p>
            <p className="text-gray-500 text-base">ជ្រើសរើសមេរៀនមួយពីបញ្ជីនៅខាងឆ្វេងដើម្បីចាប់ផ្តើម</p>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default LessonsCard;