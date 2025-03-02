import React from 'react';
import { Clock, Users, BookOpen } from 'lucide-react';
import CourseImage from '../../../assets/image (9).png';
import person from '../../../assets/person.svg';
const CourseCard = () => (
  <div className="bg-white overflow-hidden shadow-sm">
    <div className="relative p-4">
      <img src={CourseImage} alt="Course thumbnail" className="w-full h-72 object-cover rounded-t-[40px] " />
      <div className='flex justify-between items-center  '>
      <div className=" top-2 left-2 px-2 py-1 bg-white/90 rounded text-sm mt-5">UI/UX Design</div>
      <div className=" top-2 right-2 flex">
        {[...Array(4)].map((_, i) => (
          <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
          </svg>
        ))}
        </div>
      </div>
    </div>
    
    <div className="p-4">
      <h3 className="text-lg font-medium mb-2 ml-7">UI/UX Design for Beginners</h3>
      
      <div className="flex justify-around items-center space-x-4 text-sm text-gray-600 mb-4">
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-1" />
          <span>22hr 30min</span>
        </div>
        <div className="flex items-center">
          <BookOpen className="w-4 h-4 mr-1" />
          <span>34 Courses</span>
        </div>
        <div className="flex items-center">
          <Users className="w-4 h-4 mr-1" />
          <span>10239</span>
        </div>
      </div>

      <div className="flex justify-around items-center">
        <button className="px-4 py-2 border border-gray-200 rounded-full text-gray-600">ពិនិត្យមើល</button>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-full">ចុះឈ្មោះ</button>
      </div>
    </div>
  </div>
);

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm">
    <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-medium mb-2">{title}</h3>
    <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
  </div>
);
const STEMTutoring = () => {
  const subjects = [
    'វិទ្យាសាស្ត្រ',
    'បច្ចេកវិទ្យា',
    'វិស្វកម្ម',
    'គណិតវិទ្យា'
  ];

  return (
    <div className="min-h-screen bg-white p-8 mt-[100px]">
      <div className="max-w-content  mx-auto">
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
                    <img src={person} alt="person" className="w-full h-full " />

                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {subjects.map((subject, index) => (
            <div 
              key={index}
              className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 bg-emerald-100 rounded-full mb-4 flex items-center justify-center">
                <span className="text-emerald-600">✓</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">{subject}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
const CourseListingPage = () => {


  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-2">
          <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <h1 className="text-xl font-medium">វគ្គសិក្សាដែលពេញនិយម</h1>
        </div>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-full flex items-center">
          បង្ហាញទាំងអស់
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Course Cards */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <CourseCard />
        <CourseCard />
        <CourseCard />
      </div> */}
    <STEMTutoring/>
      {/* Features Section */}
      <div className="text-center mb-12">
        <h2 className="text-2xl font-bold text-orange-500 mb-4">មុខងារមួយ</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          បទពិសោធន៍មួយក្នុងការសិក្សាទៅលើកម្មវិធីនីមួយៗ ដែលប្រើប្រាស់បានងាយស្រួល និងប្រសិទ្ធភាពការសិក្សាខ្ពស់ក្រៃ។
        </p>
      </div>

      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div> */}
    </div>
  );
};

export default CourseListingPage;