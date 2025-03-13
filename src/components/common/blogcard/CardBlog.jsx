import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, ChevronLeft, ArrowRight } from 'lucide-react';

const BlogCard = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [visiblePosts, setVisiblePosts] = useState([]);
  const scrollRef = useRef(null);
  
  const blogPosts = [
    {
      id: 1,
      date: 'November 16, 2014',
      title: 'មូលដ្ឋានគ្រឹះនៃការរចនាគេហទំព័រ',
      description: 'មូលដ្ឋានគ្រឹះរបស់អ្នកអភិវឌ្ឍគេហទំព័រជាមួយភាសា HTML សម្រាប់រចនាសម្ព័ន្ធ CSS សម្រាប់រចនាប្លង់ និង JavaScript សម្រាប់...',
      image: 'https://plus.unsplash.com/premium_photo-1661339265887-be15949790ff?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YmxvZ3xlbnwwfHwwfHx8MA%3D%3D',
      categories: ['Research', 'UI UX','Mobile', 'UI Design', 'Programming']
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
    },
    {
      id: 4,
      date: 'May 21, 2022',
      title: 'បច្ចេកវិទ្យា AI ក្នុងការអភិវឌ្ឍកម្មវិធី',
      description: 'ការប្រើប្រាស់បច្ចេកវិទ្យាបញ្ញាសិប្បនិម្មិត (AI) ក្នុងការបង្កើតកម្មវិធីតាមតម្រូវការរបស់អតិថិជន និងការជួយសម្រួលដល់ការអភិវឌ្ឍសូហ្វវែរ...',
      image: 'https://plus.unsplash.com/premium_photo-1661339265887-be15949790ff?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YmxvZ3xlbnwwfHwwfHx8MA%3D%3D',
      categories: ['AI', 'Programming', 'Developments']
    },
    {
      id: 5,
      date: 'August 9, 2023',
      title: 'របៀបបង្កើតកម្មវិធីលើទូរស័ព្ទ',
      description: 'ជំហានក្នុងការបង្កើតកម្មវិធីលើទូរស័ព្ទដែលមានដំណើរការលើប្រព័ន្ធប្រតិបត្តិការ Android និង iOS ដោយប្រើប្រាស់ React Native ឬ Flutter...',
      image: 'https://plus.unsplash.com/premium_photo-1661339265887-be15949790ff?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YmxvZ3xlbnwwfHwwfHx8MA%3D%3D',
      categories: ['Mobile', 'UI Design', 'Programming']
    }
  ];

  // Get all unique categories
  const allCategories = ['All', ...new Set(blogPosts.flatMap(post => post.categories))];

  useEffect(() => {
    setIsLoaded(true);
    setVisiblePosts(blogPosts);
  }, []);

  useEffect(() => {
    if (activeCategory === 'All') {
      setVisiblePosts(blogPosts);
    } else {
      setVisiblePosts(blogPosts.filter(post => post.categories.includes(activeCategory)));
    }
  }, [activeCategory]);

  const getCategoryColor = (category) => {
    switch(category) {
      case 'Research': return 'text-blue-600';
      case 'UI UX': return 'text-blue-600';
      case 'UI Design': return 'text-blue-600';
      case 'Programming': return 'text-orange-500';
      case 'Developments': return 'text-pink-600';
      case 'AI': return 'text-purple-600';
      case 'Mobile': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getCategoryBgColor = (category) => {
    if (category === activeCategory) {
      switch(category) {
        case 'Research': return 'bg-blue-100';
        case 'UI UX': return 'bg-blue-100';
        case 'UI Design': return 'bg-blue-100';
        case 'Programming': return 'bg-orange-100';
        case 'Developments': return 'bg-pink-100';
        case 'AI': return 'bg-purple-100';
        case 'Mobile': return 'bg-green-100';
        case 'All': return 'bg-gray-200';
        default: return 'bg-gray-100';
      }
    }
    return 'bg-transparent';
  };

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (container) {
      const scrollAmount = 250;
      if (direction === 'left') {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  const FeaturedPost = ({ post }) => (
    <div 
      className={`relative border rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
      style={{ transitionDelay: '400ms' }}
    >
      <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-medium z-10">
        Featured
      </div>
      <div className="relative w-full h-96 overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6 text-white">
          <div className="text-green-300 mb-2">{post.date}</div>
          <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
          <p className="text-white/80 mb-4 line-clamp-2">{post.description}</p>
          <div className="flex gap-2 flex-wrap">
            {post.categories.map((category, idx) => (
              <span 
                key={idx} 
                className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm hover:bg-white/30 transition-colors duration-300 cursor-pointer"
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="p-4 flex justify-end">
        <button className="flex items-center text-blue-600 hover:text-blue-800 transition-colors group">
          Read More 
          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );

  return (
    <div className={`xl:max-w-content 2xl:max-w-content2xl lg:max-w-contentlg md:max-w-contentmd   mx-auto px-4 py-8 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`flex flex-col md:flex-row justify-between items-start md:items-center mb-8 transition-transform duration-700 ${isLoaded ? 'translate-y-0' : 'translate-y-10'}`}>
        <div className="mb-4 md:mb-0">
          <h1 className="text-3xl font-bold">អត្ថបទចុងក្រោយ</h1>
          <p className="text-gray-600">អត្ថបទសកម្មភាពចុងក្រោយបំផុត</p>
        </div>
        <button className="px-6 py-2 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors duration-300 flex items-center">
          អត្ថបទទាំងអស់
          <ChevronRight className="ml-1 w-4 h-4" />
        </button>
      </div>

      {/* Category Filter with Horizontal Scrolling */}
      <div className="relative mb-8">
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 md:hidden"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        <div 
          ref={scrollRef}
          className="flex space-x-3 overflow-x-auto py-2 px-6 md:px-0 md:justify-start scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {allCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${getCategoryBgColor(category)} ${category === activeCategory ? 'ring-1 ring-gray-300' : 'hover:bg-gray-100'}`}
            >
              {category}
            </button>
          ))}
        </div>
        
        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 md:hidden"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Featured Post */}
      <div className="mb-12">
        <FeaturedPost post={visiblePosts[0] || blogPosts[0]} />
      </div>

      {/* Blog Posts Grid with staggered animations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visiblePosts.slice(1).map((post, index) => (
          <div 
            key={post.id} 
            className={`border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-500 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} hover:-translate-y-1`}
            style={{ transitionDelay: `${(index + 1) * 100}ms` }}
          >
            <div className="relative w-full h-48 overflow-hidden">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div className="p-4">
              <div className="text-green-500 text-sm mb-2">{post.date}</div>
              <h2 className="text-lg font-bold mb-2 line-clamp-2 hover:text-blue-600 transition-colors duration-300">{post.title}</h2>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.description}</p>
              <div className="flex flex-wrap gap-2">
                {post.categories.map((category, idx) => (
                  <span 
                    key={idx} 
                    className={`px-3 py-1 rounded-full text-xs ${getCategoryColor(category)} hover:opacity-80 transition-opacity duration-300 cursor-pointer`}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* No results message */}
      {visiblePosts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-gray-500 text-lg mb-4">No posts found for this category</p>
          <button 
            onClick={() => setActiveCategory('All')}
            className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
          >
            View all posts
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogCard;