import React, { useState } from 'react';
import { Star } from 'lucide-react';

const CourseCard = ({ course }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
    <div className="p-4">
      <div className="flex items-center mb-2">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < Math.floor(course.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
          />
        ))}
        <span className="ml-2 text-sm text-gray-600">{course.rating}</span>
      </div>
      <h3 className="font-semibold mb-2">{course.title}</h3>
      <div className="flex items-center text-sm text-gray-600 mb-2">
        <span className="mr-4">{course.lessons} Lessons</span>
        <span>{course.students} Students</span>
      </div>
      <div className="flex items-center justify-between mt-4">
        <span className="font-bold text-lg">${course.price}</span>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600">
            Buy Now
          </button>
          <button className="px-4 py-2 text-emerald-500 border border-emerald-500 rounded-md hover:bg-emerald-50">
            Preview
          </button>
        </div>
      </div>
    </div>
  </div>
);

const FilterSection = ({ title, options, onChange }) => (
  <div className="mb-6">
    <h3 className="font-semibold mb-2">{title}</h3>
    {options.map((option) => (
      <div key={option} className="flex items-center space-x-2 mb-2">
        <input
          type="checkbox"
          id={option}
          onChange={(e) => onChange(option, e.target.checked)}
          className="rounded border-gray-300 text-emerald-500 focus:ring-emerald-500"
        />
        <label htmlFor={option} className="text-sm">
          {option}
        </label>
      </div>
    ))}
  </div>
);

const CoursePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  
  const categories = ['CSS', 'Frontend', 'General', 'Software', 'Photography', 'Programming Language', 'Technology'];
  const tags = ['CSS', 'Foundation', 'PHP', 'Python', 'Tutorial'];
  const authors = ['Thomas Magnusen', 'Col. Roderick Decker', 'R.A. Rothrock', 'Mike Torello'];
  const levels = ['All levels', 'Beginner', 'Intermediate', 'Expert'];

  const courses = Array(9).fill({
    image: '/api/placeholder/400/300',
    title: 'Complete Web Development Course',
    rating: 4.8,
    lessons: 8,
    students: 506,
    price: 35.0
  });

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex gap-8">
        {/* Filters Sidebar */}
        <div className="w-64 flex-shrink-0">
          <div className="sticky top-6">
            <h2 className="text-xl font-bold mb-6">Price</h2>
            <FilterSection title="Categories" options={categories} onChange={(cat, checked) => {}} />
            <FilterSection title="Tags" options={tags} onChange={(tag, checked) => {}} />
            <FilterSection title="Author" options={authors} onChange={(author, checked) => {}} />
            <FilterSection title="Levels" options={levels} onChange={(level, checked) => {}} />
            
            <div className="flex gap-4 mt-6">
              <button className="px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 flex-1">
                Filter
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 flex-1">
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Course Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <select className="border rounded-md px-3 py-2">
              <option>Newly published</option>
            </select>
            <div className="flex gap-2">
              <button className="p-2 border rounded-md">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <button className="p-2 border rounded-md">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                </svg>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, idx) => (
              <CourseCard key={idx} course={course} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-8 gap-2">
            <button 
              className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-50"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            >
              ←
            </button>
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentPage === page ? 'bg-emerald-500 text-white' : 'border hover:bg-gray-50'
                }`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
            <button 
              className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-50"
              onClick={() => setCurrentPage(Math.min(3, currentPage + 1))}
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;