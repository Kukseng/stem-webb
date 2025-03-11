import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight, FaBook } from 'react-icons/fa';
import Sidebar from './Sidebar';
import LessonContent from './LessonContent';

const LessonsCard = () => {
  const { courseId, categoryId } = useParams();
  const location = useLocation();
  const lessons = location.state?.lessons || [];
  const courseTitle = location.state?.courseTitle || 'វគ្គសិក្សា';
  const [selectedLesson, setSelectedLesson] = useState(lessons[0] || null);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [progress, setProgress] = useState(0); 
  // Handle lesson selection
  const handleLessonClick = (lesson) => {
    setSelectedLesson(lesson);
    const randomProgress = Math.floor(Math.random() * 101); // Simulate progress
    setProgress(randomProgress);
  };

  // Set the document title when lesson changes
  useEffect(() => {
    if (selectedLesson) {
      document.title = `${selectedLesson.lesson_title} | ${courseTitle}`;
    }
  }, [selectedLesson, courseTitle]);

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen flex">
      {/* Toggle Button for Mobile */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed z-50 top-4 left-4 bg-primary text-white p-2 rounded-full shadow-lg"
      >
        {isSidebarOpen ? <FaChevronLeft /> : <FaChevronRight />}
      </button>

      {/* Sidebar for Lesson List */}
      <Sidebar
        lessons={lessons}
        selectedLesson={selectedLesson}
        onLessonClick={handleLessonClick}
        courseTitle={courseTitle}
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content Area */}
      <main
        className={`flex-1 p-4 md:p-8 transition-all duration-300 ${isSidebarOpen ? 'lg:ml-0' : 'ml-0'} overflow-y-auto h-screen`}
      >
        {selectedLesson ? (
          <LessonContent
            lesson={selectedLesson}
            lessons={lessons}
            courseId={courseId}
            categoryId={categoryId}
            progress={progress}
            setProgress={setProgress}
            onLessonClick={handleLessonClick}
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-600 py-20">
            <FaBook className="w-16 h-16 text-gray-300 mb-4" />
            <p className="font-bold text-xl mb-2">សូមជ្រើសរើសមេរៀន</p>
            <p className="text-gray-500">ជ្រើសរើសមេរៀនមួយពីបញ្ជីនៅខាងឆ្វេងដើម្បីចាប់ផ្តើម</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default LessonsCard;