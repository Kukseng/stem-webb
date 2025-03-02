import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';

const BlogCard = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const blogPosts = [
    {
      id: 1,
      date: 'November 16, 2014',
      title: 'មូលដ្ឋានគ្រឹះនៃការរចនាគេហទំព័រ',
      description: 'មូលដ្ឋានគ្រឹះរបស់អ្នកអភិវឌ្ឍគេហទំព័រជាមួយភាសា HTML សម្រាប់រចនាសម្ព័ន្ធ CSS សម្រាប់រចនាប្លង់ និង JavaScript សម្រាប់...',
      image: 'https://plus.unsplash.com/premium_photo-1661339265887-be15949790ff?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YmxvZ3xlbnwwfHwwfHx8MA%3D%3D',
      categories: ['Research', 'UI UX']
    },
    {
      id: 2,
      date: 'September 24, 2017',
      title: 'មូលដ្ឋានគ្រឹះនៃការរចនាគេហទំព័រ',
      description: 'មូលដ្ឋានគ្រឹះរបស់អ្នកអភិវឌ្ឍគេហទំព័រជាមួយភាសា HTML សម្រាប់រចនាសម្ព័ន្ធ CSS សម្រាប់រចនាប្លង់ និង JavaScript សម្រាប់...',
      image: 'https://plus.unsplash.com/premium_photo-1661339265887-be15949790ff?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YmxvZ3xlbnwwfHwwfHx8MA%3D%3D',
      categories: ['Research', 'UI Design']
    },
    {
      id: 3,
      date: 'March 13, 2014',
      title: 'ភាពងាយស្រួលនៃការសិក្សាសូហ្វវែរប្រកាស',
      description: 'វិធីសាស្ត្រដែលហាក់ដូចជាកាន់តែងាយបំផុតសម្រាប់អ្នកចាប់ផ្តើមការសិក្សាអភិវឌ្ឍន៍កម្មវិធីគឺត្រូវផ្ដល់ពេលវេលាគ្រប់គ្រាន់ដល់ការសិក្សាគោលការណ៍និងការអនុវត្តជាក់ស្ដែង។',
      image: 'https://plus.unsplash.com/premium_photo-1661339265887-be15949790ff?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YmxvZ3xlbnwwfHwwfHx8MA%3D%3D',
      categories: ['Programming', 'Research', 'Developments']
    }
  ];

  const getCategoryColor = (category) => {
    switch(category) {
      case 'Research': return 'text-blue-600';
      case 'UI UX': return 'text-blue-600';
      case 'UI Design': return 'text-blue-600';
      case 'Programming': return 'text-orange-500';
      case 'Developments': return 'text-pink-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className={`max-w-content  mx-auto px-4 py-8 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Header with animation */}
      <div className={`flex justify-between items-center mb-8 transition-transform duration-700 ${isLoaded ? 'translate-y-0' : 'translate-y-10'}`}>
        <div>
          <h1 className="text-3xl font-bold">អត្ថបទចុងក្រោយ</h1>
          <p className="text-gray-600">អត្ថបទសកម្មភាពចុងក្រោយបំផុត</p>
        </div>
        <button className="px-6 py-2 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors duration-300 flex items-center">
          អត្ថបទទាំងអស់
          <ChevronRight className="ml-1 w-4 h-4" />
        </button>
      </div>

      {/* Blog Posts Grid with staggered animations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* First Column */}
        <div className="space-y-6">
          {blogPosts.slice(0, 2).map((post, index) => (
            <div 
              key={post.id} 
              className={`border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-500 transform ${isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-negative-10 opacity-0'}`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="relative w-full h-64 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="text-green-500 mb-2">{post.date}</div>
                <h2 className="text-xl font-bold mb-2 hover:text-blue-600 transition-colors duration-300">{post.title}</h2>
                <p className="text-gray-600 mb-4">{post.description}</p>
                <div className="flex gap-2">
                  {post.categories.map((category, idx) => (
                    <span 
                      key={idx} 
                      className={`px-3 py-1 rounded-md text-sm ${getCategoryColor(category)} hover:opacity-80 transition-opacity duration-300`}
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Second Column - Wide Blog Post with delayed animation */}
        <div>
          {blogPosts.slice(2, 3).map(post => (
            <div 
              key={post.id} 
              className={`border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-700 transform h-full ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              style={{ transitionDelay: '400ms' }}
            >
              <div className="relative w-full h-96 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="text-green-500 mb-2">{post.date}</div>
                <h2 className="text-xl font-bold mb-2 hover:text-blue-600 transition-colors duration-300">{post.title}</h2>
                <p className="text-gray-600 mb-4">{post.description}</p>
                <div className="flex gap-2">
                  {post.categories.map((category, idx) => (
                    <span 
                      key={idx} 
                      className={`px-3 py-1 rounded-md text-sm ${getCategoryColor(category)} hover:opacity-80 transition-opacity duration-300`}
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogCard;