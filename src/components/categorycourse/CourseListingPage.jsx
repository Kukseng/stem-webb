import React, { useState, useRef } from 'react';
import { Clock, Users, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import CourseImage from '../../assets/image (9).png';
import person from '../../assets/person.svg';

const CourseCard = () => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
    <div className="relative">
      <img src={CourseImage} alt="Course thumbnail" className="w-full h-56 object-cover" />
      <div className="absolute top-4 left-4 bg-white/95 px-3 py-1 rounded-full text-sm font-medium text-indigo-700">
        UI/UX Design
      </div>
      <div className="absolute top-4 right-4 flex">
        {[...Array(4)].map((_, i) => (
          <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        ))}
      </div>
    </div>
    <div className="p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-3">UI/UX Design for Beginners</h3>
      <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>22hr 30min</span>
        </div>
        <div className="flex items-center gap-1">
          <BookOpen className="w-4 h-4" />
          <span>34 Courses</span>
        </div>
        <div className="flex items-center gap-1">
          <Users className="w-4 h-4" />
          <span>10,239</span>
        </div>
      </div>
      <div className="flex justify-between gap-4">
        <button className="flex-1 px-4 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100 transition-colors">
          ពិនិត្យមើល
        </button>
        <button className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors">
          ចុះឈ្មោះ
        </button>
      </div>
    </div>
  </div>
);

const SubjectCarousel = ({ subjects }) => {
  const scrollRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const scroll = (direction) => {
    const container = scrollRef.current;
    const scrollAmount = 300;

    if (container) {
      if (direction === 'left') {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
      setTimeout(() => setScrollPosition(container.scrollLeft), 300);
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) setScrollPosition(scrollRef.current.scrollLeft);
  };

  const showLeftButton = scrollPosition > 10;
  const showRightButton = scrollRef.current
    ? scrollRef.current.scrollWidth > scrollRef.current.clientWidth + scrollPosition + 10
    : true;

  return (
    <div className="relative mt-12 mb-16">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">មុខវិជ្ជាដែលមាន</h2>

      {showLeftButton && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 -ml-6 bg-white p-3 rounded-full shadow-md hover:bg-gray-100 transition-colors z-10"
        >
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
      )}

      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-6 pb-4 scroll-smooth hide-scrollbar"
        onScroll={handleScroll}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {subjects.map((subject, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-72 p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-2 cursor-pointer"
          >
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-emerald-600 text-xl">✓</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{subject}</h3>
            <p className="text-gray-600 text-sm">
              ចាប់ផ្តើមសិក្សា {subject} ជាមួយគ្រូជំនាញ
            </p>
          </div>
        ))}
      </div>

      {showRightButton && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 -mr-6 bg-white p-3 rounded-full shadow-md hover:bg-gray-100 transition-colors z-10"
        >
          <ChevronRight className="w-6 h-6 text-gray-600" />
        </button>
      )}

      <div className="flex justify-center mt-6">
        {Array.from({ length: Math.ceil(subjects.length / 3) }).map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 mx-1 rounded-full transition-colors ${
              i * 3 <= scrollPosition / 200 && (i + 1) * 3 > scrollPosition / 200 ? 'bg-emerald-500' : 'bg-gray-300'
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

const STEMTutoring = () => {
  const subjects = [
    'វិទ្យាសាស្ត្រ',
    'បច្ចេកវិទ្យា',
    'វិស្វកម្ម',
    'គណិតវិទ្យា',
    'រូបវិទ្យា',
    'គីមីវិទ្យា',
    'ជីវវិទ្យា',
    'កម្មវិធីកុំព្យូទ័រ',
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-16">
          <div className="w-full md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
              បង្កើនជំនាញរបស់អ្នក <br /> ជាមួយ STEM Tutoring
            </h1>
            <p className="text-gray-600 mb-8 max-w-lg text-lg leading-relaxed">
              ការរៀនសូត្រអកុលរបស់អ្នក ជាមួយការសិក្សាភាសាវិទ្យាសាស្ត្រនិងជំនាញដែលមានរកាវិទ្យាល័យ និងជំនាញផ្សេងៗ
              អោយជាប់ជាមួយការសិក្សាជាមួយយើង
            </p>
            <button className="bg-emerald-500 text-white px-8 py-3 rounded-full hover:bg-emerald-600 transition-colors shadow-md">
              ចុះឈ្មោះដើម្បីសិក្សា
            </button>
          </div>
          <div className="w-full md:w-1/2">
            <div className="relative bg-white p-6 rounded-3xl shadow-lg">
              <img src={person} alt="person" className="w-full h-64 object-contain" />
            </div>
          </div>
        </div>

        {/* Subjects Carousel */}
        <SubjectCarousel subjects={subjects} />
      </div>
    </div>
  );
};

const CourseListingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <STEMTutoring />
    </div>
  );
};

export default CourseListingPage;