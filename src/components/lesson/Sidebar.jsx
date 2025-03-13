import React from 'react';
import { Link } from 'react-router-dom';
import { FaRegListAlt, FaBook, FaCheckCircle, FaClock, FaLock } from 'react-icons/fa';
import { formatDuration } from '../../utils/embedurl';

const Sidebar = ({ lessons, selectedLesson, onLessonClick, courseTitle, isOpen, toggleSidebar }) => {
  const renderLessonItem = (lesson, index) => (
    <li key={lesson.id}>
      <button
        onClick={() => onLessonClick(lesson)}
        className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center ${
          selectedLesson?.id === lesson.id
            ? 'bg-primary text-white font-medium'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        <div className="w-6 h-6 flex items-center justify-center mr-3 rounded-full border border-current">
          {lesson.completed ? (
            <FaCheckCircle className="w-6 h-6 text-green-500" />
          ) : (
            <span className="text-sm">{index + 1}</span>
          )}
        </div>
        <div className="flex-1 flex flex-col">
          <span className="line-clamp-2">{lesson.lesson_title}</span>
          <span className="text-xs opacity-80 flex items-center mt-1">
            <FaClock className="mr-1 w-3 h-3" />
            {formatDuration(lesson.duration || 15)}
          </span>
        </div>
        {lesson.locked && <FaLock className="ml-2 text-gray-400 flex-shrink-0" />}
      </button>
    </li>
  );

  return (
    <aside
      className={`${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 fixed lg:static z-40 w-72 bg-white shadow-lg h-screen flex flex-col`}
    >
      {/* Fixed header section */}
      <div className="p-4 border-b">
        <div className="flex items-center mb-6 group">
          <div className="w-10 h-10 bg-primary bg-opacity-10 text-primary rounded-full flex items-center justify-center mr-3 shadow-sm transition-all duration-300 group-hover:rotate-12">
            <FaRegListAlt className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-gray-800">មេរៀន</h2>
        </div>

        <div className="mb-4 px-2 py-1 bg-gray-50 rounded-md text-sm text-gray-600">
          <Link to="/courses/:courseId" className="hover:text-primary">វគ្គសិក្សា</Link>
          <span className="mx-1">›</span>
          <span className="font-medium">{courseTitle}</span>
        </div>

        <div className="mb-4 px-2">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">ការរីកចម្រើន</span>
            <span className="font-medium">
              {Math.round((lessons.filter((l) => l.completed).length / lessons.length) * 100) || 0}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-500"
              style={{
                width: `${Math.round((lessons.filter((l) => l.completed).length / lessons.length) * 100) || 0}%`,
              }}
            ></div>
          </div>
        </div>
      </div>

  
      <div className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-1.5">
          {lessons.length > 0 ? (
            lessons.map((lesson, index) => renderLessonItem(lesson, index))
          ) : (
            <li className="text-center py-8 text-gray-500">
              <div className="mb-3">
                <FaBook className="w-10 h-10 mx-auto text-gray-300" />
              </div>
              មិនមានមេរៀនទេ។
              <p className="text-sm mt-2">សូមត្រឡប់ក្រោយវិញ។</p>
            </li>
          )}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;