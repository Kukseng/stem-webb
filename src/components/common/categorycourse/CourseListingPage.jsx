import React, { useState, useRef } from 'react';
import { Clock, Users, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import CourseImage from '../../../assets/image (9).png';
import person from '../../../assets/person.svg';

// const CourseCard = () => (
//   <div className="bg-white overflow-hidden shadow-sm">
//     <div className="relative p-4">
//       <img src={CourseImage} alt="Course thumbnail" className="w-full h-72 object-cover rounded-t-[40px]" />
//       <div className="flex justify-between items-center">
//         <div className="px-2 py-1 bg-white/90 rounded text-sm mt-5">UI/UX Design</div>
//         <div className="flex">
//           {[...Array(4)].map((_, i) => (
//             <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
//               <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
//             </svg>
//           ))}
//         </div>
//       </div>
//     </div>

//     <div className="p-4">
//       <h3 className="text-lg font-medium mb-2 ml-7">UI/UX Design for Beginners</h3>

//       <div className="flex justify-around items-center space-x-4 text-sm text-gray-600 mb-4">
//         <div className="flex items-center">
//           <Clock className="w-4 h-4 mr-1" />
//           <span>22hr 30min</span>
//         </div>
//         <div className="flex items-center">
//           <BookOpen className="w-4 h-4 mr-1" />
//           <span>34 Courses</span>
//         </div>
//         <div className="flex items-center">
//           <Users className="w-4 h-4 mr-1" />
//           <span>10239</span>
//         </div>
//       </div>

//       <div className="flex justify-around items-center">
//         <button className="px-4 py-2 border border-gray-200 rounded-full text-gray-600">ពិនិត្យមើល</button>
//         <button className="px-4 py-2 bg-indigo-600 text-white rounded-full">ចុះឈ្មោះ</button>
//       </div>
//     </div>
//   </div>
// );

// const FeatureCard = ({ icon, title, description }) => (
//   <div className="bg-white rounded-xl p-6 shadow-sm">
//     <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center mb-4">
//       {icon}
//     </div>
//     <h3 className="text-lg font-medium mb-2">{title}</h3>
//     <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
//   </div>
// );

const SubjectCarousel = ({ subjects }) => {
  const scrollRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const scroll = (direction) => {
    const container = scrollRef.current;
    const scrollAmount = 280; // Adjust based on item width + gap

    if (container) {
      if (direction === 'left') {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }

      // Update scroll position after scrolling
      setTimeout(() => {
        setScrollPosition(container.scrollLeft);
      }, 300);
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      setScrollPosition(scrollRef.current.scrollLeft);
    }
  };

  const showLeftButton = scrollPosition > 10;
  const showRightButton = scrollRef.current ?
    scrollRef.current.scrollWidth > scrollRef.current.clientWidth + scrollPosition + 10 :
    true;

  return (
    <div className="relative mt-8 mb-12">
      <h2 className="text-2xl font-bold mb-6">មុខវិជ្ជាដែលមាន</h2>

      {showLeftButton && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 -ml-4 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
        >
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>
      )}

      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-4 pb-4 scroll-smooth hide-scrollbar"
        onScroll={handleScroll}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {subjects.map((subject, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-64 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 cursor-pointer"
          >
            <div className="w-12 h-12 bg-emerald-100 rounded-full mb-4 flex items-center justify-center">
              <span className="text-emerald-600">✓</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">{subject}</h3>
            <p className="text-gray-600 text-sm">
              ចាប់ផ្តើមសិក្សា {subject} ជាមួយគ្រូជំនាញ
            </p>
          </div>
        ))}
      </div>

      {showRightButton && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 -mr-4 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
        >
          <ChevronRight className="w-6 h-6 text-gray-700" />
        </button>
      )}

      {/* Custom pagination dots */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(subjects.length / 3) }).map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 mx-1 rounded-full ${i * 3 <= scrollPosition / 200 && (i + 1) * 3 > scrollPosition / 200 ? 'bg-emerald-500' : 'bg-gray-300'}`}
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
    'កម្មវិធីកុំព្យូទ័រ'
  ];

  return (
    <div className="min-h-screen bg-white p-4 md:p-8 mt-[100px]">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="w-full md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              បង្កើនជំនាញរបស់អ្នកៗ
              <br />
              ជាមួយ STEM Tutoring
            </h1>
            <p className="text-gray-600 mb-6">
              ការរៀនសូត្រអកុលរបស់អ្នក ជាមួយការសិក្សាភាសាវិទ្យាសាស្ត្រនិងជំនាញ
              ដែលមានរកាវិទ្យាល័យ និងជំនាញផ្សេងៗ
              <br />
              អោយជាប់ជាមួយការសិក្សាជាមួយយើង
            </p>
            <button className="bg-emerald-500 text-white px-8 py-3 rounded-full hover:bg-emerald-600 transition-colors">
              ចុះឈ្មោះដើម្បីសិក្សា
            </button>
          </div>

          {/* Illustration Section */}
          <div className="w-full md:w-1/2 relative">
            <div className="relative">
              {/* Large phone frame */}
              <div className="border-4 border-gray-200 rounded-3xl p-4 bg-white shadow-lg">
                {/* Books stack illustration */}
                <div className="flex items-end mb-4">
                  <div className="h-32 w-16 bg-gray-200 rounded mr-2"></div>
                  <div className="h-24 w-16 bg-gray-200 rounded mr-2"></div>
                  <div className="h-28 w-16 bg-gray-200 rounded"></div>
                </div>

                {/* Students illustration */}
                <div className="flex justify-around items-center">
                  <img src={person} alt="person" className="w-full h-full" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subjects Carousel instead of Grid */}
        <SubjectCarousel subjects={subjects} />


        <div className="mt-16">
          {/* <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">វគ្គសិក្សាដែលពេញនិយម</h2>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-full flex items-center">
              បង្ហាញទាំងអស់
              <ChevronRight className="w-4 h-4 ml-2" />
            </button>
          </div> */}

          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CourseCard />
            <CourseCard />
            <CourseCard />
          </div> */}
        </div>
      </div>
    </div>
  );
};

const CourseListingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-[40px]">
      <STEMTutoring />
    </div>
  );
};

export default CourseListingPage