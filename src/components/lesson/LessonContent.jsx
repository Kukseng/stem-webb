import React from 'react';
import { Link } from 'react-router-dom';
import { FaRegListAlt, FaClock, FaFilePdf, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { formatDuration } from '../../utils/embedurl';
import MediaViewer from './MediaViewer';

const LessonContent = ({
  lesson,
  lessons,
  courseId,
  categoryId,
  progress,
  setProgress,
  onLessonClick,
}) => {
  const section = lesson?.sections?.[0] || {};
  const content = section?.contents?.[0] || {};
  const currentIndex = lessons.findIndex((l) => l.id === lesson?.id);
  const nextLesson = currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null;
  const prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <MediaViewer content={content} lessonTitle={lesson.lesson_title} />
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 border-b pb-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-2 md:mb-0">{lesson.lesson_title}</h1>
          <div className="flex items-center space-x-4 text-gray-600 text-sm">
            <span className="flex items-center">
              <FaRegListAlt className="mr-1" />
              {currentIndex + 1}/{lessons.length}
            </span>
            <span className="flex items-center">
              <FaClock className="mr-1" />
              {formatDuration(lesson.duration || 20)}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lesson content and description */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">ការពិពណ៌នា</h3>
            <div className="text-gray-700 mb-6 leading-relaxed">
              {lesson.description ||
                'មេរៀននេះផ្តល់នូវចំណេះដឹងមូលដ្ឋានសម្រាប់សិក្សាផ្នែកបន្ទាប់។ សូមរៀនឱ្យបានយល់ច្បាស់មុនពេលរៀនមេរៀនបន្ទាប់។'}
            </div>

            {/* Lesson materials - if any */}
            {section.attachments && section.attachments.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">ឯកសារគាំទ្រ</h3>
                <ul className="space-y-2">
                  {section.attachments.map((attachment, index) => (
                    <li
                      key={index}
                      className="flex items-center p-2 bg-gray-50 rounded-md hover:bg-gray-100"
                    >
                      <FaFilePdf className="mr-2 text-primary" />
                      <a
                        href={attachment.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-800 hover:text-primary"
                      >
                        {attachment.title || `ឯកសារ ${index + 1}`}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex flex-col sm:flex-row justify-between mt-8 pt-4 border-t">
              <button
                onClick={() => prevLesson && onLessonClick(prevLesson)}
                disabled={!prevLesson}
                className={`flex items-center mb-3 sm:mb-0 ${
                  prevLesson ? 'text-gray-700 hover:text-primary' : 'text-gray-400 cursor-not-allowed'
                }`}
              >
                <FaChevronLeft className="mr-1" />
                {prevLesson ? prevLesson.lesson_title : 'មិនមានមេរៀនមុន'}
              </button>
              <button
                onClick={() => nextLesson && onLessonClick(nextLesson)}
                disabled={!nextLesson}
                className={`flex items-center justify-end ${
                  nextLesson ? 'text-gray-700 hover:text-primary' : 'text-gray-400 cursor-not-allowed'
                }`}
              >
                {nextLesson ? nextLesson.lesson_title : 'មិនមានមេរៀនបន្ទាប់'}
                <FaChevronRight className="ml-1" />
              </button>
            </div>
          </div>

          {/* Instructor and actions */}
          <div className="lg:col-span-1 bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center mb-6">
              <img
                src="https://ui-avatars.com/api/?name=Instructor&background=0D8ABC&color=fff"
                alt="Instructor"
                className="w-12 h-12 rounded-full mr-4 border-2 border-primary"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Pensive-Tesla</h3>
                <p className="text-sm text-gray-600">គ្រូបង្រៀន</p>
              </div>
            </div>

            {/* Progress tracking */}
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">ការបញ្ចប់មេរៀន</span>
                <span className="font-medium">{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="space-y-3">
              <Link
                to={`/courses/${courseId}/categories/${categoryId}/lessons/${lesson.id}`}
                className="w-full bg-primary text-white font-semibold py-3 px-6 rounded-lg hover:bg-opacity-90 transition-colors text-center block"
              >
                ចាប់ផ្តើមរៀន
              </Link>
              <button
                className="w-full border border-primary text-primary bg-white font-semibold py-3 px-6 rounded-lg hover:bg-primary hover:bg-opacity-10 transition-colors text-center block"
                onClick={() => setProgress(100)}
              >
                សម្គាល់ថាបានបញ្ចប់
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonContent;