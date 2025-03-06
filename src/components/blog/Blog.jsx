// import React from 'react';
// import { Calendar } from 'lucide-react';

// const ArticleCard = ({ image, date, title, excerpt }) => (
//   <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
//     <img 
//       src={image || "/api/placeholder/400/250"} 
//       alt={title}
//       className="w-full h-48 object-cover"
//     />
//     <div className="p-4">
//       <div className="flex items-center text-sm text-gray-500 mb-2">
//         <Calendar size={16} className="mr-1" />
//         {date}
//       </div>
//       <h3 className="font-semibold mb-2">{title}</h3>
//       <p className="text-gray-600 text-sm line-clamp-2">{excerpt}</p>
//     </div>
//   </div>
// );

// const CategoryItem = ({ name, count }) => (
//   <div className="flex justify-between items-center py-2">
//     <span className="text-gray-700 hover:text-blue-600 cursor-pointer">{name}</span>
//     <span className="text-gray-500 text-sm">{count}</span>
//   </div>
// );

// const RecentPost = ({ image, title }) => (
//   <div className="flex items-center gap-3 mb-4">
//     <img 
//       src={image || "/api/placeholder/80/80"} 
//       alt={title}
//       className="w-16 h-16 object-cover rounded"
//     />
//     <h4 className="text-sm font-medium hover:text-blue-600 cursor-pointer">{title}</h4>
//   </div>
// );

// const Pagination = () => (
//   <div className="flex justify-center gap-2 mt-8">
//     <button className="w-8 h-8 rounded-full border hover:bg-gray-100">←</button>
//     <button className="w-8 h-8 rounded-full bg-black text-white">1</button>
//     <button className="w-8 h-8 rounded-full border hover:bg-gray-100">2</button>
//     <button className="w-8 h-8 rounded-full border hover:bg-gray-100">3</button>
//     <button className="w-8 h-8 rounded-full border hover:bg-gray-100">→</button>
//   </div>
// );

// const BlogPage = () => {
//   const articles = Array(6).fill({
//     title: "ការរចនា UI/UX សម្រាប់អ្នកចាប់ផ្តើមដំបូង",
//     date: "Jan 24, 2023",
//     excerpt: "Looking for an amazing & well-functional LearnPress WordPress Theme?",
//   });

//   const categories = [
//     { name: "Commercial", count: 15 },
//     { name: "Office", count: 15 },
//     { name: "Shop", count: 15 },
//     { name: "Private", count: 15 },
//     { name: "Academy", count: 15 },
//     { name: "Single family home", count: 15 },
//   ];

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <div className="flex gap-8">
//         {/* Main Content */}
//         <div className="w-3/4">
//           <h1 className="text-2xl font-bold mb-6">All Articles</h1>
          
//           <div className="grid grid-cols-2 gap-6">
//             {articles.map((article, index) => (
//               <ArticleCard key={index} {...article} />
//             ))}
//           </div>

//           <Pagination />
//         </div>

//         {/* Sidebar */}
//         <div className="w-1/4">
//           <div className="mb-8">
//             <h2 className="text-lg font-semibold mb-4">Category</h2>
//             <div className="divide-y">
//               {categories.map((category, index) => (
//                 <CategoryItem key={index} {...category} />
//               ))}
//             </div>
//           </div>

//           <div>
//             <h2 className="text-lg font-semibold mb-4">Recent Posts</h2>
//             {articles.slice(0, 3).map((article, index) => (
//               <RecentPost key={index} {...article} />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BlogPage;
import React, { useState } from 'react';

const CourseCard = ({ course }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm mb-8 overflow-hidden">
      <div className="relative">
        <img src={course.image} alt={course.title} className="w-full h-32 object-cover" />
        <div className="absolute top-2 right-2">
          <span className="bg-pink-500 text-white text-xs px-3 py-1 rounded">
            {course.category}
          </span>
        </div>
        <button className="absolute top-2 left-2 text-yellow-400 hover:text-yellow-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </button>
      </div>
      
      <div className="p-4">
        <div className="flex items-center mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg key={star} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="ml-2 text-sm font-medium text-gray-700">{course.rating}</span>
          <span className="mx-2 text-gray-300">|</span>
          <span className="text-sm text-gray-500">{course.studentCount} ជនជាតិ</span>
        </div>
        
        <h3 className="text-sm font-medium mb-4">{course.title}</h3>
        
        <div className="flex items-center text-sm text-gray-600 mb-4">
          <div className="flex items-center mr-4">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>{course.modules} មេរៀន</span>
          </div>
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{course.hours} ម៉ោង</span>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <button className="bg-blue-600 text-white py-2 px-4 rounded text-sm hover:bg-blue-700 transition-colors">
            ចុះឈ្មោះ
          </button>
          <button className="text-blue-600 py-2 px-4 rounded text-sm hover:bg-blue-50 transition-colors">
            ព័ត៌មានលម្អិត
          </button>
        </div>
      </div>
    </div>
  );
};

const Blog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  
  const courses = [
    {
      id: 1,
      herf: "/course/1",
      title: "វគ្គបណ្តុះបណ្តាល និងការអភិវឌ្ឍន៍ជំនាញវិជ្ជាជីវៈសម្រាប់",
      category: "Physic",
      image: "/api/placeholder/240/120",
      rating: "4.8",
      studentCount: "22ក 30នាក់",
      modules: "8",
      hours: "506",
      subject: "Astronomy"
    },
    {
      id: 2,
      title: "វគ្គបណ្តុះបណ្តាល និងការអភិវឌ្ឍន៍ជំនាញវិជ្ជាជីវៈសម្រាប់",
      category: "Physic",
      image: "/api/placeholder/240/120",
      rating: "4.8",
      studentCount: "22ក 30នាក់",
      modules: "8",
      hours: "506",
      subject: "C#"
    },
    {
      id: 3,
      title: "វគ្គបណ្តុះបណ្តាល និងការអភិវឌ្ឍន៍ជំនាញវិជ្ជាជីវៈសម្រាប់",
      category: "Physic",
      image: "/api/placeholder/240/120",
      rating: "4.8",
      studentCount: "22ក 30នាក់",
      modules: "8",
      hours: "506",
      subject: "Finance"
    },
    {
      id: 4,
      title: "វគ្គបណ្តុះបណ្តាល និងការអភិវឌ្ឍន៍ជំនាញវិជ្ជាជីវៈសម្រាប់",
      category: "Physic",
      image: "/api/placeholder/240/120",
      rating: "4.8",
      studentCount: "22ក 30នាក់",
      modules: "8",
      hours: "506",
      subject: "Finance"
    },
    {
      id: 5,
      title: "វគ្គបណ្តុះបណ្តាល និងការអភិវឌ្ឍន៍ជំនាញវិជ្ជាជីវៈសម្រាប់",
      category: "Physic",
      image: "/api/placeholder/240/120",
      rating: "4.8",
      studentCount: "22ក 30នាក់",
      modules: "8",
      hours: "506",
      subject: "Chemistry"
    },
    {
      id: 6,
      title: "វគ្គបណ្តុះបណ្តាល និងការអភិវឌ្ឍន៍ជំនាញវិជ្ជាជីវៈសម្រាប់",
      category: "Physic",
      image: "/api/placeholder/240/120",
      rating: "4.8",
      studentCount: "22ក 30នាក់",
      modules: "8",
      hours: "506",
      subject: "Economics"
    },
    {
      id: 7,
      title: "វគ្គបណ្តុះបណ្តាល និងការអភិវឌ្ឍន៍ជំនាញវិជ្ជាជីវៈសម្រាប់",
      category: "Physic",
      image: "/api/placeholder/240/120",
      rating: "4.8",
      studentCount: "22ក 30នាក់",
      modules: "8",
      hours: "506",
      subject: "Civil Engineering"
    },
    {
      id: 8,
      title: "វគ្គបណ្តុះបណ្តាល និងការអភិវឌ្ឍន៍ជំនាញវិជ្ជាជីវៈសម្រាប់",
      category: "Physic",
      image: "/api/placeholder/240/120",
      rating: "4.8",
      studentCount: "22ក 30នាក់",
      modules: "8",
      hours: "506",
      subject: "Linux"
    },
    {
      id: 9,
      title: "វគ្គបណ្តុះបណ្តាល និងការអភិវឌ្ឍន៍ជំនាញវិជ្ជាជីវៈសម្រាប់",
      category: "Physic",
      image: "/api/placeholder/240/120",
      rating: "4.8",
      studentCount: "22ក 30នាក់",
      modules: "8",
      hours: "506",
      subject: "CS Courses"
    },
  ];
  
  const coursesOnPage = courses;
  
  return (
    <div className="container mx-auto p-4 font-sans">
      <div className="flex flex-wrap">
        {/* Main Content */}
        <div className="w-full lg:w-3/4 pr-0 lg:pr-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coursesOnPage.map((course) => (
              <CourseCard key={course.id}  course={course} />
            ))}
          </div>
          
          {/* Pagination */}
          <div className="flex justify-center mt-8 mb-8">
            <button className="mx-1 p-2 rounded-full hover:bg-gray-200 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button className={`mx-1 w-8 h-8 text-sm rounded-full ${currentPage === 1 ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'}`}>
              1
            </button>
            <button className={`mx-1 w-8 h-8 text-sm rounded-full ${currentPage === 2 ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'}`}>
              2
            </button>
            <button className={`mx-1 w-8 h-8 text-sm rounded-full ${currentPage === 3 ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'}`}>
              3
            </button>
            
            <button className="mx-1 p-2 rounded-full hover:bg-gray-200 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Sidebar Filters */}
        <div className="w-full lg:w-1/4 bg-white p-6 rounded-lg">
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">តម្លៃ</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input id="price1" type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                  <label htmlFor="price1" className="ml-2 text-sm text-gray-700">ឥតគិតថ្លៃ</label>
                </div>
                <span className="text-sm text-gray-500">16</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input id="price2" type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" checked />
                  <label htmlFor="price2" className="ml-2 text-sm text-gray-700">គិតថ្លៃ</label>
                </div>
                <span className="text-sm text-gray-500">16</span>
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">ប្រភេទ</h3>
            <div className="space-y-2">
              {['ភាសាបម្រើ', 'ភាសាបម្រើ', 'ភាសាបម្រើ', 'ភាសាបម្រើ', 'ភាសាបម្រើ', 'ភាសាបម្រើ', 'ភាសាបម្រើ'].map((filter, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input 
                      id={`type-${index}`} 
                      type="checkbox" 
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded" 
                      checked={index === 1 || index === 2}
                    />
                    <label htmlFor={`type-${index}`} className="ml-2 text-sm text-gray-700">{filter}</label>
                  </div>
                  <span className="text-sm text-gray-500">16</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">Tags</h3>
            <div className="space-y-2">
              {['ភាសាបម្រើ', 'ភាសាបម្រើ', 'ភាសាបម្រើ', 'ភាសាបម្រើ', 'ភាសាបម្រើ'].map((tag, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input 
                      id={`tag-${index}`} 
                      type="checkbox" 
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded" 
                      checked={index === 1}
                    />
                    <label htmlFor={`tag-${index}`} className="ml-2 text-sm text-gray-700">{tag}</label>
                  </div>
                  <span className="text-sm text-gray-500">16</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">ត្រៀមខ្លួន</h3>
            <div className="space-y-2">
              {['ពូម', 'ពូម', 'ពូម', 'ពូម'].map((level, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input 
                      id={`level-${index}`} 
                      type="checkbox" 
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                      checked={index === 1} 
                    />
                    <label htmlFor={`level-${index}`} className="ml-2 text-sm text-gray-700">{level}</label>
                  </div>
                  <span className="text-sm text-gray-500">16</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">ថ្ងៃ</h3>
            <div className="space-y-2">
              {['ភ្ជាប់ទៅលើ', 'ភ្ជាប់ទៅលើ', 'ភ្ជាប់ទៅលើ', 'ភ្ជាប់ទៅលើ'].map((duration, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input 
                      id={`duration-${index}`} 
                      type="checkbox" 
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                      checked={index === 1}
                    />
                    <label htmlFor={`duration-${index}`} className="ml-2 text-sm text-gray-700">{duration}</label>
                  </div>
                  <span className="text-sm text-gray-500">16</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex space-x-4">
            <button className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors w-1/2">
              អនុវត្ត
            </button>
            <button className="text-gray-700 py-2 px-6 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors w-1/2">
              សម្អាតទាំងអស់
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;